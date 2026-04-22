import React from 'react';
import './PositioningSection.css';

export const DataFactoryPositioning: React.FC = () => {
  return (
    <section id="positioning" className="df-positioning">
      <div className="df-positioning-container">
        <div className="df-positioning-content">
          <div className="df-positioning-badge">Trusted Data Base</div>
          <p className="df-positioning-text df-positioning-text-enlarged">
            数据工厂不是一次性制图工具，而是面向 AI 时代的<strong>可信数据生产系统</strong>。
            它围绕空间实体、语义地址、动态事件和业务标签持续接入多源数据，完成治理、融合、校验与资产化。
          </p>
          <p className="df-positioning-text df-positioning-text-enlarged">
            目标不是“把数据整理好”这么简单，而是让地图、地址、轨迹、规则和场景状态都变成
            <strong>可调用、可追溯、可复盘</strong>的底座资产，为时空知识图谱和行业智能决策提供稳定输入。
          </p>
          <div className="df-positioning-capsules">
            <span className="df-positioning-chip">可信接入</span>
            <span className="df-positioning-chip">语义地址</span>
            <span className="df-positioning-chip">实体资产化</span>
            <span className="df-positioning-chip">持续演化</span>
          </div>
        </div>
      </div>
    </section>
  );
};
