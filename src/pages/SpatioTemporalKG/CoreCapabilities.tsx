import React from 'react';
import './CoreCapabilities.css';

export const CoreCapabilities: React.FC = () => {
  const capabilities = [
    {
      title: '空间实体统一标识体系',
      subtitle: 'Unified Entity Identification',
      points: [
        '跨业务/系统/数据源实体对齐',
        '保证长期一致性与稳定性',
        '支持实体合并与拆分'
      ]
    },
    {
      title: '时空一致性约束机制',
      subtitle: 'Spatio-Temporal Consistency',
      points: [
        '空间/时间/语义多重校验',
        '防止数据污染',
        '确保因果关系正确性'
      ]
    },
    {
      title: '自动化建图与更新能力',
      subtitle: 'Automated Graph Construction',
      points: [
        'AI 推理 + 规则约束',
        '降低人工维护成本',
        '支持高频更新'
      ]
    },
    {
      title: '图查询与推理能力',
      subtitle: 'Query & Reasoning',
      points: [
        '发生了什么（历史查询）',
        '正在发生什么（实时状态）',
        '可能发生什么（预测推理）'
      ]
    }
  ];
  
  return (
    <section className="stkg-section core-capabilities-section">
      <div className="capabilities-header">
        <span className="stkg-en-label">Core Capabilities</span>
        <h2 className="stkg-section-title">核心技术能力拆解</h2>
        <p className="stkg-section-subtitle">工程层视角</p>
      </div>
      
      <div className="capabilities-grid">
        {capabilities.map((capability, index) => (
          <div key={index} className="capability-card">
            <h3 className="capability-title">{capability.title}</h3>
            <p className="capability-subtitle">{capability.subtitle}</p>
            <ul className="capability-points">
              {capability.points.map((point, idx) => (
                <li key={idx} className="capability-point">
                  <span className="point-bullet">•</span>
                  <span className="point-text">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
