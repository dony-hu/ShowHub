import React from 'react';
import './HeroSection.css';

export const PrivateNetworkHero: React.FC = () => {
  return (
    <section className="pn-hero">
      <div className="pn-hero-container">
        <div className="pn-hero-content">
          <h1 className="pn-hero-title">
            丰图<span className="highlight-word">私有空间智能底座</span>
          </h1>
          <p className="pn-hero-subtitle">
            面向企业与政务内网的地图、地址与空间智能底盘
          </p>
          <p className="pn-hero-description">
            面向企业专网、政务内网和高安全隔离环境，提供可私有化落地的地图底座、地址大模型、私域知识图谱、调度与应急智能能力，<br />
            让空间能力在数据主权、合规隔离和长期可运营的前提下稳定运行。
          </p>
          <div className="pn-hero-pills" aria-label="核心能力">
            <span>内网部署</span>
            <span>数据主权</span>
            <span>合规隔离</span>
            <span>地址大模型</span>
          </div>
          <div className="pn-hero-buttons">
            <button className="btn btn-primary">查看底座能力</button>
            <button className="btn btn-secondary">了解部署方式</button>
          </div>
        </div>
        <div className="pn-hero-visual">
          <div className="hero-panel">
            <div className="hero-panel-row"><span>部署形态</span><strong>专网 / 内网 / 隔离区</strong></div>
            <div className="hero-panel-row"><span>核心引擎</span><strong>地址大模型 + 空间图谱</strong></div>
            <div className="hero-panel-row"><span>智能能力</span><strong>调度 / 研判 / 应急</strong></div>
          </div>
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};
