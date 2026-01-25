import React, { useState } from 'react'
import './SolutionsMenu.css'

export const SolutionsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  let closeTimeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const solutions = [
    { name: '路线规划', icon: '🛣️' },
    { name: '地址匹配', icon: '📍' },
    { name: '区域分析', icon: '📊' },
    { name: '业务管理', icon: '📋' },
    { name: '动态配送', icon: '🚗' },
    { name: '位置智能', icon: '🧠' }
  ]

  return (
    <div 
      className="solutions-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="menu-trigger">解决方案</button>
      
      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-section">
            <h4 className="menu-title">场景方案</h4>
            <div className="solutions-grid">
              {solutions.map((solution) => (
                <div key={solution.name} className="solution-item">
                  <span className="icon">{solution.icon}</span>
                  <span className="name">{solution.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolutionsMenu
