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
      quarter: '',
      timelineTitle: 'Timeline · 2025 · Q1',
      mainTitle: '战略升级：AI 成为决策能力的内在引擎',
      sections: [
        {
          type: 'core-judgment',
          title: 'Q1 · 核心判断',
          content: '2025 年，丰图重新审视空间数据在行业中的真实价值：\n行业真正需要的，不是更多数据，而是更可靠的决策依据。\n\nAI 在这一阶段被明确为"能力引擎"，\n不是替代业务判断，而是帮助行业在复杂现实中，\n把可信的数据转化为可执行的决策。'
        },
        {
          type: 'actions',
          title: 'Q1 · 战略动作',
          items: [
            '升级愿景、使命与价值观，明确"可信时空数据 × AI 决策赋能"的长期方向',
            '确立"数据治理管家 × 增长探路者"的双重角色',
            '从"数据交付"转向"决策参与"，推动 AI 能力嵌入业务流程',
            '明确以行业场景效果，而非功能堆叠，作为能力演进标准'
          ]
        },
        {
          type: 'business-value',
          title: 'Q1 · 行业决策价值',
          items: [
            '行业客户开始围绕统一、可信的空间事实讨论"如何行动"',
            '决策焦点从"数据是否正确"转向"方案是否最优"',
            '空间数据第一次以"决策输入"的身份进入业务核心环节'
          ]
        }
      ]
    },
    {
      id: 'q2',
      quarter: '',
      timelineTitle: 'Timeline · 2025 · Q2',
      mainTitle: '时空底座成型：为 AI 决策构建统一认知基础',
      sections: [
        {
          type: 'core-judgment',
          title: 'Q2 · 核心判断',
          content: 'AI 能否支撑行业决策，前提不在算法，而在数据是否\n统一、可信、可持续演进。'
        },
        {
          type: 'actions',
          title: 'Q2 · 底座建设',
          items: [
            '构建全要素、全覆盖的时空底座体系',
            '统一治理 AOI、建筑物、地址与语义体系',
            '将分散空间信息升级为可被 AI 理解和推理的结构化资产',
            '为跨部门、跨系统、跨行业的智能决策提供统一认知基础'
          ]
        },
        {
          type: 'data-scale',
          title: 'Q2 · 核心数据规模',
          items: [
            'AOI：528 万',
            '建筑物：6456 万',
            '语义地址：206 亿',
            '标准地址：4.8 亿'
          ]
        },
        {
          type: 'business-value',
          title: 'Q2 · 行业决策价值',
          items: [
            '政务与行业会商基于同一空间事实开展，减少认知偏差',
            'AI 可以在统一底座上进行空间推理与关联分析',
            '决策从经验驱动，逐步转向数据与智能协同驱动'
          ]
        }
      ]
    },
    {
      id: 'q3',
      quarter: '',
      timelineTitle: 'Timeline · 2025 · Q3',
      mainTitle: '能力与场景进化：AI 走进真实业务决策现场',
      sections: [
        {
          type: 'core-judgment',
          title: 'Q3 · 核心判断',
          content: '如果 AI 只能被专家使用，就无法真正改变行业决策方式。'
        },
        {
          type: 'actions',
          title: 'Q3 · 能力进化',
          items: [
            '通过自然语言交互，让业务人员直接调用空间与 AI 能力',
            '地址治理从人工规则，升级为 AI 自动发现、校验与演化',
            '24 级地址标准为 AI 提供精细化空间语义基础',
            '网格与空间分析能力下沉到一线业务角色'
          ]
        },
        {
          type: 'scenarios',
          title: 'Q3 · 场景落地',
          scenarios: [
            {
              name: '实景三维与 VR',
              desc: '让决策者"所见即所判"'
            },
            {
              name: '警务场景',
              desc: 'AI 辅助警情研判与路径规划'
            },
            {
              name: '城市治理',
              desc: '多部门在同一空间视角下协同决策'
            },
            {
              name: '城管与环卫',
              desc: '实现从感知到调度的智能闭环'
            }
          ]
        },
        {
          type: 'business-value',
          title: 'Q3 · 行业决策价值',
          items: [
            '决策不再依赖少数 GIS 或系统专家',
            'AI 成为业务人员的"空间判断助手"',
            '决策效率提升，同时降低试错与沟通成本'
          ]
        }
      ]
    },
    {
      id: 'q4',
      quarter: '',
      timelineTitle: 'Timeline · 2025 · Q4',
      mainTitle: '价值验证与生态共建：让 AI 决策能力持续生长',
      sections: [
        {
          type: 'core-judgment',
          title: 'Q4 · 核心判断',
          content: '真正有效的 AI 决策能力，必须在真实业务中反复验证，\n并在生态协同中持续进化。'
        },
        {
          type: 'verification',
          title: 'Q4 · 价值验证',
          verification: [
            {
              name: '政数场景',
              desc: 'AI 参与城市级时空治理与运行决策'
            },
            {
              name: '公安场景',
              desc: '空间智能支撑寄递安全与协同处置'
            },
            {
              name: '城管环卫',
              desc: '从系统上线走向 AI 辅助的持续运营'
            },
            {
              name: '企业与物流',
              desc: 'AI 地址与 AOI 推理直接创造业务收益'
            }
          ]
        },
        {
          type: 'actions',
          title: 'Q4 · 生态共建',
          items: [
            '与政务、公安、高校共建联合实验室',
            '建设长期运行的数据治理与标注体系',
            '通过真实业务反馈持续训练与优化能力'
          ]
        },
        {
          type: 'business-value',
          title: 'Q4 · 行业决策价值',
          items: [
            'AI 不再停留在"功能层"，而是成为决策体系的一部分',
            '空间能力从项目成果，升级为可复用的行业决策底座'
          ]
        }
      ]
    },
    {
      id: 'year-summary',
      quarter: '',
      timelineTitle: 'Timeline · 2025 · 全年总结',
      mainTitle: '专业沉淀与长期主义',
      sections: [
        {
          type: 'summary',
          title: '年度成就',
          items: [
            '累计申请专利：410+',
            '软件著作权登记：390+',
            '多项国家级与行业级重要奖项'
          ],
          note: '这些沉淀，确保 AI 与空间智能能力能够长期、稳定、可持续地服务行业。'
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
          <p className="hero-subtitle">让可信时空数据，在 AI 赋能下真正服务行业决策</p>
          <div className="hero-divider"></div>
          <p className="hero-intro">
            当空间数据被 AI 理解、被业务调用、被决策验证，<br />
            它才真正成为推动行业运转的生产力。
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
              <h2 className="timeline-title">{quarter.timelineTitle}</h2>
              <div className="divider-line"></div>
            </div>

            {/* 主标题 */}
            <h2 className="quarter-main-title">{quarter.mainTitle}</h2>

            {/* 分割线 */}
            <div className="content-divider"></div>

            {/* 内容部分 */}
            <div className="quarter-content">
              {quarter.sections.map((section: any, sectionIndex: number) => {
                if (section.type === 'core-judgment') {
                  return (
                    <div key={sectionIndex} className="content-block core-judgment-block">
                      <h3 className="block-title">{section.title}</h3>
                      <p className="block-text">{section.content as string}</p>
                    </div>
                  )
                } else if (section.type === 'actions') {
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
                } else if (section.type === 'data-scale') {
                  return (
                    <div key={sectionIndex} className="content-block data-scale-block">
                      <h3 className="block-title">{section.title}</h3>
                      <div className="data-grid">
                        {(section.items as string[])?.map((item: string, idx: number) => (
                          <div key={idx} className="data-item">
                            <span className="data-label">{item.split('：')[0]}</span>
                            <span className="data-value">{item.split('：')[1]}</span>
                          </div>
                        ))}
                      </div>
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
                } else if (section.type === 'verification') {
                  return (
                    <div key={sectionIndex} className="content-block verification-block">
                      <h3 className="block-title">{section.title}</h3>
                      <div className="verification-grid">
                        {(section.verification as any[])?.map((item: any, idx: number) => (
                          <div key={idx} className="verification-item">
                            <h4 className="verification-name">{item.name}</h4>
                            <p className="verification-desc">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                } else if (section.type === 'business-value') {
                  return (
                    <div key={sectionIndex} className="content-block business-value-block">
                      <h3 className="block-title">{section.title}</h3>
                      <ul className="block-list value-list">
                        {(section.items as string[])?.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
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
            当 AI 不再只是分析数据，<br />
            而是参与判断与行动，<br />
            空间数据才真正进入决策时代。
          </p>
          <p className="footer-tagline">
            2025 · 丰图科技<br />
            可信时空数据 · AI 赋能的行业决策底座
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
