import React from 'react';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-logo">
          <h1 className="logo-text">丰图</h1>
          <p className="logo-subtitle">空间智能基础设施</p>
        </div>
        
        <div className="hero-content">
          <div className="hero-taglines">
            <h2 className="tagline primary-tagline">构建面向真实世界的空间智能底座</h2>
            <p className="tagline-subtitle">支撑跨行业的位置智能决策</p>
          </div>
          
          <p className="hero-description">
            从空间数据生产，到位置智能决策的全链路平台体系
          </p>
          
          <div className="hero-cta">
            <button className="btn btn-primary">了解产品</button>
            <button className="btn btn-secondary">联系我们</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
