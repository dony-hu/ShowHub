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
        <LogisticsKnowledgeGraph />
        
        <div className="cta-button-wrapper">
          <a href="/knowledge-graph-detail" className="detail-link-button">
            查看知识图谱详细方案 →
          </a>
        </div>
      </div>
    </div>
  );
};
