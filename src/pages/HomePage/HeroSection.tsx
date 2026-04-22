import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">丰图科技</h1>
          
          <p className="hero-tagline">
            智能体时代的真实世界空间智能基础设施
          </p>
          
          <div className="hero-vision">
            <h2 className="vision-text">让 Agent 理解空间、验证事实、完成决策</h2>
          </div>
          
          <div className="hero-keywords">
            <span>Agent-ready Spatial Data</span>
            <span>·</span>
            <span>空间智能</span>
            <span>·</span>
            <span>时空知识图谱</span>
            <span>·</span>
            <span>空间工具调用</span>
            <span>·</span>
            <span>可信决策闭环</span>
          </div>
          
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => navigate('/agent-space-intelligence')}>查看 Agent 空间智能</button>
            <button className="btn btn-secondary" onClick={() => navigate('/milestone-2025')}>2025大事记</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
