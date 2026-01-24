import React from 'react';
import './FeaturesSection.css';

interface Feature {
  title: string;
  icon: string;
  description: string;
}

export const PrivateNetworkFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      title: '专网部署',
      icon: '🔐',
      description: '支持完全离线、专网、内网部署，数据不出场景'
    },
    {
      title: '高可靠性',
      icon: '⚙️',
      description: '99.99% 可用性保证，支持多机房容错'
    },
    {
      title: '安全合规',
      icon: '✅',
      description: '符合等级保护、数据安全法等合规要求'
    },
    {
      title: '国产适配',
      icon: '🇨🇳',
      description: '完全适配国产操作系统和数据库'
    },
    {
      title: '完整能力',
      icon: '🗺️',
      description: '地图、地址、分析、搜索等全系列空间服务'
    },
    {
      title: '专业支持',
      icon: '🤝',
      description: '专业的部署和运维团队，24/7 技术支持'
    }
  ];

  return (
    <section className="pn-features">
      <div className="pn-features-container">
        <h2 className="section-title">产品优势</h2>
        <p className="section-subtitle">
          为高安全场景量身定制的地图与空间服务
        </p>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
