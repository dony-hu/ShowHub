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
      title: '内网单域部署',
      icon: '🔐',
      features: [
        '单域隔离，数据和推理都留在内网',
        '适合政务、企业和高安全业务场景',
        '支持本地存储、向量检索和模型服务',
        '可接入现有统一身份和权限体系'
      ]
    },
    {
      title: '双中心容灾',
      icon: '🛰️',
      features: [
        '主备中心同步部署，支持故障切换',
        '满足核心系统高可用和连续运行要求',
        '适合城市治理和指挥调度平台',
        '支持分级恢复和按域回放'
      ]
    },
    {
      title: '隔离区混合部署',
      icon: '⚖️',
      features: [
        '敏感数据本地运行，非敏感能力可弹性扩展',
        '适合多系统协作和阶段性迁移',
        '既保留数据主权，也保留扩展空间',
        '支持分层运维和策略控制'
      ]
    }
  ];

  return (
    <section className="pn-deployment">
      <div className="pn-deployment-container">
        <h2 className="section-title">部署架构</h2>
        <p className="section-subtitle">
          为专网地图和空间智能能力选择合适的运行拓扑，在安全、可靠和扩展之间保持平衡
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
          <h3 className="process-title">落地流程</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-num">1</div>
              <p>场景盘点与安全边界定义</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-num">2</div>
              <p>环境准备与私有化部署</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-num">3</div>
              <p>联调验收与持续运营</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
