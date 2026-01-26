import React, { useState } from 'react';
import './PolicyArchitectureDiagram.css';

const TABS = [
  { key: 'sensing', label: '态势感知', icon: '👁️' },
  { key: 'dispatch', label: '时空接处警', icon: '🚨' },
  { key: 'risk', label: '风险治理防控', icon: '🛡️' },
  { key: 'tactics', label: '战术空间研判', icon: '🎯' },
  { key: 'resource', label: '勤务资源精算', icon: '📊' },
  { key: 'simulation', label: '安保仿真推演', icon: '🎬' },
];

const TAB_CONTENT: Record<string, React.ReactNode> = {
  sensing: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>态势感知能力 <span className="tab-badge">核心能力</span></h4>
        <button className="detail-btn">了解详情</button>
      </div>
      
      <div className="capability-section">
        <h5>🎯 全域态势可视化</h5>
        <ul>
          <li>支持公安、政务、企业专网环境独立部署，数据物理隔离</li>
          <li>全域警情、警力、资源实时可视化呈现</li>
          <li>多源异构数据融合，动态感知现场态势变化</li>
          <li>支持突发事件快速响应与指挥调度</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li>本地数据环环存储与计算，满足安全合规要求</li>
          <li>权限分级、账号隔离，操作审计可追溯</li>
          <li>满足高安全等级与国密标准的长期运行要求</li>
        </ul>
      </div>
    </div>
  ),
  dispatch: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>时空接处警能力 <span className="tab-badge">智能调度</span></h4>
        <button className="detail-btn">了解详情</button>
      </div>
      
      <div className="capability-section">
        <h5>🚨 智能接处警流程</h5>
        <ul>
          <li>支持公安、政务、企业专网环境的接处警流程定制</li>
          <li>警情精准定位，自动推荐最优处警路径与警力配置</li>
          <li>全链路流程跟踪，实时掌握处警进度与效率</li>
          <li>无外部数据输出，满足数据不出网要求</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li>本地数据环环存储与计算，风险自动识别与预警</li>
          <li>权限分级、账号隔离，满足高等级安全审计要求</li>
          <li>满足高安全等级与国密标准的长期运行要求</li>
        </ul>
      </div>
    </div>
  ),
  risk: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>风险治理防控能力 <span className="tab-badge">主动防控</span></h4>
        <button className="detail-btn">了解详情</button>
      </div>
      
      <div className="capability-section">
        <h5>🛡️ 智能风险管控体系</h5>
        <ul>
          <li>支持公安、政务、企业专网环境的风险治理场景</li>
          <li>智能识别风险隐患，自动分级预警与推送</li>
          <li>非现场管控能力，远程干预与智能处置</li>
          <li>风险治理全流程闭环，从发现到消除可追溯</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li>本地数据环环存储与计算，模型推理本地化运行</li>
          <li>权限分级、操作审计，满足高等级安全合规要求</li>
          <li>满足高安全等级与国密标准的长期运行要求</li>
        </ul>
      </div>
      <button className="detail-btn">了解详情</button>
    </div>
  ),
  tactics: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>战术空间研判能力 <span className="tab-badge">决策支持</span></h4>
        <button className="detail-btn">了解详情</button>
      </div>
      
      <div className="capability-section">
        <h5>🎯 复杂环境推演分析</h5>
        <ul>
          <li>支持公安、政务、企业专网环境的战术推演需求</li>
          <li>复杂环境下攻防策略推演与多方案对比</li>
          <li>空间要素透明化，三维场景辅助决策</li>
          <li>实战数据与模型深度融合，提升决策精准度</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li>本地数据环环存储与计算，推演结果不出专网</li>
          <li>权限分级、场景隔离，满足高等级保密要求</li>
          <li>满足高安全等级与国密标准的长期运行要求</li>
        </ul>
      </div>
    </div>
  ),
  resource: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>勤务资源精算能力 <span className="tab-badge">效能优化</span></h4>
        <button className="detail-btn">了解详情</button>
      </div>
      
      <div className="capability-section">
        <h5>📊 智能资源调度</h5>
        <ul>
          <li>支持公安、政务、企业专网环境的资源优化场景</li>
          <li>警力、装备等资源智能调度与动态配置</li>
          <li>量化评估投放效能，数据驱动勤务优化</li>
          <li>提升勤务覆盖率、响应速度与处置效率</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li>本地数据环环存储与计算，资源数据不出专网</li>
          <li>权限分级、操作审计，满足高等级安全要求</li>
          <li>满足高安全等级与国密标准的长期运行要求</li>
        </ul>
      </div>
    </div>
  ),
  simulation: (
    <div className="service-detail-panel">
      <div className="service-panel-header">
        <h4>安保仿真推演能力 <span className="tab-badge">全流程支持</span></h4>
        <button className="detail-btn">了解详情</button>
      </div>
      
      <div className="capability-section">
        <h5>🎬 重大安保全链支持</h5>
        <ul>
          <li>支持公安、政务、企业专网环境的安保任务</li>
          <li>重大安保任务预案制作、风险推演与复盘汇报</li>
          <li>多场景仿真模拟，辅助决策优化与应急响应</li>
          <li>时空数据与三维场景深度融合，提升推演真实性</li>
        </ul>
      </div>

      <div className="capability-section">
        <h5>🔒 数据与系统安全可控</h5>
        <ul>
          <li>本地数据环环存储与计算，推演数据不出专网</li>
          <li>权限分级、场景隔离，满足高等级保密审计要求</li>
          <li>满足高安全等级与国密标准的长期运行要求</li>
        </ul>
      </div>
    </div>
  ),
};

const ServiceDetailTabs: React.FC = () => {
  const [active, setActive] = useState('sensing');
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
