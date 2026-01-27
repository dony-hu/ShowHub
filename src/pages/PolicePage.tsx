import React from 'react'
import './PolicePage.css'
import PolicyArchitectureDiagram from './components/PolicyArchitectureDiagram'

const chain = [
  { title: '时空感知与定位', desc: '警情接入 · 关联分析 · 态势研判' },
  { title: '智能归因与策略', desc: '方案生成 · 风险评估 · 资源配置' },
  { title: '精准触达与处置', desc: '警力编组 · 区域布控 · 行动下发' },
  { title: '效能量化与闭环', desc: '过程可回溯 · 效果可评估' }
]

const summary = [
  {
    title: '全要素实体归一',
    desc: '不再是孤立的经纬度，而是基于 L24 微观地址，将警情、人员、设施、警力统一锚定为互相关联的"时空图谱"，奠定决策基础'
  },
  {
    title: '面向实战的决策计算',
    desc: '告别"看图说话"，通过时空算子深度挖掘数据价值，直接输出风险画像、处置策略与行动路线，让系统代替人脑完成复杂计算'
  },
  {
    title: '全链路行动闭环',
    desc: '每一条决策指令都能精准下达，每一次执行动作都能被量化评估。从"指令下发"到"效果复盘"，实现业务流的完整闭环与效能跃升'
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
          <p className="section-subtitle">所有数据，最终都必须服务于每一次实战行动</p>
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
