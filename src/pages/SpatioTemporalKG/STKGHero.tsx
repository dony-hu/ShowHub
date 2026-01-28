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
          <span>深入了解｜时空知识图谱</span>
        </div>
        
        <h1 className="stkg-hero-title">
          深入了解｜时空知识图谱
        </h1>
        <p className="stkg-hero-subtitle-en">
          Spatio-Temporal Knowledge Graph
        </p>
        <p className="stkg-hero-description">
          以真实空间实体为核心的世界建模方式，让机器理解世界、推理决策
        </p>
        
        <div className="stkg-hero-highlights">
          <div className="stkg-hero-highlight">
            <span className="highlight-label">实体优先</span>
            <span className="highlight-value">Entity-First</span>
          </div>
          <div className="stkg-hero-highlight">
            <span className="highlight-label">时间一等公民</span>
            <span className="highlight-value">Time as First-Class</span>
          </div>
          <div className="stkg-hero-highlight">
            <span className="highlight-label">关系可计算</span>
            <span className="highlight-value">Queryable & Reasonable</span>
          </div>
          <div className="stkg-hero-highlight">
            <span className="highlight-label">持续演化</span>
            <span className="highlight-value">Evolving</span>
          </div>
        </div>
      </div>
    </div>
  );
};
