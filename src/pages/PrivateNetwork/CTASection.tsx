import React from 'react';
import './CTASection.css';

export const PrivateNetworkCTA: React.FC = () => {
  return (
    <section className="pn-cta">
      <div className="pn-cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            让专网地图成为你的私有空间智能底座
          </h2>
          <p className="cta-description">
            把地图、地址、图谱和调度能力放进你的内网，让业务系统和智能应用都能放心调用
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">获取方案</button>
            <button className="btn btn-secondary">联系团队</button>
          </div>
        </div>
        <div className="cta-highlights">
          <div className="highlight-item">
            <div className="highlight-number">内网</div>
            <p>部署可控</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">主权</div>
            <p>数据可管</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">图谱</div>
            <p>语义可追</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">AI</div>
            <p>行动可编排</p>
          </div>
        </div>
      </div>
    </section>
  );
};
