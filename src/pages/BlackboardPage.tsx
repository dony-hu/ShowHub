import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './BlackboardPage.css'

interface TrendItem {
  title: string
  summary: string
  tags: string[]
  cover: string
  content?: string
}

interface StoryItem {
  title: string
  owner: string
  summary: string
  learning: string
  cover: string
  content?: string
}

interface OutlookItem {
  title: string
  summary: string
  cover: string
  content?: string
}

interface BulletinItem {
  title: string
  date: string
  detail: string
  cover: string
  content?: string
}

const techTrends: TrendItem[] = [
  {
    title: '多模态地图理解',
    summary: '结合视觉大模型对地图切片进行语义抽取，将路网、兴趣点、地形特征转为结构化知识，支撑自动标注与场景生成。',
    tags: ['Vision-LM', '矢量语义', '自动标注'],
    cover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(153, 102, 204, 0.25))'
  },
  {
    title: '边缘原生渲染',
    summary: '在端侧完成瓦片裁剪、样式合成与轻量推理，降低云端算力消耗，同时保证毫秒级交互体验。',
    tags: ['WebGPU', '端侧推理', '成本优化'],
    cover: 'linear-gradient(135deg, rgba(147, 112, 219, 0.25), rgba(75, 192, 192, 0.25))'
  },
  {
    title: '实时空间计算',
    summary: '基于时空索引的流式数据管道，支持轨迹回放、拥堵预测与区域热力洞察，形成“秒级”智能调度能力。',
    tags: ['时空索引', '流式引擎', '预测'],
    cover: 'linear-gradient(135deg, rgba(255, 192, 203, 0.25), rgba(255, 165, 0, 0.25))'
  },
  {
    title: '生成式地图体验',
    summary: '从“查找点”到“编排场景”，引入自然语言到地图编排 DSL 的转换，帮助业务快速生成运营视图与沙盘。',
    tags: ['NL → DSL', '场景生成', '运营沙盘'],
    cover: 'linear-gradient(135deg, rgba(102, 205, 170, 0.25), rgba(64, 224, 208, 0.25))'
  }
]

const productStories: StoryItem[] = [
  {
    title: '开放平台 3.0：从 API 到能力网格',
    owner: 'Open Platform Team',
    summary: '将经典 REST API 升级为可组合的能力单元（地图、位置、可视化、智能分析），通过网关策略实现弹性调度。',
    learning: '粒度拆分 + 策略网关，显著提升了并发与稳定性。',
    cover: 'linear-gradient(135deg, rgba(255, 165, 0, 0.25), rgba(255, 192, 203, 0.25))'
  },
  {
    title: '私网地图：安全与体验的平衡',
    owner: 'Private Map Team',
    summary: '在隔离环境下实现同等体验的在线渲染，采用离线瓦片预热与按需增量同步，降低带宽压力。',
    learning: '预热 + 增量同步方案，让私网体验接近公网。',
    cover: 'linear-gradient(135deg, rgba(75, 192, 192, 0.25), rgba(147, 112, 219, 0.25))'
  },
  {
    title: '空间智能Lab的探索',
    owner: 'Geo AI Lab',
    summary: '构建“地图 → 图谱 → 推理”链路，把地理实体关系转成知识图谱，用于选址、风险评估等决策。',
    learning: '结构化知识让模型的可解释性与复用性更强。',
    cover: 'linear-gradient(135deg, rgba(153, 102, 204, 0.25), rgba(102, 126, 234, 0.25))'
  },
  {
    title: '数据工厂的自动化演进',
    owner: 'Data Factory',
    summary: '用流水线管理数据采集、质检、标注与发布，引入质量守门人机制和自动报警，提升数据可信度。',
    learning: '质量闸门 + 自动报警，把返工率降到了可控范围。',
    cover: 'linear-gradient(135deg, rgba(64, 224, 208, 0.25), rgba(102, 205, 170, 0.25))'
  }
]

