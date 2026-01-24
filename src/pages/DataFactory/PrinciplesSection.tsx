import React from 'react';
import './PrinciplesSection.css';

export const DataFactoryPrinciples: React.FC = () => {
  const principles = [
    {
      icon: '🎯',
      title: '以空间实体为核心的数据组织方式',
      description: '建筑、店铺、设施部件、道路要素、交叉口、摄像头、事件发生点等空间实体作为数据组织的核心单元'
    },
    {
      icon: '🔄',
      title: '多源数据驱动的持续更新机制',
      description: '实时/准实时接入多源数据，通过融合计算推动资产的动态更新与演化'
    },
    {
      icon: '🤝',
      title: '自动化为主、人工兜底的治理体系',
      description: '不确定或冲突情况自动流转至标注平台，引入人工判断形成闭环治理'
    },
    {
      icon: '♻️',
      title: '一次生产，多场景复用',
      description: '标准化资产沉淀后，可被搜索、分析、运营等多个系统灵活调用'
    }
  ];

  return (
    <section id="principles" className="df-principles">
      <div className="df-principles-container">
        <h2 className="df-section-title">核心设计理念</h2>
        
        <div className="df-principles-grid">
          {principles.map((principle, index) => (
            <div key={index} className="df-principle-card">
              <div className="df-principle-icon">{principle.icon}</div>
              <h3 className="df-principle-title">{principle.title}</h3>
              <p className="df-principle-description">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
