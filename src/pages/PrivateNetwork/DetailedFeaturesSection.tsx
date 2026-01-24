import React, { useState } from 'react';
import './DetailedFeaturesSection.css';

interface FeatureDetail {
  title: string;
  items: string[];
}

interface FeatureCategory {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  features: FeatureDetail[];
}

export const PrivateNetworkDetailedFeatures: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories: FeatureCategory[] = [
    {
      id: 0,
      title: '专网与安全能力',
      subtitle: '基础前提',
      icon: '🔐',
      features: [
        {
          title: '专网 / 内网独立部署',
          items: [
            '支持公安、政务、企业专网环境独立部署',
            '地图、地址、服务组件本地运行',
            '无外部公网依赖，满足数据不出网要求'
          ]
        },
        {
          title: '数据与系统安全可控',
          items: [
            '本地数据闭环存储与计算',
            '权限分级、账号隔离、操作审计',
            '满足高安全与合规场景的长期运行要求'
          ]
        }
      ]
    },
    {
      id: 1,
      title: '内置基础空间能力',
      subtitle: '能力底座',
      icon: '🗺️',
      features: [
        {
          title: '内置丰图地图能力',
          items: [
            '内置 AOI / 基础地图数据',
            '支持园区、社区、商圈、单位等业务级空间对象',
            '适配公安、城市治理等专业使用场景'
          ]
        },
        {
          title: '内置丰图地址服务',
          items: [
            '地址解析、标准化与匹配能力',
            '支持模糊地址、别名地址、非标准地址',
            '可作为本地系统统一地址能力底座'
          ]
        }
      ]
    },
    {
      id: 2,
      title: '本地化地址治理能力',
      subtitle: '核心功能',
      icon: '📍',
      features: [
        {
          title: '一站式地址治理工具',
          items: [
            '地址发现、补录、修正、合并',
            '地址版本管理与变更追溯',
            '支持人工 + 规则 + 批量治理流程'
          ]
        },
        {
          title: '地址与空间对象绑定',
          items: [
            '地址与建筑、单元、AOI 等空间对象关联',
            '支撑业务对象与真实空间的稳定锚定',
            '为后续分析与决策提供统一空间基准'
          ]
        }
      ]
    },
    {
      id: 3,
      title: '网格化管理与空间分析',
      subtitle: '业务工具',
      icon: '🔲',
      features: [
        {
          title: '网格化管理工具',
          items: [
            '行政网格 / 业务网格灵活划分',
            '网格责任区、资源与事件管理',
            '支持跨部门、跨角色协同使用'
          ]
        },
        {
          title: '区域分析与统计能力',
          items: [
            '按区域 / 网格进行统计与对比',
            '支持业务数据与空间数据叠加分析',
            '为管理与指挥提供空间化视角'
          ]
        }
      ]
    },
    {
      id: 4,
      title: '空间智能决策工具箱',
      subtitle: '智能能力',
      icon: '🧠',
      features: [
        {
          title: '智能问图能力',
          items: [
            '通过自然语言或结构化问题查询空间信息',
            '自动完成空间检索、筛选与分析',
            '降低专业 GIS 使用门槛'
          ]
        },
        {
          title: '空间查询与研判工具',
          items: [
            '空间范围查询、邻近分析、路径分析',
            '支持业务对象与空间要素的联合研判',
            '服务于警务、城市治理等决策场景'
          ]
        }
      ]
    },
    {
      id: 5,
      title: '平台化与扩展能力',
      subtitle: '工程能力',
      icon: '⚙️',
      features: [
        {
          title: '平台化服务接口',
          items: [
            '提供统一的地图与地址服务接口',
            '支持与现有业务系统集成',
            '便于二次开发与能力扩展'
          ]
        },
        {
          title: '可持续演进能力',
          items: [
            '支持数据、模型、工具的持续升级',
            '不依赖一次性项目交付',
            '适合作为长期运行的空间智能底座'
          ]
        }
      ]
    }
  ];

  const current = categories[selectedCategory];

  return (
    <section className="pn-detailed-features">
      <div className="pn-detailed-features-container">
        <h2 className="section-title">核心功能说明</h2>
        <p className="section-subtitle">
          可在专网环境独立运行的空间智能底座，内置地图与地址能力，提供本地化地址治理、网格管理与智能问图工具
        </p>

        <div className="features-layout">
          <div className="category-nav">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-item ${category.id === selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <div className="category-info">
                  <h3>{category.title}</h3>
                  <span className="category-badge">{category.subtitle}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="category-detail">
            <div className="detail-header">
              <span className="detail-icon">{current.icon}</span>
              <div>
                <h3 className="detail-title">{current.title}</h3>
                <span className="detail-badge">{current.subtitle}</span>
              </div>
            </div>

            <div className="feature-blocks">
              {current.features.map((feature, idx) => (
                <div key={idx} className="feature-block">
                  <h4 className="feature-block-title">{feature.title}</h4>
                  <ul className="feature-block-items">
                    {feature.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <span className="item-dot">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
