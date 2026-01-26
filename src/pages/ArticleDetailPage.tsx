import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articleService, type Article } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import './ArticleDetailPage.css';

const INTERNAL_TAG = '__internal';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    loadArticle();
    // 重新登录后自动重试
  }, [id, isAuthenticated]);

  const loadArticle = async () => {
    setNeedsAuth(false);
    if (!id) {
      setError('文章ID不存在');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getArticle(id);
      
      if (!data) {
        setError('文章不存在或已删除');
        return;
      }

      const isInternal = data.tags?.includes(INTERNAL_TAG) || (data as any).visibility === 'internal';
      if (isInternal && !isAuthenticated) {
        setNeedsAuth(true);
        setError('此为内部文章，请登录后查看');
        return;
      }

      // 只显示已发布的文章，或者当前用户是作者时显示草稿
      if (data.status !== 'published' && data.author_id !== user?.id) {
        setError('无权限查看此文章');
        return;
      }

      setArticle(data);
    } catch (err) {
      setError('加载文章失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    setDeleting(true);
    try {
      await articleService.deleteArticle(id);
      navigate('/blackboard');
    } catch (err) {
      setError('删除文章失败：' + (err as Error).message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="article-detail-page">
        <div className="article-loading">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-detail-page">
        <div className="article-breadcrumb">
          <button className="btn-back" onClick={() => navigate('/blackboard')}>← 返回黑板报</button>
        </div>
        <div className="article-error">{error}</div>
        {needsAuth && (
          <div style={{ marginTop: '12px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/login', { state: { from: `/articles/${id}` } })}>
              登录后查看
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail-page">
        <div className="article-breadcrumb">
          <button className="btn-back" onClick={() => navigate('/blackboard')}>← 返回黑板报</button>
        </div>
        <div className="article-error">文章不存在</div>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      {/* 面包屑导航 */}
      <div className="article-breadcrumb">
        <button className="btn-back" onClick={() => navigate('/blackboard')}>← 返回黑板报</button>
      </div>

      {/* 文章卡片 */}
      <div className="article-card">
        {/* 封面图 */}
        {article.cover_image && (
          <div className="article-cover">
            <img src={article.cover_image} alt={article.title} />
          </div>
        )}

        {/* Header 区域 */}
        <div className="article-header">
          <div className="header-content">
            <div className="eyebrow">丰图产品故事与技术分享</div>
            <h1>{article.title}</h1>
            {article.summary && <p className="summary">{article.summary}</p>}
          </div>
          {user?.id === article.author_id && (
            <div className="header-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => navigate(`/articles/${article.id}/edit`)}
              >
                ✏️ 编辑
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                🗑️ 删除
              </button>
            </div>
          )}
        </div>

        {/* Meta 信息区 */}
        <div className="article-meta">
          <span className="meta-date">
            📅 {new Date(article.created_at).toLocaleDateString('zh-CN')}
          </span>
          {article.tags && article.tags.length > 0 && (
            <div className="tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* 内容区 */}
        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-dialog">
            <h2>删除文章？</h2>
            <p>此操作无法撤销，确定要删除这篇文章吗？</p>
            <div className="confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                取消
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? '删除中...' : '确认删除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
