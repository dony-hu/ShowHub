import React, { useState } from 'react'
import './SalesTrainingPage.css'

interface Stage {
  id: string
  title: string
  subtitle: string
  description: string
  stage: string
  core: string
  aiAbility: string
}

interface CapabilityDimension {
  dimension: string
  requirement: string
  details: string[]
}

interface CustomerStage {
  id: string
  title: string
  subtitle: string
  mindset: string[]
  dimensions: CapabilityDimension[]
}

// 关键词映射与颜色强调
const highlightKeywords = (text: string) => {
  const keywords: { [key: string]: string } = {
    '执行力': 'keyword-primary',
    '资源整合力': 'keyword-primary',
    '战略经营力': 'keyword-primary',
    '客户关系': 'keyword-primary',
    '项目运作': 'keyword-primary',
    '产品': 'keyword-secondary',
    '工具': 'keyword-secondary',
    'AI': 'keyword-ai',
    '人机协同': 'keyword-ai',
    '数智化': 'keyword-ai',
    '销售': 'keyword-highlight',
    '战略': 'keyword-primary',
    '经营': 'keyword-primary',
    '创新': 'keyword-secondary'
  }

  let result = text
  Object.entries(keywords).forEach(([word, className]) => {
    const regex = new RegExp(`(${word})(?!>)`, 'g')
    result = result.replace(regex, `<span class="${className}">$1</span>`)
  })
  return result
}

const DimensionIcon: { [key: string]: string } = {
  '维度': '📊',
  '能力': '💡',
  '执行': '⚡',
  '关系': '🤝',
  '策划': '📋',
  '导演': '🎬',
  '拜访': '👥',
  '策略': '🎯',
  '运作': '⚙️',
  '布局': '🗺️',
  '传承': '📚',
  '生态': '🌍',
  '任务': '✅',
  '听令': '👂',
  '融入': '🔗',
  '基础': '🏗️',
  '骨干': '💪',
  '带动': '🚀',
  '师徒': '👨‍🏫',
  '视野': '👁️',
  '发展': '📈',
  '资源': '💼',
  'AI': '🤖',
  '画笔': '✏️'
}

const getIcon = (text: string): string => {
  for (const [key, icon] of Object.entries(DimensionIcon)) {
    if (text.includes(key)) {
      return icon
    }
  }
  return '•'
}

const formatRequirement = (text: string): string => {
  return text.replace(/^能力要求\s*[—-]*\s*/u, '').trim()
}

const SalesTrainingPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentOrganizationIndex, setCurrentOrganizationIndex] = useState(0)

  const stages: Stage[] = [
    {
      id: 'running-sales',
      title: '跑动型销售',
      subtitle: '"铁脚板与勤务兵"',
      description: '"平时勤跑动，有需求就找我。" 业务是表，人情是里。我是最勤奋的信使，不被客户排除在门外就是胜利。',
      stage: '入门/成长期',
      core: '执行力至上。这个阶段主要靠勤奋和态度。你是连接公司与客户的物理管道，主要任务是跑得勤、脸皮厚、听指挥。',
      aiAbility: '开始尝试用AI写日报、查资料，主要为了省下时间多跑两家客户。'
    },
    {
      id: 'director-sales',
      title: '导演型销售',
      subtitle: '"多面手与组局者"',
      description: '"我是导演，这场戏我说了算。" 知道胜负手在哪里，知道资源在哪里；既能搞定人，也能搞定事。',
      stage: '骨干/主力期',
      core: '资源整合力。这个阶段主要靠脑子和情商。你不再单打独斗，而是像导演一样，拿着剧本（项目策略），指挥灯光（产品）、舞美（交付）、群演（伙伴）在客户面前演好一场大戏。',
      aiAbility: '会用AI做竞争分析、方案美化、模拟谈判，把工具变成自己的"副官"。'
    },
    {
      id: 'business-expert',
      title: '经营型专家',
      subtitle: '"运筹帷幄的操盘手"',
      description: '"运筹帷幄决胜千里。" 不只看现在的签单，看到的是未来的格局和生态。',
      stage: '专家/管理期',
      core: '战略经营力。这个阶段主要靠格局和数智化思维。你关注的不是单一项目的输赢，而是整个区域/行业的生态布局和利润经营。',
      aiAbility: '善用数据和智能分析来辅助战略决策，用AI洞察宏观趋势，实现降维打击。'
    }
  ]

  const capabilities = [
    {
      id: 'customer-insight',
      title: '1. 客户关系',
      subtitle: '(Customer Insight)',
      definition: '联结产品与用户的纽带。',
      elements: '从"混脸熟"到"深层互信"，再到建立排他性的"战略绑定"。不仅是搞定人，更是洞察人心。'
    },
    {
      id: 'project-orchestration',
      title: '2. 项目运作',
      subtitle: '(Project Orchestration)',
      definition: '将线索转化为业绩的作战过程。',
      elements: '包含商机挖掘、竞争策略制定、招投标操盘及全流程风险控制。核心是从"碰运气"变为"可复制的胜利"。'
    },
    {
      id: 'product-tools',
      title: '3. 产品、工具与数智化',
      subtitle: '(Product, Tools & AI)',
      definition: '销售的武器库与外挂。',
      elements: '产品力：懂产品，能把复杂的技术讲成人话。工具力：熟练运用CRM/OA等流程工具，合规高效。AI适配：(新增) 将AI视为画笔，熟练使用智能工具辅助文案生成、情报分析和效率提升，做"人机协同"的新型销售。'
    },
    {
      id: 'organizational-synergy',
      title: '4. 组织运作',
      subtitle: '(Organizational Synergy)',
      definition: '调动资源的杠杆能力。',
      elements: '能够跨部门协同，建立内部口碑，让后端的研发、交付、售前愿意为你"卖命"。'
    },
    {
      id: 'business-strategy',
      title: '5. 经营与战略',
      subtitle: '(Business Strategy)',
      definition: '决定职业高度的顶层思维。',
      elements: '具备财务视角（ROI/利润）、长期主义思维和市场大局观，从"做生意"上升到"经营事业"。'
    }
  ]

  const customerStages: CustomerStage[] = [
    {
      id: 'customer-running',
      title: '跑动型销售',
      subtitle: '"铁脚板与勤务兵"',
      mindset: [
        '"平时勤跑动，有需求就找我。"',
        '"不管合作成功与否，互不埋怨，边界清晰。"'
      ],
      dimensions: [
        {
          dimension: '中基层覆盖(执行者)',
          requirement: '能力要求 -- 建立连接与信息通畅',
          details: [
            '与客户侧的采购、技术等执行层建立私交，能约饭、能聊私事。',
            '建立排他性的双向沟通通道，确保关键信息不堵塞。',
            '能够第一时间获知需求，保证自己始终在备选名单里，不被排除在外。'
          ]
        },
        {
          dimension: '中高层触达(破冰者)',
          requirement: '能力要求 - 借力混个脸熟',
          details: [
            '依靠伙伴或公司内部高层资源触达客户领导，尝试接触。',
            '自己心里要有数：如何利用这根"拐杖"去达成建立关系的目的，要有规划。'
          ]
        },
        {
          dimension: '伙伴关系(协作者)',
          requirement: '能力要求 - 互信与边界',
          details: [
            '在业务中建立信任，过程对伙伴经理充分开放。',
            '遇到项目状况能平稳处理，不甩锅，维持长期合作的可能性。',
            '在伙伴资源不足时，懂得主动求助或通过自身努力补位。'
          ]
        },
        {
          dimension: 'AI 能力',
          requirement: '能力要求 - 信息采集员',
          details: [
            '善用搜索工具和AI，在拜访前整理好客户的基础信息，不做"白纸"去见人。'
          ]
        }
      ]
    },
    {
      id: 'customer-director',
      title: '导演型销售',
      subtitle: '"多面手与组局者"',
      mindset: [
        '"我是导演，我是最懂客户的人，组织内外部资源围绕客户作业。"',
        '"我的客户关系是一张网，投资建设是个计划，我也有我的参与计划。"'
      ],
      dimensions: [
        {
          dimension: '中高层突破(攻坚者)',
          requirement: '能力要求 - 建立品牌与独立对话',
          details: [
            '对中高层关系有清晰的策划和目标，并能落地执行。',
            '建立个人品牌，能够在知会伙伴（拐棍）的情况下，独立触达客户高层。',
            '建立高度互信，有任何突发情况，能一通电话谈清楚。'
          ]
        },
        {
          dimension: '全景洞察(策划者)',
          requirement: '能力要求 - 预算与计划掌控',
          details: [
            '清楚客户全年的预算盘子。',
            '哪怕客户还没动，你对于每一笔建设资金，都已经有了清晰的参与计划。'
          ]
        },
        {
          dimension: '伙伴深度协同(导演者)',
          requirement: '能力要求 - 透明互通与稳定',
          details: [
            '与伙伴老板/高层建立互信，对伙伴手里的资源（关系、资金、物料）门儿清。',
            '过程经得起评估，双方信息实时互通，确保谈好的事情不会被竞争对手突然"截胡"。'
          ]
        },
        {
          dimension: 'AI 能力',
          requirement: '能力要求 - 情感维护师',
          details: [
            '利用数字化工具记录客户偏好，辅助制定精细化的关系维护日历。'
          ]
        }
      ]
    },
    {
      id: 'customer-expert',
      title: '经营型专家',
      subtitle: '"运筹帷幄的操盘手"',
      mindset: [
        '"我是最懂客户的人！无敌是多么寂寞，我要打十个。"',
        '"我是导演，组织内外部资源围绕客户作业。"'
      ],
      dimensions: [
        {
          dimension: '战略绑定(顾问者)',
          requirement: '能力要求 - 成为圈内人与COACH',
          details: [
            '不仅仅是供应商，更是客户业务的"问计对象"，逐步融入核心圈子。',
            '对客户业务了若指掌，能结合我司方案给出建设性意见，并被信任和采纳。',
            '成为客户关键决策人的 Coach（顾问/教练）。'
          ]
        },
        {
          dimension: '生态统治力(操盘者)',
          requirement: '能力要求 - 屏蔽对手与组织化',
          details: [
            '有极强的组织意识，通过例会、分析会等机制，组织内外部资源围绕客户运转。',
            '你的客户关系是一张密不透风的网，能有效屏蔽竞争对手的干扰。'
          ]
        },
        {
          dimension: '伙伴驾驭(领袖者)',
          requirement: '能力要求 - 资源与利益共同体',
          details: [
            '与伙伴形成深度的利益共同体，在项目运作的前、中、后保持高度一致。',
            '能驾驭复杂的伙伴关系，确保在任何变动下，核心资源始终为你所用。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '能力要求 - 趋势预言家',
          details: [
            '利用智能工具洞察行业宏观趋势，为客户高层提供高价值的战略咨询建议。'
          ]
        }
      ]
    }
  ]

  const projectOperationsData = [
    {
      stage: 'running',
      title: '跑动型销售 - "铁脚板与勤务兵"',
      mindset: {
        negative: ['"竞争激烈，我想低价冲一下。"', '"丢都丢了，赶紧埋了。"'],
        positive: '"项目运作是个经验活，但不是碰运气。多复盘，才能长记性。"'
      },
      dimensions: [
        {
          dimension: '项目前：嗅觉(感知)',
          requirement: '信息收集与基础引导',
          details: [
            '通过客户或伙伴了解项目基本信息和大致竞争情况。',
            '能协同产品经理，对客户的产品配置做出部分有效的引导。'
          ]
        },
        {
          dimension: '项目中：执行(合规)',
          requirement: '流程规范与风险意识',
          details: [
            '对如何响应项目玩法有清醒认知，按流程办事。',
            '脑中要有弦：对于不确定性和变化保持敏感，一旦超纲（如价格兜不住），立刻发起项目分析会求助，不做"铁头大王"。',
            '确保投标结果与预判基本一致，不出现低级失误。'
          ]
        },
        {
          dimension: '项目后：复盘(成长)',
          requirement: '诚实记录与反思',
          details: [
            '无论成败，都要进行清晰复盘，并将重大项目录入系统。',
            '哪怕输了，也要知道输在哪儿（价格？关系？配置？），为下一次积累经验。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '效率工具人',
          details: [
            '利用AI工具辅助编写标书基础内容、检查合规性，提升文档处理效率。'
          ]
        }
      ]
    },
    {
      stage: 'director',
      title: '导演型销售 - "多面手与组局者"',
      mindset: {
        positive: '"我大概知道项目走向，开始找盟友了。" "大家保持步调，收益大大滴。"'
      },
      dimensions: [
        {
          dimension: '项目前：策划(布局)',
          requirement: '预判局势与资源认知',
          details: [
            '基于当前的手牌（关系、伙伴、内部资源），对项目走向有大致预判。',
            '清晰知道自己的致胜点在哪里，也知道缺什么资源，并且知道去哪里找这些资源来补位。'
          ]
        },
        {
          dimension: '项目中：导演(整合)',
          requirement: '资源 Buy-in 与协同',
          details: [
            '以成功为目标，主动协调内外部资源。',
            '让尽量多的资源方（售前、交付、伙伴）Buy-in（认可）你的策略，并愿意陪你一起投入。',
            '确保所有资源在投标阶段保持步调一致，投标结果符合预期。'
          ]
        },
        {
          dimension: '项目后：铺垫(延续)',
          requirement: '持续改进与滚动开发',
          details: [
            '围绕该客户，在项目后持续改进关系和资源布局。',
            '利用交付过程中的接触，为下一轮项目运作做铺垫（挖坑、种草）。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '模拟陪练',
          details: [
            '在重大谈判前，利用AI进行模拟对练（Role Play），完善应答话术和谈判策略。'
          ]
        }
      ]
    },
    {
      stage: 'expert',
      title: '经营型专家 - "运筹帷幄的操盘手"',
      mindset: {
        positive: '"运筹帷幄，相信我，包赢的。"'
      },
      dimensions: [
        {
          dimension: '项目前：锁定(控盘)',
          requirement: '清晰牵引与资源落实',
          details: [
            '对项目有绝对清晰的目标，对内外部资源有强力的牵引和落实能力。',
            '能时刻掌握关键资源，甚至在开局前就通过前期运作屏蔽掉大部分竞争对手。'
          ]
        },
        {
          dimension: '项目中：收割(获益)',
          requirement: '获得更优条件',
          details: [
            '依靠前期良好的协同，获得比竞争对手更优的项目达成条件（如更有利的付款方式、更高的溢价）。',
            '屏蔽对手：甚至能做到兵不血刃，直接屏蔽全部对手。'
          ]
        },
        {
          dimension: '项目后：经营(ROI)',
          requirement: '关注利润与投资回报',
          details: [
            '开始具备极强的经营意识，不只看赢没赢，更看赢得值不值。',
            '关注项目群的整体盈利、风险控制和ROI（投资回报率），确保各资源投入方都能获得期望收益。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '数据决策',
          details: [
            '利用历史数据和智能分析，辅助制定最优报价策略，平衡胜率与利润率。'
          ]
        }
      ]
    }
  ]

  const productToolsData = [
    {
      stage: 'running',
      title: '跑动型销售 - "铁脚板与勤务兵"',
      mindset: {
        negative: ['"周一例会我最忙，反正我不听。"', '"PPT？那是产品经理的事，跟我有啥关系。"'],
        positive: '"产品、工具是士兵的枪。上战场要握紧自己的枪。"'
      },
      dimensions: [
        {
          dimension: '产品能力(传声筒)',
          requirement: '独立宣讲与传递',
          details: [
            '能讲：能够独立讲解公司的整体通讲材料（Corporate Deck）及对应产品的标准PPT。',
            '能听：听得懂客户对于产品的基本诉求，并能清晰地向后端（产品经理/研发）传递回公司。'
          ]
        },
        {
          dimension: '流程工具(合规员)',
          requirement: '准确维护与信号弹',
          details: [
            '流程是呼唤炮火的唯一信号弹。',
            '熟练使用 CRM/OA 等工具，按周维护机会点。',
            '数据准确：录入信息完整，收入预测、要货预测、落单时间等关键数据必须准确，不瞎填。'
          ]
        },
        {
          dimension: '资源应用(执行者)',
          requirement: '知道在哪与怎么用',
          details: [
            '针对基础场景（拜访、聚餐、参观），知道该找谁，知道资源在哪（展厅、礼品、接待标准）。',
            '按照公司要求，完成基本的接待和商务活动执行。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '知识外挂',
          details: [
            '遇到不懂的技术术语，利用AI快速检索学习，确保在客户面前不露怯。'
          ]
        }
      ]
    },
    {
      stage: 'director',
      title: '导演型销售 - "多面手与组局者"',
      mindset: {
        positive: ['"今天要谈的事儿我是导演，我做如下安排，大家配合好我。"', '"我有责任把前线听到的炮火声，反向转化为后方造炮弹的图纸。"', '"拒绝经验主义的豪赌，我要用算力推演未来。"']
      },
      dimensions: [
        {
          dimension: '产品能力(定制者)',
          requirement: '定制方案与深度问答',
          details: [
            '能策划：了解客户痛点，能协同产品经理定制专属的交流材料，而不是拿标准PPT硬套。',
            '能答：对客户关心的产品问题，能独立回答 50%以上。对关键物料和资源了然于胸。'
          ]
        },
        {
          dimension: '流程工具(管理者)',
          requirement: '信息质量与及时性',
          details: [
            '不仅是填空，而是高质量维护。',
            '能够通过周例会及日常沟通，及时掌握物料/研发的变化，并结合项目情况做出调整。'
          ]
        },
        {
          dimension: '资源应用(导演者)',
          requirement: '策划与口碑建立',
          details: [
            '做导演：针对高层拜访、总部参观、POC测试等复杂场景，能独立策划并协调资源。',
            '定角色：哪怕是公司领导来支持，也要给他分配好"角色"和"台词"，做好信息同步。',
            '攒口碑：在公司资源投入后，有闭环、有反馈，建立自己在内部资源池的良好口碑。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '内容生成师',
          details: [
            '利用AI工具辅助生成美观的汇报大纲、定制化的客户邀请函或活动流程表。'
          ]
        }
      ]
    },
    {
      stage: 'expert',
      title: '经营型专家 - "运筹帷幄的操盘手"',
      mindset: {
        positive: ['"有很强的组织意识。"', '"对资源的搭配和使用，有自己的想法和设计。"']
      },
      dimensions: [
        {
          dimension: '产品能力(指引者)',
          requirement: '需求反向驱动',
          details: [
            '不仅仅是卖产品，更能基于市场和客户的深层需求，反向驱动公司的产品改进。',
            '能敏锐捕捉市场机会，为公司的产品方向提供高价值的输入。'
          ]
        },
        {
          dimension: '流程工具(优化者)',
          requirement: '流程优化与效能',
          details: [
            '不再被流程束缚，而是能利用流程工具提升团队效率。',
            '对不合理的流程能提出优化建议，提升组织整体运作效能。'
          ]
        },
        {
          dimension: '资源应用(设计者)',
          requirement: '资源配置与设计',
          details: [
            '懂质量：对内外部资源的质量有清晰认知（谁能打、谁不能打）。',
            '懂搭配：像调鸡尾酒一样搭配资源，设计最优的资源组合策略，以最小的投入换取最大的产出。'
          ]
        }
      ]
    }
  ]

  const organizationData = [
    {
      stage: 'running',
      title: '跑动型销售 - "铁脚板与勤务兵"',
      mindset: {
        negative: ['"这事不赖我，他们没配合好。"', '"领导怎么说，我就怎么做。"'],
        positive: '"公司安排的活，我大概考虑这么干，可能有这些困难。"'
      },
      dimensions: [
        {
          dimension: '任务执行(听令)',
          requirement: '准确理解与执行',
          details: [
            '听得懂：能准确理解上级下达的任务意图和指标要求。',
            '做得到：执行动作不变形，不打折扣，按时按量完成既定动作。'
          ]
        },
        {
          dimension: '协同配合(融入)',
          requirement: '不掉链子',
          details: [
            '在团队合作中不拖后腿，能配合他人完成整体任务。',
            '遇到困难能说清楚"哪里难"，而不是直接躺平或隐瞒。'
          ]
        },
        {
          dimension: '自我管理(基础)',
          requirement: '职业化起步',
          details: [
            '遵守公司的各项规章制度，具备基本的职场礼仪和工作习惯。',
            '能够管理好自己的时间和精力，确保主要精力投入在客户身上。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '学习助手',
          details: [
            '利用AI整理会议纪要、生成待办事项清单，确保上级指令不遗漏。'
          ]
        }
      ]
    },
    {
      stage: 'director',
      title: '导演型销售 - "多面手与组局者"',
      mindset: {
        positive: ['"我干活贼靠谱，大家都愿意和我配合。"', '"我来组成头部，帮部门分摊压力。"']
      },
      dimensions: [
        {
          dimension: '组织担当(骨干)',
          requirement: '分担与补位',
          details: [
            '主力战将：成为部门内扛指标的核心力量，不仅仅对自己负责，更能分担团队的整体压力。',
            '主动补位：看到团队或其他环节出现漏洞时，能主动补位，而不是袖手旁观。'
          ]
        },
        {
          dimension: '影响力构建(带动)',
          requirement: '正向氛围营造',
          details: [
            '口碑辐射：通过一个个成功的项目，让周边配合的人（售前、交付、研发）不仅觉得你靠谱，还愿意跟着你干。',
            '带动他人：不仅自己强，还能把好的经验分享出来，带动周边同事一起进步。'
          ]
        },
        {
          dimension: '人才培养(师徒)',
          requirement: '以身作则',
          details: [
            '虽然可能还没带团队，但已经具备了"师兄/师姐"的自觉，愿意指导新员工，传承好的作业习惯。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '知识萃取',
          details: [
            '利用AI将自己的成功案例萃取成方法论或话术库，分享给团队，提升整体战力。'
          ]
        }
      ]
    },
    {
      stage: 'expert',
      title: '经营型专家 - "运筹帷幄的操盘手"',
      mindset: {
        positive: '"我是导演，我是最懂客户的人，组织内外部资源围绕客户作业。"'
      },
      dimensions: [
        {
          dimension: '战略视野(布局)',
          requirement: '看局与造势',
          details: [
            '经营思维：跳出单一项目，从公司整体经营的角度（利润、现金流、品牌、市场占有率）去看待业务。',
            '长期主义：能识别并布局未来的增长点，不仅关注当下的粮食，更关注明天的土地肥力。'
          ]
        },
        {
          dimension: '组织发展(传承)',
          requirement: '建制与育人',
          details: [
            '带队伍：具备明确的导师意识，能系统性地培养新人，为组织输送人才。',
            '文化传承：深刻理解并践行公司价值观，是团队精神的压舱石和传播者。'
          ]
        },
        {
          dimension: '资源经营(生态)',
          requirement: '生态构建',
          details: [
            '在区域或行业内构建良性的业务生态，让合作伙伴、客户、公司三方利益达成平衡。',
            '能调动公司级别的资源，为重大战略目标服务。'
          ]
        },
        {
          dimension: 'AI 辅助(画笔)',
          requirement: '战略参谋',
          details: [
            '善用数据分析工具监控组织效能，利用AI辅助制定年度战略规划和人才盘点。'
          ]
        }
      ]
    }
  ]

  const nextStage = () => {
    setCurrentStageIndex((prev) => (prev + 1) % stages.length)
  }

  const prevStage = () => {
    setCurrentStageIndex((prev) => (prev - 1 + stages.length) % stages.length)
  }

  const nextCustomer = () => {
    setCurrentCustomerIndex((prev) => (prev + 1) % customerStages.length)
  }

  const prevCustomer = () => {
    setCurrentCustomerIndex((prev) => (prev - 1 + customerStages.length) % customerStages.length)
  }

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projectOperationsData.length)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projectOperationsData.length) % projectOperationsData.length)
  }

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % productToolsData.length)
  }

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + productToolsData.length) % productToolsData.length)
  }

  const nextOrganization = () => {
    setCurrentOrganizationIndex((prev) => (prev + 1) % organizationData.length)
  }

  const prevOrganization = () => {
    setCurrentOrganizationIndex((prev) => (prev - 1 + organizationData.length) % organizationData.length)
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <section className="section sales-ability">
            <div className="section-header">
              <h1>🚀 销售能力和发展图谱</h1>
              <p className="intro-quote">
                "销售经理的成长，本质上是从'拼体力'到'拼脑力'再到'拼算力与心力'的进化过程"
              </p>
            </div>

            {/* Stages Carousel */}
            <div className="stages-container">
              <div className="carousel-wrapper">
                <button className="carousel-btn prev-btn" onClick={prevStage}>
                  ❮
                </button>
                
                <div className="stages-carousel">
                  {stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className={`stage-card ${index === currentStageIndex ? 'active' : ''}`}
                    >
                      <div className="card-header">
                        <h2>{stage.title}</h2>
                        <p className="subtitle">{stage.subtitle}</p>
                      </div>
                      
                      <div className="card-content">
                        <div className="portrait">
                          <p>{stage.description}</p>
                        </div>
                        
                        <div className="stage-info">
                          <div className="info-item">
                            <label>对应阶段：</label>
                            <p>{stage.stage}</p>
                          </div>
                          <div className="info-item">
                            <label>核心定义：</label>
                            <p>{stage.core}</p>
                          </div>
                          <div className="info-item">
                            <label>AI能力要求：</label>
                            <p>{stage.aiAbility}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="stage-indicator">
                        {stages.map((_, i) => (
                          <span
                            key={i}
                            className={`dot ${i === currentStageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentStageIndex(i)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-btn next-btn" onClick={nextStage}>
                  ❯
                </button>
              </div>
            </div>

            {/* Capabilities Grid */}
            <div className="capabilities-section">
              <h2 className="section-title">销售经理五大核心能力图谱</h2>
              <div className="capabilities-grid">
                {capabilities.map((cap) => (
                  <div key={cap.id} className="capability-card">
                    <div className="cap-header">
                      <h3>{cap.title}</h3>
                      <p className="cap-subtitle">{cap.subtitle}</p>
                    </div>
                    <div className="cap-content">
                      <div className="definition">
                        <strong>定义：</strong> {cap.definition}
                      </div>
                      <div className="elements">
                        <strong>能力要素：</strong>
                        <p>{cap.elements}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 1:
        return (
          <section className="section customer-relations">
            <div className="section-header">
              <h1>🤝 客户关系发展</h1>
              <p>从勤奋跑动入局，以信任组局，终至生态控局。</p>
            </div>

            <div className="stages-container">
              <div className="carousel-wrapper">
                <button className="carousel-btn prev-btn" onClick={prevCustomer}>
                  ❮
                </button>
                
                <div className="stages-carousel">
                  {customerStages.map((customerStage, index) => (
                    <div
                      key={customerStage.id}
                      className={`stage-card ${index === currentCustomerIndex ? 'active' : ''}`}
                    >
                      <div className="card-header">
                        <h2>{customerStage.title}</h2>
                        <p className="subtitle">{customerStage.subtitle}</p>
                      </div>
                      
                      <div className="card-content">
                        <div className="mindset-section">
                          <h3>核心心态：</h3>
                          {customerStage.mindset.map((mind, idx) => (
                            <p key={idx} className="mindset-item">{mind}</p>
                          ))}
                        </div>

                        <div className="dimensions-section">
                          <h3>⭐ 能力画像：</h3>
                          {customerStage.dimensions.map((dim, idx) => (
                            <div key={idx} className="dimension-item">
                              <div className="dimension-header">
                                <h4>
                                  {getIcon(dim.dimension)} {dim.dimension}
                                  <span className="requirement-highlight">{formatRequirement(dim.requirement)}</span>
                                </h4>
                              </div>
                              <ul className="details-list">
                                {dim.details.map((detail, didx) => (
                                  <li key={didx}><span className="detail-bullet">✓</span> {detail}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="stage-indicator">
                        {customerStages.map((_, i) => (
                          <span
                            key={i}
                            className={`dot ${i === currentCustomerIndex ? 'active' : ''}`}
                            onClick={() => setCurrentCustomerIndex(i)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-btn next-btn" onClick={nextCustomer}>
                  ❯
                </button>
              </div>
            </div>
          </section>
        )

      case 2:
        return (
          <section className="section project-operations">
            <div className="section-header">
              <h1>⚙️ 项目运作能力</h1>
              <p>拒绝运气依赖，从规范执行进阶为运筹帷幄。</p>
            </div>

            <div className="stages-container">
              <div className="carousel-wrapper">
                <button className="carousel-btn prev-btn" onClick={prevProject}>
                  ❮
                </button>
                
                <div className="stages-carousel">
                  {projectOperationsData.map((data, index) => (
                    <div
                      key={data.stage}
                      className={`stage-card ${index === currentProjectIndex ? 'active' : ''}`}
                    >
                      <div className="card-header">
                        <h2>{data.title}</h2>
                      </div>

                      <div className="card-content">
                        <div className="mindset-section">
                          <h3>核心心态：</h3>
                          {data.mindset.negative && (
                            <div className="negative-mindset">
                              <p className="label">反面警示：</p>
                              {data.mindset.negative.map((mind, idx) => (
                                <p key={idx} className="mindset-item">{mind}</p>
                              ))}
                            </div>
                          )}
                          {data.mindset.positive && (
                            <div className="positive-mindset">
                              <p className="label">正面要求：</p>
                              {Array.isArray(data.mindset.positive) ? (
                                data.mindset.positive.map((mind, idx) => (
                                  <p key={idx} className="mindset-item">{mind}</p>
                                ))
                              ) : (
                                <p className="mindset-item">{data.mindset.positive}</p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="dimensions-section">
                          <h3>⭐ 能力画像：</h3>
                          {data.dimensions.map((dim, idx) => (
                            <div key={idx} className="dimension-item">
                              <div className="dimension-header">
                                <h4>
                                  {getIcon(dim.dimension)} {dim.dimension}
                                  <span className="requirement-highlight">{formatRequirement(dim.requirement)}</span>
                                </h4>
                              </div>
                              <ul className="details-list">
                                {dim.details.map((detail, didx) => (
                                  <li key={didx}><span className="detail-bullet">✓</span> {detail}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="stage-indicator">
                        {projectOperationsData.map((_, i) => (
                          <span
                            key={i}
                            className={`dot ${i === currentProjectIndex ? 'active' : ''}`}
                            onClick={() => setCurrentProjectIndex(i)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-btn next-btn" onClick={nextProject}>
                  ❯
                </button>
              </div>
            </div>
          </section>
        )

      case 3:
        return (
          <section className="section product-tools">
            <div className="section-header">
              <h1>🛠️ 产品、工具与数智化</h1>
              <p>从单兵武器，进化为驱动决策的数智外挂。</p>
            </div>

            <div className="stages-container">
              <div className="carousel-wrapper">
                <button className="carousel-btn prev-btn" onClick={prevProduct}>
                  ❮
                </button>
                
                <div className="stages-carousel">
                  {productToolsData.map((data, index) => (
                    <div
                      key={data.stage}
                      className={`stage-card ${index === currentProductIndex ? 'active' : ''}`}
                    >
                      <div className="card-header">
                        <h2>{data.title}</h2>
                      </div>

                      <div className="card-content">
                        <div className="mindset-section">
                          <h3>核心心态：</h3>
                          {data.mindset.negative && (
                            <div className="negative-mindset">
                              <p className="label">反面警示：</p>
                              {data.mindset.negative.map((mind, idx) => (
                                <p key={idx} className="mindset-item">{mind}</p>
                              ))}
                            </div>
                          )}
                          {data.mindset.positive && (
                            <div className="positive-mindset">
                              <p className="label">正面要求：</p>
                              {Array.isArray(data.mindset.positive) ? (
                                data.mindset.positive.map((mind, idx) => (
                                  <p key={idx} className="mindset-item">{mind}</p>
                                ))
                              ) : (
                                <p className="mindset-item">{data.mindset.positive}</p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="dimensions-section">
                          <h3>⭐ 能力画像：</h3>
                          {data.dimensions.map((dim, idx) => (
                            <div key={idx} className="dimension-item">
                              <div className="dimension-header">
                                <h4>
                                  {getIcon(dim.dimension)} {dim.dimension}
                                  <span className="requirement-highlight">{formatRequirement(dim.requirement)}</span>
                                </h4>
                              </div>
                              <ul className="details-list">
                                {dim.details.map((detail, didx) => (
                                  <li key={didx}><span className="detail-bullet">✓</span> {detail}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="stage-indicator">
                        {productToolsData.map((_, i) => (
                          <span
                            key={i}
                            className={`dot ${i === currentProductIndex ? 'active' : ''}`}
                            onClick={() => setCurrentProductIndex(i)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-btn next-btn" onClick={nextProduct}>
                  ❯
                </button>
              </div>
            </div>
          </section>
        )

      case 4:
        return (
          <section className="section organization-strategy">
            <div className="section-header">
              <h1>👑 组织运作与战略发展</h1>
              <p>突破单兵局限，构建协同生态，跃升至战略经营。</p>
            </div>

            <div className="stages-container">
              <div className="carousel-wrapper">
                <button className="carousel-btn prev-btn" onClick={prevOrganization}>
                  ❮
                </button>
                
                <div className="stages-carousel">
                  {organizationData.map((data, index) => (
                    <div
                      key={data.stage}
                      className={`stage-card ${index === currentOrganizationIndex ? 'active' : ''}`}
                    >
                      <div className="card-header">
                        <h2>{data.title}</h2>
                      </div>

                      <div className="card-content">
                        <div className="mindset-section">
                          <h3>核心心态：</h3>
                          {data.mindset.negative && (
                            <div className="negative-mindset">
                              <p className="label">反面警示：</p>
                              {data.mindset.negative.map((mind, idx) => (
                                <p key={idx} className="mindset-item">{mind}</p>
                              ))}
                            </div>
                          )}
                          {data.mindset.positive && (
                            <div className="positive-mindset">
                              <p className="label">正面要求：</p>
                              {Array.isArray(data.mindset.positive) ? (
                                data.mindset.positive.map((mind, idx) => (
                                  <p key={idx} className="mindset-item">{mind}</p>
                                ))
                              ) : (
                                <p className="mindset-item">{data.mindset.positive}</p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="dimensions-section">
                          <h3>⭐ 能力画像：</h3>
                          {data.dimensions.map((dim, idx) => (
                            <div key={idx} className="dimension-item">
                              <div className="dimension-header">
                                <h4>
                                  {getIcon(dim.dimension)} {dim.dimension}
                                  <span className="requirement-highlight">{formatRequirement(dim.requirement)}</span>
                                </h4>
                              </div>
                              <ul className="details-list">
                                {dim.details.map((detail, didx) => (
                                  <li key={didx}><span className="detail-bullet">✓</span> {detail}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="stage-indicator">
                        {organizationData.map((_, i) => (
                          <span
                            key={i}
                            className={`dot ${i === currentOrganizationIndex ? 'active' : ''}`}
                            onClick={() => setCurrentOrganizationIndex(i)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-btn next-btn" onClick={nextOrganization}>
                  ❯
                </button>
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="sales-training-page">
      <div className="nav-tabs">
        <button
          className={`tab ${currentSection === 0 ? 'active' : ''}`}
          onClick={() => setCurrentSection(0)}
        >
          销售能力发展图谱
        </button>
        <button
          className={`tab ${currentSection === 1 ? 'active' : ''}`}
          onClick={() => setCurrentSection(1)}
        >
          客户关系管理
        </button>
        <button
          className={`tab ${currentSection === 2 ? 'active' : ''}`}
          onClick={() => setCurrentSection(2)}
        >
          项目运作能力
        </button>
        <button
          className={`tab ${currentSection === 3 ? 'active' : ''}`}
          onClick={() => setCurrentSection(3)}
        >
          产品工具数智化
        </button>
        <button
          className={`tab ${currentSection === 4 ? 'active' : ''}`}
          onClick={() => setCurrentSection(4)}
        >
          组织运作与战略
        </button>
      </div>

      <div className="section-content">
        {renderSection()}
      </div>
    </div>
  )
}

export default SalesTrainingPage
