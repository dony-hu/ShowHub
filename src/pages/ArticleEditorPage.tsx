import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articleService, uploadService, type Article } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import './ArticleEditorPage.css';

export const ArticleEditorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // 如果是编辑模式，加载现有文章
    if (id) {
      loadArticle();
    }
  }, [id, isAuthenticated]);

  const loadArticle = async () => {
    try {
      const data = await articleService.getArticle(id!);
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

    setSaving(true);
    setError(null);

    try {
      if (id) {
        // 更新
        await articleService.updateArticle(id, {
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
        id = newArticle.id;
      }

      if (status === 'published') {
        navigate(`/articles/${id}`);
      } else {
        setError('保存为草稿成功');
      }
    } catch (err) {
      setError('保存失败：' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!id && article.status === 'draft') {
      setError('请先保存文章作为草稿');
      return;
    }

    setUploading(true);

    try {
      const result = await uploadService.uploadArticleImage(file, id || 'temp');
      
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

  if (!isAuthenticated) {
    return <div className="editor-loading">加载中...</div>;
  }

  return (
    <div className="article-editor-page">
      <div className="editor-container">
        <div className="editor-header">
          <h1>{id ? '编辑文章' : '新建文章'}</h1>
          <div className="editor-actions">
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

        {error && <div className="editor-error">{error}</div>}

        <div className="editor-form">
          <div className="form-group">
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
            <label>摘要</label>
            <textarea
              value={article.summary || ''}
              onChange={e => setArticle(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="输入文章摘要（可选）"
              className="form-textarea"
              rows={3}
            />
          </div>

          <div className="form-row">
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
              <label>标签</label>
              <input
                type="text"
                placeholder="逗号分隔"
                value={article.tags?.join(', ') || ''}
                onChange={e => setArticle(prev => ({
                  ...prev,
                  tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                }))}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
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
                placeholder="支持Markdown格式。拖拽图片到此处上传，或点击下方按钮上传。"
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

      <div className="editor-preview">
        <h2>预览</h2>
        <div className="preview-content">
          {article.title && <h1>{article.title}</h1>}
          {article.summary && <p className="summary">{article.summary}</p>}
          {/* 这里可以集成markdown渲染器 */}
          <p style={{ color: '#999' }}>完整的Markdown预览会在集成react-markdown后显示</p>
        </div>
      </div>
    </div>
  );
};
