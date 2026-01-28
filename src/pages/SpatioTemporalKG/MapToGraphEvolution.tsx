import React from 'react';
import './MapToGraphEvolution.css';

export const MapToGraphEvolution: React.FC = () => {
  return (
    <section className="stkg-section map-evolution-section">
      <div className="evolution-header">
        <span className="stkg-en-label">From Maps to Knowledge Graphs</span>
        <h2 className="stkg-section-title">空间智能正在从"表示世界"走向"理解世界"</h2>
      </div>
      
      <div className="evolution-content">
        <div className="evolution-text">
          <div className="evolution-point">
            <div className="point-icon">📍</div>
            <div className="point-content">
              <h3>传统地图：表示世界</h3>
              <p>传统地图回答"世界在哪里、长什么样"，以图层、瓦片和表结构组织空间数据，服务于可视化展示。</p>
            </div>
          </div>
          
          <div className="evolution-point">
            <div className="point-icon">🤖</div>
            <div className="point-content">
              <h3>无人系统与 Agent：理解世界</h3>
              <p>无人系统、智能决策与 Agent 需要理解空间实体、时间变化、相互作用，传统图层/瓦片/表结构无法支撑高频变化与推理需求。</p>
            </div>
          </div>
          
          <div className="evolution-point">
            <div className="point-icon">🧠</div>
            <div className="point-content">
              <h3>时空知识图谱：AI 时代的系统性升级</h3>
              <p>时空知识图谱以实体为核心，将时间作为一等公民，让空间关系可计算、可推理，是 AI 时代空间智能的必然演进。</p>
            </div>
          </div>
        </div>
        
        <div className="evolution-diagram">
          <div className="diagram-container">
            <div className="diagram-step">
              <div className="diagram-icon">🗺️</div>
              <div className="diagram-label">Map</div>
              <div className="diagram-desc">图层/瓦片</div>
            </div>
            
            <div className="diagram-arrow">→</div>
            
            <div className="diagram-step">
              <div className="diagram-icon">📦</div>
              <div className="diagram-label">Entities</div>
              <div className="diagram-desc">空间实体</div>
            </div>
            
            <div className="diagram-arrow">→</div>
            
            <div className="diagram-step">
              <div className="diagram-icon">🔗</div>
              <div className="diagram-label">Relations</div>
              <div className="diagram-desc">时空关系</div>
            </div>
            
            <div className="diagram-arrow">→</div>
            
            <div className="diagram-step">
              <div className="diagram-icon">⚡</div>
              <div className="diagram-label">Decisions</div>
              <div className="diagram-desc">智能决策</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
