import React from 'react';
import './FeaturesSection.css';

interface Feature {
  title: string;
  eyebrow: string;
  description: string;
}

const features: Feature[] = [
  {
    title: '面向智能体的工具发现',
    eyebrow: 'Discovery',
    description: '把能力暴露成可检索的工具清单，支持按场景、能力类型和权限快速定位可用接口。',
  },
  {
    title: '统一参数协议',
    eyebrow: 'Schema',
    description: '为地址、坐标、路线和区域对象提供统一参数模型，减少模型和系统之间的歧义。',
  },
  {
    title: '组合式调用链',
    eyebrow: 'Compose',
    description: '支持多个工具串联执行，例如地址理解后接地理编码，再接路线规划和结果渲染。',
  },
  {
    title: '可观测与审计',
    eyebrow: 'Observe',
    description: '保留调用上下文、响应时间、失败原因和命中策略，方便平台运营和业务追踪。',
  },
  {
    title: '场景化权限治理',
    eyebrow: 'Govern',
    description: '针对企业、部门、项目或应用控制可见工具、调用额度和空间范围，满足生产环境要求。',
  },
  {
    title: '结果可回写',
    eyebrow: 'Return',
    description: '工具结果可以直接进入业务表单、工单流、看板和智能体上下文，形成闭环执行。',
  },
];

export const OpenPlatformFeatures: React.FC = () => {
  return (
    <section className="op-features">
      <div className="op-section-inner">
        <div className="op-section-heading">
          <span className="op-section-kicker">核心特性</span>
          <h2>围绕智能体调用链设计的空间开放体系</h2>
          <p>
            平台既要足够标准，便于集成；也要足够灵活，便于编排。开放平台的重点，
            是让不同业务都能用同一套空间底座做出自己的工具链。
          </p>
        </div>

        <div className="op-feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="op-feature-card">
              <span className="op-feature-eyebrow">{feature.eyebrow}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
