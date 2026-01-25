import React from 'react';
import { Breadcrumb } from './DataFactory/Breadcrumb';
import { DataFactoryUseCases } from './DataFactory/UseCasesSection';
import { DataFactoryLabeling } from './DataFactory/LabelingSection';
import { DataFactoryAssetization } from './DataFactory/AssetizationSection';
import { DataFactoryServing } from './DataFactory/ServingSection';
import { DataFactoryCTA } from './DataFactory/CTASection';
import './DataFactoryDetailPage.css';

export const DataFactoryDetailPage: React.FC = () => {
  return (
    <div className="data-factory-detail-page">
      <div className="detail-page-container">
        <Breadcrumb items={[
          { label: '首页', path: '/' },
          { label: '核心技术', path: '/data-factory' },
          { label: '数据工厂详情' }
        ]} />

        <div className="detail-hero">
          <h1 className="detail-title">空间智能数据工厂</h1>
          <p className="detail-subtitle">
            标注即生产·数据即成果·全流程覆盖场景到服务的数据加工链路
          </p>
          <div className="detail-tags">
            <span className="detail-tag">场景数据接入</span>
            <span className="detail-tag">多模态标注</span>
            <span className="detail-tag">数据资产化</span>
            <span className="detail-tag">在线服务化</span>
          </div>
        </div>

        <DataFactoryUseCases />
        <DataFactoryLabeling />
        <DataFactoryAssetization />
        <DataFactoryServing />
        <DataFactoryCTA />
      </div>
    </div>
  );
};
