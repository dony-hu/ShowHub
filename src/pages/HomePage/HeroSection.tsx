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
            面向企业 Agent、城市 Agent 与行业决策系统的真实世界空间智能基础设施
          </p>
          
          <div className="hero-vision">
            <h2 className="vision-text">让 Agent 看懂地图、调用工具、验证事实、完成决策</h2>
          </div>
          
          <div className="hero-keywords">
            <span>Agent-ready Spatial Intelligence</span>
            <span>·</span>
            <span>真实世界数据</span>
            <span>·</span>
            <span>时空世界模型</span>
            <span>·</span>
            <span>空间工具平台</span>
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
