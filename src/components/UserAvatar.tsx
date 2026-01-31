import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import './UserAvatar.css'

const UserAvatar: React.FC = () => {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  if (!user) return null

  // 生成随机背景色（基于用户邮箱）
  const getColorFromEmail = (email: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
      '#F8B739', '#52B788', '#E76F51', '#2A9D8F'
    ]
    const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  // 获取首字母
  const getInitial = () => {
    if (user.nickname) return user.nickname.charAt(0).toUpperCase()
    if (user.email) return user.email.charAt(0).toUpperCase()
    return '?'
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
    window.location.reload()
  }

  const handleChangePassword = () => {
    navigate('/reset-password')
    setShowMenu(false)
  }

  const handleChangeAvatar = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !user.id) return

      try {
        // 这里需要实现头像上传逻辑
        // 暂时提示用户功能开发中
        alert('头像上传功能开发中')
      } catch (error) {
        console.error('上传头像失败:', error)
      }
    }
    input.click()
    setShowMenu(false)
  }

  const backgroundColor = getColorFromEmail(user.email || '')

  return (
    <div className="user-avatar-container" ref={menuRef}>
      <div 
        className="user-avatar"
        onClick={() => setShowMenu(!showMenu)}
      >
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.nickname || user.email} />
        ) : (
          <div 
            className="avatar-initial"
            style={{ backgroundColor }}
          >
            {getInitial()}
          </div>
        )}
      </div>

      {showMenu && (
        <div className="user-menu">
          <button className="user-menu-item" onClick={handleChangeAvatar}>
            <span className="menu-icon">📷</span>
            <span>修改头像</span>
          </button>
          <button className="user-menu-item" onClick={handleChangePassword}>
            <span className="menu-icon">🔑</span>
            <span>修改密码</span>
          </button>
          <div className="user-menu-divider"></div>
          <button className="user-menu-item danger" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span>退出登录</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
