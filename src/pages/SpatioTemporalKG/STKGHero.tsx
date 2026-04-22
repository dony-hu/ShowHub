import React from 'react';
import './STKGHero.css';

export const STKGHero: React.FC = () => {
  return (
    <div className="stkg-hero">
      <div className="stkg-hero-content">
        <div className="stkg-breadcrumb">
          <a href="/">首页</a>
          <span>/</span>
          <a href="/data-factory">核心技术</a>
          <span>/</span>
          <span>时空知识图谱</span>
        </div>

        <p className="stkg-kicker">AI Spatial World Model</p>
        <h1 className="stkg-hero-title">时空知识图谱</h1>
        <p className="stkg-hero-subtitle-en">Spatio-Temporal Knowledge Graph</p>
        <p className="stkg-hero-description">
          用语义地址锚定空间实体，用动态事件描述世界变化，用关系网络支撑推理与仿真，让 AI 应用真正理解现实世界。
        </p>

        <div className="stkg-hero-highlights">
          <div className="stkg-hero-highlight">
            <span className="highlight-label">语义地址</span>
            <span className="highlight-value">Address as Anchor</span>
          </div>
          <div className="stkg-hero-highlight">
            <span className="highlight-label">动态事件</span>
            <span className="highlight-value">Events as Change</span>
          </div>
          <div className="stkg-hero-highlight">
            <span className="highlight-label">关系推理</span>
            <span className="highlight-value">Reasonable Graph</span>
          </div>
          <div className="stkg-hero-highlight">
            <span className="highlight-label">仿真闭环</span>
            <span className="highlight-value">Plan, Act, Learn</span>
          </div>
        </div>
      </div>
    </div>
  );
};
