import React from 'react';
import './ComparisonTable.css';

export const ComparisonTable: React.FC = () => {
  const comparisons = [
    {
      aspect: '核心组织方式',
      traditional: '图层 / 表结构',
      stkg: '空间实体'
    },
    {
      aspect: '时间处理',
      traditional: '辅助字段',
      stkg: '一等公民'
    },
    {
      aspect: '数据更新',
      traditional: '批处理覆盖',
      stkg: '持续演化'
    },
    {
      aspect: '面向对象',
      traditional: '人（可视化）',
      stkg: '人 + 机器 / 智能应用'
    },
    {
      aspect: '决策能力',
      traditional: '可视化展示',
      stkg: '推理与自动决策'
    },
    {
      aspect: '关系表达',
      traditional: '空间关联（拓扑）',
      stkg: '多维关系（空间+时间+语义+因果）'
    }
  ];
  
  return (
    <section className="stkg-section comparison-section">
      <div className="comparison-header">
        <span className="stkg-en-label">Key Differences</span>
        <h2 className="stkg-section-title">与传统方案的关键差异</h2>
      </div>
      
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="aspect-col">维度</th>
              <th className="traditional-col">传统地图 / GIS</th>
              <th className="stkg-col">时空知识图谱</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, index) => (
              <tr key={index}>
                <td className="aspect-cell">{item.aspect}</td>
                <td className="traditional-cell">{item.traditional}</td>
                <td className="stkg-cell">{item.stkg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="comparison-note">
        <div className="note-icon">💡</div>
        <p className="note-text">
          时空知识图谱不是对传统 GIS 的替代，而是在 AI 时代针对机器理解与决策需求的补充与升级。
          两者可以共存：传统方案服务可视化与分析，图谱服务推理与决策。
        </p>
      </div>
    </section>
  );
};
