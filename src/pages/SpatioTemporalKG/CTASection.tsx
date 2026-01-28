import React from 'react';
import './CTASection.css';

export const CTASection: React.FC = () => {
  return (
    <section className="stkg-section cta-section">
      <div className="cta-content">
        <span className="stkg-en-label">Built for Co-Creation</span>
        <h2 className="cta-title">开放与共建</h2>
        
        <div className="cta-text-content">
          <p className="cta-paragraph">
            时空知识图谱的价值在于持续积累与多方共建。它适合行业数据共建、多方协同、场景能力扩展。
          </p>
          <p className="cta-paragraph">
            我们提供技术底座与工程能力，期待与行业伙伴共同构建真实世界的机器可理解模型，
            让空间智能真正服务于无人系统与智能决策。
          </p>
        </div>
        
        <div className="cta-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">🤝</span>
            <span className="benefit-text">行业数据共建</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔧</span>
            <span className="benefit-text">场景能力扩展</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🌐</span>
            <span className="benefit-text">多方协同</span>
          </div>
        </div>
        
        <div className="cta-buttons">
          <a href="/improvement" className="stkg-button primary">
            联系合作
          </a>
          <a href="/data-factory" className="stkg-button secondary">
            返回核心技术
          </a>
        </div>
        
        <div className="cta-closing">
          <p className="closing-text">
            欢迎共建真实世界的机器可理解模型
          </p>
        </div>
      </div>
    </section>
  );
};
