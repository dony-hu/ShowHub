import React from 'react'
import './AgentEraSection.css'

const needs = [
  {
    title: '可信数据层',
    text: '地址、AOI、路网、楼栋、企业与轨迹不能凭空生成，必须来自可验证、可追溯、可更新的数据底座。',
  },
  {
    title: '时空世界模型',
    text: '把地图要素、业务实体、规则约束与动态事件组织成知识图谱，让 Agent 能理解关系、变化和上下文。',
  },
  {
    title: '空间工具调用',
    text: '地图、搜索、路径、地理编码、地址理解与空间分析能力，被封装成稳定、可审计、可编排的工具。',
  },
  {
    title: '行业决策闭环',
    text: '把空间推理结果接入调度、应急、治理、选址和运营流程，让 Agent 从生成答案进入执行任务。',
  },
]

const toolCalls = [
  '地址标准化',
  'AOI 匹配',
  '路径规划',
  '覆盖分析',
  '风险叠加',
  '态势渲染',
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
        <div className="home-agent-toolbox" aria-label="Agent callable spatial tools">
          <div>
            <p className="home-agent-kicker">Callable Tools</p>
            <h3>把位置能力变成 Agent 可调用的工具箱</h3>
          </div>
          <div className="home-agent-tool-list">
            {toolCalls.map(tool => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentEraSection
