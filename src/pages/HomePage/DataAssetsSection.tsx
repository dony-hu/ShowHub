import React from 'react';
import './DataAssetsSection.css';

interface StatItem {
  label: string;
  value: string;
}

interface StatBlock {
  title: string;
  items: StatItem[];
}

const primaryBlocks: StatBlock[] = [
  {
    title: '地址数据',
    items: [
      { label: '语义地址', value: '100亿+' },
      { label: '覆盖率', value: '95%' },
    ],
  },
  {
    title: '企业专题数据',
    items: [
      { label: '实有企业', value: '1600万+' },
      { label: '经营场所', value: '4500万+' },
    ],
  },
  {
    title: '货车专题数据',
    items: [
      { label: '路线一致率', value: '90%' },
      { label: '费用一致率', value: '98%' },
    ],
  },
];

const secondaryBlocks: StatBlock[] = [
  {
    title: 'AOI地图数据',
    items: [
      { label: 'AOI', value: '500万+' },
      { label: '城镇建筑', value: '4000万+' },
      { label: '房间', value: '3亿+' },
    ],
  },
  {
    title: '日均覆盖能力',
    items: [
      { label: '主干路网', value: '85%' },
      { label: '楼栋', value: '70%' },
      { label: '企业', value: '75%' },
    ],
  },
];

const StatBlockCard: React.FC<{ block: StatBlock }> = ({ block }) => (
  <div className="stat-block">
    <h3>{block.title}</h3>
    <div className="stat-items">
      {block.items.map((item) => (
        <div className="stat-item" key={item.label}>
          <span className="label">{item.label}</span>
          <span className="value">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const DataAssetsSection: React.FC = () => {
  return (
    <section className="data-assets-section">
      <div className="data-assets-container">
        <div className="section-header">
          <h2>数据资产体系</h2>
          <p>丰图持续沉淀的高质量地址、企业、货车与 AOI 数据，为位置智能决策提供坚实底座</p>
        </div>

        <div className="panel">
          <div className="panel-title">核心数据资产</div>
          <div className="stat-grid stat-grid-3">
            {primaryBlocks.map((block) => (
              <StatBlockCard key={block.title} block={block} />
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">空间覆盖与能力</div>
          <div className="stat-grid stat-grid-2">
            {secondaryBlocks.map((block) => (
              <StatBlockCard key={block.title} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataAssetsSection;
