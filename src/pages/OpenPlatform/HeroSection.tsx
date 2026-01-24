import React from 'react';
import './HeroSection.css';

export const OpenPlatformHero: React.FC = () => {
  return (
    <section className="op-hero">
      <div className="op-hero-container">
        <div className="op-hero-content">
          <h1 className="op-hero-title">
            丰图<span className="highlight-word">开放平台</span>
          </h1>
          <p className="op-hero-subtitle">
            统一对外的空间能力开放入口
          </p>
          <p className="op-hero-description">
            让地图、地址、空间分析、搜索等空间能力像云服务一样可调用、可组合、可规模化使用。<br/>
            赋能企业与开发者快速构建位置智能应用。
          </p>
          <div className="op-hero-buttons">
            <button className="btn btn-primary">了解详情</button>
            <button className="btn btn-secondary">API 文档</button>
          </div>
        </div>
        <div className="op-hero-visual">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};
