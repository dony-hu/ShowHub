import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import './BlackboardPage.css'
import gtcSpatialIntelligenceOpportunity from './articles/gtc-spatial-intelligence-opportunity.md?raw'
import { useAuth } from '../contexts/AuthContext'
import { articleService } from '../services/supabase'

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
  articleId?: string
}

interface Article {
  id: string
  title: string
  summary?: string
  content?: string
  status: string
  published_at?: string
  author_id?: string
  author?: { email: string; full_name?: string }
  tags?: string[]
}

const techTrends: TrendItem[] = [
  {
    title: '多模态地图理解',
    summary: '结合视觉大模型对地图切片进行语义抽取，将路网、兴趣点、地形特征转为结构化知识，支撑自动标注与场景生成。',
    tags: ['Vision-LM', '矢量语义', '自动标注'],
    cover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(153, 102, 204, 0.25))',
    content: `
# 多模态地图理解：从像素到语义的跨越

## 背景：地图数据生产的瓶颈

传统地图数据生产高度依赖人工标注：
- 路网提取需要人工勾勒
- POI识别需要逐个核对
- 地形特征需要专业判读

这种模式在数据更新频率要求越来越高的今天，已经成为明显瓶颈。

---

## 技术方案：视觉大模型 + 地图领域知识

### 1. 影像理解层

利用 Vision Transformer 和多模态大模型（如GPT-4V、Claude Vision）对地图切片进行语义理解：

- **道路识别**：不仅识别道路位置，还能理解道路等级、车道数、路面状况
- **建筑理解**：识别建筑轮廓、高度、用途（住宅/商业/工业）
- **兴趣点发现**：从街景和卫星影像中自动发现商铺、设施

### 2. 矢量转换层

将视觉理解结果转换为标准地图矢量数据：

- **几何重建**：从像素轮廓生成精确的矢量几何
- **拓扑构建**：自动建立路网拓扑关系
- **属性填充**：基于视觉特征推断属性信息

### 3. 质量保证层

引入人在回路（Human-in-the-Loop）机制：

- **置信度评分**：为每个识别结果打分
- **异常检测**：自动标记需要人工复核的区域
- **增量学习**：从人工修正中持续学习

---

## 实验成果

在上海市中心城区的试点中：

- **标注效率提升 5倍**：原本需要 2 小时的区域，现在 20 分钟完成初稿
- **准确率 92%**：主干道路识别准确率达到商用标准
- **成本降低 60%**：大幅减少人工标注工作量

---

## 未来方向

### 实时更新能力
结合卫星影像和街景数据的实时采集，实现"发现即更新"的动态地图。

### 场景生成
基于历史数据和规则，自动生成特定场景下的地图视图（如应急、物流、旅游）。

### 多源融合
整合政务数据、物联网感知、用户反馈，构建更全面的空间理解。

---

**技术栈**：Vision Transformer, GPT-4V, PostGIS, OSM标准, WebGL渲染

**应用场景**：地图更新、应急响应、城市规划、自动驾驶
`
  },
  {
    title: '边缘原生渲染',
    summary: '在端侧完成瓦片裁剪、样式合成与轻量推理，降低云端算力消耗，同时保证毫秒级交互体验。',
    tags: ['WebGPU', '端侧推理', '成本优化'],
    cover: 'linear-gradient(135deg, rgba(147, 112, 219, 0.25), rgba(75, 192, 192, 0.25))',
    content: `
# 边缘原生渲染：把地图计算搬到用户端

## 为什么要做边缘渲染？

传统地图服务采用云端渲染模式：
- 瓦片在服务器预生成
- 用户只需下载图片
- 简单但缺乏灵活性

这种模式的问题：
- **成本高昂**：每种样式、每个缩放级别都需要预渲染
- **更新滞后**：样式变更需要重新生成全量瓦片
- **个性化困难**：用户定制需求无法满足

---

## 边缘渲染架构

### 1. 数据下沉

将矢量数据而非栅格图片推送到端侧：
- **更小的传输量**：矢量数据通常比图片小 5-10 倍
- **更灵活的表达**：同一份数据可渲染多种样式
- **更好的交互**：可实现点选、hover等精细交互

### 2. WebGPU 加速

利用现代浏览器的 GPU 能力实现高性能渲染：
- **性能提升**：相比 Canvas2D 提升 10-50 倍
- **流畅体验**：60fps 流畅缩放、旋转、倾斜
- **省电优化**：GPU 比 CPU 更省电

### 3. 端侧推理

在客户端运行轻量级 AI 模型：
- **实时标注**：智能识别用户关注点
- **个性化推荐**：基于用户行为推荐路线
- **隐私保护**：敏感计算不离开设备

---

## 技术挑战与解决

### 挑战1：首次加载慢
**解决**：渐进式加载 + 智能预取
- 先加载当前视野
- 后台预取周边区域
- 使用 IndexedDB 持久化缓存

### 挑战2：设备性能差异
**解决**：自适应降级策略
- 高端设备：全特效渲染
- 中端设备：减少阴影和抗锯齿
- 低端设备：回退到栅格瓦片

### 挑战3：兼容性
**解决**：渐进增强
- WebGPU 可用时启用
- 降级到 WebGL 2.0
- 最终回退到 Canvas 2D

---

## 实际效果

在私网地图项目中的数据：

| 指标 | 传统方案 | 边缘渲染 |
|------|---------|----------|
| 首次加载 | 2.3s | 1.1s |
| 样式切换 | 需重新下载 | 即时（<100ms）|
| 带宽消耗 | 120MB/天 | 25MB/天 |
| 服务器成本 | 100% | 30% |

---

## 未来演进

### 3D 城市模型
利用 WebGPU 渲染大规模 3D 城市：
- LOD（细节层次）自动切换
- 实时光照和阴影
- 建筑物内部漫游

### AI 辅助渲染
基于用户意图智能调整地图显示：
- 导航时突出道路
- 选址时突出POI密度
- 应急时突出关键设施

### 边缘协同
多设备间共享计算和缓存：
- 办公室设备预热数据
- 移动设备快速访问
- P2P 加速分发

---

**核心技术**：WebGPU, WebGL, MapLibre, Protocol Buffers, WASM

**适用场景**：私网地图、高频交互应用、个性化定制、离线使用
`
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
    cover: 'linear-gradient(135deg, rgba(255, 165, 0, 0.25), rgba(255, 192, 203, 0.25))',
    content: `
# 开放平台 3.0：从 API 到能力网格

## 背景：单体API的瓶颈

丰图开放平台最初采用经典REST API设计，每个接口完成一个完整功能。随着业务增长，问题逐渐显现：

**性能瓶颈**：单个接口承载过多逻辑，响应变慢  
**扩展困难**：新需求需要修改现有接口，风险大  
**资源浪费**：高频轻量请求和低频重计算请求混在一起

## 3.0 架构：能力网格

我们将API拆解为细粒度的"能力单元"：

**地图能力**：瓦片服务、矢量数据、样式渲染  
**位置能力**：地理编码、逆编码、地址解析  
**可视化能力**：热力图、轨迹、空间聚合  
**智能分析**：路径规划、区域分析、POI推荐

这些能力单元通过API网关动态编排，形成"能力网格"。

## 核心改进

### 1. 粒度拆分

将大接口拆成小单元，用户按需组合：

**原API**：\`/api/map/full?layers=road,poi&style=dark&geocode=address\`  
**新API**：\`/tile/{z}/{x}/{y}\` + \`/geocode\` + \`/style\` 独立调用

### 2. 策略网关

网关根据请求特征智能路由：
- 高频请求 → CDN边缘节点
- 计算密集 → GPU集群
- 数据查询 → 就近数据中心

### 3. 弹性调度

根据负载自动扩缩容：
- 早晚高峰自动扩容瓦片服务
- 夜间缩容释放资源
- 突发流量自动熔断保护

## 实际效果

**并发能力**：从5000 QPS提升到50000 QPS  
**响应时间**：P95延迟从800ms降到120ms  
**成本优化**：通过精细化调度节省30%算力成本  
**稳定性**：故障隔离，单点故障不影响其他能力

## 未来演进

**Serverless化**：能力单元按调用计费  
**边缘计算**：将能力下沉到CDN节点  
**AI编排**：根据用户行为智能推荐能力组合

**技术栈**：Kong Gateway, Kubernetes, Prometheus, Grafana
`
  },
  {
    title: '私网地图：安全与体验的平衡',
    owner: 'Private Map Team',
    summary: '在隔离环境下实现同等体验的在线渲染，采用离线瓦片预热与按需增量同步，降低带宽压力。',
    learning: '预热 + 增量同步方案，让私网体验接近公网。',
    cover: 'linear-gradient(135deg, rgba(75, 192, 192, 0.25), rgba(147, 112, 219, 0.25))',
    content: `
# 私网地图：安全与体验的平衡

政务、金融、军工等行业的内网环境无法访问公网地图服务，但对地图体验要求不降反升。我们构建了私网地图解决方案，在安全隔离前提下实现接近公网的使用体验。

## 核心挑战

**数据同步**：百GB级瓦片如何快速部署  
**增量更新**：如何低成本更新变化数据  
**离线体验**：断网情况下如何保证可用  
**带宽受限**：专线带宽有限，如何优化传输

## 技术方案

### 离线瓦片预热

根据客户业务范围预生成瓦片包：
- 重点区域：15级精度
- 一般区域：12级精度
- 全国底图：8级精度

**压缩优化**：WebP格式 + Brotli压缩，体积减少60%

### 按需增量同步

只同步变化的瓦片：
-每日增量包<100MB
- 支持断点续传
- 自动校验完整性

### 智能缓存策略

**热点数据**：用户常访问区域常驻内存  
**预测预加载**：根据用户行为预加载周边  
**LRU淘汰**：自动清理长期未访问数据

## 实际效果

某政务客户部署：初始部署3小时完成、日常更新<10分钟、体验流畅度95%接近公网、带宽消耗降低80%

**技术栈**：MapServer, MBTiles, Nginx, Rsync, Redis
`
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
    cover: 'linear-gradient(135deg, rgba(64, 224, 208, 0.25), rgba(102, 205, 170, 0.25))',
    content: `
# 数据工厂：从手工作坊到自动化流水线

地图数据生产曾经高度依赖人工。我们构建了数据工厂，用自动化流水线管理采集、质检、标注、发布全生命周期。

## 流水线设计

**采集阶段**：GPS轨迹、街景影像、卫星数据自动入库  
**质检阶段**：AI自动检测拓扑错误、属性异常、时效过期  
**标注阶段**：视觉模型自动标注，人工仅审核低置信度项  
**发布阶段**：通过质量闸门才能进入生产库

## 质量守门人机制

每个阶段设置质量阈值：
- 空间精度 > 5 米
- 属性完整度 > 95%
- 拓扑一致性 = 100%

不达标数据自动退回，并触发告警通知相关团队。

## 自动报警系统

**实时监控**：处理进度、错误率、积压量  
**智能告警**：异常模式自动识别，通知责任人  
**根因分析**：追溯问题来源

## 实际效果

- 生产周期：30天 → 7天
- 返工率：15% → 3%
- 人力成本节省：40%

**技术栈**：Airflow, MLflow, Grafana, PostgreSQL, MinIO
`
  }
]

