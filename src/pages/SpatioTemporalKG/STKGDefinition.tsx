import React from 'react';
import './STKGDefinition.css';

export const STKGDefinition: React.FC = () => {
  return (
    <section className="stkg-section definition-section">
      <div className="definition-header">
        <span className="stkg-en-label">What Is a Spatio-Temporal Knowledge Graph</span>
        <h2 className="stkg-section-title">把世界拆成实体、事件、关系与状态</h2>
        <p className="stkg-section-subtitle">面向 AI 应用的工程化定义</p>
      </div>

      <div className="definition-principles">
        <div className="principle-card">
          <div className="principle-icon">🏷️</div>
          <h3 className="principle-title">语义地址</h3>
          <p className="principle-subtitle">Semantic Address</p>
          <p className="principle-text">把地址、POI、区域和别名统一到可对齐的空间语义锚点。</p>
        </div>

        <div className="principle-card">
          <div className="principle-icon">🕓</div>
          <h3 className="principle-title">动态事件</h3>
          <p className="principle-subtitle">Events as Change</p>
          <p className="principle-text">把拥堵、异常、变更、派送等行为记录为可查询、可回放的事件。</p>
        </div>

        <div className="principle-card">
          <div className="principle-icon">🧠</div>
          <h3 className="principle-title">可推理关系</h3>
          <p className="principle-subtitle">Queryable & Reasonable</p>
          <p className="principle-text">关系不仅可检索，还能在多跳和约束下生成解释链路。</p>
        </div>

        <div className="principle-card">
          <div className="principle-icon">🧪</div>
          <h3 className="principle-title">仿真状态</h3>
          <p className="principle-subtitle">Simulatable World State</p>
          <p className="principle-text">把当前世界状态作为可演算输入，让动作后果先在图谱里试跑。</p>
        </div>
      </div>

      <div className="definition-summary">
        <p className="summary-text">
          <strong>核心对象：</strong>地址、建筑、AOI、道路、站点、运单、设备、事件、风险、状态变化和轨迹关系。
          这些对象需要共享统一身份、统一时间线和统一语义坐标，才能支撑 AI 应用的理解、推理与执行。
        </p>
      </div>
    </section>
  );
};
