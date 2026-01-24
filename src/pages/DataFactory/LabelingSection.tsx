import React, { useState, useEffect, useRef } from 'react';
import './LabelingSection.css';

export const DataFactoryLabeling: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const threeContainer = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'map' | '3d' | 'street'>('map');

  // Initialize 2D Map with Leaflet
  useEffect(() => {
    if (activeTab === 'map' && mapContainer.current && mapContainer.current.innerHTML === '') {
      // Load Leaflet CSS and JS dynamically
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => {
        // @ts-ignore
        const L = window.L;
        // @ts-ignore
        const map = L.map(mapContainer.current).setView([39.9042, 116.4074], 15); // 北京
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Add sample markers with annotations
        const marker1 = L.circleMarker([39.9042, 116.4074], {
          radius: 8,
          fillColor: '#00d4ff',
          color: '#00f5ff',
          weight: 3,
          opacity: 0.8,
          fillOpacity: 0.7
        }).addTo(map)
          .bindPopup('📍 Entity A<br/>地址: 朝阳区<br/>类型: 建筑');

        const marker2 = L.circleMarker([39.9142, 116.4074], {
          radius: 8,
          fillColor: '#06ffa5',
          color: '#00d4ff',
          weight: 3,
          opacity: 0.8,
          fillOpacity: 0.7
        }).addTo(map)
          .bindPopup('📍 Entity B<br/>地址: 东城区<br/>类型: 道路');

        marker1.openPopup();
      };
      document.head.appendChild(script);
    }
  }, [activeTab]);

  // Initialize 3D Scene with Mapbox GL JS
  useEffect(() => {
    if (activeTab === '3d' && threeContainer.current && threeContainer.current.innerHTML === '') {
      // Load Mapbox CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(link);

      // Load Mapbox JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = () => {
        // @ts-ignore
        const mapboxgl = window.mapboxgl;
        // Use a free token or demo token for Mapbox
        mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MmYwMDAwMzQzcW1mcjJkmip9.rZL0ryCY92-HsH1sFvRComVQw4Q';
        
        try {
          // @ts-ignore
          const map = new mapboxgl.Map({
            container: threeContainer.current!,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [116.4074, 39.9042],
            zoom: 16,
            pitch: 60,
            bearing: 0
          });

          map.on('load', () => {
            // Enable 3D buildings if not already enabled
            if (!map.getLayer('3d-buildings')) {
              const layers = map.getStyle().layers;
              let labelLayerId;
              for (let i = layers.length - 1; i >= 0; i--) {
                if (layers[i].type === 'symbol' && layers[i].layout && layers[i].layout['text-field']) {
                  labelLayerId = layers[i].id;
                  break;
                }
              }

              map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                  'fill-extrusion-color': '#00d4ff',
                  'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
                  'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
                  'fill-extrusion-opacity': 0.7
                }
              }, labelLayerId);

              // Add glow effect with 3D annotation markers
              map.addSource('annotations', {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': [
                    {
                      'type': 'Feature',
                      'geometry': { 'type': 'Point', 'coordinates': [116.4074, 39.9042] },
                      'properties': { 'title': 'Entity A', 'id': 'A' }
                    },
                    {
                      'type': 'Feature',
                      'geometry': { 'type': 'Point', 'coordinates': [116.4084, 39.9052] },
                      'properties': { 'title': 'Entity B', 'id': 'B' }
                    }
                  ]
                }
              });

              map.addLayer({
                'id': 'annotation-points',
                'source': 'annotations',
                'type': 'circle',
                'paint': {
                  'circle-radius': 8,
                  'circle-color': '#00d4ff',
                  'circle-stroke-color': '#00f5ff',
                  'circle-stroke-width': 3,
                  'circle-opacity': 0.8
                }
              });

              // Add labels for annotations
              map.addLayer({
                'id': 'annotation-labels',
                'source': 'annotations',
                'type': 'symbol',
                'layout': {
                  'text-field': ['get', 'title'],
                  'text-size': 14,
                  'text-offset': [0, 1.5],
                  'text-anchor': 'top'
                },
                'paint': {
                  'text-color': '#00f5ff',
                  'text-halo-color': '#0f0f1e',
                  'text-halo-width': 2
                }
              });
            }
          });

          // Add interaction
          map.on('click', 'annotation-points', (e: any) => {
            // @ts-ignore
            new mapboxgl.Popup()
              .setLngLat(e.features[0].geometry.coordinates)
              .setHTML(`<div style="color: #00f5ff; font-size: 12px;"><strong>📍 ${e.features[0].properties.title}</strong><br/>地址: 北京市朝阳区<br/>类型: 建筑标记</div>`)
              .addTo(map);
          });

          map.on('mouseenter', 'annotation-points', () => {
            map.getCanvas().style.cursor = 'pointer';
          });

          map.on('mouseleave', 'annotation-points', () => {
            map.getCanvas().style.cursor = '';
          });
        } catch (error) {
          console.error('Mapbox initialization error:', error);
          if (threeContainer.current) {
            threeContainer.current.innerHTML = '<div style="color: #ff6b6b; padding: 20px; text-align: center;">3D地图加载失败，请刷新重试</div>';
          }
        }
      };
      document.head.appendChild(script);
    }
  }, [activeTab]);

  const features = [
    {
      title: '多形态地图联动展示',
      description: '2D地图、3D场景、街景图像统一定位，多视角辅助判断'
    },
    {
      title: '样本与参数辅助判断',
      description: '展示样本帧与参数信息；缺失时支持补标与完善'
    },
    {
      title: '自动化辅助标注',
      description: '文本线索智能识别 + 空间计算推断候选对象'
    },
    {
      title: '人机协同确认',
      description: '自动推荐候选实体，人工确认/修正/补充，形成闭环'
    }
  ];

  return (
    <section id="labeling" className="df-labeling">
      <div className="df-labeling-container">
        <h2 className="df-section-title">空间标注平台</h2>
        
        <div className="df-labeling-layout">
          <div className="df-labeling-features">
            <p className="df-labeling-intro">
              标注平台是数据工厂的<strong>人机协同核心</strong>，
              当自动化处理无法确定或存在冲突时，通过智能工作台引入人工判断，确保数据质量与可信度。
            </p>
            
            <div className="df-feature-list">
              {features.map((feature, index) => (
                <div key={index} className="df-feature-item">
                  <div className="df-feature-number">{index + 1}</div>
                  <div className="df-feature-content">
                    <h4 className="df-feature-title">{feature.title}</h4>
                    <p className="df-feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="df-labeling-preview">
            <div className="df-workbench-placeholder">
              <div className="df-workbench-header">
                <div className="df-workbench-tabs">
                  <span 
                    className={`df-workbench-tab ${activeTab === 'map' ? 'active' : ''}`}
                    onClick={() => setActiveTab('map')}
                  >
                    🗺️ 2D 地图
                  </span>
                  <span 
                    className={`df-workbench-tab ${activeTab === '3d' ? 'active' : ''}`}
                    onClick={() => setActiveTab('3d')}
                  >
                    🏙️ 3D 场景
                  </span>
                  <span 
                    className={`df-workbench-tab ${activeTab === 'street' ? 'active' : ''}`}
                    onClick={() => setActiveTab('street')}
                  >
                    📷 街景
                  </span>
                </div>
              </div>
              
              <div className="df-workbench-body">
                <div className="df-workbench-map">
                  {activeTab === 'map' && (
                    <div ref={mapContainer} className="df-map-container" style={{ width: '100%', height: '100%' }} />
                  )}
                  {activeTab === '3d' && (
                    <div ref={threeContainer} className="df-3d-container" style={{ width: '100%', height: '100%' }} />
                  )}
                  {activeTab === 'street' && (
                    <div className="df-street-view">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        src="https://www.google.com/maps/embed?pb=!4v1706096745123!6m8!1m7!1sCAoSLEFGMVFpcE1oMDRqNGJzQThEY2NFU1dGNVdKQVE0VjdIdUtWM3VGSWZFOUdv!2m2!1d39.90745!2d116.39139!3f270!4f10!5f0.7820865974627469"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  )}
                </div>
                
                <div className="df-workbench-panel">
                  <div className="df-panel-card">
                    <div className="df-panel-title">📍 位置信息</div>
                    <div className="df-panel-content">
                      <div>纬度: 39.9042°N</div>
                      <div>经度: 116.4074°E</div>
                      <div>高程: 52.3m</div>
                    </div>
                  </div>
                  
                  <div className="df-panel-card">
                    <div className="df-panel-title">📷 图像样本</div>
                    <div className="df-panel-content">
                      <div>采集时间: 2024-01-20</div>
                      <div>采集设备: 无人机</div>
                      <div>分辨率: 4K</div>
                    </div>
                  </div>
                  
                  <div className="df-panel-card">
                    <div className="df-panel-title">🎯 候选实体</div>
                    <div className="df-panel-content">
                      <div>✓ Entity A (99%)</div>
                      <div>Entity B (76%)</div>
                      <div>Entity C (45%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