const outlooks: OutlookItem[] = [
  {
    title: 'AI Native 地图范式',
    summary: '地图正在从静态底图走向动态理解与生成，AI/LLM 成为地图体验的默认入口。',
    cover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(75, 192, 192, 0.25))',
    content: `
# AI Native 地图范式：重新定义地图体验

地图不再是静态底图，而是动态理解和生成的智能界面。AI/LLM 成为地图体验的默认入口。

## 范式转变

**从查找到对话**：用户说"找个安静的咖啡馆"，系统理解意图并推荐

**从静态到动态**：地图根据场景实时调整显示内容和样式

**从展示到生成**：根据需求即时生成专属地图视图

## 核心能力

**语义理解**：理解模糊需求  
**场景适配**：导航/选址/应急自动切换  
**智能推荐**：基于用户画像主动推荐

## 未来图景

地图从工具演变为助手，从"你问我答"到"我懂你要什么"。

**技术基础**：LLM, Vector Search, Real-time Rendering
`
  },
  {
    title: '隐私与合规优先',
    summary: '隐私计算、差分隐私与可验证日志将成为地图数据的"安全基建"。',
    cover: 'linear-gradient(135deg, rgba(153, 102, 204, 0.25), rgba(255, 165, 0, 0.25))',
    content: `
# 隐私与合规优先：打造空间数据的安全基建

在数据驱动时代，隐私保护和合规性不是后想，而是前置设计。我们将隐私和安全融入地图产品的每个环节。

## 三大技术支柱

**隐私计算**：
- 联邦学习：在数据不离开本地的前提下进行模型训练
- 多方安全计算：多个数据源协作分析，互不泄露原始数据

**差分隐私**：
- 轨迹脱敏：添加噪声模糊个人位置
- 聚合统计：发布热力图时自动加噪，防止反推单个用户

**可验证日志**：
- 不可篡改的访问记录
- 审计追溯每一次数据访问
- 构建用户信任

## 行业合规

**GDPR**：右被遗忘权、数据导出、隐私影响评估  
**《个人信息保护法》**：最小必要原则、明确告知、用户同意  
**行业标准**：信息安全等级、数据分类、应急预案

## 商业价值

隐私保护反而成为竞争优势，特别是在政企客户中。用户更信任丰图的数据安全承诺。

**技术栈**：TensorFlow Federated, OpenMined, Blockchain for Audit
`
  },
  {
    title: '场景化运营',
    summary: '企业期待"拿来即用"的行业套件，地图能力需要以场景包形式交付。',
    cover: 'linear-gradient(135deg, rgba(255, 192, 203, 0.25), rgba(102, 205, 170, 0.25))',
    content: `
# 场景化运营：从通用地图到行业套件

企业不想买"地图"，而是买能解决实际问题的"方案"。我们正在从通用地图升级为场景化的行业套件。

## 场景包设计

**物流管理包**：
- 路线规划 + 实时追踪 + 异常告警 + 绩效统计
- 开箱即用，7天上线

**公安指挥包**：
- 案件地理分析 + 警力热力分配 + 应急处置 + 可视化大屏
- 符合公安业务流程

**城市治理包**：
- 问题上报 + 智能派单 + 进度追踪 + 满意度评价
- 城管、城建、环卫等通用

**房产选址包**：
- 竞争分析 + 人流分析 + 商圈画像 + ROI预测
- 帮助企业快速决策

## 交付模式

**标准产品**：行业通用方案，快速部署  
**定制深化**：根据客户特殊需求调整  
**持续运营**：定期数据更新、功能迭代  

## 实际效果

场景包形式的销售，客户满意度从 65% 提升到 92%，续约率从 60% 提升到 85%。

**技术基础**：Microservices, Low-code Platform, GraphQL
`
  }
]

