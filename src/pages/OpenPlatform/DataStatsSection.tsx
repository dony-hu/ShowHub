import React from 'react';
import './DataStatsSection.css';

interface Stat {
  value: string;
  unit: string;
  label: string;
}

export const OpenPlatformDataStats: React.FC = () => {
  const stats: Stat[] = [
    {
      value: '4',
      unit: '亿+',
      label: '标准地址/日'
    },
    {
      value: '600',
      unit: '万+',
      label: 'AOI'
    },
    {
      value: '1000',
      unit: '万+',
      label: '实有企业'
    },
    {
      value: '99.8',
      unit: '%',
      label: '地址解析准确率'
    },
    {
      value: '95',
      unit: '%+',
      label: 'API可用性'
    }
  ];

  return (
    <section className="op-data-stats">
      <div className="op-data-stats-container">
        <h2 className="section-title">海量数据实时流转，激活产业繁荣新动能</h2>
        <p className="section-subtitle">
          依托多年实时数据积累，以贴合业务的算法、适配场景的产品与全方位保障，为您的决策运营护航
        </p>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-value">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-unit">{stat.unit}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
