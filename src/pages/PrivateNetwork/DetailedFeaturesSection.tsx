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
      title: '部署与安全隔离',
      subtitle: '落地前提',
      icon: '🔐',
      features: [
        {
          title: '私有化部署形态',
          items: [
            '支持专网、内网、隔离区和物理离线环境',
            '地图、地址、模型与检索能力均可本地运行',
            '无公网依赖，满足数据不出域、不出网要求'
          ]
        },
        {
          title: '安全与合规隔离',
          items: ['权限分层与最小授权', '账号、角色、空间域隔离', '审计、留痕和策略控制可追溯']
        }
      ]
    },
    {
      id: 1,
      title: '地址大模型底座',
      subtitle: '语义引擎',
      icon: '🗺️',
      features: [
        {
          title: '语义地址理解',
          items: [
            '理解非标准地址、简称、别名、口语化描述',
            '支持地址标准化、纠错、补全和匹配',
            '将地址识别升级为可对话、可推理的语义能力'
          ]
        },
        {
          title: '时态地址演化',
          items: [
            '追踪地址、楼栋、组织和场所的历史变更',
            '支持拆分、合并、迁移和更名的时序管理',
            '适合长期运行的政务和企业主数据治理'
          ]
        }
      ]
    },
    {
      id: 2,
      title: '私域知识图谱',
      subtitle: '关联网络',
      icon: '📍',
      features: [
        {
          title: '地址-空间-组织图谱',
          items: [
            '把地址、AOI、建筑、机构、事件和关系编织成统一图谱',
            '支持多源实体对齐、去重、归一和关联发现',
            '为智能应用提供可检索、可追问、可解释的空间知识底图'
          ]
        },
        {
          title: '检索增强与推理',
          items: [
            '支持语义检索、路径检索、邻域检索和对象联动',
            '为自然语言问图、空间问答和研判分析提供上下文',
            '把空间知识直接提供给业务系统和智能应用'
          ]
        }
      ]
    },
    {
      id: 3,
      title: '调度与应急智能',
      subtitle: '行动编排',
      icon: '🔲',
      features: [
        {
          title: '多角色调度协同',
          items: [
            '面向指挥、运营、巡检和保障角色编排任务流',
            '支持事件触发、规则联动和人工确认的协同闭环',
            '适合园区、城市治理和政企应急场景'
          ]
        },
        {
          title: '空间态势研判',
          items: [
            '按区域、网格和任务目标生成态势视图',
            '把事件、设施、路径和资源统一放进一张图',
            '为响应和决策提供实时空间依据'
          ]
        }
      ]
    },
    {
      id: 4,
      title: '平台集成与工具链',
      subtitle: '工程能力',
      icon: '🧠',
      features: [
        {
          title: '统一能力接口',
          items: [
            '地图、地址、检索、图谱和智能工具统一封装',
            '支持现有业务系统快速接入',
            '便于二次开发和能力复用'
          ]
        },
        {
          title: '持续演进机制',
          items: [
            '支持数据、模型和规则持续升级',
            '支持场景配置化和任务编排化',
            '适合作为长期运行的空间智能底座'
          ]
        }
      ]
    },
    {
      id: 5,
      title: '运维与保障体系',
      subtitle: '长期运行',
      icon: '⚙️',
      features: [
        {
          title: '可靠交付与可观测性',
          items: [
            '监控、告警、日志和审计能力可统一查看',
            '支持多环境交付、回滚和版本治理',
            '保障专网环境下的持续运行与快速恢复'
          ]
        },
        {
          title: '服务化支持',
          items: [
            '支持实施、培训和联合运营',
            '可按行业场景定制空间智能能力',
            '面向政务与企业客户的长期服务模式'
          ]
        }
      ]
    }
  ];

  const current = categories[selectedCategory];

  return (
    <section className="pn-detailed-features">
      <div className="pn-detailed-features-container">
        <h2 className="section-title">完整能力栈</h2>
        <p className="section-subtitle">
          从部署隔离、地址大模型、私域知识图谱到调度与应急智能，形成一套可在专网环境独立运行的空间智能底座
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
