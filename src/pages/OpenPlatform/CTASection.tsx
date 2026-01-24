import React from 'react';
import './CTASection.css';

export const OpenPlatformCTA: React.FC = () => {
  return (
    <section className="op-cta">
      <div className="op-cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            开始使用丰图开放平台
          </h2>
          <p className="cta-description">
            让空间能力成为您的核心竞争力
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">立即开始</button>
            <button className="btn btn-secondary">咨询销售</button>
          </div>
        </div>
        <div className="cta-features">
          <div className="feature-item">
            <div className="feature-number">99.9%</div>
            <p>可用性保证</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">&lt;100ms</div>
            <p>平均响应时间</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">6+</div>
            <p>能力类别</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">10k+</div>
            <p>开发者已使用</p>
          </div>
        </div>
      </div>
    </section>
  );
};
