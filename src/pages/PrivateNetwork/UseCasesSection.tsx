import React, { useState } from 'react';
import './UseCasesSection.css';

interface UseCase {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const PrivateNetworkUseCases: React.FC = () => {
  const [selectedUseCase, setSelectedUseCase] = useState(0);

  const useCases: UseCase[] = [
    {
      title: '公安应用',
      icon: '👮',
      description: '为公安机关提供位置管理、轨迹分析等核心业务支撑',
      features: [
        '案件地点智能分析与关联',
        '多源数据融合与可视化',
        '涉案人员轨迹还原与研判',
        '高效的区域搜索与预警'
      ]
    },
    {
      title: '政务服务',
      icon: '🏛️',
      description: '支持政府部门的地理信息管理与空间决策',
      features: [
        '城市管理的空间智能化',
        '应急管理的位置感知',
        '资源配置的优化决策',
        '规范部署与数据安全'
      ]
    },
    {
      title: '军队应用',
      icon: '🎖️',
      description: '满足军队的严苛安全与可靠性要求',
      features: [
        '完全国产化的技术栈',
        '最高等级的安全认证',
        '离线与专网部署支持',
        '军事级别的可用性保证'
      ]
    },
    {
      title: '专网环境',
      icon: '🔒',
      description: '为企业和机构提供专网地图部署方案',
      features: [
        '完整的离线数据支持',
        '灵活的定制化能力',
        '稳定的长期运维支持',
        '与现有系统的无缝集成'
      ]
    }
  ];

  const current = useCases[selectedUseCase];

  return (
    <section className="pn-usecases">
      <div className="pn-usecases-container">
        <h2 className="section-title">应用场景</h2>
        <p className="section-subtitle">
          为不同行业和场景提供专业的地图与空间服务解决方案
        </p>

        <div className="usecases-content">
          <div className="usecases-tabs">
            {useCases.map((useCase, idx) => (
              <button
                key={idx}
                className={`usecase-tab ${idx === selectedUseCase ? 'active' : ''}`}
                onClick={() => setSelectedUseCase(idx)}
              >
                <span className="tab-icon">{useCase.icon}</span>
                <span className="tab-title">{useCase.title}</span>
              </button>
            ))}
          </div>

          <div className="usecase-detail">
            <h3 className="usecase-title">{current.title}</h3>
            <p className="usecase-description">{current.description}</p>
            <ul className="usecase-features">
              {current.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="feature-check">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
