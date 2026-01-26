import React from 'react';
import './InnovationLabPage.css';
import { LogisticsSTMDiagram } from './LogisticsSTMDiagram';
import { DataCooperationDiagram } from './DataCooperationDiagram';
import { UnmannedLogisticsDiagram } from './UnmannedLogisticsDiagram';
import { TopicCard } from './TopicCard';

const InnovationLabPage: React.FC = () => {
  const topics = [
    {
      id: 'logistics-stm',
      title: '专题一',
      titleEn: 'Logistics Spatio-Temporal Foundation Model',
      subtitle: '物流时空大模型',
      description: '围绕丰图沉淀的物流时空知识图谱，我们正在探索面向物流场景的 物流时空大模型（Spatio-Temporal Foundation Model）。',
      details: '该研究以顺丰真实业务数据为基础，重点聚焦 最后一公里 场景中复杂的时空语义理解问题，包括地址、AOI、站点、投递路径、作业行为以及物流画像标签等核心要素，探索从"数据描述"走向"时空理解与推理"的能力路径。',
      highlights: [
        '物流场景下的时空语义建模与推理',
        '最后一公里空间实体与行为模式理解',
        '物流画像标签体系构建与泛化能力',
        '时空知识图谱与大模型融合方法'
      ],
      cooperation: '面向高校、研究机构与算法团队，开展模型结构、训练方法与场景验证层面的联合研究。',
      diagram: <LogisticsSTMDiagram />
    },
    {
      id: 'data-cooperation',
      title: '专题二',
      titleEn: 'Data Cooperation Innovation Laboratory',
      subtitle: '联合数据创新 - 从单一数据到联合智能',
      description: '丰图拥有高质量的空间数据与物流画像标签，但在更广泛的非物流行业与复杂业务场景中，仍然客观存在 数据覆盖与语义表达的边界。',
      details: '联合数据创新实验室，致力于在合规前提下，探索通过 多方数据协同与联合建模 的方式，构建更完整、更具行业价值的空间数据产品与智能能力，推动空间数据从"单一视角"走向"联合智能"。',
      highlights: [
        '空间数据与行业数据的协同建模',
        '数据缺失场景下的联合补全与推断',
        '跨行业空间指标与画像体系构建',
        '数据协作、隐私保护与合规机制设计'
      ],
      cooperation: '面向拥有行业数据、专业模型或算法能力的合作伙伴，共同探索联合数据产品的设计、验证与商业化路径。',
      diagram: <DataCooperationDiagram />
    },
    {
      id: 'unmanned-logistics',
      title: '专题三',
      titleEn: 'Unmanned Logistics Joint Innovation Laboratory',
      subtitle: '无人物流联合创新 - 场景与空间智能',
      description: '随着无人物流在配送、园区、末端等场景逐步落地，对空间数据表达、地图合规与场景理解提出了新的系统性要求。',
      details: '依托顺丰真实的无人物流应用场景，以及丰图在地图资质、空间数据与位置智能平台方面的能力积累，无人物流联合创新实验室致力于与产业伙伴共同探索面向无人物流领域的创新型解决方案，推动技术在真实环境中的验证与规模化应用。',
      highlights: [
        '无人物流场景下的合规地图与空间表达',
        '无人设备、设施与环境的语义建模',
        '场景感知、调度与运行优化',
        '面向规模化落地的系统架构探索'
      ],
      cooperation: '面向无人车、机器人、感知设备与系统集成伙伴，在真实业务场景中开展联合创新与方案共建。',
      diagram: <UnmannedLogisticsDiagram />
    }
  ];

  return (
    <div className="innovation-lab-page">
      {/* 顶部标题栏 */}
      <header className="lab-header">
        <div className="header-content">
          <h1 className="lab-title">开放创新实验室</h1>
          <p className="lab-subtitle">面向真实场景与真实数据的联合创新实验室</p>
          <p className="lab-description">
            依托顺丰物流的真实业务场景，以及丰图在空间数据、地图资质与平台能力上的长期积累，
            Innovation Lab 面向技术型合作伙伴，围绕前沿方向开展联合研究与创新实践，
            共同探索 <strong>空间智能、数据协同与无人物流</strong> 的下一代能力形态。
          </p>
        </div>
        <div className="header-divider">⸻</div>
      </header>

      {/* 专题展示区 */}
      <section className="topics-section">
        <div className="topics-container">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="cta-section">
        <h2>开启联合创新之旅</h2>
        <p>丰图 Innovation Lab 期待与您携手探索空间智能的未来</p>
        <div className="cta-buttons">
          <button className="cta-btn btn-primary">技术合作</button>
          <button className="cta-btn btn-secondary">联合研究</button>
          <button className="cta-btn btn-tertiary">联系我们</button>
        </div>
      </section>
    </div>
  );
};

export default InnovationLabPage;
