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
      title: '政务 Agent',
      icon: '🏛️',
      description: '在政务内网中承载空间问答、地址治理、事项调度和跨部门协同',
      features: [
        '事项地址、责任区和网格自动关联',
        '跨部门资源与事件统一调度',
        '自然语言驱动的空间研判',
        '面向窗口、热线和指挥链路的空间支撑'
      ]
    },
    {
      title: '企业 Agent',
      icon: '🏢',
      description: '面向园区、制造、物流和能源等企业内网场景，构建私有空间运营中枢',
      features: [
        '园区资产、工单和空间对象统一锚定',
        '内网地址搜索与知识问答',
        '生产、仓储和巡检联动调度',
        '支撑长期运营的数据主权要求'
      ]
    },
    {
      title: '应急 Agent',
      icon: '🚨',
      description: '面向应急值守、灾害响应和突发事件，提供可编排的空间行动能力',
      features: [
        '事件接入、影响范围和资源分布一屏掌握',
        '路径、设施和风险点联合研判',
        '预案编排与行动建议自动生成',
        '保障时效性与可追溯性'
      ]
    },
    {
      title: '地址与图谱 Agent',
      icon: '🧠',
      description: '面向地址治理、知识问答和实体融合，构建企业/政务内部的空间语义中枢',
      features: [
        '非标准地址解析与纠错',
        '私域知识图谱问答和追问',
        '地址、建筑、组织与事件联动',
        '支持业务系统无缝调用'
      ]
    }
  ];

  const current = useCases[selectedUseCase];

  return (
    <section className="pn-usecases">
      <div className="pn-usecases-container">
        <h2 className="section-title">Agent 场景</h2>
        <p className="section-subtitle">
          围绕企业和政务内部最常见的空间工作流，构建可直接落地的 Agent 使用场景
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
