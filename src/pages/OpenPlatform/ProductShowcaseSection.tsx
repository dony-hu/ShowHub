import React from 'react';
import './ProductShowcaseSection.css';

interface Capability {
  title: string;
  label: string;
  description: string;
  tags: string[];
}

const capabilities: Capability[] = [
  {
    title: '地图调用',
    label: 'Map Tool',
    description: '支持底图加载、图层切换、点线面绘制、样式控制和结果高亮，适配智能应用的交互式空间操作。',
    tags: ['底图', '图层', '绘制', '高亮'],
  },
  {
    title: '路线编排',
    label: 'Route Tool',
    description: '面向单点、多点和约束条件路径规划，输出可直接被任务流消费的路线建议与路径片段。',
    tags: ['路径规划', '多点', '约束', '调度'],
  },
  {
    title: '地理编码',
    label: 'Geo Tool',
    description: '把地址、楼宇、POI 与经纬度互相转换，提供结构化结果，便于前端、后端和智能应用统一使用。',
    tags: ['正向', '逆向', '批量', '解析'],
  },
  {
    title: '地址理解',
    label: 'Address Tool',
    description: '用于地址补全、纠错、拆分、行政区识别和语义归一，帮助模型把自然语言落到可执行对象。',
    tags: ['补全', '纠错', '拆分', '归一'],
  },
  {
    title: '地理围栏',
    label: 'Fence Tool',
    description: '支持区域创建、进出判断、事件触发和边界监测，让业务系统可以围绕地点与范围进行规则执行。',
    tags: ['围栏', '监测', '事件', '规则'],
  },
  {
    title: '态势渲染',
    label: 'Scene Tool',
    description: '将点位、轨迹、热区、网络和专题数据转成可视化态势图层，适合调度、巡检和指挥分析。',
    tags: ['轨迹', '热区', '专题', '叠加'],
  },
];

export const OpenPlatformProductShowcase: React.FC = () => {
  return (
    <section className="op-showcase">
      <div className="op-section-inner">
        <div className="op-section-heading">
          <span className="op-section-kicker">平台能力</span>
          <h2>让空间能力以工具化方式进入智能工作流</h2>
          <p>
            不是把地图“挂”在页面上，而是把空间能力拆成可发现、可调用、可组合的工具，
            让各类业务系统按需拼装自己的空间智能链路。
          </p>
        </div>

        <div className="op-showcase-grid">
          {capabilities.map((item) => (
            <article key={item.title} className="op-showcase-card">
              <div className="op-showcase-card-head">
                <span className="op-showcase-label">{item.label}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              <div className="op-showcase-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="op-showcase-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
