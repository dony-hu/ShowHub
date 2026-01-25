import React from 'react';
import './DataFlowDiagram.css';

export const DataFlowDiagram: React.FC = () => {
  return (
    <section className="data-flow-diagram">
      <div className="flow-container">
        <h3 className="flow-title">数据工厂 × 时空图谱：协同工作流程</h3>
        <div className="flow-content">
          {/* 左侧：数据工厂 */}
          <div className="flow-stage factory-stage">
            <div className="stage-icon">🏭</div>
            <h4>数据工厂</h4>
            <div className="stage-items">
              <div className="stage-item">原始数据接入</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">AI标注与治理</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">空间实体识别</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item">高质量数据输出</div>
            </div>
          </div>

          {/* 中间：数据流转 */}
          <div className="flow-bridge">
            <div className="bridge-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-head">→</div>
            </div>
            <div className="bridge-label">
              <span className="label-text">结构化实体数据</span>
              <span className="label-detail">地址、POI、关系、时序</span>
            </div>
          </div>

          {/* 右侧：时空图谱 */}
          <div className="flow-stage graph-stage">
            <div className="stage-icon">🗺️</div>
            <h4>时空知识图谱</h4>
            <div className="stage-items">
              <div className="stage-item">实体对齐与融合</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">图谱构建</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item highlight">关系推理</div>
              <div className="stage-arrow">↓</div>
              <div className="stage-item">智能决策服务</div>
            </div>
          </div>
        </div>

        {/* 底部价值说明 */}
        <div className="flow-value">
          <div className="value-item">
            <span className="value-icon">⚡</span>
            <span className="value-text">数据工厂提供高质量的空间实体和关系数据</span>
          </div>
          <div className="value-item">
            <span className="value-icon">🔗</span>
            <span className="value-text">时空图谱在此基础上构建跨场景的知识网络</span>
          </div>
          <div className="value-item">
            <span className="value-icon">🎯</span>
            <span className="value-text">形成从数据采集到智能决策的完整闭环</span>
          </div>
        </div>
      </div>
    </section>
  );
};
