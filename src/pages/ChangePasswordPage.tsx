import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import './ArticleEditorPage.css';

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // 未登录用户重定向到登录页
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/change-password' } });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // 验证输入
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('两次输入的新密码不一致');
      return;
    }

    if (newPassword.length < 6) {
      setError('新密码至少需要6个字符');
      return;
    }

    if (newPassword === currentPassword) {
      setError('新密码不能与当前密码相同');
      return;
    }

    setLoading(true);

    try {
      // 先验证当前密码
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });

      if (signInError) {
        throw new Error('当前密码错误');
      }

      // 更新密码
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // 3秒后跳转到黑板报
      setTimeout(() => {
        navigate('/blackboard');
      }, 3000);

    } catch (err) {
      setError((err as Error).message || '密码修改失败');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="article-detail-page">
      <div className="article-breadcrumb">
        <button className="btn-back" onClick={() => navigate('/blackboard')}>
          ← 返回黑板报
        </button>
      </div>

      <div className="article-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="article-header">
          <div className="header-content">
            <h1>修改密码</h1>
            <p className="summary">为了您的账号安全，请定期更换密码</p>
          </div>
        </div>

        <div className="article-content">
          {error && (
            <div className="editor-error" style={{ marginBottom: '20px' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ 
              background: '#d4edda', 
              border: '1px solid #c3e6cb', 
              color: '#155724',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              ✅ 密码修改成功！3秒后自动跳转...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="editor-form-group">
              <label className="editor-label">
                当前密码 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                className="editor-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="请输入当前密码"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <div className="editor-form-group">
              <label className="editor-label">
                新密码 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                className="editor-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="至少6个字符"
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div className="editor-form-group">
              <label className="editor-label">
                确认新密码 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                className="editor-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入新密码"
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/blackboard')}
                disabled={loading}
              >
                取消
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? '修改中...' : '确认修改'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
