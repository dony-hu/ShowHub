import React, { useState } from 'react';
import './PlatformSection.css';

interface ServiceItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  points: string[];
  color: string;
}

export const PlatformSection: React.FC = () => {
  const [activeService, setActiveService] = useState<string>('b1');

  const services: ServiceItem[] = [
    {
      id: 'b1',
      code: 'B1',
      title: '顺丰内部业务决策',
      category: '核心业务',
      color: '#00d4ff',
      description: '服务顺丰全链路运营与管理场景，将物流数据与空间智能深度融合',
      points: [
        '网络规划与选址优化',
        '运力调度与路径规划',
        '运营监控、成本分析与效率评估'
      ]
    },
    {
      id: 'b2',
      code: 'B2',
      title: '企业客户位置智能服务',
      category: '商业化服务',
      color: '#00f5ff',
      description: '面向企业客户的商业化位置智能能力输出',
      points: [
        '直营网点与渠道布局决策',
        '客户覆盖分析与市场潜力评估',
        '物流、供应链、门店运营优化'
      ]
    },
    {
      id: 'g1',
      code: 'G1',
      title: '公安与政法位置智能',
      category: '公安政法',
      color: '#00d4ff',
      description: '支撑公安、政法等领域的空间研判与指挥决策',
      points: [
        '警情态势分析与空间研判',
        '重点区域与目标的风险评估',
        '警务资源的智能布控与调度'
      ]
    },
    {
      id: 'g2',
      code: 'G2',
      title: '城市治理与政数服务',
      category: '城市治理',
      color: '#00f5ff',
      description: '面向城市治理与政数局的空间智能能力',
      points: [
        '城市运行态势分析',
        '城市部件与事件管理',
        '环卫、城管、巡检等精细化治理决策'
      ]
    },
    {
      id: 'industry',
      code: '丰行',
      title: '产业与出行相关决策服务',
      category: '综合服务',
      color: '#00d4ff',
      description: '围绕出行、产业运行等综合场景，提供位置相关的决策支持',
      points: [
        '行业运行态势分析',
        '区域发展与产业分布洞察',
        '风险评估与趋势预测'
      ]
    }
  ];

  const currentService = services.find(s => s.id === activeService)!;

  return (
    <section className="platform-section">
      <div className="platform-container">
        <h2 className="section-title">位置智能决策平台</h2>
        <p className="section-subtitle">面向行业的智能决策服务引擎</p>
        
        <p className="platform-intro">
          位置智能决策平台，是丰图对外提供价值的核心载体。<br/>
          它将复杂的空间数据、算法与模型，封装为可直接使用的行业决策服务，支撑不同业务场景的精细化决策。
        </p>

        <h3 className="subsection-title">覆盖多业务、多行业的决策服务体系</h3>

        <div className="services-layout">
          <div className="services-list">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card ${activeService === service.id ? 'active' : ''}`}
                onClick={() => setActiveService(service.id)}
                style={activeService === service.id ? { borderLeftColor: service.color } : {}}
              >
                <div className="service-code">{service.code}</div>
                <div className="service-info">
                  <h4>{service.title}</h4>
                  <p>{service.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="service-detail">
            <div className="detail-header">
              <span className="detail-code" style={{ color: currentService.color }}>
                {currentService.code}
              </span>
              <h3>{currentService.title}</h3>
            </div>
            <p className="detail-description">{currentService.description}</p>
            <ul className="detail-points">
              {currentService.points.map((point, idx) => (
                <li key={idx}>
                  <span className="point-bullet"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
