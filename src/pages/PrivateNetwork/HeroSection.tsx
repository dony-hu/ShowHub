import React from 'react';
import './HeroSection.css';

export const PrivateNetworkHero: React.FC = () => {
  return (
    <section className="pn-hero">
      <div className="pn-hero-container">
        <div className="pn-hero-content">
          <h1 className="pn-hero-title">
            丰图<span className="highlight-word">专网地图</span>
          </h1>
          <p className="pn-hero-subtitle">
            专为高安全场景设计的地图与空间服务
          </p>
          <p className="pn-hero-description">
            面向公安、政务、军队等专网和内网环境。提供完整的地图与空间服务能力，<br/>
            在高安全、强合规环境下，确保空间能力可用、可控、可持续。
          </p>
          <div className="pn-hero-buttons">
            <button className="btn btn-primary">了解解决方案</button>
            <button className="btn btn-secondary">获取演示</button>
          </div>
        </div>
        <div className="pn-hero-visual">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};
