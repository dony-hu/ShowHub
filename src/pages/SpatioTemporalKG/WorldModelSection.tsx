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
            <div className="layer-title">Agent / 业务系统</div>
            <div className="layer-desc">需要理解、调用、推演和执行</div>
          </div>

          <div className="illustration-arrow">↓</div>

          <div className="illustration-layer highlight">
            <div className="layer-icon">🧠</div>
            <div className="layer-title">时空知识图谱</div>
            <div className="layer-desc">语义地址 × 动态事件 × 推理关系</div>
          </div>

          <div className="illustration-arrow">↓</div>

          <div className="illustration-layer">
            <div className="layer-icon">🌍</div>
            <div className="layer-title">真实世界</div>
            <div className="layer-desc">空间实体 × 状态变化 × 业务约束</div>
          </div>
        </div>

        <div className="model-text">
          <div className="model-point">
            <h3 className="point-title">可理解的空间语义</h3>
            <p className="point-description">
              机器需要知道“这个地方是什么、和谁有关、在什么语境下发生了什么”，而不是只知道坐标。
            </p>
          </div>

          <div className="model-point">
            <h3 className="point-title">可回放的世界状态</h3>
            <p className="point-description">
              图谱把地址变化、事件演化和关系更新统一进时间线，支持追踪、对比和回溯。
            </p>
          </div>

          <div className="model-point">
            <h3 className="point-title">可试跑的行动后果</h3>
            <p className="point-description">
              把候选动作放进世界模型做仿真，先看影响再执行，让决策更稳、更快、更可解释。
            </p>
          </div>

          <div className="model-emphasis">
            <div className="emphasis-icon">⚙️</div>
            <p className="emphasis-text">
              图谱不是展示层的装饰，而是 Agent 进入真实世界的理解层、推理层和决策层。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
