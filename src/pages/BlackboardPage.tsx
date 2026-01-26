import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BlackboardPage.css'
import { articleService, type Article } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'

const PAGE_SIZE = 9
const INTERNAL_TAG = '__internal'

const BlackboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, loading, logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [listLoading, setListLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDrafts, setShowDrafts] = useState(false)

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  useEffect(() => {
    loadArticles(page)
  }, [page, showDrafts])

  const loadArticles = async (currentPage: number) => {
    setListLoading(true)
    setError(null)
    try {
      if (showDrafts && user) {
        // 加载用户自己的文章（包括草稿）
        const { articles: data, total: count } = await articleService.getMyArticles(user.id, currentPage, PAGE_SIZE)
        setArticles(data)
        setTotal(count)
      } else {
        // 加载已发布的文章
        const { articles: data, total: count } = await articleService.getPublishedArticles(currentPage, PAGE_SIZE)
        setArticles(data)
        setTotal(count)
      }
    } catch (err) {
      console.error('加载文章列表失败:', err)
      setError('加载文章失败，请稍后重试。')
    } finally {
      setListLoading(false)
    }
  }

  const handlePostClick = () => {
    if (isAuthenticated) {
      navigate('/articles/new')
      return
    }
    navigate('/login', { state: { from: '/blackboard' } })
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="blackboard-page">
      <section className="blackboard-hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>产品故事与技术分享</h1>
            <p className="hero-subtitle">记录团队的灵感、踩坑与展望。</p>
            <div className="hero-highlights">
              <span>产品更新</span>
              <span>技术动态</span>
              <span>行业见解</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="auth-status-card">
              <span className={`status-dot ${loading ? 'neutral' : isAuthenticated ? 'on' : 'off'}`} />
              <div className="auth-actions">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      className="auth-button ghost"
                      onClick={() => navigate('/change-password')}
                      style={{ marginRight: '8px' }}
                    >
                      修改密码
                    </button>
                    <button
                      type="button"
                      className="auth-button ghost"
                      onClick={handleLogout}
                      disabled={loggingOut || loading}
                    >
                      {loggingOut ? '退出中…' : '退出登录'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="auth-button primary"
                    onClick={() => navigate('/login', { state: { from: '/blackboard' } })}
                    disabled={loading}
                  >
                    登录 / 注册
                  </button>
                )}
              </div>
              <div className="auth-status-message">
                {loading
                  ? '登录状态检测中…'
                  : isAuthenticated
                  ? `已登录：${user?.email || user?.nickname || '用户'}`
                  : '未登录，登录后可发帖与查看内部文章。'}
              </div>
            </div>
            <button type="button" className="post-button" onClick={handlePostClick}>
              <span className="post-icon">✏️</span>
              <span className="post-text">我要分享</span>
            </button>
          </div>
        </div>
      </section>

      <section className="blackboard-section compact">
        <div className="section-header">
          <div className="section-eyebrow">ARTICLES</div>
          <h2>最新发布</h2>
          <p>所有内容均来自数据库，实时保持与后台一致。</p>
          {isAuthenticated && (
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <button 
                className={`pill ${!showDrafts ? 'primary' : 'ghost'}`}
                onClick={() => { setShowDrafts(false); setPage(1); }}
              >
                已发布
              </button>
              <button 
                className={`pill ${showDrafts ? 'primary' : 'ghost'}`}
                onClick={() => { setShowDrafts(true); setPage(1); }}
              >
                我的草稿
              </button>
            </div>
          )}
        </div>

        {listLoading ? (
          <div className="list-state">列表加载中…</div>
        ) : error ? (
          <div className="list-state error">{error}</div>
        ) : articles.length === 0 ? (
          <div className="list-state empty">暂时还没有文章，登录后可以开始创作。</div>
        ) : (
          <div className="bulletin-list">
            {articles
              .filter((item) => {
                const isInternal = item.tags?.includes(INTERNAL_TAG) || item.visibility === 'internal'
                if (isInternal && !isAuthenticated) return false
                return true
              })
              .map((item) => {
              const dateText = new Date(item.published_at || item.created_at).toLocaleDateString('zh-CN')
              const coverStyle = item.cover_image
                ? { backgroundImage: `url(${item.cover_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : { background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.18), rgba(153, 102, 204, 0.18))' }

              return (
                <article
                  key={item.id}
                  className="bulletin-item wechat-style clickable"
                  onClick={() => {
                    if (item.status === 'draft') {
                      navigate(`/articles/${item.id}/edit`)
                    } else {
                      navigate(`/articles/${item.id}`)
                    }
                  }}
                >
                  <div className="card-cover" style={coverStyle}></div>
                  <div className="card-content">
                    <div className="bulletin-meta">
                      <span className="pill ghost">{dateText}</span>
                      {item.status === 'draft' && <span className="pill ghost" style={{ background: '#ffc107', color: '#856404' }}>草稿</span>}
                      <h3>{item.title}</h3>
                    </div>
                    {item.summary ? <p>{item.summary}</p> : <p className="muted">暂无摘要</p>}
                    {(item.tags?.includes(INTERNAL_TAG) || item.visibility === 'internal') && (
                      <div className="pill ghost" style={{ marginTop: '6px' }}>内部</div>
                    )}
                    <div className="article-stats" style={{ marginTop: '8px', fontSize: '12px', color: '#999', display: 'flex', gap: '12px' }}>
                      <span>👁️ {item.view_count}</span>
                    </div>
                    <div className="read-more">{item.status === 'draft' ? '编辑' : '查看全文'} →</div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="tag-row">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {!listLoading && articles.length > 0 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || listLoading}
            >
              ← 上一页
            </button>
            <span className="pagination-info">第 {page} / {totalPages} 页</span>
            <button
              className="pagination-btn"
              onClick={() => setPage((p) => (p >= totalPages ? p : p + 1))}
              disabled={page >= totalPages || listLoading}
            >
              下一页 →
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default BlackboardPage
