import React from 'react'
import './AgentEraSection.css'

const needs = [
  {
    title: '可信事实',
    text: '地址、AOI、路网、楼栋、企业与轨迹不能凭空生成，必须来自可验证、可追溯、可更新的数据底座。',
  },
  {
    title: '空间推理',
    text: 'Agent 要判断可达性、覆盖范围、时序变化、风险叠加与实体关系，才能从回答问题走向完成任务。',
  },
  {
    title: '工具调用',
    text: '地图、搜索、路径、地理编码与空间分析能力，需要被封装成稳定、可审计、可编排的空间工具。',
  },
]

const AgentEraSection: React.FC = () => {
  return (
    <section className="home-agent-section">
      <div className="home-agent-container">
        <div className="home-agent-header">
          <p className="home-agent-kicker">Agent Era Upgrade</p>
          <h2>丰图正在升级为智能体时代的空间智能基础设施</h2>
          <p>
            大模型可以理解语言，但行业 Agent 要真正行动，必须理解真实世界。丰图把长期沉淀的可信时空数据、
            时空知识图谱和位置智能工具链，转化为 Agent 可调用、可推理、可验证的基础能力。
          </p>
        </div>
        <div className="home-agent-grid">
          {needs.map(item => (
            <article className="home-agent-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="home-agent-flow" aria-label="Agent spatial intelligence flow">
          <span>行业任务</span>
          <span>Agent 编排</span>
          <span>丰图空间工具</span>
          <span>时空知识图谱</span>
          <span>可信数据工厂</span>
          <span>可执行决策</span>
        </div>
      </div>
    </section>
  )
}

export default AgentEraSection
