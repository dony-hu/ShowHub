import React from 'react';
import './DataFlowDiagram.css';

export const DataFlowDiagram: React.FC = () => {
  return (
    <section className="data-flow-diagram">
      <div className="flow-container">
        <h3 className="flow-title">可信数据工厂如何支撑 AI 的世界模型</h3>

        <div className="flow-content">
          <div className="flow-stage factory-stage">
            <div className="stage-icon">🏭</div>
            <h4>可信数据工厂</h4>
            <div className="stage-items">
              <div className="stage-item">多源接入与质量守门</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">语义地址与实体生产</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item">血缘、版本与审计</div>
            </div>
          </div>

          <div className="flow-bridge">
            <div className="bridge-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-head">→</div>
            </div>
            <div className="bridge-label">
              <span className="label-text">结构化世界资产</span>
              <span className="label-detail">地址 / 事件 / 关系 / 标签</span>
            </div>
          </div>

          <div className="flow-stage graph-stage">
            <div className="stage-icon">🧠</div>
            <h4>时空知识图谱</h4>
            <div className="stage-items">
              <div className="stage-item">实体对齐与跨源融合</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">动态事件建模</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">推理、仿真与决策</div>
            </div>
          </div>
        </div>

        <div className="flow-value">
          <div className="value-item">
            <span className="value-icon">🛡️</span>
            <span className="value-text">可信生产线把原始数据变成可调用的世界资产</span>
          </div>
          <div className="value-item">
            <span className="value-icon">🔗</span>
            <span className="value-text">知识图谱把资产组织成可推理的空间关系网络</span>
          </div>
          <div className="value-item">
            <span className="value-icon">🎯</span>
            <span className="value-text">AI 应用能在同一底座上理解、预测并执行动作</span>
          </div>
        </div>
      </div>
    </section>
  );
};
