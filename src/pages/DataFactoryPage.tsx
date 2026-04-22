import React from 'react';
import './DataFactoryPage.css';
import { TechOverviewHero } from './DataFactory/TechOverviewHero';
import { DataFlowDiagram } from './DataFactory/DataFlowDiagram';
import { DataFactoryPositioning } from './DataFactory/PositioningSection.tsx';
import { DataFactoryPrinciples } from './DataFactory/PrinciplesSection.tsx';
import StaticFlowDiagram from './DataFactory/StaticFlowDiagram';
import { LogisticsGraphSection } from './DataFactory/LogisticsGraphSection';

export const DataFactoryPage: React.FC = () => {
  return (
    <div className="data-factory-page">
      <TechOverviewHero />
      
      <div id="data-factory-section">
        <DataFactoryPositioning />
        <DataFactoryPrinciples />
        <DataFlowDiagram />
        <StaticFlowDiagram />
        
        <div className="df-closure">
          <div className="df-closure-content">
            <h3 className="df-closure-title">可信数据工厂，是 Agent 世界模型的生产线</h3>
            <p className="df-closure-text">
              我们把地图、地址、轨迹、事件、规则与业务标签统一纳入同一条生产链，
              用持续接入、自动治理、人工兜底和资产沉淀，把原始数据变成可调用、可追溯、可复用的世界模型底座。
            </p>
            <div className="df-closure-features">
              <div className="df-closure-feature-item">
                <span className="df-closure-feature-icon">🛡️</span>
                <span>可信接入与质量守门</span>
              </div>
              <div className="df-closure-feature-item">
                <span className="df-closure-feature-icon">🏷️</span>
                <span>语义地址与实体资产化</span>
              </div>
              <div className="df-closure-feature-item">
                <span className="df-closure-feature-icon">🔁</span>
                <span>反馈闭环与持续演化</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-button-wrapper">
          <a href="/data-factory-detail" className="detail-link-button">
            查看数据工厂详细方案 →
          </a>
        </div>
      </div>
      
      <div id="knowledge-graph-section">
        <LogisticsGraphSection />
      </div>

      <section className="df-dual-closure">
        <div className="df-dual-content">
          <h3 className="df-dual-title">数据工厂 × 时空知识图谱，组成 Agent 的底座闭环</h3>
          <p className="df-dual-text">
            数据工厂负责采集、清洗、标注、资产化和回流，时空知识图谱负责把这些资产组织成可查询、可推理、可仿真的世界状态。
            这条链路把地图从展示层抬升为认知层，让 Agent 不只是“看见世界”，而是可以理解地址、跟踪事件、推断关系并给出动作建议。
          </p>
          <div className="df-dual-features">
            <div className="df-dual-item">
              <span className="df-dual-icon">🏭</span>
              <span>数据工厂：可信数据与语义资产的生产线</span>
            </div>
            <div className="df-dual-item">
              <span className="df-dual-icon">🧠</span>
              <span>知识图谱：语义地址、动态事件、关系推理</span>
            </div>
            <div className="df-dual-item">
              <span className="df-dual-icon">🚀</span>
              <span>决策闭环：仿真、执行、复盘、再学习</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
