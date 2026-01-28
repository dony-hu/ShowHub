import React, { useState, useEffect } from 'react';
import './MapGraphInteraction.css';
import { MapView } from './MapView';
import { GraphView } from './GraphView';
import { 
  spatialEntities, 
  logisticsEvents,
  generateGraphData
} from './demoData';

export const MapGraphInteraction: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [timeIndex] = useState<number>(0);
  const [entityType, setEntityType] = useState<string>('all');
  const [scenarioFilter, setScenarioFilter] = useState<string>('all');
  const [relationHop, setRelationHop] = useState<number>(1);
  
  // 生成当前时间片的图谱数据
  const graphData = generateGraphData(timeIndex);
  
  const handleEntityClick = (entityId: string) => {
    setSelectedEntity(entityId);
    setSelectedEvent(null);
  };
  
  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    const event = logisticsEvents.find(e => e.id === eventId);
    if (event && event.relatedEntities.length > 0) {
      setSelectedEntity(event.relatedEntities[0]);
    }
  };
  
  return (
    <section className="stkg-section map-graph-interaction-section">
      <div className="interaction-header">
        <span className="stkg-en-label">When Maps Become Knowledge</span>
        <h2 className="stkg-section-title">当地图成为图谱的可视入口</h2>
        <p className="stkg-section-subtitle">地图 × 时空知识图谱联动</p>
      </div>
      
      {/* 控制面板：仅保留场景筛选按钮 */}
      <div className="control-panel single-row">
        <div className="control-buttons">
          <button 
            className={scenarioFilter === 'all' ? 'active' : ''}
            onClick={() => setScenarioFilter('all')}
          >
            全部
          </button>
          <button 
            className={scenarioFilter === '冷链' ? 'active' : ''}
            onClick={() => setScenarioFilter('冷链')}
          >
            冷链
          </button>
          <button 
            className={scenarioFilter === '大件' ? 'active' : ''}
            onClick={() => setScenarioFilter('大件')}
          >
            大件
          </button>
          <button 
            className={scenarioFilter === '同城急送' ? 'active' : ''}
            onClick={() => setScenarioFilter('同城急送')}
          >
            同城急送
          </button>
          <button 
            className={scenarioFilter === '快递' ? 'active' : ''}
            onClick={() => setScenarioFilter('快递')}
          >
            快递
          </button>
          <button 
            className={scenarioFilter === '综合' ? 'active' : ''}
            onClick={() => setScenarioFilter('综合')}
          >
            综合
          </button>
        </div>
      </div>
      
      {/* 主交互区 */}
      <div className="interaction-main">
        <div className="view-container">
          <div className="view-header">
            <span className="view-icon">🗺️</span>
            <span className="view-title">空间视图 Spatial View</span>
          </div>
          <MapView 
            entities={spatialEntities}
            selectedEntity={selectedEntity}
            onEntityClick={handleEntityClick}
            entityTypeFilter={entityType}
            scenarioFilter={scenarioFilter}
          />
        </div>
        
        <div className="view-container">
          <div className="view-header">
            <span className="view-icon">🕸️</span>
            <span className="view-title">图谱视图 Graph View</span>
          </div>
          <GraphView 
            graphData={graphData}
            selectedEntity={selectedEntity}
            selectedEvent={selectedEvent}
            onEntityClick={handleEntityClick}
            onEventClick={handleEventClick}
            relationHop={relationHop}
          />
        </div>
      </div>
      
      {/* 说明文字 */}
      <div className="interaction-instructions">
        <div className="instruction-item">
          <span className="instruction-icon">👆</span>
          <span className="instruction-text">点击地图点位，图谱自动聚焦并展开关系</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-icon">🎯</span>
          <span className="instruction-text">点击图谱节点，地图高亮相关空间实体</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-icon">🔍</span>
          <span className="instruction-text">使用场景过滤查看不同物流业态的点位分布</span>
        </div>
      </div>
    </section>
  );
};
