import React from 'react';
import './FeaturesSection.css';

interface Feature {
  title: string;
  icon: string;
  description: string;
}

export const OpenPlatformFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      title: '标准化 API',
      icon: '🔌',
      description: '提供统一的空间数据查询、分析、展示等标准化接口，降低集成成本'
    },
    {
      title: '高效可靠',
      icon: '⚡',
      description: '毫秒级响应时间，99.9% 可用性，支持大规模并发请求'
    },
    {
      title: '灵活组合',
      icon: '🧩',
      description: '地图、地址、分析、搜索等能力自由组合，快速构建定制化应用'
    },
    {
      title: '完整文档',
      icon: '📚',
      description: '详细的 API 文档、示例代码和最佳实践指南，开发者友好'
    },
    {
      title: '实时监控',
      icon: '📊',
      description: '完整的调用统计、性能监控、告警机制，确保应用稳定运行'
    },
    {
      title: '安全认证',
      icon: '🔐',
      description: '多层安全认证、速率限制、数据加密，保护业务和数据安全'
    }
  ];

  return (
    <section className="op-features">
      <div className="op-features-container">
        <h2 className="section-title">核心特性</h2>
        <p className="section-subtitle">
          为开发者和企业提供最强大的空间能力开放体验
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
