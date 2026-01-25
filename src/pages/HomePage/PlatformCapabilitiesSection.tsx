import React from 'react';
import './PlatformCapabilitiesSection.css';

export const PlatformCapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      title: '空间数据与地图服务',
      items: ['丰图地图', '地址、AOI 与空间实体模型', '空间关系与语义组织']
    },
    {
      title: '基础位置能力',
      items: ['搜索、定位、匹配', '路径规划与可达性分析', '区域、网格与覆盖分析']
    },
    {
      title: '时空分析与指标能力',
      items: ['行为与流动分析', '空间变化与趋势识别', '业务指标的空间化表达']
    },
    {
      title: '平台化服务能力',
      items: ['API / SDK / 服务编排', '权限、安全与审计', '多部署形态支持']
    }
  ];

  return (
    <section className="platform-capabilities-section">
      <div className="capabilities-container">
        <div className="section-header">
          <h2>位置智能服务平台</h2>
          <p className="platform-tagline">
            是丰图统一的位置与空间能力服务底座，<br />
            为所有对外产品和行业决策服务提供基础能力支撑
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="capability-module">
              <h3>{cap.title}</h3>
              <ul>
                {cap.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="platform-note">
          <p>
            平台本身不直接"替客户做决策"，<br />
            而是为所有决策提供可信的位置与空间能力。
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilitiesSection;
