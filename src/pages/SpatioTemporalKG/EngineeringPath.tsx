import React from 'react';
import './EngineeringPath.css';

export const EngineeringPath: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: '语义地址归一',
      subtitle: 'Semantic Address Resolution',
      description: '把地址、POI、区域、别名和坐标绑成同一个空间锚点。',
      challenge: '关键挑战：同一地点在不同系统里往往有不同写法和坐标。'
    },
    {
      number: '02',
      title: '动态事件建模',
      subtitle: 'Event Modeling',
      description: '把拥堵、异常、变更、签收和调度抽象为时间线上的状态变化。',
      challenge: '关键挑战：让事件既能回放历史，也能驱动当前状态更新。'
    },
    {
      number: '03',
      title: '关系推理与传播',
      subtitle: 'Reasoning Graph',
      description: '围绕实体、事件和约束构建多跳关系网络，输出影响链路和解释。',
      challenge: '关键挑战：在规模、时效和可解释性之间保持平衡。'
    },
    {
      number: '04',
      title: '仿真与决策闭环',
      subtitle: 'Simulate, Act, Learn',
      description: '把候选动作放进世界模型试跑，再把结果回流到数据工厂和策略层。',
      challenge: '关键挑战：让推理结果真正变成可执行动作与持续学习信号。'
    }
  ];

  return (
    <section className="stkg-section engineering-path-section">
      <div className="path-header">
        <span className="stkg-en-label">Engineering the Graph</span>
        <h2 className="stkg-section-title">从多源数据到可推理世界模型</h2>
        <p className="stkg-section-subtitle">语义地址、动态事件、关系推理与决策闭环一起工作</p>
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
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};
