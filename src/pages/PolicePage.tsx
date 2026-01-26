import React from 'react'
import './PolicePage.css'
import PolicyArchitectureDiagram from './components/PolicyArchitectureDiagram'

const chain = [
  { title: '接警与研判', desc: '警情接入 · 关联分析 · 态势研判' },
  { title: '决策推演', desc: '方案生成 · 风险评估 · 资源配置' },
  { title: '勤务部署', desc: '警力编组 · 区域布控 · 行动下发' },
  { title: '复盘与评估', desc: '过程可回溯 · 效果可评估' }
]

const summary = [
  {
    title: '结果可解释可复盘',
    desc: '每一次决策，都能追溯依据与效果'
  },
  {
    title: '面向决策计算',
    desc: '不是展示数据，而是计算方案与路径'
  },
  {
    title: '统一时空建模',
    desc: '将警情、人员、区域、设施、资源统一为时空实体'
  }
]

const PolicePage: React.FC = () => {
  return (
    <div className="police-page">
      <div className="police-container">
        {/* SECTION 1: Hero */}
        <section className="hero">
          <div className="hero-text">
            <h1>警务时空决策服务专家</h1>
            <h2 className="hero-subtitle">让警务数据，从“看得见”走向“用得动”</h2>
            <p className="hero-lead">以时空实体与智能算法，支撑可执行的警务决策</p>
            <div className="hero-actions">
              <div className="cta-block">
                <button className="btn-primary">预约演示</button>
                <span className="btn-note">30 分钟演示真实警务场景</span>
              </div>
              <div className="cta-block">
                <button className="btn-secondary">下载方案</button>
                <span className="btn-note">产品能力与典型应用场景</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 决策能力链 */}
        <section className="section-block">
          <h2 className="section-title">警务决策不是一个系统，而是一条链路</h2>
          <div className="chain">
            {chain.map((item, idx) => (
              <div key={item.title} className="chain-step">
                <div className="chain-index">{idx + 1}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: 架构图 */}
        <PolicyArchitectureDiagram />

        {/* SECTION 4: 能力总结 */}
        <section className="section-block">
          <h2 className="section-title">从“看得见”到“用得动”的警务时空决策能力</h2>
          <p className="section-subtitle">所有数据，最终都必须服务行动</p>
          <div className="summary">
            {summary.map((item) => (
              <div key={item.title} className="summary-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PolicePage
