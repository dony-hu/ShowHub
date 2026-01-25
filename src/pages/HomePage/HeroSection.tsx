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
        <div className="hero-content">
          <h1 className="hero-title">丰图科技</h1>
          
          <p className="hero-tagline">
            以真实物流世界为起点，构建可信的空间数据与位置智能决策基础设施
          </p>
          
          <div className="hero-vision">
            <h2 className="vision-text">让数据更可信，让决策更智能</h2>
          </div>
          
          <div className="hero-keywords">
            <span>空间智能</span>
            <span>·</span>
            <span>位置服务</span>
            <span>·</span>
            <span>决策支持</span>
            <span>·</span>
            <span>真实世界数据</span>
          </div>
          
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
