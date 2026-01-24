import React from 'react';
import './HeroSection.css';

export const DataFactoryHero: React.FC = () => {
  return (
    <section className="df-hero">
      <div className="df-hero-container">
        <div className="df-hero-content">
          <h1 className="df-hero-title">
            <span className="df-hero-badge">Spatial Intelligence Data Factory</span>
            <span className="df-hero-title-main">空间智能数据工厂</span>
          </h1>
          <p className="df-hero-subtitle">
            面向多源、多场景的空间数据接入、治理、融合与持续生产平台
          </p>
          
          <ul className="df-hero-value-points">
            <li>
              <span className="df-hero-icon">🎯</span>
              以空间实体为核心的统一数据组织
            </li>
            <li>
              <span className="df-hero-icon">🔄</span>
              多源数据驱动的持续更新机制
            </li>
            <li>
              <span className="df-hero-icon">🤖</span>
              自动化为主、人工协同兜底
            </li>
            <li>
              <span className="df-hero-icon">🚀</span>
              一次生产，多场景复用与服务化输出
            </li>
          </ul>
          
          <div className="df-hero-cta">
            <a href="#use-cases" className="df-hero-btn df-hero-btn-primary">
              查看场景能力
            </a>
            <a href="#cta" className="df-hero-btn df-hero-btn-secondary">
              对接与试用
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
