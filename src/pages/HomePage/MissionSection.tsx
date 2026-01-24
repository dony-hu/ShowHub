import React from 'react';
import { Link } from 'react-router-dom';
import './MissionSection.css';

export const MissionSection: React.FC = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <h2 className="section-title">平台级空间智能体系</h2>
        
        <div className="architecture-diagram">
          <div className="architecture-layer top-layer">
            <div className="layer-title">位置智能决策平台</div>
            <div className="layer-subtitle">Decision Enablement & Orchestration</div>
            <div className="layer-description">
              将空间能力编排为可执行、可追溯的行业决策服务
            </div>
          </div>
          
          <div className="architecture-arrow">↑ 依赖</div>
          
          <div className="architecture-layer bottom-layer">
            <div className="layer-title">空间智能数据工厂</div>
            <div className="layer-subtitle">Spatial Data Production & Asset System</div>
            <div className="layer-description">
              持续将多源真实世界数据转化为可治理、可学习、可复用的空间资产
            </div>
          </div>
        </div>

        <div className="platform-definition">
          <p>
            空间智能数据工厂和位置智能决策平台，是丰图的两层平台能力体系：前者负责生产空间资产，后者负责将这些能力转化为可执行的行业决策。
            <br/>
            它们不是产品，而是支撑所有产品与解决方案的基础平台。
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
