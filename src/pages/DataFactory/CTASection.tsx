import React from 'react';
import './CTASection.css';

export const DataFactoryCTA: React.FC = () => {
  return (
    <section id="cta" className="df-cta">
      <div className="df-cta-container">
        <h2 className="df-cta-title">需要接入你的数据源或落地某个场景？</h2>
        <p className="df-cta-description">
          支持从单场景MVP起步，逐步扩展多源融合与统一资产沉淀。<br/>
          无论是地图更新、行业应用，还是智能决策，我们都能提供完整的解决方案。
        </p>
        
        <div className="df-cta-buttons">
          <a 
            href="https://lbs.sfmap.com.cn/demo/data-factory" 
            target="_blank" 
            rel="noopener noreferrer"
            className="df-cta-btn df-cta-btn-primary"
          >
            预约产品演示
          </a>
          <a 
            href="https://lbs.sfmap.com.cn/contact/sales" 
            target="_blank" 
            rel="noopener noreferrer"
            className="df-cta-btn df-cta-btn-secondary"
          >
            咨询合作
          </a>
        </div>
        
        <div className="df-cta-highlights">
          <div className="df-cta-highlight">
            <div className="df-cta-highlight-number">5+</div>
            <div className="df-cta-highlight-label">业务场景</div>
          </div>
          <div className="df-cta-highlight">
            <div className="df-cta-highlight-number">10+</div>
            <div className="df-cta-highlight-label">数据源类型</div>
          </div>
          <div className="df-cta-highlight">
            <div className="df-cta-highlight-number">99%</div>
            <div className="df-cta-highlight-label">自动化率</div>
          </div>
        </div>
      </div>
    </section>
  );
};
