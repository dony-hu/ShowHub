# 时空知识图谱页面 - 快速开始

## 已完成的工作 ✅

### 1. 页面创建
- ✅ 创建主页面 `SpatioTemporalKGPage.tsx`
- ✅ 创建主样式 `SpatioTemporalKGPage.css`
- ✅ 创建 8 个核心组件模块 (A-H sections)

### 2. 核心交互功能
- ✅ 地图视图：展示 AOI、地址、道路
- ✅ 图谱视图：力导向布局展示知识图谱
- ✅ 时间轴：3 个时间点状态演化
- ✅ 控制面板：实体类型、关系层级、事件筛选

### 3. 示例数据
- ✅ 3 个空间实体（AOI、地址、道路）
- ✅ 5 种物流服务类型
- ✅ 3 种商品品类
- ✅ 3 个时间点事件
- ✅ 15+ 种关系类型

### 4. 路由配置
- ✅ 添加路由 `/data-factory/stkg`
- ✅ 更新 Data Factory 页面跳转链接

## 访问页面

### 方式 1：直接访问
```
http://localhost:5173/data-factory/stkg
```

### 方式 2：从 Data Factory 页面
1. 访问 `http://localhost:5173/data-factory`
2. 滚动到"物流知识图谱"部分
3. 点击"深入了解｜时空知识图谱 →"按钮

## 核心交互演示

### 地图 → 图谱联动
1. 点击地图中的"物流园区 LG_PARK_02"（中间的紫色矩形区域）
2. 观察右侧图谱自动聚焦该实体
3. 图谱会展开 1-hop 关系（可通过控制面板切换到 2-hop）

### 图谱 → 地图联动
1. 点击图谱中的事件节点（红色/橙色/蓝色圆点）
2. 观察左侧地图高亮相关空间实体
3. 状态条显示事件详情

### 时间轴演化
1. 拖动底部时间轴或点击时间点标记
2. 观察三个状态变化：
   - 09:00 - 正常（绿色）
   - 10:30 - 繁忙（橙色）- 运单激增
   - 11:05 - 异常（红色）- 拥堵影响
3. 地图和图谱同步更新

### 控制面板使用
- **实体类型**：筛选显示的实体类型
- **关系层级**：切换 1-hop 或 2-hop 关系展示
- **事件筛选**：筛选显示的事件类型

## 页面内容概览

### Hero 区域
- 页面标题：深入了解｜时空知识图谱
- 四大核心特点展示

### Section A - 空间智能演进
- 从地图到图谱的必然演进
- 演进流程图：Map → Entities → Relations → Decisions

### Section B - 工程定义
- 四大原则：实体优先、时间一等公民、关系可计算、持续演化
- 核心对象标签展示
- 实体三大属性

### Section C - 技术路线
- 四步流程时间线
- 每步的关键挑战标注

### Section D - 核心能力
- 4 张能力卡片
- 每张卡片 3 个要点

### Section E - 地图×图谱交互 ⭐
- **这是页面的核心价值所在**
- 完整的交互演示
- 真实的物流场景数据

### Section F - 世界模型底座
- 面向机器的三大能力
- 强调服务机器决策

### Section G - 对比表
- 与传统 GIS 的 6 维对比
- 突出时空图谱优势

### Section H - CTA
- 共建理念
- 联系按钮

## 设计特点

### 视觉一致性
- 与 Data Factory 页面完全一致的风格
- 紫色渐变主题
- 深色背景
- 统一的卡片和按钮样式

### 交互体验
- 流畅的动画过渡
- 实时的联动反馈
- 清晰的视觉提示
- 响应式布局

### 内容风格
- 克制、专业的语气
- 突出工程可信度
- 避免营销化表述
- 强调技术判断

## 下一步可以做的

### 数据增强
- 接入真实物流数据
- 增加更多空间实体
- 扩展商品品类
- 添加更多事件类型

### 功能扩展
- 集成真实地图服务（如高德、百度）
- 优化图谱布局算法（使用 D3.js 或 ECharts）
- 添加数据搜索功能
- 支持图谱导出

### 性能优化
- 大规模数据虚拟化
- 图谱渲染优化
- 懒加载组件
- 缓存策略

## 文件清单

```
新增文件：
- src/pages/SpatioTemporalKGPage.tsx
- src/pages/SpatioTemporalKGPage.css
- src/pages/SpatioTemporalKG/STKGHero.tsx
- src/pages/SpatioTemporalKG/STKGHero.css
- src/pages/SpatioTemporalKG/MapToGraphEvolution.tsx
- src/pages/SpatioTemporalKG/MapToGraphEvolution.css
- src/pages/SpatioTemporalKG/STKGDefinition.tsx
- src/pages/SpatioTemporalKG/STKGDefinition.css
- src/pages/SpatioTemporalKG/EngineeringPath.tsx
- src/pages/SpatioTemporalKG/EngineeringPath.css
- src/pages/SpatioTemporalKG/CoreCapabilities.tsx
- src/pages/SpatioTemporalKG/CoreCapabilities.css
- src/pages/SpatioTemporalKG/MapGraphInteraction.tsx
- src/pages/SpatioTemporalKG/MapGraphInteraction.css
- src/pages/SpatioTemporalKG/MapView.tsx
- src/pages/SpatioTemporalKG/MapView.css
- src/pages/SpatioTemporalKG/GraphView.tsx
- src/pages/SpatioTemporalKG/GraphView.css
- src/pages/SpatioTemporalKG/TimelineControl.tsx
- src/pages/SpatioTemporalKG/TimelineControl.css
- src/pages/SpatioTemporalKG/WorldModelSection.tsx
- src/pages/SpatioTemporalKG/WorldModelSection.css
- src/pages/SpatioTemporalKG/ComparisonTable.tsx
- src/pages/SpatioTemporalKG/ComparisonTable.css
- src/pages/SpatioTemporalKG/CTASection.tsx
- src/pages/SpatioTemporalKG/CTASection.css
- src/pages/SpatioTemporalKG/demoData.ts
- STKG_PAGE_README.md
- STKG_QUICK_START.md (本文件)

修改文件：
- src/App.tsx (添加路由和导入)
- src/pages/DataFactory/LogisticsKnowledgeGraph.tsx (更新跳转链接)
```

## 技术栈

- React 18 + TypeScript
- React Router
- CSS Modules
- SVG 图形绘制
- 自定义交互逻辑

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 开发服务器

```bash
npm run dev
# 访问 http://localhost:5173/data-factory/stkg
```

## 构建生产版本

```bash
npm run build
npm run preview
```

---

**页面已完成并可以正常访问！** 🎉

所有要求的模块都已实现，核心交互功能完全可用，示例数据已植入。
