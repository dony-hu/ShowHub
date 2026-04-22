import React from 'react'
import './AgentSpaceIntelligencePage.css'

const toolGroups = [
  {
    title: '可信事实',
    desc: '地址、AOI、道路、楼栋、企业、轨迹与行业专题数据，为 Agent 提供可验证的真实世界输入。',
  },
  {
    title: '空间推理',
    desc: '距离、可达、覆盖、时序变化、风险叠加与实体关系，让 Agent 不只回答，还能判断。',
  },
  {
    title: '工具执行',
    desc: '地图、搜索、地理编码、路径规划、空间分析与行业规则服务，沉淀为可调用的工具链。',
  },
]

const scenarios = [
  ['地址治理 Agent', '识别脏地址', '标准化解析', '匹配空间实体', '生成修正建议'],
  ['物流调度 Agent', '理解订单压力', '分析网点覆盖', '评估路径时效', '推荐调度策略'],
  ['警务研判 Agent', '接收警情', '定位现场', '叠加风险实体', '生成处置方案'],
  ['城市治理 Agent', '接入多源数据', '空间落位', '实体归并', '生成治理专题'],
]

const AgentSpaceIntelligencePage: React.FC = () => {
  return (
    <div className="agent-page">
      <section className="agent-hero">
        <div className="agent-hero-inner">
          <div className="agent-hero-copy">
            <p className="agent-eyebrow">Agent-ready Spatial Intelligence</p>
            <h1>让智能体理解真实世界</h1>
            <p className="agent-hero-desc">
              丰图基于真实物流场景、可信时空数据与空间智能平台，为企业 Agent、城市 Agent 与行业决策系统提供
              可调用、可推理、可验证的真实世界空间基础设施。
            </p>
            <div className="agent-hero-actions">
              <a href="/open-platform" className="agent-primary">查看空间工具</a>
              <a href="/data-factory/stkg" className="agent-secondary">了解世界模型底座</a>
            </div>
          </div>
          <div className="agent-console" aria-label="Agent task flow">
            <div className="console-top">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="console-line strong">任务：评估异常配送片区并给出调度建议</div>
            <div className="console-line">Agent 调用：地址解析 / AOI 匹配 / 路径规划 / 覆盖分析</div>
            <div className="console-grid">
              <div>可信地址</div>
              <div>时空图谱</div>
              <div>空间工具</div>
              <div>决策输出</div>
            </div>
          </div>
        </div>
      </section>

      <section className="agent-section agent-why">
        <div className="agent-section-head">
          <p className="agent-eyebrow">Why Spatial Intelligence</p>
          <h2>大模型知道很多，但它不天然理解真实世界</h2>
          <p>
            Agent 要完成配送、调度、研判、治理、选址和应急任务，必须知道地址是否真实、实体在哪里、道路是否可达、
            区域如何变化、行动是否合规。
          </p>
        </div>
        <div className="agent-card-grid">
          {toolGroups.map(item => (
            <article className="agent-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="agent-section agent-architecture">
        <div className="agent-section-head">
          <p className="agent-eyebrow">Architecture</p>
          <h2>丰图 Agent 空间智能架构</h2>
          <p>从真实世界数据到行业 Agent 应用，丰图把空间能力沉淀成可持续调用的基础设施。</p>
        </div>
        <div className="agent-layers">
          <div>
            <span>01</span>
            <strong>真实世界数据层</strong>
            <p>地址、AOI、路网、楼栋、企业、物流轨迹与行业专题数据。</p>
          </div>
          <div>
            <span>02</span>
            <strong>时空知识图谱层</strong>
            <p>实体统一标识、关系网络、时间演化、规则约束与可信版本。</p>
          </div>
          <div>
            <span>03</span>
            <strong>空间工具与 API 层</strong>
            <p>地理编码、搜索、路径、覆盖、网格、企业查询与地图渲染。</p>
          </div>
          <div>
            <span>04</span>
            <strong>行业 Agent 应用层</strong>
            <p>地址治理、物流调度、警务研判、政数治理与环卫调度。</p>
          </div>
        </div>
      </section>

      <section className="agent-section agent-scenarios">
        <div className="agent-section-head">
          <p className="agent-eyebrow">Workflows</p>
          <h2>让行业 Agent 从理解任务走向完成任务</h2>
        </div>
        <div className="scenario-grid">
          {scenarios.map(([name, ...steps]) => (
            <article className="scenario-card" key={name}>
              <h3>{name}</h3>
              <div className="scenario-steps">
                {steps.map(step => <span key={step}>{step}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="agent-cta">
        <h2>从可信数据，到可行动的智能体</h2>
        <p>丰图不只是让地图更智能，而是让智能体真正理解空间、理解业务、理解真实世界。</p>
        <a href="/open-platform">开始集成空间能力</a>
      </section>
    </div>
  )
}

export default AgentSpaceIntelligencePage
