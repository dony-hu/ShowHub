import React, { useState } from 'react'
import './ProductServicesMenu.css'

export const ProductServicesMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  let closeTimeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const categories = [
    {
      name: '物流',
      icon: '📦',
      url: '/industry/logistics',
      desc: '面向快递与即时物流的网络与投递决策',
      packages: [
        '地址与 AOI 治理包',
        '网点覆盖与路径效率包',
        '投递与运营决策包'
      ]
    },
    {
      name: '货运',
      icon: '🚚',
      url: '/industry/freight',
      desc: '干线 / 城市货运路径与合规决策',
      packages: [
        '货运路径与可达性包',
        '限行收费与风险叠加包',
        '成本与时效综合决策包'
      ]
    },
    {
      name: '公安',
      icon: '🚔',
      url: '/industry/police',
      desc: '警务时空决策服务专家',
      packages: [
        { name: '态势感知', desc: '警情、人员、资源全域可视化' },
        { name: '接处警支撑', desc: '精准定位到风险研判全链支持' },
        { name: '风险防控', desc: '发现隐患到治理的非现场管控' },
        { name: '战术空间研判', desc: '攻防决策与环境透明化支持' },
        { name: '警务资源精算', desc: '警力投放效能量化精算' },
        { name: '安保防推演', desc: '预案制作、风险推演、复盘汇报' }
      ]
    },
    {
      name: '政数',
      icon: '🏛️',
      url: '/industry/gov-data',
      desc: '政务数据空间化与治理决策',
      packages: [
        { name: '全景招商宣推', desc: '沉浸式3D展示与VR全景，驱动招商融资引资' },
        { name: '重大项目会商', desc: '多端协同指挥，数据驱动科学决策' },
        { name: '实景指挥调度', desc: '视空融合精准指挥，快速应急响应' },
        { name: '时空底盘治理', desc: '智能清洗标准化，夯实数字政府底座' },
        { name: '城市更新核查', desc: '三维模型精准量算，成本评估透明化' },
        { name: '网格精细治理', desc: '人房企事图谱关联，精准落格管理' }
      ]
    },
    {
      name: '环卫',
      icon: '🧹',
      url: '/industry/sanitation',
      desc: '城市环卫作业运行与调度决策',
      packages: [
        '作业区域与路线规划包',
        '覆盖与质量分析包',
        '效率与资源配置包'
      ]
    },
    {
      name: '城市治理运营',
      icon: '🏙️',
      url: '/industry/urban-management',
      desc: '城市部件与事件治理决策',
      packages: [
        '部件与事件空间管理包',
        '巡查与问题发现包',
        '治理决策支撑包'
      ]
    },
    {
      name: '金融',
      icon: '💳',
      url: '/industry/finance',
      desc: '金融风控与网点布局空间分析',
      packages: [
        '地址与主体识别包',
        '区域风险与覆盖分析包',
        '网点布局与风控决策包'
      ]
    },
    {
      name: '电力',
      icon: '⚡',
      url: '/industry/power',
      desc: '电力设施与运行管理决策',
      packages: [
        '设施与线路空间管理包',
        '覆盖范围与风险分析包',
        '运维与调度决策包'
      ]
    },
    {
      name: '运营商',
      icon: '📡',
      url: '/industry/telecom',
      desc: '通信网络建设与运营决策',
      packages: [
        '网络覆盖与需求分析包',
        '站点布局与选址评估包',
        '网络优化决策包'
      ]
    },
    {
      name: '零售',
      icon: '🛍️',
      url: '/industry/retail',
      desc: '门店运营与选址空间分析',
      packages: [
        '商圈与人流分析包',
        '门店覆盖与竞争分析包',
        '选址与运营决策包'
      ]
    },
    {
      name: '电商',
      icon: '💻',
      url: '/industry/ecommerce',
      desc: '电商履约与区域运营决策',
      packages: [
        '地址识别与履约范围包',
        '区域需求与配送能力包',
        '运营与履约决策包'
      ]
    },
    {
      name: '开放平台',
      icon: '🛠️',
      url: '/open-platform',
      desc: 'API / SDK / 数据服务开放能力',
      packages: [
        '地图与地址 API 包',
        '开放数据服务包',
        'SDK 工具包',
        'Web / 小程序组件',
        '控制台与文档',
        '数据与解决方案'
      ]
    },
    {
      name: '专网与私有化',
      icon: '🔒',
      url: '/private-network',
      desc: '安全可控的多形态部署与离线能力',
      packages: [
        '专网地图引擎',
        '私有化 API 服务',
        '离线数据资源包',
        '专有数据融合',
        '自主部署方案',
        '安全与合规保证'
      ]
    }
  ]

  return (
    <div 
      className="product-services-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="menu-trigger">产品与解决方案</button>
      
      {isOpen && (
        <div className="menu-dropdown">
          <div className="dual-pane">
            <div className="first-level">
              {categories.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.url}
                  className={`first-level-item ${idx === activeIndex ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                >
                  <div className="first-level-head">
                    <span className="first-level-icon">{item.icon}</span>
                    <span className="first-level-name">{item.name}</span>
                  </div>
                </a>
              ))}
            </div>
            <div 
              className="second-level"
              style={{
                transform: `translateY(${activeIndex * 48}px)`
              }}
            >
              {categories[activeIndex] && (
                <div className="second-level-card">
                  <div className="second-header">
                    <div className="second-title">
                      <div className="second-text">
                        <span className="second-desc">{categories[activeIndex].desc}</span>
                      </div>
                    </div>
                  </div>
                  <div className="package-chips">
                    {categories[activeIndex].packages.map((pkg, i) => {
                      const pkgName = typeof pkg === 'string' ? pkg : pkg.name
                      const pkgDesc = typeof pkg === 'string' ? '' : pkg.desc
                      return (
                        <div key={i} className="package-item">
                          <span className="package-chip">{pkgName}</span>
                          {pkgDesc && <span className="package-desc">{pkgDesc}</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductServicesMenu
