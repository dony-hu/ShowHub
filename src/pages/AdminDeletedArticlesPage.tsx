import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { articleService, isAdmin, type Article } from '../services/supabase';
import './AdminDeletedArticlesPage.css';

export const AdminDeletedArticlesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [permanentDeleting, setPermanentDeleting] = useState<string | null>(null);

  // 权限检查
  useEffect(() => {
    if (!authLoading && !isAdmin(user)) {
      navigate('/blackboard');
    }
  }, [user, authLoading, navigate]);

  // 加载已删除文章
  useEffect(() => {
    const loadDeletedArticles = async () => {
      if (!isAdmin(user)) return;

      try {
        setLoading(true);
        const result = await articleService.getDeletedArticles(page, 20);
        setArticles(result.articles as Article[]);
        setTotal(result.total);
      } catch (err) {
        setError('加载失败：' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadDeletedArticles();
    }
  }, [page, user, authLoading]);

  // 恢复文章
  const handleRestore = async (id: string) => {
    if (!confirm('确定要恢复这篇文章吗？')) return;

    try {
      setRestoring(id);
      await articleService.restoreArticle(id);
      // 从列表中移除
      setArticles(prev => prev.filter(a => a.id !== id));
      setTotal(prev => prev - 1);
    } catch (err) {
      alert('恢复失败：' + (err as Error).message);
    } finally {
      setRestoring(null);
    }
  };

  // 永久删除
  const handlePermanentDelete = async (id: string, title: string) => {
    if (!confirm(`⚠️ 永久删除操作不可恢复！\n\n确定要永久删除文章《${title}》吗？`)) return;

    try {
      setPermanentDeleting(id);
      await articleService.permanentlyDeleteArticle(id);
      // 从列表中移除
      setArticles(prev => prev.filter(a => a.id !== id));
      setTotal(prev => prev - 1);
    } catch (err) {
      alert('永久删除失败：' + (err as Error).message);
    } finally {
      setPermanentDeleting(null);
    }
  };

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading) {
    return <div className="admin-page-loading">加载中...</div>;
  }

  if (error) {
    return <div className="admin-page-error">{error}</div>;
  }

  if (!isAdmin(user)) {
    return null; // 非管理员会被重定向
  }

  return (
    <div className="admin-deleted-page">
      <header className="admin-header">
        <button onClick={() => navigate('/blackboard')} className="back-btn">
          ← 返回黑板报
        </button>
        <h1>🗑️ 已删除的文章</h1>
        <div className="admin-badge">管理员模式</div>
      </header>

      <div className="admin-stats">
        <div className="stat-item">
          <span className="stat-label">已删除文章数：</span>
          <span className="stat-value">{total}</span>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="empty-state">
          <p>📭 回收站是空的</p>
        </div>
      ) : (
        <div className="deleted-articles-list">
          {articles.map(article => (
            <div key={article.id} className="deleted-article-card">
              <div className="article-info">
                {article.cover_image && (
                  <img 
                    src={article.cover_image} 
                    alt={article.title}
                    className="article-thumbnail"
                  />
                )}
                <div className="article-details">
                  <h3 className="article-title">{article.title}</h3>
                  <div className="article-meta">
                    <span className="meta-item">📅 删除时间: {formatDate(article.deleted_at)}</span>
                    <span className="meta-item">🕒 创建时间: {formatDate(article.created_at)}</span>
                    <span className="meta-item">👁️ 浏览: {article.view_count}</span>
                    {article.tags && article.tags.length > 0 && (
                      <span className="meta-item">
                        🏷️ {article.tags.join(', ')}
                      </span>
                    )}
                  </div>
                  {article.summary && (
                    <p className="article-summary">{article.summary}</p>
                  )}
                </div>
              </div>

              <div className="article-actions">
                <button
                  onClick={() => handleRestore(article.id)}
                  disabled={restoring === article.id}
                  className="btn-restore"
                >
                  {restoring === article.id ? '恢复中...' : '♻️ 恢复'}
                </button>
                <button
                  onClick={() => handlePermanentDelete(article.id, article.title)}
                  disabled={permanentDeleting === article.id}
                  className="btn-permanent-delete"
                >
                  {permanentDeleting === article.id ? '删除中...' : '🗑️ 永久删除'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {total > 20 && (
        <div className="pagination">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="page-btn"
          >
            上一页
          </button>
          <span className="page-info">
            第 {page} 页 / 共 {Math.ceil(total / 20)} 页
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(total / 20)}
            className="page-btn"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
};
