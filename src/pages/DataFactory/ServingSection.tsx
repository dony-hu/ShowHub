import React from 'react';
import './ServingSection.css';

export const DataFactoryServing: React.FC = () => {
  const servingCards = [
    {
      icon: '🔍',
      title: '统一地图搜索',
      description: '实体、地址、事件一体化检索，统一入口快速查找'
    },
    {
      icon: '🔗',
      title: '一键关联查询',
      description: '摄像头-对象-地址-事件联查，关系网络一键探索'
    },
    {
      icon: '📸',
      title: '视觉位置搜索',
      description: '通过标注过程生产的图片，以及标注过程对图片的打标，形成图片位置语料库'
    },
    {
      icon: '⚡',
      title: '服务化接口',
      description: '为调度、运营、监管、分析系统提供标准化API'
    }
  ];

  return (
    <section id="serving" className="df-serving">
      <div className="df-serving-container">
        <h2 className="df-section-title">统一搜索与服务输出</h2>
        
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
            所有成果进入统一资产库，通过检索与API对外服务。
            无论是实时查询、批量分析，还是业务系统集成，都能快速响应。
          </p>
        </div>
      </div>
    </section>
  );
};
