import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { articleService, uploadService, type Article } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import './ArticleEditorPage.css';

export const ArticleEditorPage: React.FC = () => {
  const { id: routeId } = useParams<{ id?: string }>();
  const [articleId, setArticleId] = useState<string | undefined>(routeId);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuth();

  // 同步路由参数变化
  useEffect(() => {
    setArticleId(routeId);
  }, [routeId]);

  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    summary: '',
    content: '',
    category: 'articles',
    tags: [],
    status: 'draft'
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    // 等待认证状态加载完成
    if (loading) return;
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // 如果是编辑模式，加载现有文章
    if (articleId) {
      loadArticle();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, isAuthenticated, loading, navigate, location.pathname]);

  const loadArticle = async () => {
    try {
      const data = await articleService.getArticle(articleId!);
      if (data && data.author_id === user?.id) {
        setArticle(data);
      } else {
        setError('无权限编辑此文章');
      }
    } catch (err) {
      setError('加载文章失败');
    }
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    if (!article.title || !article.content) {
      setError('标题和内容不能为空');
      return;
    }

    let currentId = articleId;

    setSaving(true);
    setError(null);

    try {
      if (articleId) {
        // 更新
        await articleService.updateArticle(articleId, {
          ...article,
          status
        });
      } else {
        // 创建
        const newArticle = await articleService.createArticle({
          ...article,
          author_id: user!.id,
          status,
          slug: article.title!.toLowerCase().replace(/\s+/g, '-')
        });
        currentId = newArticle.id;
        setArticleId(newArticle.id);
      }

      if (status === 'published') {
        if (currentId) {
          navigate(`/articles/${currentId}`);
        } else {
          navigate('/blackboard');
        }
      } else {
        setError('保存为草稿成功');
      }
    } catch (err) {
      setError('保存失败：' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleCoverUpload = async (file: File) => {
    if (!articleId && article.status === 'draft') {
      setError('请先保存文章作为草稿');
      return;
    }

    setUploading(true);

    try {
      const result = await uploadService.uploadArticleImage(file, articleId || 'temp');
      setArticle(prev => ({ ...prev, cover_image: result.url }));
    } catch (err) {
      setError('封面上传失败：' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!articleId && article.status === 'draft') {
      setError('请先保存文章作为草稿');
      return;
    }

    setUploading(true);

    try {
      const result = await uploadService.uploadArticleImage(file, articleId || 'temp');
      
      // 在Markdown中插入图片
      const markdown = `![${file.name}](${result.url})`;
      setArticle(prev => ({
        ...prev,
        content: (prev.content || '') + '\n' + markdown
      }));
    } catch (err) {
      setError('图片上传失败：' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    for (let file of files) {
      if (file.type.startsWith('image/')) {
        await handleImageUpload(file);
      }
    }
  };

  const hasContent = () => {
    return !!(
      (article.title && article.title.trim()) ||
      (article.content && article.content.trim()) ||
      (article.summary && article.summary.trim())
    );
  };

  const handleExit = () => {
    if (hasContent()) {
      setShowExitConfirm(true);
    } else {
      navigate('/blackboard');
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate('/blackboard');
  };

  if (loading) {
    return <div className="editor-loading">加载中...</div>;
  }

  if (!isAuthenticated) {
    return <div className="editor-loading">跳转到登录...</div>;
  }

  return (
    <div className="article-editor-page">
      <div className="editor-shell">
        <div className="editor-card">
          <div className="editor-header">
            <div>
              <p className="eyebrow">创作中心</p>
              <h1>{articleId ? '编辑文章' : '新建文章'}</h1>
            </div>
            <div className="editor-actions">
              <button
                className="btn btn-secondary"
                onClick={handleExit}
              >
                退出
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSave('draft')}
                disabled={saving}
              >
                {saving ? '保存中...' : '保存草稿'}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSave('published')}
                disabled={saving}
              >
                {saving ? '发布中...' : '发布'}
              </button>
            </div>
          </div>

          {error && <div className="editor-error frosted">{error}</div>}

          <div className="editor-form">
            <div className="form-group span-2">
              <label>文章标题</label>
              <input
                type="text"
                value={article.title || ''}
                onChange={e => setArticle(prev => ({ ...prev, title: e.target.value }))}
                placeholder="输入文章标题..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>分类</label>
              <select
                value={article.category || 'articles'}
                onChange={e => setArticle(prev => ({ ...prev, category: e.target.value }))}
                className="form-input"
              >
                <option value="articles">文章</option>
                <option value="stories">故事</option>
                <option value="insights">洞察</option>
              </select>
            </div>

            <div className="form-group span-2">
              <label>封面图</label>
              {article.cover_image ? (
                <div className="cover-preview">
                  <img src={article.cover_image} alt="封面预览" />
                  <div className="cover-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setArticle(prev => ({ ...prev, cover_image: '' }))}
                    >
                      🗑️ 移除
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e: any) => {
                          const file = e.target.files[0];
                          if (file) handleCoverUpload(file);
                        };
                        input.click();
                      }}
                      disabled={uploading}
                    >
                      🔄 更换
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file) handleCoverUpload(file);
                    };
                    input.click();
                  }}
                  disabled={uploading}
                >
                  {uploading ? '上传中...' : '📷 上传封面图'}
                </button>
              )}
            </div>

            <div className="form-group span-2">
              <label>标签</label>
              <div className="tag-input-container">
                <div className="tag-chips">
                  {article.tags?.map((tag, idx) => (
                    <span key={idx} className="tag-chip">
                      {tag}
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => setArticle(prev => ({
                          ...prev,
                          tags: prev.tags?.filter((_, i) => i !== idx) || []
                        }))}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="输入标签，按回车或Tab添加"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === 'Tab') && tagInput.trim()) {
                      e.preventDefault();
                      const newTag = tagInput.trim();
                      if (!article.tags?.includes(newTag)) {
                        setArticle(prev => ({
                          ...prev,
                          tags: [...(prev.tags || []), newTag]
                        }));
                      }
                      setTagInput('');
                    }
                  }}
                  className="form-input tag-input"
                />
              </div>
              <div className="preset-tags">
                {['技术', '产品', '行业洞察', 'AI', '地图', '数据'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className="preset-tag"
                    onClick={() => {
                      if (!article.tags?.includes(tag)) {
                        setArticle(prev => ({
                          ...prev,
                          tags: [...(prev.tags || []), tag]
                        }));
                      }
                    }}
                    disabled={article.tags?.includes(tag)}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group span-2">
              <label>摘要</label>
              <textarea
                value={article.summary || ''}
                onChange={e => setArticle(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="输入文章摘要（可选）"
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group span-2">
              <label>文章内容（Markdown格式）</label>
              <div
                className="editor-upload-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <textarea
                  value={article.content || ''}
                  onChange={e => setArticle(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="支持 Markdown 格式。拖拽图片到此处上传，或点击下方按钮上传。"
                  className="form-textarea editor-textarea"
                />
                <div className="upload-hint">💡 拖拽图片到此区域上传</div>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e: any) => {
                    const file = e.target.files[0];
                    if (file) handleImageUpload(file);
                  };
                  input.click();
                }}
                disabled={uploading}
              >
                {uploading ? '上传中...' : '上传图片'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showExitConfirm && (
        <div className="exit-confirm-overlay">
          <div className="exit-confirm-dialog">
            <h2>放弃编辑？</h2>
            <p>您的内容未保存，确定要退出吗？</p>
            <div className="confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowExitConfirm(false)}
              >
                继续编辑
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmExit}
              >
                放弃并退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
