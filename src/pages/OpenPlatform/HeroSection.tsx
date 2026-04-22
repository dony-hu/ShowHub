import React from 'react';
import './HeroSection.css';

const heroPills = ['API', 'SDK', '工具编排', '空间检索', '地址理解', '态势渲染'];

const capabilityRows = [
  { label: '工具注册', value: '让能力被检索、被编排、被复用' },
  { label: '权限治理', value: '按应用、角色、场景控制调用边界' },
  { label: '结果回传', value: '输出结构化响应，方便业务系统继续处理' },
];

export const OpenPlatformHero: React.FC = () => {
  return (
    <section className="op-hero">
      <div className="op-hero-shell">
        <div className="op-hero-copy">
          <div className="op-hero-eyebrow">Open Platform / AI Tool Platform</div>
          <h1 className="op-hero-title">
            AI 时代的空间开放平台
          </h1>
          <p className="op-hero-lead">
            面向业务系统、开发者和智能化应用统一开放地图、路线、地理编码、地址理解、地理围栏、态势渲染与数据服务，
            让空间能力以工具的方式进入工作流、进入推理链，并支撑 AI 自动化时代的执行需求。
          </p>
          <div className="op-hero-pills">
            {heroPills.map((pill) => (
              <span key={pill} className="op-hero-pill">{pill}</span>
            ))}
          </div>
          <div className="op-hero-actions">
            <a className="op-hero-button primary" href="https://lbs.sfmap.com.cn/" target="_blank" rel="noopener noreferrer">
              进入控制台
            </a>
            <a className="op-hero-button secondary" href="https://lbs.sfmap.com.cn/" target="_blank" rel="noopener noreferrer">
              查看工具文档
            </a>
          </div>
        </div>

        <div className="op-hero-visual" aria-hidden="true">
          <div className="op-hero-panel">
            <div className="op-hero-panel-top">
              <span className="panel-badge">AI Workflow</span>
              <span className="panel-status">tools-ready</span>
            </div>
            <div className="op-hero-flow">
              <div className="flow-node">用户意图</div>
              <div className="flow-arrow" />
              <div className="flow-node highlighted">工具选择</div>
              <div className="flow-arrow" />
              <div className="flow-node">参数编排</div>
              <div className="flow-arrow" />
              <div className="flow-node success">结构化结果</div>
            </div>
            <div className="op-hero-metrics">
              {capabilityRows.map((row) => (
                <div key={row.label} className="hero-metric">
                  <span className="hero-metric-label">{row.label}</span>
                  <span className="hero-metric-value">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