const bulletins: BulletinItem[] = [
  {
    title: '从 GTC 技术路线反推空间智能机会窗口',
    date: '2026-01-24',
    detail: 'GTC的技术路线正在从"算力卖给算法"走向"构建可运行的世界模型"。这为空间智能、地图和无人系统打开了四个关键机会窗口：地图升级为世界状态底座、仿真优先的空间智能、结构化空间图层、以及空间智能中间件。',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    content: gtcSpatialIntelligenceOpportunity
  },
  {
    title: '共同构建开放有活力的的技术体系',
    date: '2026-01-24',
    detail: '开放不是姿态，而是一种长期效率选择。从内部技术资产流动、外部能力协作到落地机制，探讨如何让技术与数据真正开放起来，避免重复劳动，拥抱行业领先能力。',
    cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    content: `
# 共同构建开放有活力的的技术体系

## 关于开放：不是姿态，而是一种长期效率选择

过去几年，技术圈反复在谈"开放"。
但真正走到具体工作中，开放往往会变成一句口号，或者停留在制度层面。

对丰图来说，开放并不是价值观宣言，而是一种现实选择。
在一个技术复杂度持续上升、单点能力越来越难以覆盖全局的时代，不开放，本身就是低效。

下面从三个层面，谈谈我们对开放的理解。

---

## 一、内部开放：让技术与数据真正流动起来

### 1. 很多低效，其实源自"我们不知道别人已经做过"

在实际工作中，大家可能都有过类似体验：
- 需要做一个地址解析或治理能力；
- 查了一圈，发现好像没人做过；
- 于是重新设计、重新实现；
- 过了一段时间才发现，另一条线、另一个项目里，其实已经有一套相似方案。

这不是个人问题，而是技术资产没有流动起来的问题。

代码、数据、模型一旦只存在于"某个项目""某条业务线"，它的价值就被极大压缩了。

---

### 2. 内部开放的核心，不是"都能改"，而是"都能用、都能看、都能理解"

内部开放，并不意味着所有代码都随意修改，而是至少做到三点：
- **能被发现**：知道公司里已经有哪些能力、组件和数据资产；
- **能被理解**：有清晰的说明、背景和使用方式；
- **能被复用**：在合适场景下可以直接使用或二次封装。

比如：
- 地址治理规则；
- AOI 数据结构；
- 空间索引与实体建模方式。

它们不一定一开始就是"完美通用组件"，
但至少应该成为组织级资产，而不是项目副产品。

**当技术资产开始跨项目复用，组织效率才会真正发生变化。**

---

## 二、外部开放：把行业领先能力，转化为我们的产品能力

### 1. 外部开放的前提，是清楚"我们不需要什么都自己做"

在真实的项目和产品推进中，一个越来越明确的感受是：

**卡住我们的，往往不是"不会做"，而是"这件事是否值得我们自己做"。**

尤其是在今天这个阶段：
- AI 模型快速演进；
- 感知、采集、三维、硬件高度专业化；
- 单靠一家公司的研发力量，很难在所有环节都做到最优。

外部开放的本质，并不是承认能力不足，而是承认一个事实：

**客户买的是整体价值，而不是每一个技术环节的归属。**

---

### 2. 感知与采集侧：不重复造轮子，而是把数据接进来

在空间智能和地图产品中，采集永远是一个重资产、强专业的环节。

例如：
- 全景影像采集；
- 移动设备、穿戴设备；
- 低空或近景三维采集。

像 **影石（Insta360）** 这样的合作伙伴，在：
- 全景影像硬件；
- 拼接、稳定、标注工具链；
- 标准化输出格式

上已经做到了行业领先。

对丰图来说，更合理的方式不是"做一套自己的相机和采集系统"，而是：
- 定义清楚我们需要的 **数据标准和接口**；
- 把成熟的采集能力接入到我们的数据工厂与地图体系；
- 把重心放在 **数据治理、融合与可信性控制** 上。

最终客户感知到的是：

**数据更全、更快、更真实，而不是我们是否"自研了硬件"。**

---

### 3. 三维与重建能力：用成熟技术，补齐关键能力段

在三维建模和重建领域，同样存在清晰的专业分工。

有些厂商和技术团队，在：
- 多视角三维重建；
- 点云、Mesh、GS 表达；
- 大规模三维数据管理与可视化

方面已经积累多年。

在很多项目中，我们并不需要成为"最懂三维算法的公司"，而是需要：
- 把三维结果纳入统一的空间实体体系；
- 让三维数据与地址、AOI、POI、业务语义产生关联；
- 服务于真实业务决策，而不是停留在展示层。

这正是外部能力最适合被引入的地方：
- 外部负责"把东西建出来"；
- 我们负责"把它变成可用、可信、可决策的产品能力"。

---

### 4. AI 模型与算法生态：拥抱领先者，而不是绑定单一路线

在 AI 领域，外部开放的意义尤为明显。

无论是：
- 通用大模型；
- 行业模型；
- 特定任务模型，

技术迭代速度都远超传统软件周期。

在这种背景下，过早绑定单一模型路线，本身就是风险。

更合理的策略是：
- 模型层保持开放；
- 在工程和产品层做抽象；
- 把模型能力转化为可替换、可组合的能力模块。

这样，AI 的价值体现在：
- 能否提升数据可信度；
- 能否提升决策效率；

而不是模型本身的"先进性"。

---

### 5. 行业方案与垂直能力：用合作换速度和深度

在政务、公安、城管、物流等行业中，很多能力并不是纯技术问题，而是：
- 行业流程理解；
- 场景细节；
- 落地经验。

通过引入 **行业型合作伙伴**：
- 我们不需要从零理解每一个业务细节；
- 可以更快把空间智能能力嵌入真实业务流；
- 客户拿到的是"能跑的方案"，而不是"通用能力展示"。

这类合作，本质上是用开放换速度，用协作换确定性。

---

### 6. 外部开放的底层判断标准

一个简单但有效的判断标准是：

**外部能力是否真正被我们吸收，而不是简单叠加。**

好的外部开放，最终应表现为：
- **对客户**：统一、稳定的产品体验；
- **对内部**：能力沉淀进我们的平台与数据体系；
- **对合作方**：各自优势被放大，而不是被掩盖。

---

## 三、落地措施：让开放成为一种日常机制

开放如果没有具体机制，最终一定会回到"各做各的"。

结合前面的实践体会，我们更关注三类可落地的措施。

---

### 1. 技术资产统一管理，让共享成为默认选项

无论是代码资产、数据资产，还是模型与工具：
- 建立统一入口与管理机制；
- 明确哪些是公共资产，哪些是项目资产；
- 鼓励"先找已有，再决定是否新做"。

**当复用比新写更省时间，开放才会自然发生。**

---

### 2. 建立技术社区，而不是只靠项目推动交流

项目有边界，但技术没有。

通过技术社区，把跨项目、跨团队的交流常态化：
- **空间智能技术社区**：地图、时空建模、空间计算；
- **数据智能技术社区**：数据治理、融合、质量控制；
- **AI 研发工程社区**：模型应用、工程化、效率工具。

社区的意义不在于开会，而在于：
- 经验被更快扩散；
- 路线逐渐形成共识；
- 重复探索被提前避免。

---

### 3. 让开放带来实际收益，而不是额外负担

开放如果只是多写文档、多做汇报，很难持续。

更理想的状态是：
- 参与共享的人，在后续项目中明显更省力；
- 被复用的资产，反过来持续得到优化；
- 技术影响力，成为个人和团队的正向反馈。

**当开放开始反哺个人效率，它就不需要被推动了。**

---

## 结语：开放不是理想主义，而是现实路径

在今天这个阶段，开放已经不再是态度问题，而是效率问题。
- 内部不开放，重复劳动只会越来越多；
- 外部不开放，产品视野只会越来越窄；
- 没有机制的开放，只能停留在口号层面。

真正成熟的开放文化，往往不是被要求出来的，
而是在一次次协作中，被现实不断验证出来的。

**当技术和数据开始自然流动，当个人和组织都从中受益，开放，就会成为一种无需强调的默认状态。**
`
  },
  {
    title: 'AI+产品：克制才是长期竞争力',
    date: '2026-01-24',
    detail: 'AI无所不在、无所不能，但丰图不能"为了AI而AI"。探讨AI在产品体系中的正确定位，如何服务于可信数据与智能决策，以及为什么克制使用AI本身就是一种产品能力。',
    cover: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80',
    content: `
# AI+产品：克制才是长期竞争力

AI 无所不在、无所不能，但丰图不能"为了 AI 而 AI"

过去一年，AI 技术的进展几乎是指数级的。
从对话、代码到图像、推理、规划，AI 正在渗透进几乎所有软件形态。"AI 无所不在、无所不能"，已经从口号变成事实。

但正因为如此，一个更现实的问题摆在我们面前：
**在丰图的产品体系中，AI 应该被放在什么位置？**

如果没有清晰的定位，AI 很容易变成三种形态之一：
- 产品 PPT 上的标签；
- 系统里一个难以维护的"智能模块"；
- 或者为了展示先进性而强行嵌入的能力。

这三种情况，对长期产品价值都是消耗，而不是积累。

---

## 一、先回到原点：丰图的产品战略是什么

在讨论 AI 之前，必须先回到丰图最核心、也最稳定的产品战略：

**让数据更可信，让决策更智能。**

这是一个极其重要的锚点。

它意味着：
- 丰图不是做"AI 应用"的公司；
- 也不是做"模型能力输出"的公司；
- 而是做 **面向真实世界场景的、可被信任的数据与决策基础设施**。

因此，**AI 的角色，不是主角，而是工具、引擎和加速器。**

---

## 二、AI 在丰图的第一性定位：服务于"可信数据"

### 1. 数据可信，不是数据多

在地图、地址、AOI、时空数据体系中，"可信"从来不是数量问题，而是：
- 数据是否真实；
- 是否一致；
- 是否可回溯；
- 是否能持续更新。

这是丰图的基本盘。

### 2. AI 在基础数据产品中的作用

在基础产品层，AI 的价值非常明确：

**AI 不是用来"生成数据"的，而是用来"提高数据可信度的效率"。**

具体例子包括：

#### 地址治理
AI 用于地址解析、别名归并、异常发现，但最终目标不是"生成一个看起来像地址的字符串"，而是：
- 减少人工治理成本；
- 提高地址结构一致性；
- 降低错误进入主库的概率。

#### AOI / POI 质量控制
AI 可以辅助发现：
- AOI 边界异常；
- POI 名称变化；
- 功能属性漂移。

但决策逻辑始终是：**是否进入可信数据底盘**。

#### 多源数据融合
AI 用于对齐物流、政务、感知、互联网等多源信号，但核心目标是：
- 提高一致性；
- 降低冲突；
- 保证"一个空间实体只有一个可信版本"。

在这里，**AI 是数据治理的"放大器"，而不是裁判**。

---

## 三、AI 在丰图的第二个定位：服务于"智能决策"

如果说基础产品解决的是"看得清"，那么行业产品解决的是"想得对、做得快"。

### 1. 决策智能，不是算法炫技

真正的决策智能，往往不是复杂模型，而是：
- 是否基于可信数据；
- 是否贴合业务语义；
- 是否能被人理解、验证和使用。

AI 在这里的定位同样需要克制。

---

## 四、结合行业产品，看 AI 如何"正确地出现"

### 1. 物流行业：AI 不是替代调度，而是降低决策摩擦

在物流场景中，AI 的合理位置包括：
- 地址与 AOI 的自动纠错，减少调度前的不确定性；
- 异常路径、异常网点的提前识别；
- 辅助分析而非直接替代人工调度决策。

**AI 的价值在于：让调度员面对的是"干净问题"，而不是"脏数据"。**

---

### 2. 公安与政务：AI 是线索放大器，而不是判断者

在政务与公安场景中，丰图产品的核心是：
- 空间实体清晰；
- 时空关系可信；
- 数据来源合规。

AI 的作用更偏向：
- 从大量空间与时序数据中，提示"值得关注的点"；
- 发现异常关联；
- 提供辅助分析视角。

但最终判断权，始终在业务人员手中。

这是 **可信决策的底线**。

---

### 3. 城管与环卫：AI 用于提升覆盖与响应效率

在城管、环卫等高频、低容错场景中，AI 更适合做：
- 自动识别问题类型；
- 辅助生成工单；
- 优化巡检路径与节奏。

但数据是否进入统计口径、是否作为考核依据，依然要基于 **可信数据底盘**。

---

### 4. 企业与行业客户：AI 是"分析入口"，不是"黑箱结论"

在企业分析、选址、经营分析等场景中，AI 可以：
- 降低使用门槛；
- 提供多角度解释；
- 帮助非专业用户理解空间数据。

但丰图的产品价值，不是"AI 告诉你答案"，而是：

**让客户理解"为什么是这个答案"。**

---

## 五、统一视角下的产品结构理解

从整体看，AI 在丰图产品体系中的合理位置是：

- **在基础产品中**：
提升数据生产、治理、更新的效率与质量。

- **在行业产品中**：
提升分析、判断和响应的效率，但不越权。

- **在产品形态上**：
AI 更多以内嵌能力存在，而不是独立"AI 产品"。

这背后的逻辑非常清晰：

**丰图卖的不是智能本身，而是"可被信任的智能"。**

---

## 结语：克制，才是长期竞争力

AI 的能力还会继续进化，速度可能比我们预期的更快。
但对丰图而言，真正重要的不是"跟不跟得上 AI"，而是：
- 是否始终围绕 **可信数据**；
- 是否始终服务 **真实决策**；
- 是否拒绝"为了 AI 而 AI"。

当 AI 成为基础设施时，**克制使用 AI，本身就是一种产品能力**。

这，恰恰是丰图最适合、也最有优势走的一条路。
`
  },
  {
    title: 'AI+ Engineer：重新定义工程师的生产力边界',
    date: '2026-01-24',
    detail: '从代码补全到架构设计，从需求理解到性能优化，AI正在成为每位工程师的超级助手。探讨如何与AI协作，提升10倍研发效率的实践经验。',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: `
# AI+ Engineer：从共识到现实的三年进化

## 一、从一开始的共识说起

大模型刚出现的时候，行业里其实有一个高度一致的判断：所有应用都会被重写。

这个判断并不是空穴来风。语言、代码、图像、搜索、分析，这些原本需要大量人工参与的中间环节，第一次被一个统一的智能体所覆盖。很多人都相信，应用形态会发生根本变化，甚至"应用"本身都会消失，取而代之的是智能体直接完成任务。

但这个判断，在很长一段时间里，更像是一个方向感，而不是现实。

---

## 二、回到一年前：知道重要，但不知道会怎么发生

如果回到 2025 年的这个时候，我的真实感受其实是矛盾的。

一方面，我能明确感知到 AI 的重要性。不论是 ChatGPT、Claude，还是当时的一些开源模型，它们已经证明：对话式智能会成为基础能力，所有人都绕不开。

但另一方面，我并不知道 AI 会如何真正改变我们的工作方式和产品形态。

那时：
- DeepSeek 还没有出现；
- 开源模型能对话，但在复杂推理、工程任务、长期协作上明显力不从心；
- 更多还是"演示级智能"，而不是"生产级智能"。

所以那一年，我只能说"关注 AI"，却无法清晰回答：它会在哪些环节，真正替代人？它会怎样改变组织、流程和产品？

---

## 三、DeepSeek 引爆之后：热闹，但并未真正改变生产力

真正的转折，发生在过年前夜 DeepSeek 的发布。

那几乎是一次"情绪级"的引爆。整个中国的信息化厂商、软件厂商、集成商，在极短时间内被点燃，纷纷推出各种"DeepSeek + X"的产品。

但坦率地说，结果是令人冷静的。

从春节后到整个上半年：
- 市场极其热闹；
- 发布会、方案、Demo 层出不穷；
- 但在真实生产环境中，很少看到"数量级"的效率提升。

很多产品，本质上只是：
- 把原有流程外面包了一层对话；
- 或者把 AI 当成一个更聪明的搜索框。

热度很高，但生产力变化有限。

---

## 四、真正的跃迁：模型能力跨过临界点

变化发生在 2025 年下半年。

从 ChatGPT 5.1、Gemini 3、Claude 新一代模型到后来一些新架构模型的出现，AI 能力第一次出现了质的飞跃：
- 不只是"更聪明"，而是更稳定；
- 不只是会回答问题，而是能持续完成任务；
- 不只是写代码，而是能理解工程、执行修改、验证结果。

到十月份开始，一些全景平台和工程级应用开始试水，我第一次清晰地看到：

AI 不再只是辅助工具，而是在某些场景中，已经成为"主执行者"。

这不是演示，而是可复用、可扩展的生产实践。

---

## 五、站在 2026 年回看：变化已经不可逆

走到今天，如果要形容 AI 在 2026 年将对 IT 产业带来的变化，用"巨大"甚至"剧烈"都不为过。

有些信号已经非常明确：
- 算力需求结构性上升；
- 内存价格的持续暴涨，本身就是最直观的产业信号；
- 软件开发、运维、测试、分析，这些传统"人密集型环节"，正在被快速重构。

这一次，变化不是发生在某个应用上，而是发生在整个生产体系的底层。

---

## 六、从 BMAD 看清方向：系统化 AI 开发正在成型

也正是在这个阶段，像 BMAD 这样围绕 AI Code 的系统化开发论体系开始出现，并且迅速成熟。

它们的意义不在于某个具体工具，而在于一个事实：

**软件开发第一次可以被当作"可编排的智能流程"，而不是个人技艺。**

当 AI：
- 能承担稳定角色；
- 能执行真实动作；
- 能在工程闭环中持续工作；

那么，"团队规模"这件事，就被重新定义了。

**一人公司，将不再是理想主义，而会成为主流组织形态之一。**

不是因为人变得更累，而是因为：
- 一个个体，第一次拥有了"系统级协作能力"；
- 过去需要一个团队完成的事情，正在被压缩进一个人 + 一套 AI 工程体系。

---

## 结语

回头看这三年，最重要的并不是模型参数涨了多少，而是：

**我们终于看清了 AI 改变世界的方式。**
它不是取代人，而是重写"如何做事"。

而这一次，已经没有回头路了。
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
  const navigate = useNavigate()
  const { isAuthenticated, user, loading, logout } = useAuth()
  const [selectedArticle, setSelectedArticle] = useState<BulletinItem | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)

  useEffect(() => {
    const loadPublishedArticles = async () => {
      try {
        setArticlesLoading(true)
        const result = await articleService.getPublishedArticles(1, 20)
        setPublishedArticles(result.articles)
      } catch (error) {
        console.error('Failed to load published articles:', error)
      } finally {
        setArticlesLoading(false)
      }
    }

    loadPublishedArticles()
  }, [])

  const handlePostClick = () => {
    if (isAuthenticated) {
      navigate('/articles/new')
      return
    }
    navigate('/login', { state: { from: '/blackboard' } })
  }

  const convertArticleToBulletin = (article: Article): BulletinItem => {
    const date = article.published_at 
      ? new Date(article.published_at).toLocaleDateString('zh-CN')
      : new Date().toLocaleDateString('zh-CN')
    
    return {
      title: article.title,
      date,
      detail: article.summary || '',
      cover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(153, 102, 204, 0.25))',
      content: article.content,
      articleId: article.id
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  const handleArticleClick = (item: BulletinItem) => {
    // If this is a published article from database, navigate to article detail page
    if (item.articleId) {
      navigate(`/articles/${item.articleId}`)
    } else if (item.content) {
      // For static bulletins with content, open modal
      setSelectedArticle(item)
    }
  }

  const closeModal = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="blackboard-page">
      <section className="blackboard-hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>产品故事与技术分享</h1>
            <p className="hero-subtitle">记录团队的灵感、踩坑与展望。</p>
            <div className="hero-highlights">
              <span>产品更新</span>
              <span>技术动态</span>
              <span>行业见解</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="auth-status-card">
              <span className={`status-dot ${loading ? 'neutral' : isAuthenticated ? 'on' : 'off'}`} />
              <div className="auth-actions">
                {isAuthenticated ? (
                  <button
                    type="button"
                    className="auth-button ghost"
                    onClick={handleLogout}
                    disabled={loggingOut || loading}
                  >
                    {loggingOut ? '退出中…' : '退出登录'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="auth-button primary"
                    onClick={() => navigate('/login', { state: { from: '/blackboard' } })}
                    disabled={loading}
                  >
                    登录 / 注册
                  </button>
                )}
              </div>
              <div className="auth-status-message">
                {loading
                  ? '登录状态检测中…'
                  : isAuthenticated
                  ? `已登录：${user?.email || user?.nickname || '用户'}`
                  : '未登录，登录后可发帖与查看内部文章。'}
              </div>
            </div>
            <button type="button" className="post-button" onClick={handlePostClick}>
              <span className="post-icon">✏️</span>
              <span className="post-text">我要分享</span>
            </button>
          </div>
        </div>
      </section>

      <section className="blackboard-section compact">
        <div className="section-header">
          <div className="section-eyebrow">BULLETIN</div>
          <h2>内部快讯</h2>
          <p>团队分享、圆桌与实战笔记，保持周更。</p>
        </div>
        <div className="bulletin-list">
          {(() => {
            const bulletinItems = [
              ...bulletins,
              ...publishedArticles.map(convertArticleToBulletin)
            ]
            return bulletinItems.map((item) => (
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
            ))
          })()}
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
              <div className="article-content">
                <ReactMarkdown>{selectedArticle.content || ''}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlackboardPage
