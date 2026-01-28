import React from 'react'
import ArchitectureDiagram from './ArchitectureDiagram'
import './ProductArchitectureSection.css'

const diagram = `
flowchart TB

subgraph L1["行业位置智能决策服务"]
direction LR
物流["物流<br/>网络规划 / 投递决策"]
货运["货运<br/>路径合规 / 成本决策"]
公安["公安<br/>空间态势 / 警务决策"]
政数["政数<br/>数据治理 / 决策支撑"]
环卫["环卫<br/>作业调度 / 覆盖分析"]
城管["城管<br/>部件治理 / 事件决策"]
金融["金融<br/>风控 / 网点决策"]
电力["电力<br/>设施运维 / 调度决策"]
运营商["运营商<br/>网络规划 / 选址决策"]
零售["零售<br/>选址 / 商圈决策"]
电商["电商<br/>履约 / 区域运营决策"]
end

subgraph L2["位置智能服务平台"]
direction TB
A1["空间数据与地图服务<br/>地图 / 地址 / AOI / 空间实体"]
A2["基础位置能力<br/>搜索 / 定位 / 路径 / 覆盖分析"]
A3["时空分析能力<br/>流动分析 / 变化识别 / 指标计算"]
A4["平台化服务能力<br/>API / SDK / 服务编排 / 权限安全"]
end

subgraph L3["数据资产体系"]
direction TB
D1["基础空间数据<br/>道路 / 区域 / 网格"]
D2["地址与 AOI 数据<br/>标准地址 / 空间实体 / 关系网络"]
D3["业务行为数据<br/>物流轨迹 / 作业行为 / 事件反馈"]
D4["行业专题数据<br/>行业规则 / 设施 / 运行状态"]
end

subgraph L4["能力交付形态"]
direction LR
O1["丰图开放平台<br/>在线 API / SaaS 服务"]
O2["丰图专网地图<br/>私有化 / 专网部署"]
end

L3 --> L2
L2 --> L1
L2 --> O1
L2 --> O2
`

const ProductArchitectureSection: React.FC = () => {
  return (
    <section className="product-architecture-section">
      <div className="architecture-container">
        <div className="section-header">
          <h2>产品与解决方案全景</h2>
          <p>
            基于<strong>空间智能数据工厂</strong>，构建可信、可持续的数据体系；通过丰图的决策服务产品体系，
            将这些数据转化为可执行的行业决策能力。
          </p>
          <p className="flow-description">空间智能数据工厂 → 数据资产体系 → 位置智能服务平台 → 行业位置智能决策服务</p>
        </div>
        <div className="diagram-wrapper">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  )
}

export default ProductArchitectureSection
