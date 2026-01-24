import React from 'react';
import './DeploymentSection.css';

interface DeploymentMode {
  title: string;
  icon: string;
  features: string[];
}

export const PrivateNetworkDeployment: React.FC = () => {
  const deploymentModes: DeploymentMode[] = [
    {
      title: '专网部署',
      icon: '🔐',
      features: [
        '完全隔离的网络环境',
        '数据不出场景',
        '自主可控的操作系统',
        '独立的存储和计算资源'
      ]
    },
    {
      title: '内网部署',
      icon: '🌐',
      features: [
        '企业内网环境',
        '与现有系统集成',
        '灵活的私有化部署',
        '企业级的运维保障'
      ]
    },
    {
      title: '混合部署',
      icon: '⚖️',
      features: [
        '云端 + 本地混合',
        '灵活的资源配置',
        '按需的扩展能力',
        '最优的成本控制'
      ]
    }
  ];

  return (
    <section className="pn-deployment">
      <div className="pn-deployment-container">
        <h2 className="section-title">部署方式</h2>
        <p className="section-subtitle">
          灵活的部署选择，满足不同的安全和合规需求
        </p>

        <div className="deployment-grid">
          {deploymentModes.map((mode, idx) => (
            <div key={idx} className="deployment-card">
              <div className="deployment-icon">{mode.icon}</div>
              <h3 className="deployment-title">{mode.title}</h3>
              <ul className="deployment-features">
                {mode.features.map((feature, featureIdx) => (
                  <li key={featureIdx}>
                    <span className="check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="deployment-process">
          <h3 className="process-title">部署流程</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-num">1</div>
              <p>需求调研与方案设计</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-num">2</div>
              <p>环境准备与部署实施</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-num">3</div>
              <p>系统验收与上线运维</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
