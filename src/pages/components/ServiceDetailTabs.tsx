import React, { useState } from 'react';
import './PolicyArchitectureDiagram.css';

const DETAIL_URL = 'https://service-579851306606.us-west1.run.app'

const DetailButton = () => (
  <a className="detail-btn" href={DETAIL_URL} target="_blank" rel="noreferrer">
    了解详情
  </a>
)

const TABS = [
  { key: 'dispatch', label: '时空接处警', icon: '🚨' },
  { key: 'risk', label: '风险治理防控', icon: '🛡️' },
  { key: 'tactics', label: '战术空间研判', icon: '🎯' },
  { key: 'resource', label: '勤务资源精算', icon: '📊' },
  { key: 'simulation', label: '安保仿真推演', icon: '🎬' },
];

const TAB_CONTENT: Record<string, React.ReactNode> = {
  dispatch: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>时空接处警能力 <span className="tab-badge">智能调度</span></h4>
        <DetailButton />
      </div>
      
      <div className="capability-section">
        <h5>🚨 核心决策能力</h5>
        <ul>
          <li><strong>L24级微观标定</strong>：突破传统定位局限，将模糊坐标精准锁定至微观地理实体</li>
          <li><strong>秒级风险画像</strong>：接警瞬间碰撞全息档案，自动预警重点关注人员等高危人地标签</li>
          <li><strong>语义智能清洗</strong>：内置行业NLP引擎，支持将口语化、碎片化描述秒级映射为标准地址</li>
          <li><strong>接警即研判</strong>：改变滞后模式，同步推送周边警力热力与处置预案，支撑即时指挥</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li><strong>可用不可见</strong>：敏感信息自动脱敏，仅输出风险标签与决策结果，原始档案不落地</li>
          <li><strong>全链路审计</strong>：建立"接警-研判-查询"的完整日志审计，确保每一次数据调用可追溯</li>
          <li><strong>国密级防护</strong>：全流程采用 SM4 国密算法加密传输，满足公安专网高等级合规要求</li>
        </ul>
      </div>
    </div>
  ),
  risk: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>风险治理防控能力 <span className="tab-badge">主动防控</span></h4>
        <DetailButton />
      </div>
      
      <div className="capability-section">
        <h5>🛡️ 核心决策能力</h5>
        <ul>
          <li><strong>多维风险融合一张图</strong>：汇聚警情、重点人员、高危场所数据，构建全域"动态风险一张图"</li>
          <li><strong>隐患智能归因</strong>：深度挖掘高发案背后的时空诱因（如管理盲区），实现从"治标"到"治本"</li>
          <li><strong>源头治理闭环</strong>：自动生成"源头整改单"推送至责任单位，全流程跟踪整改效果，实现隐患清零</li>
          <li><strong>分级分类管控</strong>：对辖区网格进行红/黄/绿动态分级预警，驱动治理资源向高危区域精准倾斜</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li><strong>数据不出专网</strong>：支持本地化部署，原始数据在专网内闭环存储与计算，确保物理隔离</li>
          <li><strong>分级授权审计</strong>：建立严格的权限分级与账号隔离体系，关键操作全程留痕，满足合规审计</li>
          <li><strong>模型安全封装</strong>：核心风险计算模型采用加密封装技术，确保算法运行过程安全可控</li>
        </ul>
      </div>
      <DetailButton />
    </div>
  ),
  tactics: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>战术空间研判能力 <span className="tab-badge">决策支持</span></h4>
        <DetailButton />
      </div>
      
      <div className="capability-section">
        <h5>🎯 核心决策能力</h5>
        <ul>
          <li><strong>LCC 室内结构透视</strong>：穿透建筑外立面，清晰呈现"户型、电梯"等微观结构，消除室内盲区</li>
          <li><strong>视域盲区智能计算</strong>：基于 3D 实景分析监控死角与观察视线，辅助战术点位部署与隐蔽接敌</li>
          <li><strong>战术突击路径规划</strong>：智能生成最优突击与撤离路线，模拟不同入口（门/窗）的攻防效果</li>
          <li><strong>攻防态势单向透明</strong>：实时融合警力位置与三维环境，为指挥员构建"敌暗我明"的绝对战术优势</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li><strong>底图本地私有化</strong>：高精度室内地图与三维实景数据实现本地私有化部署，杜绝地理信息外泄风险</li>
          <li><strong>细粒度权限管控</strong>：对敏感区域（如重点单位）查看权限实施严格分级，非授权人员不可见</li>
          <li><strong>测绘合规保障</strong>：系统数据处理全流程符合国家测绘地理信息安全保密标准，满足合规要求</li>
        </ul>
      </div>
    </div>
  ),
  resource: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>勤务资源精算决策能力 <span className="tab-badge">效能优化</span></h4>
        <DetailButton />
      </div>
      
      <div className="capability-section">
        <h5>📊 核心决策能力</h5>
        <ul>
          <li><strong>风险热力驱动布防</strong>：基于历史警情，算法自动生成必巡点位、常态点位、与重点压制区域</li>
          <li><strong>效能指标量化精算</strong>：建立"覆盖-压降"精算模型，量化评估核心区覆盖率与警力投放性价比</li>
          <li><strong>动态巡防补盲决策</strong>：实时监测巡逻轨迹，智能识别漏管区域，杜绝防控死角</li>
          <li><strong>勤务科学排兵布阵</strong>：将有限警力从"散乱撒网"升级为向高危时段、高发案点位精准投送</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li><strong>轨迹数据不出专网</strong>：所有警力定位与轨迹数据在本地闭环存储与计算，严防敏感路线外泄</li>
          <li><strong>权限分级审计</strong>：对警力分布图实施严格的分级授权可见，操作记录全链路审计，防止非授权查看</li>
          <li><strong>高等级合规运行</strong>：满足公安高安全等级与国密标准的长期稳定运行要求</li>
        </ul>
      </div>
    </div>
  ),
  simulation: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>安保仿真推演能力 <span className="tab-badge">全流程支持</span></h4>
        <DetailButton />
      </div>
      
      <div className="capability-section">
        <h5>🎬 核心决策能力</h5>
        <ul>
          <li><strong>全要素三维沙盘</strong>：基于城市级实景底座，支持对警力、设施、车辆进行全要素三维标绘</li>
          <li><strong>多视角动态推演</strong>：支持模拟"车队行进"与"制高点狙击"第一人称视角，动态验证安保方案</li>
          <li><strong>视域盲区智能识别</strong>：算法自动计算安保视线遮挡与监控盲区，辅助优化哨位部署，排除隐患</li>
          <li><strong>预案可视化复盘</strong>：全流程记录推演过程，自动生成可回溯、可汇报的数字化安保预案</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li><strong>高精数据本地化</strong>：所有三维模型与实景数据在本地私有云部署，确保敏感地理信息不外泄</li>
          <li><strong>线路方案绝密管控</strong>：对警卫路线与核心安保方案实施绝密级权限控制，严防核心情报泄露</li>
          <li><strong>全流程合规审计</strong>：推演与查看记录全链路留痕，满足重大安保活动的高等级合规审计要求</li>
        </ul>
      </div>
    </div>
  ),
};

const ServiceDetailTabs: React.FC = () => {
  const [active, setActive] = useState('dispatch');
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 0px', fontSize: '32px', fontWeight: 900, color: 'var(--police-text)' }}>
          核心决策服务介绍
        </h3>
      </div>
      <div className="service-detail-tabs">
        <div className="service-tab-bar">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`service-tab-btn${active === tab.key ? ' active' : ''}`}
              onClick={() => setActive(tab.key)}
            >
              <span className="service-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="service-tab-content">
          {TAB_CONTENT[active]}
        </div>
      </div>
    </>
  );
};

export default ServiceDetailTabs;
