import React from 'react';
import './MapView.css';
import { SpatialEntity } from './demoData';

interface MapViewProps {
  entities: SpatialEntity[];
  selectedEntity: string | null;
  onEntityClick: (entityId: string) => void;
  entityTypeFilter: string;
  scenarioFilter?: string;
}

// 场景颜色映射
const SCENARIO_COLORS: Record<string, string> = {
  '冷链': '#3b82f6',
  '大件': '#f59e0b', 
  '同城急送': '#ec4899',
  '快递': '#8b5cf6',
  '综合': '#10b981'
};

// 场景图标映射
const SCENARIO_ICONS: Record<string, string> = {
  '冷链': '❄️',
  '大件': '📦',
  '同城急送': '🛵',
  '快递': '🚚',
  '综合': '🏭'
};

// 状态颜色映射
const STATUS_COLORS: Record<string, string> = {
  'normal': '#10b981',
  'busy': '#f59e0b',
  'warning': '#ef4444'
};

export const MapView: React.FC<MapViewProps> = ({
  entities,
  selectedEntity,
  onEntityClick,
  entityTypeFilter,
  scenarioFilter = 'all'
}) => {
  // 过滤实体
  const filteredEntities = entities.filter(entity => {
    if (entityTypeFilter !== 'all' && entity.type !== entityTypeFilter) {
      return false;
    }
    if (scenarioFilter !== 'all' && entity.scenario !== scenarioFilter) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="map-view">
      {/* OSM地图背景 - 多瓦片拼接 */}
      <div className="map-background">
        <div className="osm-tiles">
          <img src="https://tile.openstreetmap.org/12/3380/1597.png" alt="" className="osm-tile" style={{ top: 0, left: 0 }} />
          <img src="https://tile.openstreetmap.org/12/3381/1597.png" alt="" className="osm-tile" style={{ top: 0, left: '50%' }} />
          <img src="https://tile.openstreetmap.org/12/3380/1598.png" alt="" className="osm-tile" style={{ top: '50%', left: 0 }} />
          <img src="https://tile.openstreetmap.org/12/3381/1598.png" alt="" className="osm-tile" style={{ top: '50%', left: '50%' }} />
        </div>
        <div className="map-overlay"></div>
        
        {/* 点位标记 */}
        {filteredEntities.map(entity => {
          const [x, y] = entity.coordinates;
          const scenarioColor = entity.scenario ? SCENARIO_COLORS[entity.scenario] : '#64748b';
          const statusColor = entity.status ? STATUS_COLORS[entity.status] : '#10b981';
          const isSelected = selectedEntity === entity.id;
          const scenarioIcon = entity.scenario ? SCENARIO_ICONS[entity.scenario] : '📍';
          
          // 模拟实时数据
          const mockData = {
            orders: Math.floor(Math.random() * 200) + 50,
            vehicles: Math.floor(Math.random() * 20) + 5,
            utilization: Math.floor(Math.random() * 40) + 60
          };
          
          return (
            <div
              key={entity.id}
              className={`map-point ${isSelected ? 'selected' : ''} ${entity.status}`}
              style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                '--scenario-color': scenarioColor,
                '--status-color': statusColor
              } as React.CSSProperties}
              onClick={() => onEntityClick(entity.id)}
              title={entity.name}
            >
              {/* 状态环 */}
              <div className="point-ring" style={{ borderColor: statusColor }}></div>
              
              {/* 点位核心 */}
              <div 
                className="point-core" 
                style={{ backgroundColor: scenarioColor }}
              >
                <span className="point-icon">{scenarioIcon}</span>
              </div>
              
              {/* 简短标签（始终显示）*/}
              {!isSelected && (
                <div className="point-label">{entity.name}</div>
              )}
              
              {/* 详细提示框（选中时显示）*/}
              {isSelected && (
                <div className="point-tooltip">
                  <div className="tooltip-header">
                    <span className="tooltip-icon">{scenarioIcon}</span>
                    <span className="tooltip-name">{entity.name}</span>
                    <span className="tooltip-scenario" style={{ backgroundColor: scenarioColor }}>
                      {entity.scenario}
                    </span>
                  </div>
                  <div className="tooltip-category">{entity.category}</div>
                  
                  {/* 实时数据 */}
                  <div className="tooltip-metrics">
                    <div className="tooltip-metric">
                      <span className="metric-icon">📋</span>
                      <span className="metric-key">运单数</span>
                      <span className="metric-value">{mockData.orders}</span>
                    </div>
                    <div className="tooltip-metric">
                      <span className="metric-icon">🚗</span>
                      <span className="metric-key">车辆数</span>
                      <span className="metric-value">{mockData.vehicles}</span>
                    </div>
                    <div className="tooltip-metric">
                      <span className="metric-icon">📊</span>
                      <span className="metric-key">利用率</span>
                      <span className="metric-value">{mockData.utilization}%</span>
                    </div>
                  </div>
                  
                  {entity.tags && entity.tags.length > 0 && (
                    <div className="tooltip-tags">
                      {entity.tags.map((tag, idx) => (
                        <span key={idx} className="tooltip-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* 图例 */}
      <div className="map-legend">
        <div className="legend-section">
          <div className="legend-title">状态</div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
            <span>正常</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>繁忙</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
            <span>异常</span>
          </div>
        </div>
        
        <div className="legend-section">
          <div className="legend-title">场景</div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
            <span>冷链</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>大件</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ec4899' }}></div>
            <span>同城急送</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
            <span>快递</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
            <span>综合</span>
          </div>
        </div>
      </div>
    </div>
  );
};
