import React from 'react';
import './DataFactoryPage.css';
import { TechOverviewHero } from './DataFactory/TechOverviewHero';
import { DataFlowDiagram } from './DataFactory/DataFlowDiagram';
import { DataFactoryPositioning } from './DataFactory/PositioningSection.tsx';
import { DataFactoryPrinciples } from './DataFactory/PrinciplesSection.tsx';
import StaticFlowDiagram from './DataFactory/StaticFlowDiagram';

import { LogisticsKnowledgeGraph } from './DataFactory/LogisticsKnowledgeGraph';

export const DataFactoryPage: React.FC = () => {
  return (
    <div className="data-factory-page">
      {/* 统一Hero介绍双板块 */}
      <TechOverviewHero />
      
      {/* 数据工厂部分（主页保留核心内容） */}
      <div id="data-factory-section">
        <DataFactoryPositioning />
        <DataFactoryPrinciples />
        <StaticFlowDiagram />
        
        <div className="cta-button-wrapper">
          <a href="/data-factory-detail" className="detail-link-button">
            查看数据工厂详细方案 →
          </a>
        </div>
      </div>
      
      {/* 物流知识图谱部分 */}
      <div id="knowledge-graph-section">
        <div className="cta-button-wrapper">
          <a href="/knowledge-graph-detail" className="detail-link-button">
            查看知识图谱详细方案 →
          </a>
        </div>

        <LogisticsKnowledgeGraph />
      </div>

      {/* 数据工厂 × 知识图谱双轮驱动收尾文案 */}
      <section className="df-dual-closure">
        <div className="df-dual-content">
          <h3 className="df-dual-title">数据工厂 × 知识图谱 双轮驱动</h3>
          <p className="df-dual-text">
            我们把数据工厂的全链路治理与知识图谱的语义理解结合，形成从“数据生产”到“智能决策”的闭环：
            数据工厂确保数据新鲜、可信、可复用，知识图谱让数据具备业务语义和推理能力，
            最终把数据能力沉淀为可落地的决策工具和业务增长引擎。
          </p>
          <div className="df-dual-features">
            <div className="df-dual-item">
              <span className="df-dual-icon">🏭</span>
              <span>数据工厂：从接入到质量的治理闭环</span>
            </div>
            <div className="df-dual-item">
              <span className="df-dual-icon">🧠</span>
              <span>知识图谱：多维语义融合与推理</span>
            </div>
            <div className="df-dual-item">
              <span className="df-dual-icon">🚀</span>
              <span>决策闭环：实时、可解释、可复盘</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
