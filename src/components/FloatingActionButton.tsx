import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FloatingActionButton.css'

interface FloatingActionButtonProps {
  onClick?: () => void
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate('/editor')
    }
  }

  return (
    <button
      className={`fab ${isHovered ? 'fab-expanded' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="我要分享"
    >
      <span className="fab-icon">✏️</span>
      {isHovered && <span className="fab-text">我要分享</span>}
    </button>
  )
}

export default FloatingActionButton
