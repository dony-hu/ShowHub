import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapToGraphDemo.css';

// 物流地址点数据（简化版，只保留物流相关）
const logisticsPoints = [
  {
    id: 'addr1',
    name: '上海市浦东新区世纪大道100号',
    coordinates: [121.505, 31.239],
  },
  {
    id: 'addr2',
    name: '上海市静安区南京西路1601号',
    coordinates: [121.445, 31.228],
  },
  {
    id: 'addr3',
    name: '上海市徐汇区虹桥路3号',
    coordinates: [121.435, 31.197],
  },
];

export const MapToGraphDemo: React.FC = () => {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // 初始化地图
  useEffect(() => {
    const container = document.getElementById('logistics-map');
    if (!container || mapLoaded) return;

    try {
      const map = L.map('logistics-map', {
        center: [31.220, 121.465],
        zoom: 11,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      setMapLoaded(true);

      // 添加标记
      logisticsPoints.forEach((point) => {
        const marker = L.marker([point.coordinates[1], point.coordinates[0]], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '<div style="font-size: 24px;">📍</div>',
            iconSize: [30, 30],
          }),
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 12px; color: white;">
            <strong>${point.name}</strong>
          </div>
        `);

        marker.on('click', () => {
          setHighlightedNodes([point.id]);
        });

        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error('地图初始化失败:', error);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // 简化的图谱节点（只保留物流）
  const initialNodes: Node[] = [
    {
      id: 'addr1',
      position: { x: 100, y: 150 },
      data: { label: '📍 地址：世纪大道100号' },
      className: 'logistics-node',
    },
    {
      id: 'wb1001',
      position: { x: 300, y: 120 },
      data: { label: '📦 运单：WB1001' },
      className: 'logistics-node',
    },
    {
      id: 'station1',
      position: { x: 300, y: 200 },
      data: { label: '🏪 驿站：世纪大道站' },
      className: 'logistics-node',
    },
    {
      id: 'addr2',
      position: { x: 100, y: 350 },
      data: { label: '📍 地址：南京西路1601号' },
      className: 'logistics-node',
    },
    {
      id: 'wb1002',
      position: { x: 300, y: 350 },
      data: { label: '📦 运单：WB1002' },
      className: 'logistics-node',
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1', source: 'wb1001', target: 'addr1', label: '派送至', className: 'logistics-edge' },
    { id: 'e2', source: 'station1', target: 'addr1', label: '服务覆盖', className: 'logistics-edge' },
    { id: 'e3', source: 'wb1002', target: 'addr2', label: '派送至', className: 'logistics-edge' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 高亮效果
  useEffect(() => {
    const updatedNodes = initialNodes.map((node) => ({
      ...node,
      className: highlightedNodes.length > 0
        ? highlightedNodes.includes(node.id)
          ? 'logistics-node highlighted'
          : 'logistics-node dimmed'
        : 'logistics-node',
    }));
    setNodes(updatedNodes);
  }, [highlightedNodes]);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setHighlightedNodes([node.id]);
  }, []);

  return (
    <div className="map-graph-demo">
      <div className="demo-header">
        <h3>在线地图 × 知识图谱联动展示</h3>
        <p className="hint">点击地图标记或图谱节点，查看联动高亮效果</p>
      </div>

      <div className="demo-content">
        {/* 左侧地图 */}
        <div className="demo-map-section">
          <h4>🗺️ 在线地图（空间坐标）</h4>
          <div id="logistics-map" className="demo-map"></div>
        </div>

        {/* 右侧图谱 */}
        <div className="demo-graph-section">
          <h4>🔗 时空知识图谱实例</h4>
          <div className="demo-graph">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
              connectionMode={ConnectionMode.Loose}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
};
