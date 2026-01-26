import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articleService, isAdmin, type Article, commentService, starService, type ArticleComment } from '../services/supabase';
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
  const [showPermanentDeleteConfirm, setShowPermanentDeleteConfirm] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  
  // 点赞相关状态
  const [starCount, setStarCount] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [starLoading, setStarLoading] = useState(false);
  
  // 评论相关状态
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    loadArticle();
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (article && isAuthenticated) {
      loadStarInfo();
      loadComments();
    }
  }, [article, isAuthenticated]);

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
      
      // 管理员可以查看已删除的文章
      const includeDeleted = isAdmin(user);
      const data = await articleService.getArticle(id, includeDeleted);
      
      if (!data) {
        setError('文章不存在或已删除');
        setLoading(false);
        return;
      }

      const isInternal = data.tags?.includes(INTERNAL_TAG) || (data as any).visibility === 'internal';
      if (isInternal && !isAuthenticated) {
        setNeedsAuth(true);
        setError('此为内部文章，请登录后查看');
        setLoading(false);
        return;
      }

      // 只显示已发布的文章，或者当前用户是作者时显示草稿，或者是管理员
      if (data.status !== 'published' && data.author_id !== user?.id && !isAdmin(user)) {
        setError('无权限查看此文章');
        setLoading(false);
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

  const handlePermanentDelete = async () => {
    if (!id) return;
    
    setDeleting(true);
    try {
      await articleService.permanentlyDeleteArticle(id);
      navigate('/blackboard');
    } catch (err) {
      setError('彻底删除失败：' + (err as Error).message);
      setDeleting(false);
    }
  };

  const loadStarInfo = async () => {
    if (!id) return;
    try {
      const { count, isStarred: starred } = await starService.getArticleStars(id, user?.id);
      setStarCount(count);
      setIsStarred(starred);
    } catch (err) {
      console.error('加载点赞信息失败:', err);
    }
  };

  const handleToggleStar = async () => {
    if (!isAuthenticated || !id || !user) {
      navigate('/login', { state: { from: `/articles/${id}` } });
      return;
    }

    setStarLoading(true);
    try {
      if (isStarred) {
        await starService.removeStar(id, user.id);
        setStarCount(Math.max(0, starCount - 1));
      } else {
        await starService.addStar(id, user.id);
        setStarCount(starCount + 1);
      }
      setIsStarred(!isStarred);
    } catch (err) {
      console.error('切换点赞失败:', err);
      setError('操作失败，请稍后重试');
    } finally {
      setStarLoading(false);
    }
  };

  const loadComments = async () => {
    if (!id) return;
    setCommentsLoading(true);
    try {
      const data = await commentService.getArticleComments(id);
      setComments(data);
    } catch (err) {
      console.error('加载评论失败:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!isAuthenticated || !user || !id) {
      navigate('/login', { state: { from: `/articles/${id}` } });
      return;
    }

    if (!commentContent.trim()) {
      setError('评论内容不能为空');
      return;
    }

    setSubmittingComment(true);
    try {
      const newComment = await commentService.addComment(id, user.id, commentContent);
      setComments([newComment, ...comments]);
      setCommentContent('');
    } catch (err) {
      console.error('提交评论失败:', err);
      setError('评论提交失败，请稍后重试');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isAdmin(user)) return;

    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('删除评论失败:', err);
      setError('删除评论失败');
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

      {/* 已删除警告提示 */}
      {article.deleted_at && isAdmin(user) && (
        <div className="article-warning" style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffc107', 
          padding: '16px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          color: '#856404'
        }}>
          <strong>⚠️ 此文章已被软删除</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
            删除时间：{new Date(article.deleted_at).toLocaleString('zh-CN')}
          </p>
        </div>
      )}

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
          {(user?.id === article.author_id || isAdmin(user)) && (
            <div className="header-actions">
              {!article.deleted_at && (
                <>
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
                </>
              )}
              {article.deleted_at && isAdmin(user) && (
                <button 
                  className="btn btn-danger" 
                  onClick={() => setShowPermanentDeleteConfirm(true)}
                  style={{ background: '#dc3545' }}
                >
                  💀 彻底删除
                </button>
              )}
            </div>
          )}
        </div>

        {/* Meta 信息区 */}
        <div className="article-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span className="meta-date">
              📅 {new Date(article.created_at).toLocaleDateString('zh-CN')}
            </span>
            <span className="meta-views">
              👁️ {article.view_count} 人浏览
            </span>
            <button 
              className={`meta-star ${isStarred ? 'active' : ''}`}
              onClick={handleToggleStar}
              disabled={starLoading || !isAuthenticated}
              title={isAuthenticated ? (isStarred ? '取消收藏' : '收藏') : '登录后可收藏'}
            >
              ⭐ {starCount}
            </button>
          </div>
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
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({node, ...props}) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              )
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* 评论区 */}
        <div className="article-comments-section">
          <h3>评论 ({comments.length})</h3>
          
          {isAuthenticated ? (
            <div className="comment-input-box">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="分享你的想法..."
                rows={3}
              />
              <button
                className="btn btn-primary"
                onClick={handleSubmitComment}
                disabled={submittingComment || !commentContent.trim()}
              >
                {submittingComment ? '发送中...' : '发送评论'}
              </button>
            </div>
          ) : (
            <div className="comment-login-prompt">
              <p>登录后可以评论</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login', { state: { from: `/articles/${id}` } })}
              >
                登录
              </button>
            </div>
          )}

          {commentsLoading ? (
            <div className="comments-loading">加载评论中...</div>
          ) : comments.length === 0 ? (
            <div className="comments-empty">暂时没有评论，来做第一个评论者吧</div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    {comment.users?.avatar_url && (
                      <img src={comment.users.avatar_url} alt={comment.users.nickname} className="comment-avatar" />
                    )}
                    <div className="comment-user-info">
                      <span className="comment-author">{comment.users?.nickname || '匿名用户'}</span>
                      <span className="comment-time">
                        {new Date(comment.created_at).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    {isAdmin(user) && (
                      <button
                        className="comment-delete-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                        title="删除评论"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-dialog">
            <h2>删除文章？</h2>
            <p>此操作将软删除文章，管理员可以恢复。</p>
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

      {/* 彻底删除确认对话框 */}
      {showPermanentDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-dialog">
            <h2>⚠️ 彻底删除文章？</h2>
            <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
              此操作将永久删除文章，无法恢复！
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              文章标题：{article?.title}
            </p>
            <div className="confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowPermanentDeleteConfirm(false)}
                disabled={deleting}
              >
                取消
              </button>
              <button
                className="btn btn-danger"
                onClick={handlePermanentDelete}
                disabled={deleting}
                style={{ background: '#dc3545' }}
              >
                {deleting ? '删除中...' : '确认彻底删除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
