import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { articleService, uploadService, type Article, isAdmin } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { extractPdfContent, extractWechatContent, isWechatUrl } from '../services/contentImporter';
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

  const INTERNAL_TAG = '__internal';
  const [visibility, setVisibility] = useState<'public' | 'internal'>('public');

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [uploadBytes, setUploadBytes] = useState<{ loaded: number; total: number } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatSpeed = (bytesPerSecond: number) => {
    if (!bytesPerSecond || Number.isNaN(bytesPerSecond)) return '0 B/s';
    return `${formatBytes(bytesPerSecond)}/s`;
  };

  const validateImageFile = (file: File) => {
    const isTypeAllowed = file.type
      ? ALLOWED_IMAGE_TYPES.includes(file.type)
      : /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    if (!isTypeAllowed) {
      return '仅支持 JPG / JPEG / PNG / GIF / WEBP 图片格式';
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return `图片大小不能超过 ${formatBytes(MAX_IMAGE_SIZE)}`;
    }
    return null;
  };

  const validatePdfFile = (file: File) => {
    const isPdf = file.type ? file.type === 'application/pdf' : /\.pdf$/i.test(file.name);
    if (!isPdf) {
      return '仅支持 PDF 文件';
    }
    if (file.size > MAX_PDF_SIZE) {
      return `PDF 大小不能超过 ${formatBytes(MAX_PDF_SIZE)}`;
    }
    return null;
  };

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
      if (data && (data.author_id === user?.id || isAdmin(user || null))) {
        setArticle(data);
        const isInternal = data.tags?.includes(INTERNAL_TAG) || data.visibility === 'internal';
        setVisibility(isInternal ? 'internal' : 'public');
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

    // 根据可见性调整内部标签
    const nextTags = new Set(article.tags || []);
    if (visibility === 'internal') {
      nextTags.add(INTERNAL_TAG);
    } else {
      nextTags.delete(INTERNAL_TAG);
    }

    const articlePayload = {
      ...article,
      tags: Array.from(nextTags),
      visibility
    } as Partial<Article>;

    let currentId = articleId;

    setSaving(true);
    setError(null);

    try {
      if (articleId) {
        // 更新
        await articleService.updateArticle(articleId, {
          ...articlePayload,
          status,
          ...(status === 'published' && { published_at: new Date().toISOString() })
        });
      } else {
        // 创建
        const createPayload = {
          ...articlePayload,
          author_id: user!.id,
          status,
          slug: article.title!.toLowerCase().replace(/\s+/g, '-'),
          ...(status === 'published' && { published_at: new Date().toISOString() })
        };

        const newArticle = await articleService.createArticle(createPayload);
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
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    // 如果是新文章（没有articleId），先自动保存为草稿
    if (!articleId) {
      setError('正在保存草稿以便上传封面...');
      await handleSave('draft');
      setError(null);
      // 等待articleId更新后再继续
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus('上传封面图中...');

    try {
      const result = await uploadService.uploadArticleImage(file, articleId || 'temp', {
        onProgress: (progress) => {
          setUploadProgress(progress.percent);
          setUploadSpeed(progress.speed);
          setUploadBytes({ loaded: progress.loaded, total: progress.total });
        }
      });
      setArticle(prev => ({ ...prev, cover_image: result.url }));
      setError('封面上传成功');
      setTimeout(() => setError(null), 2000);
    } catch (err) {
      setError('封面上传失败：' + (err as Error).message);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      setUploadSpeed(null);
      setUploadBytes(null);
      setUploadStatus(null);
    }
  };

  const handleImageUpload = async (file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    // 如果是新文章（没有articleId），先自动保存为草稿
    if (!articleId) {
      setError('正在保存草稿以便上传图片...');
      await handleSave('draft');
      setError(null);
      // 等待articleId更新后再继续
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus('上传图片中...');

    try {
      const result = await uploadService.uploadArticleImage(file, articleId || 'temp', {
        onProgress: (progress) => {
          setUploadProgress(progress.percent);
          setUploadSpeed(progress.speed);
          setUploadBytes({ loaded: progress.loaded, total: progress.total });
        }
      });
      
      // 在Markdown中插入图片
      const markdown = `![${file.name}](${result.url})`;
      setArticle(prev => ({
        ...prev,
        content: (prev.content || '') + '\n' + markdown
      }));
      setError('图片上传成功');
      setTimeout(() => setError(null), 2000);
    } catch (err) {
      setError('图片上传失败：' + (err as Error).message);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      setUploadSpeed(null);
      setUploadBytes(null);
      setUploadStatus(null);
    }
  };

  const handlePdfUpload = async (file: File) => {
    const validationError = validatePdfFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    // 如果是新文章（没有articleId），先自动保存为草稿
    if (!articleId) {
      setError('正在保存草稿以便上传 PDF...');
      await handleSave('draft');
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setUploading(true);
    try {
      setUploadProgress(0);
      setUploadStatus('上传 PDF 中...');
      const uploadResult = await uploadService.uploadArticleFile(file, articleId || 'temp', {
        onProgress: (progress) => {
          setUploadProgress(progress.percent);
          setUploadSpeed(progress.speed);
          setUploadBytes({ loaded: progress.loaded, total: progress.total });
        }
      });

      const pdfLink = `[${file.name}](${uploadResult.url})`;
      setArticle(prev => ({
        ...prev,
        content: (prev.content || '') + '\n' + pdfLink
      }));

      setError('PDF 上传成功，正在提取内容...');
      const importedContent = await extractPdfContent(file);
      
      // 如果没有标题，使用导入的标题
      if (!article.title) {
        setArticle(prev => ({
          ...prev,
          title: importedContent.title || file.name.replace('.pdf', '')
        }));
      }
      
      // 如果没有摘要，使用导入的摘要
      if (!article.summary) {
        setArticle(prev => ({
          ...prev,
          summary: importedContent.summary
        }));
      }
      
      // 添加内容到编辑器
      setArticle(prev => ({
        ...prev,
        content: (prev.content || '') + '\n\n' + importedContent.content
      }));
      
      setError(null);
    } catch (err) {
      setError('PDF 提取失败：' + (err as Error).message);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      setUploadSpeed(null);
      setUploadBytes(null);
      setUploadStatus(null);
    }
  };

  const handleWechatImport = async () => {
    const url = window.prompt('粘贴微信公众号文章链接');
    if (!url) return;

    if (!isWechatUrl(url)) {
      setError('请输入有效的微信公众号链接');
      return;
    }

    setUploading(true);
    try {
      setError('正在提取微信文章内容...');
      const importedContent = await extractWechatContent(url);
      
      // 设置标题
      if (!article.title) {
        setArticle(prev => ({
          ...prev,
          title: importedContent.title
        }));
      }
      
      // 设置摘要
      if (!article.summary) {
        setArticle(prev => ({
          ...prev,
          summary: importedContent.summary
        }));
      }
      
      // 添加内容，如果有图片则添加图片链接
      let contentToAdd = importedContent.content;
      if (importedContent.imageUrl) {
        contentToAdd = `![微信文章封面](${importedContent.imageUrl})\n\n${contentToAdd}`;
      }
      if (importedContent.sourceUrl) {
        contentToAdd += `\n\n[原文链接](${importedContent.sourceUrl})`;
      }
      
      setArticle(prev => ({
        ...prev,
        content: (prev.content || '') + '\n\n' + contentToAdd
      }));
      
      setError(null);
    } catch (err) {
      setError('微信文章导入失败：' + (err as Error).message);
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

            <div className="form-group">
              <label>可见性</label>
              <select
                value={visibility}
                onChange={e => setVisibility(e.target.value as 'public' | 'internal')}
                className="form-input"
              >
                <option value="public">公开</option>
                <option value="internal">内部（需登录可见）</option>
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

              <div className="editor-action-buttons">
                {uploading && (
                  <div className="upload-status" style={{ width: '100%' }}>
                    <div>
                      {uploadStatus || '上传中...'}
                      {uploadBytes && (
                        <span style={{ marginLeft: 8, color: 'rgba(232,236,245,0.7)' }}>
                          {formatBytes(uploadBytes.loaded)} / {formatBytes(uploadBytes.total)}
                        </span>
                      )}
                    </div>
                    <div style={{ whiteSpace: 'nowrap' }}>
                      {uploadProgress !== null ? `${uploadProgress}%` : ''}
                      {uploadSpeed !== null && (
                        <span style={{ marginLeft: 8, color: 'rgba(232,236,245,0.7)' }}>
                          {formatSpeed(uploadSpeed)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {uploading && uploadProgress !== null && (
                  <div className="upload-progress-bar">
                    <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
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

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'application/pdf';
                    input.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file) handlePdfUpload(file);
                    };
                    input.click();
                  }}
                  disabled={uploading}
                >
                  {uploading ? '上传中...' : '导入 PDF'}
                </button>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleWechatImport}
                >
                  导入公众号文章链接
                </button>
              </div>
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
