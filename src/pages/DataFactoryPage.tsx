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
        
        <div className="df-closure">
          <div className="df-closure-content">
            <h3 className="df-closure-title">从接入到应用的完整数据链路</h3>
            <p className="df-closure-text">
              丰图数据工厂为企业构建从数据接入、治理到应用的完整链路。通过自动化编排能力，
              让数据接入成本降低80%，质量管控贯穿全链路，最终把数据能力快速转化为业务价值。
            </p>
            <div className="df-closure-features">
              <div className="df-closure-feature-item">
                <span className="df-closure-feature-icon">⚡</span>
                <span>快速接入落地</span>
              </div>
              <div className="df-closure-feature-item">
                <span className="df-closure-feature-icon">📊</span>
                <span>全链路质量管控</span>
              </div>
              <div className="df-closure-feature-item">
                <span className="df-closure-feature-icon">🚀</span>
                <span>规模化资产沉淀</span>
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
      
      {/* 物流知识图谱部分 */}
      <div id="knowledge-graph-section">
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
