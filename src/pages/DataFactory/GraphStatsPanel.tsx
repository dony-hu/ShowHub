import React from 'react';
import './GraphStatsPanel.css';

export const GraphStatsPanel: React.FC = () => {
  return (
    <div className="graph-stats-panel">
      <h3 className="stats-title">生产级图谱规模</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-number">5亿+</div>
          <div className="stat-label">地址节点</div>
          <div className="stat-detail">覆盖全国配送地址</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏪</div>
          <div className="stat-number">2亿+</div>
          <div className="stat-label">POI节点</div>
          <div className="stat-detail">商场、写字楼、园区等</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-number">20亿+</div>
          <div className="stat-label">运单节点</div>
          <div className="stat-detail">历史运单数据积累</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-number">10万+</div>
          <div className="stat-label">站点节点</div>
          <div className="stat-detail">网点、驿站、仓库</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-number">50万+</div>
          <div className="stat-label">车辆节点</div>
          <div className="stat-detail">配送车辆实时追踪</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-number">100万+</div>
          <div className="stat-label">配送员节点</div>
          <div className="stat-detail">快递小哥画像数据</div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">🔗</div>
          <div className="stat-number">50亿+</div>
          <div className="stat-label">关系边</div>
          <div className="stat-detail">派送、覆盖、邻近等</div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">⚡</div>
          <div className="stat-number">100万+</div>
          <div className="stat-label">日更新量</div>
          <div className="stat-detail">实时运单、轨迹增量</div>
        </div>
      </div>
    </div>
  );
};
