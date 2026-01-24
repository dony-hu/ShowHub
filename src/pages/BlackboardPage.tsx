import React from 'react'
import './BlackboardPage.css'

interface TrendItem {
  title: string
  summary: string
  tags: string[]
}

interface StoryItem {
  title: string
  owner: string
  summary: string
  learning: string
}

interface OutlookItem {
  title: string
  summary: string
}

interface BulletinItem {
  title: string
  date: string
  detail: string
}

const techTrends: TrendItem[] = [
  {
    title: '多模态地图理解',
    summary: '结合视觉大模型对地图切片进行语义抽取，将路网、兴趣点、地形特征转为结构化知识，支撑自动标注与场景生成。',
    tags: ['Vision-LM', '矢量语义', '自动标注']
  },
  {
    title: '边缘原生渲染',
    summary: '在端侧完成瓦片裁剪、样式合成与轻量推理，降低云端算力消耗，同时保证毫秒级交互体验。',
    tags: ['WebGPU', '端侧推理', '成本优化']
  },
  {
    title: '实时空间计算',
    summary: '基于时空索引的流式数据管道，支持轨迹回放、拥堵预测与区域热力洞察，形成“秒级”智能调度能力。',
    tags: ['时空索引', '流式引擎', '预测']
  },
  {
    title: '生成式地图体验',
    summary: '从“查找点”到“编排场景”，引入自然语言到地图编排 DSL 的转换，帮助业务快速生成运营视图与沙盘。',
    tags: ['NL → DSL', '场景生成', '运营沙盘']
  }
]

const productStories: StoryItem[] = [
  {
    title: '开放平台 3.0：从 API 到能力网格',
    owner: 'Open Platform Team',
    summary: '将经典 REST API 升级为可组合的能力单元（地图、位置、可视化、智能分析），通过网关策略实现弹性调度。',
    learning: '粒度拆分 + 策略网关，显著提升了并发与稳定性。'
  },
  {
    title: '私网地图：安全与体验的平衡',
    owner: 'Private Map Team',
    summary: '在隔离环境下实现同等体验的在线渲染，采用离线瓦片预热与按需增量同步，降低带宽压力。',
    learning: '预热 + 增量同步方案，让私网体验接近公网。'
  },
  {
    title: '空间智能实验室的探索',
    owner: 'Geo AI Lab',
    summary: '构建“地图 → 图谱 → 推理”链路，把地理实体关系转成知识图谱，用于选址、风险评估等决策。',
    learning: '结构化知识让模型的可解释性与复用性更强。'
  },
  {
    title: '数据工厂的自动化演进',
    owner: 'Data Factory',
    summary: '用流水线管理数据采集、质检、标注与发布，引入质量守门人机制和自动报警，提升数据可信度。',
    learning: '质量闸门 + 自动报警，把返工率降到了可控范围。'
  }
]

const outlooks: OutlookItem[] = [
  {
    title: 'AI Native 地图范式',
    summary: '地图正在从静态底图走向动态理解与生成，AI/LLM 成为地图体验的默认入口。'
  },
  {
    title: '隐私与合规优先',
    summary: '隐私计算、差分隐私与可验证日志将成为地图数据的“安全基建”。'
  },
  {
    title: '场景化运营',
    summary: '企业期待“拿来即用”的行业套件，地图能力需要以场景包形式交付。'
  }
]

const bulletins: BulletinItem[] = [
  {
    title: 'Tech Friday #42：矢量瓦片与 WebGPU',
    date: '2026-01-12',
    detail: '分享端侧着色器优化与瓦片压缩方案，附性能数据与实操 demo。'
  },
  {
    title: '产品背后故事 · 专网地图',
    date: '2026-01-05',
    detail: '记录从 PoC 到正式发布的踩坑清单：带宽预算、离线缓存、暗光模式。'
  },
  {
    title: '行业展望圆桌 · 新基建 x 位置智能',
    date: '2025-12-28',
    detail: '城市级数字孪生、物流路线优化、出行安全的模型落地讨论。'
  }
]

const BlackboardPage: React.FC = () => {
  return (
    <div className="blackboard-page">
      <section className="blackboard-hero">
        <div className="chalk-badge">丰图·黑板报</div>
        <h1>内部技术趋势与产品故事</h1>
        <p className="hero-subtitle">
          聚焦“AI Native 地图”与行业落地，记录团队的灵感、踩坑与展望。
        </p>
        <div className="hero-highlights">
          <span>技术趋势</span>
          <span>产品背后故事</span>
          <span>行业展望</span>
          <span>内部分享</span>
        </div>
      </section>

      <section className="blackboard-section">
        <div className="section-header">
          <div className="section-eyebrow">TRENDS</div>
          <h2>技术趋势</h2>
          <p>研发一线正在尝试的方向与可落地的实验。</p>
        </div>
        <div className="cards-grid">
          {techTrends.map((item) => (
            <article key={item.title} className="chalk-card">
              <div className="card-top">
                <span className="pill">趋势</span>
                <h3>{item.title}</h3>
              </div>
              <p className="card-summary">{item.summary}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blackboard-section">
        <div className="section-header">
          <div className="section-eyebrow">STORIES</div>
          <h2>产品背后故事</h2>
          <p>版本迭代的抉择、架构思路与复盘心得。</p>
        </div>
        <div className="cards-grid stories">
          {productStories.map((item) => (
            <article key={item.title} className="chalk-card story-card">
              <div className="card-top">
                <span className="pill">{item.owner}</span>
                <h3>{item.title}</h3>
              </div>
              <p className="card-summary">{item.summary}</p>
              <div className="learning">
                <span className="learning-label">复盘要点</span>
                <p>{item.learning}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blackboard-section compact">
        <div className="section-header">
          <div className="section-eyebrow">OUTLOOK</div>
          <h2>行业展望</h2>
          <p>我们认为值得下注的赛道与策略。</p>
        </div>
        <div className="outlook-grid">
          {outlooks.map((item) => (
            <article key={item.title} className="chalk-card outlook-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="blackboard-section compact">
        <div className="section-header">
          <div className="section-eyebrow">BULLETIN</div>
          <h2>内部快讯</h2>
          <p>团队分享、圆桌与实战笔记，保持周更。</p>
        </div>
        <div className="bulletin-list">
          {bulletins.map((item) => (
            <article key={item.title} className="bulletin-item">
              <div className="bulletin-meta">
                <span className="pill ghost">{item.date}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BlackboardPage
