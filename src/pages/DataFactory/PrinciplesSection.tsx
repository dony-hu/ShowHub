import React from 'react';
import './PrinciplesSection.css';

export const DataFactoryPrinciples: React.FC = () => {
  const principles = [
    {
      icon: '🛡️',
      title: '可信优先',
      description: '所有数据先过质量与权限门，保证 AI 应用看到的是可用、可追溯的真实世界。'
    },
    {
      icon: '🏷️',
      title: '语义地址优先',
      description: '地址不是字符串，而是可绑定坐标、POI、区域、画像和事件的语义锚点。'
    },
    {
      icon: '🧭',
      title: '实体与事件并重',
      description: '静态实体定义世界的骨架，动态事件定义世界的变化，二者共同构成时空状态。'
    },
    {
      icon: '♻️',
      title: '闭环演化',
      description: '模型、规则和人工反馈共同参与回流，让图谱和数据工厂持续迭代。'
    }
  ];

  return (
    <section id="principles" className="df-principles">
      <div className="df-principles-container">
        <h2 className="df-section-title">AI 时代的数据生产原则</h2>
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
