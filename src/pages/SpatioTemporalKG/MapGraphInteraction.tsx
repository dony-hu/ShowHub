import React, { useState } from 'react';
import './MapGraphInteraction.css';
import { MapView } from './MapView';
import { GraphView } from './GraphView';
import { spatialEntities, logisticsEvents, generateGraphData } from './demoData';

export const MapGraphInteraction: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [entityType, setEntityType] = useState<string>('all');
  const [scenarioFilter, setScenarioFilter] = useState<string>('all');
  const [relationHop, setRelationHop] = useState<number>(1);

  const graphData = generateGraphData(0);

  const handleEntityClick = (entityId: string) => {
    setSelectedEntity(entityId);
    setSelectedEvent(null);
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    const event = logisticsEvents.find((item) => item.id === eventId);
    if (event?.relatedEntities.length) {
      setSelectedEntity(event.relatedEntities[0]);
    }
  };

  return (
    <section className="stkg-section map-graph-interaction-section">
      <div className="interaction-header">
        <span className="stkg-en-label">When Maps Become Knowledge</span>
        <h2 className="stkg-section-title">地图是入口，图谱是世界状态</h2>
        <p className="stkg-section-subtitle">语义地址、事件和关系在同一块底座里联动</p>
      </div>

      <div className="status-bar">
        <div className="status-info">
          <span className="status-label">实体类型</span>
          <div className="control-chip-group">
            {['all', 'address', 'station', 'event'].map((type) => (
              <button key={type} className={entityType === type ? 'active' : ''} onClick={() => setEntityType(type)}>
                {type === 'all' ? '全部' : type === 'address' ? '地址' : type === 'station' ? '站点' : '事件'}
              </button>
            ))}
          </div>
        </div>
        <div className="status-info">
          <span className="status-label">场景</span>
          <div className="control-chip-group">
            {['all', '冷链', '大件', '同城急送', '快递', '综合'].map((type) => (
              <button key={type} className={scenarioFilter === type ? 'active' : ''} onClick={() => setScenarioFilter(type)}>
                {type === 'all' ? '全部' : type}
              </button>
            ))}
          </div>
        </div>
        <div className="status-info">
          <span className="status-label">关系跳数</span>
          <div className="control-chip-group">
            {[1, 2, 3].map((hop) => (
              <button key={hop} className={relationHop === hop ? 'active' : ''} onClick={() => setRelationHop(hop)}>
                {hop} 跳
              </button>
            ))}
          </div>
        </div>
      </div>

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

      <div className="interaction-instructions">
        <div className="instruction-item">
          <span className="instruction-icon">👆</span>
          <span className="instruction-text">点地址看图谱里的关系链路</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-icon">🕓</span>
          <span className="instruction-text">点事件看状态变化和影响范围</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-icon">🧪</span>
          <span className="instruction-text">调关系跳数，观察多跳推理的展开方式</span>
        </div>
      </div>
    </section>
  );
};
