import React from 'react';
import './MapToGraphEvolution.css';

export const MapToGraphEvolution: React.FC = () => {
  return (
    <section className="stkg-section map-evolution-section">
      <div className="evolution-header">
        <span className="stkg-en-label">From Maps to Knowledge</span>
        <h2 className="stkg-section-title">空间智能正在从“显示世界”走向“理解世界”</h2>
      </div>

      <div className="evolution-content">
        <div className="evolution-text">
          <div className="evolution-point">
            <div className="point-icon">📍</div>
            <div className="point-content">
              <h3>地图：显示与定位</h3>
              <p>传统地图回答“在哪里”，擅长展示和导航，但还不能描述地址语义、事件变化和关系传播。</p>
            </div>
          </div>

          <div className="evolution-point">
            <div className="point-icon">🏷️</div>
            <div className="point-content">
              <h3>语义地址：统一锚点</h3>
              <p>把字符串、坐标、POI、区域和别名统一到一个可对齐的地址对象里，成为图谱的入口。</p>
            </div>
          </div>

          <div className="evolution-point">
            <div className="point-icon">🕓</div>
            <div className="point-content">
              <h3>动态事件：世界变化</h3>
              <p>把拥堵、异常、调度、签收和变更写进时间线，让世界状态能够回放、比较和更新。</p>
            </div>
          </div>

          <div className="evolution-point">
            <div className="point-icon">🧠</div>
            <div className="point-content">
              <h3>知识图谱：推理与仿真</h3>
              <p>时空知识图谱把实体、事件和关系组织成可计算网络，支撑查询、推理和决策试跑。</p>
            </div>
          </div>
        </div>

        <div className="evolution-diagram">
          <div className="diagram-container">
            <div className="diagram-step">
              <div className="diagram-icon">🗺️</div>
              <div className="diagram-label">Map</div>
              <div className="diagram-desc">位置与图层</div>
            </div>

            <div className="diagram-arrow">→</div>

            <div className="diagram-step">
              <div className="diagram-icon">🏷️</div>
              <div className="diagram-label">Semantic Address</div>
              <div className="diagram-desc">统一锚点</div>
            </div>

            <div className="diagram-arrow">→</div>

            <div className="diagram-step">
              <div className="diagram-icon">🕓</div>
              <div className="diagram-label">Events</div>
              <div className="diagram-desc">世界变化</div>
            </div>

            <div className="diagram-arrow">→</div>

            <div className="diagram-step">
              <div className="diagram-icon">🧠</div>
              <div className="diagram-label">Graph</div>
              <div className="diagram-desc">推理与仿真</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
