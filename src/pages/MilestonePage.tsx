import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MilestonePage.css'

const MilestonePage: React.FC = () => {
  const navigate = useNavigate()
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setVisibleSections((prev) => new Set(prev).add(index))
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const quarters = [
    {
      id: 'q1',
      quarter: '2025 · Q1',
      mainTitle: '战略焕新，锚定"智理时空"',
      sections: [
        {
          type: 'actions',
          title: '',
          items: [
            '发布全新愿景：成为客户信赖的时空大数据服务商',
            '明确使命：让数据更可信，让决策更智能',
            '确立"数据治理管家 × 增长探路者"双重定位',
            '全面启动 AI × 时空数据的战略升级'
          ]
        }
      ]
    },
    {
      id: 'q2',
      quarter: '2025 · Q2',
      mainTitle: '时空底座成型，合规能力突破',
      sections: [
        {
          type: 'actions',
          title: '核心资产规模化',
          items: [
            '构建全要素时空底座，夯实空间数据资产能力',
            'AOI 数据突破 528 万',
            '建筑物数据突破 6456 万',
            '语义地址规模达 206 亿',
            '标准地址总量达 4.8 亿'
          ]
        },
        {
          type: 'actions',
          title: '合规能力突破',
          items: [
            '成功获得互联网地图审图号',
            '发布全国互联网地图服务',
            'AI 自动构建 850 万公里全国道路数据',
            '完成专网地图体系建设，支撑多模态与复杂场景'
          ]
        }
      ]
    },
    {
      id: 'q3',
      quarter: '2025 · Q3',
      mainTitle: 'AI 能力跃迁与产品全面落地',
      sections: [
        {
          type: 'actions',
          title: 'AI 能力跃迁',
          items: [
            '发布 AI 问图：自然语言驱动地图交互与制图',
            '实现"知识库驱动工具构建智能体"的架构升级',
            '上线时空立方体、数据上图、图表分析等能力',
            '地址治理体系升级至 24 级标准，推出地址治理 AI 智能体'
          ]
        },
        {
          type: 'actions',
          title: '政务与城市产品落地',
          items: [
            'VR 全景平台实现实景三维 × 沉浸式浏览',
            '警务智能体投入实战，支撑警情研判与路径规划',
            'CIM + AI 城市空间会商平台上线',
            '信创数字孪生一体机发布，适配政企本地化部署',
            '建筑垃圾监管平台升级至 V2.0',
            '人工智能环卫机器人平台实现多品牌统一管理'
          ]
        }
      ]
    },
    {
      id: 'q4',
      quarter: '2025 · Q4',
      mainTitle: '生态共建与场景验证',
      sections: [
        {
          type: 'actions',
          title: '生态共建',
          items: [
            '合作生态伙伴规模突破 500+',
            '与多地政数、公安、高校共建联合实验室',
            '共建运营型空间数据标注中心',
            '推动"数据 → 资产 → 生产力"的体系化落地'
          ]
        },
        {
          type: 'scenarios',
          title: '场景验证',
          scenarios: [
            {
              name: '政数领域',
              desc: '服务 140+ 客户，覆盖 30+ 地区｜昆山项目获"数据要素×"全国总决赛三等奖'
            },
            {
              name: '公安领域',
              desc: '服务 190+ 客户，覆盖 20+ 地区｜推进寄递安全与警务空间智能协同'
            },
            {
              name: '城管环卫',
              desc: '覆盖 200+ 城市｜深圳、太原等项目形成示范'
            },
            {
              name: '企业服务',
              desc: '自动驾驶合规地图项目营收超千万元｜运营商年度合作规模预计超 2000 万元'
            }
          ]
        }
      ]
    },
    {
      id: 'year-full',
      quarter: '2025 · 全年',
      mainTitle: '专业沉淀，载誉前行',
      sections: [
        {
          type: 'summary',
          title: '',
          items: [
            '累计申请专利 410+',
            '软件著作权登记 390+',
            '荣获：中国地理信息科技进步奖 一等奖、地理信息产业优秀工程金奖、"数据要素×"国家级与省级多项荣誉'
          ]
        }
      ]
    }
  ]

  return (
    <div className="milestone-page">
      {/* 页面标题区（Hero） */}
      <header className="milestone-hero">
        <div className="hero-content">
          <h1 className="hero-title">2025 · 丰图科技年度里程碑</h1>
          <p className="hero-subtitle">行至春天处 · 山河皆成图</p>
          <div className="hero-divider"></div>
          <p className="hero-intro">
            可信时空数据 × AI 驱动决策
          </p>
        </div>
      </header>

      {/* 主要内容容器 */}
      <div className="milestone-main">
        {/* 竖向时间线 */}
        <div className="timeline-spine"></div>
        
        {quarters.map((quarter, quarterIndex) => (
          <div
            key={quarter.id}
            ref={(el) => (sectionRefs.current[quarterIndex] = el)}
            className={`quarter-section ${visibleSections.has(quarterIndex) ? 'visible' : ''}`}
          >
            {/* 时间线节点 */}
            <div className="timeline-node">
              <div className="node-dot"></div>
              <div className="node-label">{quarter.quarter}</div>
            </div>
            {/* Timeline 标题 */}
            <div className="timeline-section-title">
              <div className="divider-line"></div>
              <h2 className="timeline-title">{quarter.quarter}</h2>
              <div className="divider-line"></div>
            </div>

            {/* 主标题 */}
            <h2 className="quarter-main-title">{quarter.mainTitle}</h2>

            {/* 分割线 */}
            <div className="content-divider"></div>

            {/* 内容部分 */}
            <div className="quarter-content">
              {quarter.sections.map((section: any, sectionIndex: number) => {
                if (section.type === 'actions') {
                  return (
                    <div key={sectionIndex} className="content-block actions-block">
                      <h3 className="block-title">{section.title}</h3>
                      <ul className="block-list">
                        {(section.items as string[])?.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )
                } else if (section.type === 'scenarios') {
                  return (
                    <div key={sectionIndex} className="content-block scenarios-block">
                      <h3 className="block-title">{section.title}</h3>
                      <div className="scenarios-grid">
                        {(section.scenarios as any[])?.map((scenario: any, idx: number) => (
                          <div key={idx} className="scenario-item">
                            <h4 className="scenario-name">{scenario.name}</h4>
                            <p className="scenario-desc">{scenario.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                } else if (section.type === 'summary') {
                  return (
                    <div key={sectionIndex} className="content-block summary-block">
                      <h3 className="block-title">{section.title}</h3>
                      <ul className="block-list">
                        {(section.items as string[])?.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      {(section as any).note && (
                        <p className="summary-note">{(section as any).note}</p>
                      )}
                    </div>
                  )
                }
                return null
              })}
            </div>

            {/* 章节之间的分割线 */}
            {quarterIndex < quarters.length - 1 && (
              <div className="section-divider">
                <div className="divider-line"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 页面结语（Footer） */}
      <footer className="milestone-footer">
        <div className="footer-content">
          <div className="footer-divider"></div>
          <p className="footer-epilogue">
            行至春天处，山河皆成图。
          </p>
          <p className="footer-tagline">
            2025 · 丰图科技<br />
            可信时空数据 · AI 驱动决策
          </p>
          <button className="back-home-btn" onClick={() => navigate('/')}>
            返回首页
          </button>
        </div>
      </footer>
    </div>
  )
}

export default MilestonePage
