import React from 'react';
import { Breadcrumb } from './DataFactory/Breadcrumb';
import { DataFactoryUseCases } from './DataFactory/UseCasesSection';
import { DataFactoryLabeling } from './DataFactory/LabelingSection';
import { DataFactoryAssetization } from './DataFactory/AssetizationSection';
import { DataFactoryServing } from './DataFactory/ServingSection';
import { DataFactoryCTA } from './DataFactory/CTASection';
import { DataFlowDiagram } from './DataFactory/DataFlowDiagram';
import { GraphStatsPanel } from './DataFactory/GraphStatsPanel';
import './DataFactoryDetailPage.css';

export const DataFactoryDetailPage: React.FC = () => {
  return (
    <div className="data-factory-detail-page">
      <div className="detail-page-container">
        <Breadcrumb
          items={[
            { label: '首页', path: '/' },
            { label: '核心技术', path: '/data-factory' },
            { label: '数据工厂详情' },
          ]}
        />

        <div className="detail-hero">
          <p className="detail-kicker">Trusted Data Factory</p>
          <h1 className="detail-title">空间智能数据工厂</h1>
          <p className="detail-subtitle">
            从原始接入到语义地址、实体资产、图谱输入，再到回流校验与持续演化，把数据生产线做成 AI 空间智能的可信底座。
          </p>
          <a
            href="https://ft-show.sf-express.com/data-factory/"
            target="_blank"
            rel="noopener noreferrer"
            className="demo-system-btn"
          >
            <span>🚀</span>
            <span>进入演示系统</span>
          </a>
          <div className="detail-tags">
            <span className="detail-tag">可信接入</span>
            <span className="detail-tag">语义地址</span>
            <span className="detail-tag">实体资产化</span>
            <span className="detail-tag">回流闭环</span>
          </div>
        </div>

        <GraphStatsPanel />
        <DataFlowDiagram />
        <DataFactoryUseCases />
        <DataFactoryLabeling />
        <DataFactoryAssetization />
        <DataFactoryServing />
        <DataFactoryCTA />
      </div>
    </div>
  );
};