const outlooks: OutlookItem[] = [
  {
    title: 'AI Native 地图范式',
    summary: '地图正在从静态底图走向动态理解与生成，AI/LLM 成为地图体验的默认入口。',
    cover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(75, 192, 192, 0.25))'
  },
  {
    title: '隐私与合规优先',
    summary: '隐私计算、差分隐私与可验证日志将成为地图数据的"安全基建"。',
    cover: 'linear-gradient(135deg, rgba(153, 102, 204, 0.25), rgba(255, 165, 0, 0.25))'
  },
  {
    title: '场景化运营',
    summary: '企业期待"拿来即用"的行业套件，地图能力需要以场景包形式交付。',
    cover: 'linear-gradient(135deg, rgba(255, 192, 203, 0.25), rgba(102, 205, 170, 0.25))'
  }
]

const bulletins: BulletinItem[] = [
  {
    title: 'AI+ Engineer：重新定义工程师的生产力边界',
    date: '2026-01-24',
    detail: '从代码补全到架构设计，从需求理解到性能优化，AI正在成为每位工程师的超级助手。探讨如何与AI协作，提升10倍研发效率的实践经验。',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: `
# AI+ Engineer：重新定义工程师的生产力边界

## 引言：从"工具"到"伙伴"

当 GitHub Copilot、GPT-4、Claude 等 AI 助手逐渐成为工程师日常开发的标配，我们正在见证一个新时代的到来。AI 不再只是简单的代码补全工具，而是能够理解需求、设计架构、优化性能、甚至进行代码审查的超级助手。

## 一、AI 如何提升工程师效率

### 1. 代码生成与补全
- **快速原型**：从自然语言描述直接生成可运行的代码框架
- **重复劳动**：自动完成样板代码、配置文件、测试用例
- **多语言支持**：无需精通所有语言，AI 帮你快速切换技术栈

### 2. 架构设计与决策
- **方案对比**：快速列举多种技术方案的优劣
- **最佳实践**：基于海量开源代码的经验总结
- **风险预判**：提前识别潜在的性能瓶颈和安全问题

### 3. Debug 与性能优化
- **错误诊断**：根据错误日志快速定位问题根源
- **性能分析**：识别代码热点，提供优化建议
- **代码重构**：保持功能不变的前提下改善代码质量

### 4. 文档与知识管理
- **自动文档**：从代码生成 API 文档和使用说明
- **技术调研**：快速了解新技术栈和框架特性
- **知识沉淀**：将团队经验转化为可查询的知识库

## 二、实践经验：如何与 AI 协作

### 提示工程（Prompt Engineering）
- **清晰的上下文**：提供足够的背景信息和约束条件
- **迭代式对话**：逐步细化需求，而非一次性描述所有细节
- **验证与调整**：AI 生成的代码需要人工审查和调整

### 工作流整合
1. **需求分析阶段**：让 AI 帮助梳理需求、设计接口
2. **开发阶段**：代码补全、单元测试生成
3. **审查阶段**：代码质量检查、安全扫描
4. **部署阶段**：生成 CI/CD 配置、Docker 文件

### 注意事项
- ⚠️ **不盲目信任**：AI 生成的代码可能存在错误或不符合业务逻辑
- ⚠️ **保护隐私**：避免将敏感代码和数据提交给公开的 AI 服务
- ⚠️ **持续学习**：AI 是助手而非替代品，工程师仍需保持技术深度

## 三、真实案例：10 倍效率的秘密

### 案例 1：从 0 到 1 的原型开发
**场景**：需要快速搭建一个数据可视化大屏
- 用时：传统方式需要 2-3 天，AI 协助下半天完成
- 关键：利用 AI 生成 React 组件、图表配置、样式代码
- 效果：工程师专注于业务逻辑，UI 实现交给 AI

### 案例 2：遗留代码重构
**场景**：重构一个 5000 行的老旧模块
- 挑战：代码缺乏文档，逻辑复杂
- AI 帮助：
  1. 自动生成代码注释和流程图
  2. 识别重复代码和可优化点
  3. 提供重构方案和测试用例
- 结果：重构周期缩短 60%

### 案例 3：跨技术栈开发
**场景**：Python 后端工程师需要开发前端页面
- 传统方式：学习 React、CSS、TypeScript 需要数周
- AI 协助：边学边做，AI 实时解答问题并生成代码
- 效果：一周内完成功能开发，同时掌握基本前端技能

## 四、未来展望：AI Native 开发时代

### 从工具到生态
- **IDE 深度集成**：AI 成为开发环境的原生能力
- **团队知识图谱**：AI 学习团队的代码风格和业务知识
- **自动化流水线**：从需求到部署的全链路 AI 辅助

### 新的职业技能
- **提示工程师**：擅长与 AI 对话，精准表达需求
- **AI 架构师**：设计 AI 驱动的开发流程和工具链
- **人机协作专家**：平衡 AI 效率与人工创造力

### 挑战与机遇
- **版权与伦理**：AI 生成代码的知识产权问题
- **技能焦虑**：如何保持竞争力不被 AI 替代
- **质量保证**：建立 AI 代码的评审和测试标准

## 结语

AI+ Engineer 不是要取代工程师，而是让工程师从重复劳动中解放出来，专注于更有创造性的工作。那些善于利用 AI 的工程师，将获得 10 倍甚至更高的生产力提升。

**关键是**：学会与 AI 协作，把 AI 当作永远在线的高级顾问，而非简单的代码生成器。

---

**延伸阅读：**
- [GitHub Copilot 最佳实践](https://github.com/features/copilot)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [AI 辅助开发的安全性考量](https://owasp.org/www-community/controls/Secure_AI_Development)
    `
  },
  {
    title: 'Tech Friday #42：矢量瓦片与 WebGPU',
    date: '2026-01-12',
    detail: '分享端侧着色器优化与瓦片压缩方案，附性能数据与实操 demo。',
    cover: 'linear-gradient(135deg, rgba(102, 205, 170, 0.25), rgba(153, 102, 204, 0.25))'
  },
  {
    title: '产品背后故事 · 专网地图',
    date: '2026-01-05',
    detail: '记录从 PoC 到正式发布的踩坑清单：带宽预算、离线缓存、暗光模式。',
    cover: 'linear-gradient(135deg, rgba(75, 192, 192, 0.25), rgba(255, 165, 0, 0.25))'
  },
  {
    title: '行业展望圆桌 · 新基建 x 位置智能',
    date: '2025-12-28',
    detail: '城市级数字孪生、物流路线优化、出行安全的模型落地讨论。',
    cover: 'linear-gradient(135deg, rgba(147, 112, 219, 0.25), rgba(102, 126, 234, 0.25))'
  }
]

const BlackboardPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BulletinItem | null>(null)

  const handleArticleClick = (item: BulletinItem) => {
    if (item.content) {
      setSelectedArticle(item)
    }
  }

  const closeModal = () => {
    setSelectedArticle(null)
  }

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
            <article key={item.title} className="chalk-card wechat-style">
              <div className="card-cover" style={{ background: item.cover }}></div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="card-summary">{item.summary}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
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
            <article key={item.title} className="chalk-card wechat-style story-card">
              <div className="card-cover" style={{ background: item.cover }}></div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="pill">{item.owner}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="card-summary">{item.summary}</p>
                <div className="learning">
                  <span className="learning-label">复盘要点</span>
                  <p>{item.learning}</p>
                </div>
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
            <article key={item.title} className="chalk-card wechat-style outlook-card">
              <div className="card-cover" style={{ background: item.cover }}></div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
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
            <article 
              key={item.title} 
              className={`bulletin-item wechat-style ${item.content ? 'clickable' : ''}`}
              onClick={() => handleArticleClick(item)}
              style={{ cursor: item.content ? 'pointer' : 'default' }}
            >
              <div className="card-cover" style={{ background: item.cover }}></div>
              <div className="card-content">
                <div className="bulletin-meta">
                  <span className="pill ghost">{item.date}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.detail}</p>
                {item.content && <div className="read-more">点击阅读全文 →</div>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 文章详情弹窗 */}
      {selectedArticle && (
        <div className="article-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            <div className="modal-header">
              <span className="modal-date">{selectedArticle.date}</span>
              <h2>{selectedArticle.title}</h2>
            </div>
            <div className="modal-body">
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ 
                  __html: selectedArticle.content?.replace(/\n/g, '<br/>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/- (.+)/g, '<li>$1</li>') || ''
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlackboardPage
