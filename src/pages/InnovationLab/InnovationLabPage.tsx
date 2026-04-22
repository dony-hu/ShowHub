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
      titleEn: 'Unmanned Delivery Intelligence Testbed',
      subtitle: '无人配送智能试验线',
      description: '围绕园区、社区和末端配送场景，验证无人配送系统的感知、决策、调度与异常处理能力。',
      details: '该专题聚焦站点、充电点、投递点、禁行区和通行路径的联动表达，结合真实业务约束，探索从地图感知到任务执行的完整闭环。',
      highlights: [
        '无人配送路线规划与任务分派',
        '站点、充电、禁行区的空间约束建模',
        '异常绕行、等待和补给策略验证',
        '配送系统与地图能力联动'
      ],
      cooperation: '面向无人车、机器人、调度系统和算法团队，开展联调、仿真和真实场景验证。',
      diagram: <LogisticsSTMDiagram />
    },
    {
      id: 'data-cooperation',
      title: '专题二',
      titleEn: 'Data Cooperation and Joint Modeling',
      subtitle: '数据协作与联合建模',
      description: '在合规前提下，把空间数据、行业数据、业务数据和标签体系放进同一个协作框架中。',
      details: '实验室重点探索联合对齐、增量补全、跨域表达和隐私保护机制，让数据协作从简单交换，升级为可持续的联合智能生产线。',
      highlights: [
        '空间数据与行业数据协同建模',
        '数据缺失场景下的联合补全与推断',
        '跨行业空间指标与画像体系构建',
        '数据协作与隐私保护机制设计'
      ],
      cooperation: '面向拥有行业数据、专业模型和合规能力的合作伙伴，共同探索联合数据产品与协作机制。',
      diagram: <DataCooperationDiagram />
    },
    {
      id: 'unmanned-logistics',
      title: '专题三',
      titleEn: 'Spatial Reasoning and Simulation Lab',
      subtitle: '时空推理与仿真评测场',
      description: '围绕时空推理、态势识别和场景仿真，验证 AI 在复杂空间任务中的判断和执行质量。',
      details: '该专题强调地址、AOI、路径、事件和资源的统一推理，并通过离线评测和场景仿真验证模型在真实环境中的稳定性、可解释性和泛化能力。',
      highlights: [
        '时空实体与关系联合推理',
        '场景仿真与离线评测体系',
        '路径、资源和风险协同判断',
        '面向空间智能的可解释验证'
      ],
      cooperation: '面向高校、研究机构和算法团队，共同构建评测集、仿真环境与推理基准。',
      diagram: <UnmannedLogisticsDiagram />
    }
  ];

  return (
    <div className="innovation-lab-page">
      {/* 顶部标题栏 */}
      <header className="lab-header">
        <div className="header-content">
          <h1 className="lab-title">空间智能联合创新实验室</h1>
          <p className="lab-subtitle">面向<span className="accent-text">真实场景</span>与<span className="accent-text">真实数据</span>的联合创新平台</p>
          <p className="lab-description">
            依托顺丰业务场景和丰图的空间数据、地图资质与平台能力，Innovation Lab 面向技术型合作伙伴，
            围绕 <strong>无人配送、数据协作、时空推理和仿真评测</strong> 四个方向，联合验证下一代空间智能能力。
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
        <h2>加入实验场</h2>
        <p>把你的模型、数据和场景带进来，一起把空间智能做成可验证、可落地的行业能力</p>
        <div className="cta-buttons">
          <button className="cta-btn btn-primary">场景共创</button>
          <button className="cta-btn btn-secondary">联合评测</button>
          <button className="cta-btn btn-tertiary">联系实验室</button>
        </div>
      </section>
    </div>
  );
};

export default InnovationLabPage;
