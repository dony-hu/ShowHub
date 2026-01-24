import React from 'react';
import './IntegrationSection.css';

export const OpenPlatformIntegration: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: '注册开发者账户',
      description: '访问开放平台，创建开发者账户并完成身份认证'
    },
    {
      number: '2',
      title: '创建应用',
      description: '在控制台创建应用，获取 API Key 和 Secret'
    },
    {
      number: '3',
      title: '集成 SDK',
      description: '选择对应语言的 SDK，按照文档快速集成'
    },
    {
      number: '4',
      title: '开发调试',
      description: '使用沙箱环境进行开发和测试'
    },
    {
      number: '5',
      title: '上线运维',
      description: '应用通过审核后上线，享受完整的监控和支持'
    }
  ];

  return (
    <section className="op-integration">
      <div className="op-integration-container">
        <h2 className="section-title">快速开始</h2>
        <p className="section-subtitle">
          五个简单步骤，快速集成丰图开放平台能力
        </p>

        <div className="steps-timeline">
          {steps.map((step, idx) => (
            <div key={idx} className="timeline-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {idx < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>

        <div className="integration-highlight">
          <h3>完整的技术支持</h3>
          <ul className="support-list">
            <li>📖 详细的 API 文档和示例代码</li>
            <li>🔧 多语言 SDK（JavaScript, Python, Java, Go）</li>
            <li>💬 开发者社区和技术论坛</li>
            <li>🎯 专业的技术支持团队</li>
            <li>📊 完整的监控、分析和调试工具</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
