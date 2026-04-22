import React from 'react';
import './TechOverviewHero.css';

export const TechOverviewHero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="tech-overview-hero">
      <div className="hero-container">
        <div className="hero-header">
          <p className="hero-kicker">AI Era / Trusted Data Base</p>
          <h1 className="hero-title">数据工厂 × 时空知识图谱</h1>
          <p className="hero-tagline">
            把地图、地址、轨迹、事件和关系做成可信数据资产，让 AI 应用拥有可查询、可推理、可仿真的世界模型底座。
          </p>

          <div className="hero-metrics">
            <div className="hero-metric">
              <span className="metric-value">可信</span>
              <span className="metric-label">接入与治理</span>
            </div>
            <div className="hero-metric">
              <span className="metric-value">语义</span>
              <span className="metric-label">地址与实体</span>
            </div>
            <div className="hero-metric">
              <span className="metric-value">推理</span>
              <span className="metric-label">关系与事件</span>
            </div>
            <div className="hero-metric">
              <span className="metric-value">闭环</span>
              <span className="metric-label">仿真与决策</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="hero-button primary" onClick={() => scrollToSection('data-factory-section')}>
              <span>🏭</span>
              <span>看数据工厂</span>
            </button>
            <button className="hero-button secondary" onClick={() => scrollToSection('knowledge-graph-section')}>
              <span>🧠</span>
              <span>看图谱底座</span>
            </button>
          </div>
        </div>

        <div className="tech-cards">
          <div className="tech-card factory-card">
            <div className="card-icon">🏭</div>
            <h3 className="card-title">可信数据工厂</h3>
            <p className="card-lead">持续接入、自动治理、人工兜底，把原始数据变成可复用资产。</p>
            <ul className="capability-list">
              <li>多源接入与质量守门</li>
              <li>语义地址、空间实体、业务标签生产</li>
              <li>全链路血缘、版本与审计</li>
            </ul>
            <button className="card-button" onClick={() => scrollToSection('data-factory-section')}>
              深入数据工厂
            </button>
          </div>

          <div className="tech-card graph-card">
            <div className="card-icon">🧠</div>
            <h3 className="card-title">时空知识图谱</h3>
            <p className="card-lead">把地址、事件、关系和状态组织成可计算的世界模型。</p>
            <ul className="capability-list">
              <li>语义地址对齐与实体融合</li>
              <li>动态事件建模与关系推理</li>
              <li>面向 AI 应用的仿真与决策调用</li>
            </ul>
            <button className="card-button" onClick={() => scrollToSection('knowledge-graph-section')}>
              深入图谱底座
            </button>
          </div>
        </div>

        <div className="synergy-banner">
          <div className="synergy-icon">⚡</div>
          <div className="synergy-text">
            <strong>双轮协同：</strong>数据工厂负责把世界采准、采全、采新；知识图谱负责把世界连起来、推起来、跑起来。
          </div>
        </div>
      </div>
    </section>
  );
};
