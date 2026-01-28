import React from 'react';
import './EngineeringPath.css';

export const EngineeringPath: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: '多源时空数据接入',
      subtitle: 'Multi-Source Data Integration',
      description: '物流/行业/设备/影像/街景/三维数据接入',
      challenge: '关键挑战：不同来源如何对齐到同一真实世界'
    },
    {
      number: '02',
      title: '空间实体建模',
      subtitle: 'Entity-First Modeling',
      description: '构建跨系统、跨时间一致的实体标识体系',
      challenge: '确保同一实体在不同系统中具有统一标识'
    },
    {
      number: '03',
      title: '时序关系构建',
      subtitle: 'Temporal Relationship Building',
      description: '行为/事件/变化成为可查询可推理关系链',
      challenge: '时空一致性约束与多维度关系建模'
    },
    {
      number: '04',
      title: '持续更新与演化',
      subtitle: 'Continuous Evolution',
      description: '新数据触发实体状态变化，而非简单覆盖',
      challenge: 'AI 推理 + 规则约束实现自动化演化'
    }
  ];
  
  return (
    <section className="stkg-section engineering-path-section">
      <div className="path-header">
        <span className="stkg-en-label">Engineering the Graph</span>
        <h2 className="stkg-section-title">从多源数据到统一世界模型</h2>
        <p className="stkg-section-subtitle">丰图的技术路线</p>
      </div>
      
      <div className="path-timeline">
        {steps.map((step, index) => (
          <div key={index} className="path-step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-subtitle">{step.subtitle}</p>
              <p className="step-description">{step.description}</p>
              <div className="step-challenge">
                <span className="challenge-icon">⚠️</span>
                <span className="challenge-text">{step.challenge}</span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="step-connector"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
