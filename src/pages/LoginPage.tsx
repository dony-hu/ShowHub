import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase, uploadService } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import './ArticleEditorPage.css'

// 复用编辑器的基础样式，避免额外 CSS

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { refreshUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [codeSending, setCodeSending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const from = (location.state as { from?: string } | null)?.from || '/blackboard'

  const handleSendCode = async () => {
    setError(null)
    if (!email) {
      setError('请先填写邮箱再获取验证码')
      return
    }

    try {
      setCodeSending(true)
      await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true
        }
      })
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      console.error('发送验证码失败:', err)
      setError((err as Error).message || '验证码发送失败，请稍后再试')
    } finally {
      setCodeSending(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('邮箱和密码不能为空')
      return
    }

    console.log('@@@ LoginPage: 开始登录流程, mode:', mode, 'email:', email);
    setLoading(true)
    try {
      if (mode === 'login') {
        console.log('@@@ LoginPage: 调用 signInWithPassword...');
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        console.log('@@@ LoginPage: signInWithPassword 返回, error:', signInError);
        if (signInError) throw signInError
      } else {
        if (!code) {
          setError('请填写邮箱验证码')
          return
        }

        console.log('@@@ LoginPage: 验证邮箱验证码...');
        const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token: code,
          type: 'email'
        })
        console.log('@@@ LoginPage: verifyOtp 返回, error:', verifyError);
        if (verifyError || !verifyData.session) throw verifyError || new Error('验证失败')

        // 设置密码
        const { error: setPwdError } = await supabase.auth.updateUser({ password })
        if (setPwdError) throw setPwdError

        const userId = verifyData.session.user.id
        // 如果有头像，上传并更新用户档案
        if (userId) {
          try {
            let avatarUrl: string | undefined = undefined
            if (avatarFile) {
              const uploaded = await uploadService.uploadAvatar(avatarFile, userId)
              avatarUrl = uploaded.url
            }

            await supabase.from('users').upsert({
              id: userId,
              email,
              nickname: email.split('@')[0] || '新用户',
              avatar_url: avatarUrl,
              role: 'user',
              is_verified: true
            })

            // 同步到 auth metadata
            await supabase.auth.updateUser({
              data: {
                avatar_url: avatarUrl,
                nickname: email.split('@')[0] || '新用户'
              }
            })
          } catch (uploadErr) {
            console.error('头像上传失败:', uploadErr)
            setError('头像上传失败，请稍后重试')
          }
        }
      }

      console.log('@@@ LoginPage: 登录成功，准备跳转到:', from);
      console.log('@@@ LoginPage: 调用 navigate...');
      navigate(from, { replace: true });
      console.log('@@@ LoginPage: navigate 调用完成');
      
      // 后台刷新用户信息
      console.log('@@@ LoginPage: 后台调用 refreshUser');
      refreshUser().catch(err => {
        console.error('@@@ LoginPage: 后台刷新用户失败:', err);
      });
    } catch (err) {
      console.error('登录失败:', err);
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const friendlyError = (msg: string) => {
    if (!msg) return ''
    if (msg.toLowerCase().includes('invalid login credentials')) {
      return '邮箱或密码不正确，或账号尚未注册'
    }
    return msg
  }

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-glow" aria-hidden />
        <button className="login-close" onClick={() => navigate(-1)}>✕</button>
        <div className="login-body">
          <div className="login-header">
            <div>
              <p className="eyebrow">Welcome back · 丰图</p>
              <h1>{mode === 'login' ? '登录账号' : '注册新账号'}</h1>
              <p className="login-subtitle">{mode === 'login' ? '输入邮箱与密码即可进入' : '创建账号，上传头像，让团队认识你'}</p>
            </div>
          </div>

          {error && (
            <div className="login-error">
              <div className="login-error-text">{friendlyError(error)}</div>
              {mode === 'login' && (
                <div className="login-error-actions">
                  <span>还没有账号？</span>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setMode('signup')
                      setError(null)
                    }}
                  >
                    去注册
                  </button>
                </div>
              )}
            </div>
          )}

          <form className="editor-form login-form" onSubmit={handleSubmit}>
            <div className="form-group floating">
              <label>邮箱</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group floating">
              <label>密码</label>
              <input
                type="password"
                className="form-input"
                placeholder="至少 6 位"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {mode === 'signup' && (
              <div className="form-group floating">
                <label>邮箱验证码</label>
                <div className="code-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="请输入 6 位验证码"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={handleSendCode}
                    disabled={codeSending || countdown > 0}
                  >
                    {codeSending ? '发送中...' : countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="form-group floating">
                <label>头像（可选）</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={e => setAvatarFile(e.target.files?.[0] || null)}
                />
                {avatarFile && (
                  <div className="avatar-preview">已选择：{avatarFile.name}</div>
                )}
              </div>
            )}

            <button type="submit" className="btn btn-primary glow" disabled={loading}>
              {loading ? '处理中...' : mode === 'login' ? '立即登录' : '注册并登录'}
            </button>
            <p className="login-footnote">登录即表示同意《用户协议》与《隐私政策》</p>
          </form>

          <div className="login-switch">
            {mode === 'login' ? '没有账号？' : '已有账号？'}
            <button
              type="button"
              className="link-button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? '去注册' : '去登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage