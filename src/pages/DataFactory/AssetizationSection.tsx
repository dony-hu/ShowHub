import React from 'react';
import './AssetizationSection.css';

export const DataFactoryAssetization: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: '实体提取与唯一标识',
      description: '识别空间实体并分配唯一ID'
    },
    {
      number: '2',
      title: '语义标签关联与标准化',
      description: '关联语义标签体系'
    },
    {
      number: '3',
      title: '空间位置确认',
      description: '精确定位空间坐标与范围'
    },
    {
      number: '4',
      title: '实体与标准地址关联',
      description: '关联标准地址体系'
    },
    {
      number: '5',
      title: '自动生成标准地址',
      description: '为实体生成标准地址'
    }
  ];

  const assets = [
    {
      icon: '🗂️',
      title: 'Entity Registry',
      subtitle: '空间实体库',
      description: '统一管理的实体注册中心'
    },
    {
      icon: '📍',
      title: 'Standard Address',
      subtitle: '标准地址库',
      description: '规范化的地址资产'
    },
    {
      icon: '🏷️',
      title: 'Semantic Tags',
      subtitle: '语义标签体系',
      description: '统一的语义分类与标注'
    },
    {
      icon: '📜',
      title: 'Lineage & Audit',
      subtitle: '变更与溯源记录',
      description: '完整的数据血缘与审计日志'
    },
    {
      icon: '🕸️',
      title: 'Spatio-temporal Graph',
      subtitle: '时空关系图谱',
      description: '呈现实体间的时空关系与交互网络'
    }
  ];

  return (
    <section id="assetization" className="df-assetization">
      <div className="df-assetization-container">
        <h2 className="df-section-title">标注即生产</h2>
        
        <p className="df-assetization-intro">
          标注不仅仅是质量把关，更是<strong>资产生产的过程</strong>。
          每一次确认、修正、补充，都在构建高质量的空间实体资产，
          为后续的搜索、分析、决策提供可信数据基础。
        </p>
        
        <div className="df-process-stepper">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="df-process-step">
                <div className="df-step-number">{step.number}</div>
                <div className="df-step-content">
                  <h4 className="df-step-title">{step.title}</h4>
                  <p className="df-step-description">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="df-step-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="df-asset-cards">
          <h3 className="df-asset-cards-title">成果沉淀</h3>
          <div className="df-asset-cards-grid">
            {assets.map((asset, index) => (
              <div key={index} className="df-asset-card">
                <div className="df-asset-icon">{asset.icon}</div>
                <div className="df-asset-title">{asset.title}</div>
                <div className="df-asset-subtitle">{asset.subtitle}</div>
                <div className="df-asset-description">{asset.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
