import React from 'react';
import { Link } from 'react-router-dom';
import './BaseServicesSection.css';

interface Service {
  title: string;
  icon: string;
  points: string[];
  link: string;
}

export const BaseServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      title: '丰图开放平台',
      icon: '🔌',
      link: '/open-platform',
      points: [
        '统一对外的空间能力开放入口',
        '提供地图、地址、空间分析、搜索等标准化 API',
        '支撑企业与开发者快速集成空间智能能力',
        '让空间能力像云服务一样 可调用、可组合、可规模化使用'
      ]
    },
    {
      title: '丰图专网地图',
      icon: '🔒',
      link: '/private-network',
      points: [
        '面向专网、内网及高安全要求场景',
        '支持公安、政务等合规部署需求',
        '提供完整的地图与空间服务能力',
        '保障在高安全、强合规环境下，空间能力可用、可控、可持续'
      ]
    }
  ];

  return (
    <section className="base-services-section">
      <div className="base-services-container">
        <h2 className="section-title">丰图基础服务能力</h2>
        
        <p className="section-subtitle">
          位置智能决策平台之下，丰图提供稳定、可扩展的基础服务能力，作为所有决策服务的统一底座
        </p>

        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-box">
              <div className="service-header">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
              </div>
              <ul className="service-points">
                {service.points.map((point, pointIdx) => (
                  <li key={pointIdx}>
                    <span className="bullet">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to={service.link} className="service-link">
                了解详情 →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BaseServicesSection;
