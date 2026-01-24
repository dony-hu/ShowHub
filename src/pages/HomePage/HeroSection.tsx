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
            <h2 className="tagline primary-tagline">让数据更可信</h2>
            <h2 className="tagline secondary-tagline">让决策更智能</h2>
          </div>
          
          <p className="hero-description">
            在城市运行、物流调度、公共治理与产业发展中，空间数据是所有决策的基础。
            但现实中，数据碎片化、质量不可控、生产链路不透明，导致"有数据，却不敢用；能分析，却难落地"。
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
