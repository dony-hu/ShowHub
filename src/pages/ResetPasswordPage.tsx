import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../services/supabase'
import './ArticleEditorPage.css'

// 简单复用编辑样式，快速上线
const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRecoveryMode, setIsRecoveryMode] = useState(false)

  // 当通过邮件链接跳转回 /reset-password?type=recovery 时，Supabase 会自动创建恢复 session
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type')
    if (type === 'recovery') {
      setIsRecoveryMode(true)
    }
  }, [location.search])

  const handleSendEmail = async () => {
    setError(null)
    setMessage(null)
    if (!email) {
      setError('请输入邮箱')
      return
    }
    setLoading(true)
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      setMessage('重置邮件已发送，请检查邮箱（若未收到请查看垃圾箱）')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setError(null)
    setMessage(null)
    if (!password || !confirmPassword) {
      setError('请输入并确认新密码')
      return
    }
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }
    setLoading(true)
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) throw updateError
      setMessage('密码重置成功，正在跳转登录')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-glow" aria-hidden />
        <button className="login-close" onClick={() => navigate(-1)}>✕</button>
        <div className="login-body">
          <div className="login-header">
            <div>
              <p className="eyebrow">账户安全 · 密码重置</p>
              <h1>{isRecoveryMode ? '设置新密码' : '通过邮箱找回密码'}</h1>
              <p className="login-subtitle">
                {isRecoveryMode
                  ? '请输入新密码并确认'
                  : '输入注册邮箱，我们将发送重置链接到邮箱'}
              </p>
            </div>
          </div>

          {error && <div className="login-error"><div className="login-error-text">{error}</div></div>}
          {message && <div className="login-success" style={{ marginBottom: '12px' }}>{message}</div>}

          {!isRecoveryMode ? (
            <div className="editor-form login-form">
              <div className="form-group floating">
                <label>注册邮箱</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@sf-express.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary glow" disabled={loading} onClick={handleSendEmail}>
                {loading ? '发送中...' : '发送重置邮件'}
              </button>
              <p className="login-footnote">将发送带有重置链接的邮件，点击后回到此页面设置新密码。</p>
            </div>
          ) : (
            <div className="editor-form login-form">
              <div className="form-group floating">
                <label>新密码</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="至少 6 位"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group floating">
                <label>确认新密码</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="请再次输入新密码"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary glow" disabled={loading} onClick={handleResetPassword}>
                {loading ? '重置中...' : '确认重置'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
