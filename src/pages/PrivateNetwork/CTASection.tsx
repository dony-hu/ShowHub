import React from 'react';
import './CTASection.css';

export const PrivateNetworkCTA: React.FC = () => {
  return (
    <section className="pn-cta">
      <div className="pn-cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            体验丰图专网地图
          </h2>
          <p className="cta-description">
            为您的高安全场景提供最可信的地图与空间服务
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">获取解决方案</button>
            <button className="btn btn-secondary">联系销售团队</button>
          </div>
        </div>
        <div className="cta-highlights">
          <div className="highlight-item">
            <div className="highlight-number">100%</div>
            <p>数据安全保障</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">99.99%</div>
            <p>系统可用性</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">50+</div>
            <p>成功案例</p>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">24/7</div>
            <p>技术支持</p>
          </div>
        </div>
      </div>
    </section>
  );
};
