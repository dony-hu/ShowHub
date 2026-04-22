import React from 'react';
import './IntegrationSection.css';

const steps = [
  {
    number: '01',
    title: '定义工具边界',
    description: '先把地图、编码、路线、围栏和数据服务拆成最小可调用单元。',
  },
  {
    number: '02',
    title: '配置认证与权限',
    description: '按应用、密钥、项目与空间范围设置调用权限和配额。',
  },
  {
    number: '03',
    title: '接入 SDK 或 API',
    description: '前端、后端和智能应用都可以选择最合适的接入方式。',
  },
  {
    number: '04',
    title: '编排工作流',
    description: '把工具挂到业务流程、自动化任务链或事件回调中。',
  },
  {
    number: '05',
    title: '上线观测治理',
    description: '跟踪调用、审计结果、优化参数并持续治理空间资产。',
  },
];

const integrationModes = [
  'REST API',
  'SDK 集成',
  '工具发现与编排',
  'Webhook 事件回传',
  '权限与审计面板',
];

export const OpenPlatformIntegration: React.FC = () => {
  return (
    <section className="op-integration">
      <div className="op-section-inner">
        <div className="op-section-heading">
          <span className="op-section-kicker">接入路径</span>
          <h2>从注册到上线，形成可治理的空间工具生产流程</h2>
          <p>
            平台接入不只是拿到一个 Key，而是建立一条可维护、可追踪、可扩展的空间工具链路。
          </p>
        </div>

        <div className="op-integration-grid">
          <div className="op-integration-steps">
            {steps.map((step) => (
              <article key={step.number} className="op-integration-step">
                <span className="op-integration-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="op-integration-panel">
            <div className="op-integration-panel-title">支持模式</div>
            <div className="op-integration-modes">
              {integrationModes.map((mode) => (
                <span key={mode} className="op-integration-mode">{mode}</span>
              ))}
            </div>
            <p className="op-integration-note">
              工具注册后可以进入开发、测试和生产环境，并结合权限、调用额度和审计策略进行持续治理。
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};
