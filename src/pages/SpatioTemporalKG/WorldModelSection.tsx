import React from 'react';
import './WorldModelSection.css';

export const WorldModelSection: React.FC = () => {
  return (
    <section className="stkg-section world-model-section">
      <div className="world-model-header">
        <span className="stkg-en-label">A World Model for Machines</span>
        <h2 className="stkg-section-title">面向机器与 Agent 的世界模型底座</h2>
      </div>
      
      <div className="world-model-content">
        <div className="model-illustration">
          <div className="illustration-layer">
            <div className="layer-icon">🤖</div>
            <div className="layer-title">机器 / Agent</div>
            <div className="layer-desc">需要可理解、可调用、可推理</div>
          </div>
          
          <div className="illustration-arrow">↓</div>
          
          <div className="illustration-layer highlight">
            <div className="layer-icon">🧠</div>
            <div className="layer-title">时空知识图谱</div>
            <div className="layer-desc">语言层 × 认知层</div>
          </div>
          
          <div className="illustration-arrow">↓</div>
          
          <div className="illustration-layer">
            <div className="layer-icon">🌍</div>
            <div className="layer-title">真实世界</div>
            <div className="layer-desc">空间实体 × 时序变化</div>
          </div>
        </div>
        
        <div className="model-text">
          <div className="model-point">
            <h3 className="point-title">可理解的空间语义</h3>
            <p className="point-description">
              机器需要超越坐标和几何的语义理解：这个地方是什么、有什么功能、与其他实体的关系是什么。
              图谱提供机器可理解的结构化语义层。
            </p>
          </div>
          
          <div className="model-point">
            <h3 className="point-title">可调用的世界状态</h3>
            <p className="point-description">
              机器决策需要查询当前状态与历史变化：某个区域现在处于什么状态、过去发生了什么、
              哪些实体在什么时间发生了什么关系。图谱让世界状态成为可调用的 API。
            </p>
          </div>
          
          <div className="model-point">
            <h3 className="point-title">可推理的行动后果</h3>
            <p className="point-description">
              机器需要预测行动后果：如果在这个时间去这个地点会遇到什么、如果这个事件发生会影响哪些实体。
              图谱的关系网络让因果推理成为可能。
            </p>
          </div>
          
          <div className="model-emphasis">
            <div className="emphasis-icon">⚙️</div>
            <p className="emphasis-text">
              图谱是机器进入真实世界的语言层与认知层，服务于机器决策而非界面展示
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
