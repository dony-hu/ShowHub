import React from 'react';
import './CTASection.css';

export const CTASection: React.FC = () => {
  return (
    <section className="stkg-section cta-section">
      <div className="cta-content">
        <span className="stkg-en-label">Built for Co-Creation</span>
        <h2 className="cta-title">开放共建，持续进化</h2>

        <div className="cta-text-content">
          <p className="cta-paragraph">
            时空知识图谱的价值不在于一次性交付，而在于持续积累、持续纠偏和持续回流。
          </p>
          <p className="cta-paragraph">
            我们期待和行业伙伴一起把语义地址、动态事件和关系推理做成可复用的世界模型能力，让 AI 应用在真实业务里稳稳地跑起来。
          </p>
        </div>

        <div className="cta-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">🧩</span>
            <span className="benefit-text">行业数据共建</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🛠️</span>
            <span className="benefit-text">能力持续扩展</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔁</span>
            <span className="benefit-text">闭环迭代学习</span>
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
          <p className="closing-text">让机器理解世界，也让世界持续喂养机器的理解。</p>
        </div>
      </div>
    </section>
  );
};
