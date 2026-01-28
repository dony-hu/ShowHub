import React from 'react';
import './STKGDefinition.css';

export const STKGDefinition: React.FC = () => {
  return (
    <section className="stkg-section definition-section">
      <div className="definition-header">
        <span className="stkg-en-label">What Is a Spatio-Temporal Knowledge Graph</span>
        <h2 className="stkg-section-title">以真实空间实体为核心的世界建模方式</h2>
        <p className="stkg-section-subtitle">工程视角的定义</p>
      </div>
      
      <div className="definition-principles">
        <div className="principle-card">
          <div className="principle-icon">🎯</div>
          <h3 className="principle-title">实体优先</h3>
          <p className="principle-subtitle">Entity-First</p>
          <p className="principle-text">以真实空间实体为组织核心，而非图层或表</p>
        </div>
        
        <div className="principle-card">
          <div className="principle-icon">⏰</div>
          <h3 className="principle-title">时间是一等公民</h3>
          <p className="principle-subtitle">Time as First-Class</p>
          <p className="principle-text">时间维度与空间维度同等重要，不是辅助字段</p>
        </div>
        
        <div className="principle-card">
          <div className="principle-icon">🔍</div>
          <h3 className="principle-title">关系可计算</h3>
          <p className="principle-subtitle">Queryable & Reasonable</p>
          <p className="principle-text">空间关系可查询、可推理、可验证</p>
        </div>
        
        <div className="principle-card">
          <div className="principle-icon">🌱</div>
          <h3 className="principle-title">图谱可持续演化</h3>
          <p className="principle-subtitle">Evolving</p>
          <p className="principle-text">新数据触发实体状态变化，而非简单覆盖</p>
        </div>
      </div>
      
      <div className="definition-summary">
        <p className="summary-text">
          <strong>核心对象：</strong>地址、建筑、AOI、道路、设施、设备、网格、业务行为、事件、状态变化、轨迹关系。
          每个实体具备唯一空间身份、生命周期、多源属性绑定能力。
        </p>
      </div>
    </section>
  );
};
