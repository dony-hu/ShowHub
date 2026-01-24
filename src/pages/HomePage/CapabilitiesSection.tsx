import React from 'react';
import './CapabilitiesSection.css';

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      id: 'data-factory',
      title: '空间智能数据工厂',
      description: '持续将多源真实世界数据转化为可治理、可学习、可复用的空间资产',
      icon: '🏭',
      keywords: [
        '多源空间数据接入',
        '空间实体与三维建模',
        '标注、治理与训练',
        '地图融合与资产沉淀'
      ],
      color: '#00d4ff'
    },
    {
      id: 'decision-platform',
      title: '位置智能决策平台',
      description: '将空间能力编排为可执行、可追溯的行业决策服务',
      icon: '🎯',
      keywords: [
        '空间搜索与分析',
        '路径与调度能力',
        '规则与流程编排',
        '决策触发与反馈'
      ],
      color: '#00f5ff'
    }
  ];

  return (
    <section className="capabilities-section">
      <div className="capabilities-container">
        <h2 className="section-title">平台核心能力</h2>
        <p className="section-subtitle">两层平台体系的能力矩阵</p>

        <div className="capabilities-grid">
          {capabilities.map((capability) => (
            <div key={capability.id} className="capability-card">
              <div className="capability-icon">{capability.icon}</div>
              <h3 className="capability-title">{capability.title}</h3>
              <p className="capability-description">{capability.description}</p>
              
              <div className="capability-keywords">
                {capability.keywords.map((keyword, idx) => (
                  <div key={idx} className="keyword-tag" style={{ borderColor: capability.color }}>
                    <span className="keyword-bullet" style={{ backgroundColor: capability.color }}></span>
                    {keyword}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
