import React from 'react';
import './ServingSection.css';

export const DataFactoryServing: React.FC = () => {
  const servingCards = [
    {
      icon: '🔍',
      title: '语义检索',
      description: '实体、地址、事件一体化检索，统一入口快速定位'
    },
    {
      icon: '🔗',
      title: '关系联查',
      description: '地址-事件-对象-规则联查，关系网络一键探索'
    },
    {
      icon: '📸',
      title: '视觉位置搜索',
      description: '通过标注过程生产的图片与打标，形成可回溯的位置语料库'
    },
    {
      icon: '⚡',
      title: '服务化接口',
      description: '为调度、运营、监管、分析和 Agent 提供标准化 API'
    }
  ];

  return (
    <section id="serving" className="df-serving">
      <div className="df-serving-container">
        <h2 className="df-section-title">统一搜索与 Agent 服务输出</h2>
        
        <div className="df-serving-grid">
          {servingCards.map((card, index) => (
            <div key={index} className="df-serving-card">
              <div className="df-serving-icon">{card.icon}</div>
              <h3 className="df-serving-card-title">{card.title}</h3>
              <p className="df-serving-card-description">{card.description}</p>
            </div>
          ))}
        </div>
        
        <div className="df-serving-note">
          <div className="df-serving-note-icon">💡</div>
          <p className="df-serving-note-text">
            <strong>一次生产，多端复用。</strong>
            所有成果进入统一资产库，通过检索与 API 对外服务。
            无论是实时查询、批量分析、策略调用，还是业务系统集成，都能快速响应。
          </p>
        </div>
      </div>
    </section>
  );
};
