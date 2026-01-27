import React, { useState } from 'react'
import './GovDataPage.css'

const businessChain = [
  {
    title: '多源汇聚与清洗',
    desc: '多源数据清洗、一标三实落图、统一标准建设'
  },
  {
    title: '资产构建与管理',
    desc: '形成人房企关联图谱、沉淀高可信数据资产'
  },
  {
    title: '多维场景赋能',
    desc: '快速组装能力，支撑发改、住建、应急等业务'
  },
  {
    title: '复盘与效能评估',
    desc: '决策过程可回溯、治理成效可量化'
  }
]

const architectureLayers = [
  {
    name: '场景应用赋能体系',
    icon: '🎯',
    items: [
      { title: '全景招商宣推', icon: '🌍', desc: '沉浸式3D展示与VR全景，驱动招商融资引资' },
      { title: '重大项目会商', icon: '🤝', desc: '多端协同指挥，数据驱动科学决策' },
      { title: '实景指挥调度', icon: '📡', desc: '视空融合精准指挥，快速应急响应' },
      { title: '时空底数治理', icon: '📊', desc: '智能清洗标准化，夯实数字政府底座' },
      { title: '城市更新核查', icon: '🏗️', desc: '三维模型精准量算，成本评估透明化' },
      { title: '网格精细治理', icon: '🔲', desc: '人房企事图谱关联，精准落格管理' }
    ]
  },
  {
    name: '时空数据与能力体系',
    icon: '🗂️',
    items: [
      { title: '多源数据接入', icon: '🔄', desc: '政务/IoT/社会数据统一汇聚，融合共享' },
      { title: '地址质量治理', icon: '🏘️', desc: '24级标准地址智能清洗校核，数据规范化' },
      { title: '时空实体库', icon: '🧩', desc: '人房企事关联图谱动态维护，资产可信化' },
      { title: '模型算法服务', icon: '🧠', desc: '预测分析推理能力，赋能决策引擎' },
      { title: '知识图谱构建', icon: '🔗', desc: '多维数据融合与关联挖掘，智能化深化' }
    ]
  },
  {
    name: '智能引擎与可信底座',
    icon: '⚙️',
    items: [
      { title: '政务可信底座', icon: '🔒', desc: '信创隔离与权限管控，确保数据安全可信' },
      { title: '3DGS渲染引擎', icon: '🎬', desc: '电影级实景即时渲染，打造沉浸体验' },
      { title: '空间计算引擎', icon: '📐', desc: '要素上图缓冲分析，强化空间推理' },
      { title: '视空融合引擎', icon: '🎥', desc: '决策结果实时地图呈现，动态协同管理' },
      { title: '实时协同引擎', icon: '⚡', desc: '多端毫秒级同步操作，赋能高效协作' }
    ]
  }
]

const services = [
  {
    id: 'panorama',
    title: '全景宣推',
    label: '核心能力',
    icon: '🌍',
    content: {
      mainTitle: '全景空间视效与宣推能力',
      sections: [
        {
          subtitle: '所见即所得的沉浸式体验',
          points: [
            '支持UE5/3DGS高逼真场景构建，让规划蓝图"看得见、看得清"。',
            '集成VR全景与云上读地，提升招商引资的展示形象。'
          ]
        },
        {
          subtitle: '数据驱动的动态展示',
          points: [
            '支持BIM模型与倾斜摄影融合，经济指标与三维场景联动，让汇报数据直观易懂。'
          ]
        }
      ]
    }
  },
  {
    id: 'coordination',
    title: '协同会商',
    label: '核心能力',
    icon: '🤝',
    content: {
      mainTitle: '多维空间协同会商能力',
      sections: [
        {
          subtitle: '跨部门异地同屏协作',
          points: [
            '内置多端实时协同引擎，实现大屏、PC、移动端毫秒级同步，打破时空限制。',
            '支持多部门数据在"一张图"上叠加比对，辅助联合会议。'
          ]
        },
        {
          subtitle: '专业的空间分析工具',
          points: [
            '提供通视分析、控高检测、淹没范围计算等工具，让会商基于数据说话。'
          ]
        }
      ]
    }
  },
  {
    id: 'realtime-command',
    title: '实景指挥',
    label: '核心能力',
    icon: '🎯',
    content: {
      mainTitle: '视空融合与实景指挥能力',
      sections: [
        {
          subtitle: '虚实结合的立体看盘',
          points: [
            '融合视频与三维地图（VideoGIS），实现"指哪看哪"，消除监控画面与地图位置的割裂感。',
            '支持无人机、高点、地面视频的多视角融合，还原现场真实态势。'
          ]
        },
        {
          subtitle: '突发事件快速响应',
          points: [
            '基于位置智能推荐周边警力与物资，支持路径规划与IoT设备联动，提升调度效率。'
          ]
        }
      ]
    }
  },
  {
    id: 'bottom-data',
    title: '底数治理',
    label: '核心能力',
    icon: '📊',
    content: {
      mainTitle: '时空底数治理与清洗能力',
      sections: [
        {
          subtitle: '让政务数据更规范',
          points: [
            '内置智能NLP引擎，对杂乱的业务地址进行清洗、标准化与落图，解决"底数不清"难题。',
            '构建24级标准地址库，为各委办局提供统一的空间数据基准。'
          ]
        },
        {
          subtitle: '数据资产化与动态更新',
          points: [
            '建立数据长效更新机制，确保业务所依仗的数据源头是鲜活、准确的。'
          ]
        }
      ]
    }
  },
  {
    id: 'urban-renewal',
    title: '城市更新',
    label: '场景应用',
    icon: '🏗️',
    content: {
      mainTitle: '城市更新现状核查与量算',
      sections: [
        {
          subtitle: '现状数据的精准量算',
          points: [
            '基于高精度三维模型与矢量数据，自动计算拆迁范围内的建筑面积与体量，辅助成本摸底。'
          ]
        },
        {
          subtitle: '多规冲突智能检测',
          points: [
            '自动叠加土规、城规、红线数据，智能识别选址的空间冲突，辅助合规性审查。'
          ]
        }
      ]
    }
  },
  {
    id: 'grid-management',
    title: '网格管理',
    label: '场景应用',
    icon: '🔲',
    content: {
      mainTitle: '网格化精细治理能力',
      sections: [
        {
          subtitle: '以图管房，以房管人',
          points: [
            '构建"人-房-企-事"关联图谱，实现对流动人口与重点隐患的精准落格。'
          ]
        },
        {
          subtitle: '区域热点分析',
          points: [
            '基于时空大数据分析警情与矛盾纠纷的热力分布，辅助综治力量优化部署。'
          ]
        }
      ]
    }
  }
]

