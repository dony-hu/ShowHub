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
      title: '内网部署',
      icon: '🔐',
      description: '支持专网、内网、离线和隔离区部署，业务数据与模型能力都留在本地'
    },
    {
      title: '数据主权',
      icon: '🛡️',
      description: '数据存储、索引、检索和推理全链路可控，满足主权数据管理要求'
    },
    {
      title: '合规隔离',
      icon: '✅',
      description: '权限分域、审计留痕、网络隔离和访问控制一体化设计'
    },
    {
      title: '地址大模型',
      icon: '🧠',
      description: '理解非标地址、别名地址、语义地址和时态变更，成为本地语义引擎'
    },
    {
      title: '私域知识图谱',
      icon: '🕸️',
      description: '把地址、AOI、建筑、组织、事件与关系沉淀为可检索、可推理的图谱底座'
    },
    {
      title: '调度与应急 Agent',
      icon: '🚨',
      description: '面向指挥、调度、研判和应急联动场景，提供可编排的空间行动能力'
    }
  ];

  return (
    <section className="pn-features">
      <div className="pn-features-container">
        <h2 className="section-title">Agent 底座能力</h2>
        <p className="section-subtitle">
          为企业和政务 Agent 构建的私有空间智能底盘，覆盖部署、安全、语义、图谱和行动编排
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
