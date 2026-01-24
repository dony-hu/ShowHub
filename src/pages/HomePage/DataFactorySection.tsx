import React from 'react';
import './DataFactorySection.css';

interface Value {
  title: string;
  description: string;
}

export const DataFactorySection: React.FC = () => {
  const values: Value[] = [
    {
      title: '统一数据生产体系',
      description: '将地图、地址、AOI、影像、多模态数据的生产过程标准化、自动化'
    },
    {
      title: '全过程可治理',
      description: '数据采集、处理、标注、训练、发布全流程可追溯、可审计'
    },
    {
      title: '质量驱动而非规模驱动',
      description: '以质量指标、验证机制和闭环修复，保障数据长期可用'
    },
    {
      title: '为决策服务持续供血',
      description: '持续向各类决策服务输出高质量、可解释的数据资产'
    }
  ];

  return (
    <section className="data-factory-section">
      <div className="data-factory-container">
        <h2 className="section-title">空间智能数据工厂</h2>
        <p className="section-subtitle">决策背后的数据生产与治理引擎</p>

        <div className="factory-intro">
          <p>
            空间智能数据工厂是丰图以及丰图客户的核心引擎。<br/>
            它是打造可信、可持续数据体系的能力基础，支撑所有位置智能决策服务的深度运营。
          </p>
          
          <div className="intro-highlight">
            <p className="highlight-item">
              位置智能决策平台解决"<span className="highlight-text">怎么用数据做决策</span>"，<br/>
              空间智能数据工厂解决"<span className="highlight-text">数据从哪里来，是否可信，如何持续优化</span>"。
            </p>
          </div>
        </div>

        <h3 className="subsection-title">核心能力</h3>

        <div className="values-grid">
          {values.map((value, idx) => (
            <div key={idx} className="value-card">
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataFactorySection;