const footerValues = [
  {
    title: '数据可信',
    subtitle: '精准清洗，底数清晰',
    desc: '通过NLP与空间关联技术，解决数据"脏乱差"问题，确保治理底数准确可信。'
  },
  {
    title: '敏捷化赋能',
    subtitle: '组件积木，快速落地',
    desc: '基于原子能力模块，快速搭建招商、应急等不同业务场景，缩短建设周期。'
  },
  {
    title: '精准化决策',
    subtitle: '数实融合，科学治理',
    desc: '依托精准的空间计算与全量的底数关联，让每一次政策制定与调度指挥都有据可依。'
  }
]

const GovDataPage: React.FC = () => {
  const [activeService, setActiveService] = useState('panorama')

  const renderArchitectureLayer = (layer: typeof architectureLayers[0]) => {
    return (
      <div key={layer.name} className="architecture-layer">
        <h3 className="layer-title">
          <span className="layer-icon">{layer.icon}</span>
          {layer.name}
        </h3>
        <div className="layer-grid">
          {layer.items.map((item) => (
            <div key={item.title} className="layer-item">
              <div className="item-icon">{item.icon}</div>
              <div className="item-content">
                <h4>{item.title}</h4>
                {item.desc && <p>{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const activeServiceData = services.find(s => s.id === activeService)

  return (
    <div className="gov-data-page">
      <div className="gov-data-container">
        {/* SECTION 1: HERO */}
        <section className="hero">
          <div className="hero-text">
            <h1>泛政府位置智能服务专家</h1>
            <h2 className="hero-subtitle">夯实数字政府"时空底座"，提升城市治理精细化水平</h2>
            <p className="hero-lead">激活时空数据价值，支撑"集约建设、赋能百业"的数字政府新范式</p>
            <div className="hero-actions">
              <div className="cta-block">
                <button className="btn-primary">预约专家演示</button>
              </div>
              <div className="cta-block">
                <button className="btn-secondary">查看场景案例</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 业务链条 */}
        <section className="section-block">
          <h2 className="section-title">从底数治理到业务实战的全链路服务</h2>
          <div className="business-chain">
            {businessChain.map((item, idx) => (
              <div key={idx} className="chain-step">
                <div className="chain-number">{idx + 1}</div>
                <div className="chain-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: 产品架构 */}
        <section className="section-block">
          <h2 className="section-title">泛政府位置智能服务产品架构</h2>
          <p className="section-subtitle">三层架构：场景应用赋能体系 → 时空数据与能力体系 → 智能引擎与安全底座</p>
          <div className="architecture-diagram">
            {architectureLayers.map(renderArchitectureLayer)}
          </div>
        </section>

        {/* SECTION 4: 核心服务 */}
        <section className="section-block">
          <h2 className="section-title">核心服务与场景应用</h2>
          <div className="services-container">
            <div className="services-menu">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={`service-menu-item ${activeService === service.id ? 'active' : ''}`}
                  onClick={() => setActiveService(service.id)}
                >
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-name">{service.title}</span>
                </button>
              ))}
            </div>
            <div className="services-detail">
              {activeServiceData && (
                <div className="detail-content">
                  <div className="detail-header">
                    <h3>{activeServiceData.content.mainTitle}</h3>
                    <span className="detail-label">{activeServiceData.label}</span>
                  </div>
                  {activeServiceData.content.sections.map((section, idx) => (
                    <div key={idx} className="detail-section">
                      <h4>{section.subtitle}</h4>
                      <ul className="detail-points">
                        {section.points.map((point, pidx) => (
                          <li key={pidx}>
                            <span className="bullet">●</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button className="btn-detail-action">了解详情</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 5: 价值总结 */}
        <section className="section-block footer-section">
          <h2 className="section-title">从"数据汇聚"到"集约共智"的城市治理新模式</h2>
          <p className="section-subtitle">所有数据，最终都必须赋能业务实战</p>
          <div className="footer-values">
            {footerValues.map((value) => (
              <div key={value.title} className="value-card">
                <h4 className="value-title">{value.title}</h4>
                <p className="value-subtitle">{value.subtitle}</p>
                <p className="value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default GovDataPage
