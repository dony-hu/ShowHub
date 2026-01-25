import React from 'react';
import './CompanyProfileSection.css';

export const CompanyProfileSection: React.FC = () => {
  const features = [
    {
      title: '来自真实世界运行',
      description: '数据源自顺丰物流真实业务流程，而非模拟或一次性采集。'
    },
    {
      title: '持续更新与验证',
      description: '数据在实际运营中被反复使用、校验与修正，保持长期有效。'
    },
    {
      title: '面向决策而非展示',
      description: '关注"如何支持业务决策"，而不仅是地图呈现。'
    }
  ];

  return (
    <section className="company-profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <h2>我们是谁</h2>
          <p className="section-subtitle">公司整体介绍</p>
        </div>

        <div className="profile-description">
          <p>丰图科技是一家专注于空间智能与位置决策的科技公司。</p>
          <p>依托顺丰物流覆盖全国、持续运行的真实业务场景，</p>
          <p>长期沉淀高质量、可验证、可持续更新的时空数据资产，</p>
          <p>为物流、城市治理及行业客户提供可靠的位置智能服务与决策支持。</p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyProfileSection;
