import React from 'react';
import './PositioningSection.css';

export const DataFactoryPositioning: React.FC = () => {
  return (
    <section id="positioning" className="df-positioning">
      <div className="df-positioning-container">
        <div className="df-positioning-content">
          <p className="df-positioning-text df-positioning-text-enlarged">
            空间智能数据工厂是一套面向多源、多场景的<strong>空间数据接入、治理、融合与生产平台</strong>。
            它不是简单的数据清洗工具，而是以<strong>空间实体</strong>为核心的数据组织与治理体系，
            支持从原始数据到标准化资产的全流程生产。
          </p>
          
          <p className="df-positioning-text df-positioning-text-enlarged">
            目标<strong>不是一次性制图</strong>，而是建立<strong>可持续运行的数据生产体系</strong>，
            通过多源数据的持续接入与自动化治理，让地图、实体、事件等空间资产始终保持鲜活与可信。
          </p>
        </div>
      </div>
    </section>
  );
};
