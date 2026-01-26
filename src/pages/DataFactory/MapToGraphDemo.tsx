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

// 物流场景类型
type LogisticsScene = 'express' | 'bulky' | 'instant' | 'cold-chain';

// 物流空间要素数据（更丰富的物流实体）
const logisticsPoints = [
  // 配送站点
  { id: 'station1', name: '浦东新区配送站', type: 'station', coordinates: [121.505, 31.239], icon: '🏪' },
  { id: 'station2', name: '静安区配送站', type: 'station', coordinates: [121.445, 31.228], icon: '🏪' },
  { id: 'station3', name: '徐汇区配送站', type: 'station', coordinates: [121.435, 31.197], icon: '🏪' },
  
  // 收发地址
  { id: 'addr1', name: '世纪大道100号', type: 'address', coordinates: [121.510, 31.240], icon: '📍' },
  { id: 'addr2', name: '南京西路1601号', type: 'address', coordinates: [121.450, 31.230], icon: '📍' },
  { id: 'addr3', name: '虹桥路3号', type: 'address', coordinates: [121.430, 31.195], icon: '📍' },
  
  // 分拨中心
  { id: 'hub1', name: '上海分拨中心', type: 'hub', coordinates: [121.470, 31.210], icon: '🏭' },
  
  // 自提点/便利店
  { id: 'pickup1', name: '便利店自提点A', type: 'pickup', coordinates: [121.495, 31.235], icon: '🏬' },
  { id: 'pickup2', name: '便利店自提点B', type: 'pickup', coordinates: [121.455, 31.225], icon: '🏬' },
  
  // 配送车辆当前位置
  { id: 'vehicle1', name: '配送车辆-沪A88888', type: 'vehicle', coordinates: [121.480, 31.220], icon: '🚚' },
  { id: 'vehicle2', name: '配送车辆-沪B66666', type: 'vehicle', coordinates: [121.460, 31.215], icon: '🚚' },
  
  // 商家/发货点
  { id: 'merchant1', name: '电商仓库', type: 'merchant', coordinates: [121.490, 31.245], icon: '🏢' },
  { id: 'merchant2', name: '生鲜超市', type: 'merchant', coordinates: [121.440, 31.200], icon: '🏢' },
];

export const MapToGraphDemo: React.FC = () => {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedScene, setSelectedScene] = useState<LogisticsScene>('express');
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // 初始化地图
  useEffect(() => {
    const container = document.getElementById('logistics-map');
    if (!container || mapLoaded) return;

    try {
      const map = L.map('logistics-map', {
        center: [31.220, 121.465],
        zoom: 12,
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
            html: `<div class="marker-icon" style="font-size: 28px;">${point.icon}</div>`,
            iconSize: [35, 35],
          }),
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 12px; color: white;">
            <strong>${point.name}</strong><br/>
            <span style="font-size: 12px; opacity: 0.8;">类型: ${point.type}</span>
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

  // 根据场景生成不同的图谱节点
  const getSceneNodes = (scene: LogisticsScene): Node[] => {
    const baseNodes: Node[] = [
      // 空间要素节点
      { id: 'addr1', position: { x: 50, y: 100 }, data: { label: '📍 世纪大道100号' }, className: 'node-address' },
      { id: 'addr2', position: { x: 50, y: 250 }, data: { label: '📍 南京西路1601号' }, className: 'node-address' },
      { id: 'station1', position: { x: 300, y: 100 }, data: { label: '🏪 浦东配送站' }, className: 'node-station' },
      { id: 'station2', position: { x: 300, y: 250 }, data: { label: '🏪 静安配送站' }, className: 'node-station' },
      { id: 'hub1', position: { x: 550, y: 175 }, data: { label: '🏭 上海分拨中心' }, className: 'node-hub' },
      { id: 'merchant1', position: { x: 800, y: 100 }, data: { label: '🏢 电商仓库' }, className: 'node-merchant' },
      { id: 'pickup1', position: { x: 150, y: 175 }, data: { label: '🏬 便利店自提点' }, className: 'node-pickup' },
      { id: 'vehicle1', position: { x: 425, y: 50 }, data: { label: '🚚 配送车-沪A88888' }, className: 'node-vehicle' },
    ];

    // 根据场景添加不同的运单和属性节点
    if (scene === 'express') {
      return [
        ...baseNodes,
        { id: 'order1', position: { x: 175, y: 50 }, data: { label: '📦 小件快递\nWB20240126001' }, className: 'node-order' },
        { id: 'prop1', position: { x: 650, y: 50 }, data: { label: '⚡ 标准时效\n24小时送达' }, className: 'node-property' },
        { id: 'prop2', position: { x: 925, y: 175 }, data: { label: '💰 运费: ¥12' }, className: 'node-property' },
        { id: 'tag1', position: { x: 175, y: 350 }, data: { label: '🏷️ 高频收件' }, className: 'node-tag' },
      ];
    } else if (scene === 'bulky') {
      return [
        ...baseNodes,
        { id: 'order1', position: { x: 175, y: 50 }, data: { label: '📦 大件物流\nDB20240126002' }, className: 'node-order-bulky' },
        { id: 'prop1', position: { x: 650, y: 50 }, data: { label: '🕐 预约送达\n3日内' }, className: 'node-property' },
        { id: 'prop2', position: { x: 925, y: 175 }, data: { label: '💰 运费: ¥98\n🏋️ 重量: 50kg' }, className: 'node-property' },
        { id: 'tag1', position: { x: 175, y: 350 }, data: { label: '🏷️ 需上楼安装' }, className: 'node-tag' },
        { id: 'tag2', position: { x: 300, y: 350 }, data: { label: '🏷️ 易碎品' }, className: 'node-tag' },
      ];
    } else if (scene === 'instant') {
      return [
        ...baseNodes,
        { id: 'order1', position: { x: 175, y: 50 }, data: { label: '📦 同城急送\nJS20240126003' }, className: 'node-order-instant' },
        { id: 'prop1', position: { x: 650, y: 50 }, data: { label: '⚡ 1小时送达\n实时追踪' }, className: 'node-property' },
        { id: 'prop2', position: { x: 925, y: 175 }, data: { label: '💰 运费: ¥25\n📍 距离: 5km' }, className: 'node-property' },
        { id: 'tag1', position: { x: 175, y: 350 }, data: { label: '🏷️ 餐饮外卖' }, className: 'node-tag' },
        { id: 'rider1', position: { x: 425, y: 125 }, data: { label: '🏍️ 骑手-张三' }, className: 'node-rider' },
      ];
    } else { // cold-chain
      return [
        ...baseNodes,
        { id: 'order1', position: { x: 175, y: 50 }, data: { label: '📦 冷链物流\nLL20240126004' }, className: 'node-order-cold' },
        { id: 'prop1', position: { x: 650, y: 50 }, data: { label: '❄️ 全程冷链\n-18℃保温' }, className: 'node-property' },
        { id: 'prop2', position: { x: 925, y: 175 }, data: { label: '💰 运费: ¥68\n🌡️ 温控监测' }, className: 'node-property' },
        { id: 'tag1', position: { x: 175, y: 350 }, data: { label: '🏷️ 生鲜食品' }, className: 'node-tag' },
        { id: 'tag2', position: { x: 300, y: 350 }, data: { label: '🏷️ 冷藏车配送' }, className: 'node-tag' },
        { id: 'merchant2', position: { x: 800, y: 250 }, data: { label: '🏢 生鲜超市' }, className: 'node-merchant' },
      ];
    }
  };

  // 根据场景生成不同的边（关系）
  const getSceneEdges = (scene: LogisticsScene): Edge[] => {
    const baseEdges: Edge[] = [
      { id: 'e1', source: 'merchant1', target: 'hub1', label: '入库', className: 'edge-flow' },
      { id: 'e2', source: 'hub1', target: 'station1', label: '转运', className: 'edge-flow' },
      { id: 'e3', source: 'station1', target: 'addr1', label: '派送至', className: 'edge-delivery' },
      { id: 'e4', source: 'station1', target: 'pickup1', label: '覆盖', className: 'edge-coverage' },
      { id: 'e5', source: 'pickup1', target: 'addr1', label: '自提', className: 'edge-pickup' },
    ];

    if (scene === 'express') {
      return [
        ...baseEdges,
        { id: 'e10', source: 'order1', target: 'addr1', label: '收件地址', className: 'edge-order' },
        { id: 'e11', source: 'order1', target: 'merchant1', label: '发件地址', className: 'edge-order' },
        { id: 'e12', source: 'vehicle1', target: 'order1', label: '运输中', className: 'edge-transport' },
        { id: 'e13', source: 'order1', target: 'prop1', label: '时效属性', className: 'edge-property' },
        { id: 'e14', source: 'order1', target: 'prop2', label: '费用属性', className: 'edge-property' },
        { id: 'e15', source: 'addr1', target: 'tag1', label: '用户画像', className: 'edge-tag' },
      ];
    } else if (scene === 'bulky') {
      return [
        ...baseEdges,
        { id: 'e10', source: 'order1', target: 'addr2', label: '收件地址', className: 'edge-order' },
        { id: 'e11', source: 'order1', target: 'merchant1', label: '发件地址', className: 'edge-order' },
        { id: 'e12', source: 'vehicle1', target: 'order1', label: '专车运输', className: 'edge-transport' },
        { id: 'e13', source: 'order1', target: 'prop1', label: '预约时效', className: 'edge-property' },
        { id: 'e14', source: 'order1', target: 'prop2', label: '计费规则', className: 'edge-property' },
        { id: 'e15', source: 'order1', target: 'tag1', label: '服务标签', className: 'edge-tag' },
        { id: 'e16', source: 'order1', target: 'tag2', label: '商品标签', className: 'edge-tag' },
      ];
    } else if (scene === 'instant') {
      return [
        { id: 'e1', source: 'merchant1', target: 'station1', label: '接单', className: 'edge-flow' },
        { id: 'e2', source: 'station1', target: 'rider1', label: '分配', className: 'edge-assign' },
        { id: 'e3', source: 'rider1', target: 'addr1', label: '配送中', className: 'edge-delivery' },
        { id: 'e10', source: 'order1', target: 'addr1', label: '收件地址', className: 'edge-order' },
        { id: 'e11', source: 'order1', target: 'merchant1', label: '发件商家', className: 'edge-order' },
        { id: 'e12', source: 'rider1', target: 'order1', label: '配送员', className: 'edge-transport' },
        { id: 'e13', source: 'order1', target: 'prop1', label: '即时配送', className: 'edge-property' },
        { id: 'e14', source: 'order1', target: 'prop2', label: '计费规则', className: 'edge-property' },
        { id: 'e15', source: 'order1', target: 'tag1', label: '订单类型', className: 'edge-tag' },
      ];
    } else { // cold-chain
      return [
        { id: 'e1', source: 'merchant2', target: 'hub1', label: '冷链入库', className: 'edge-cold' },
        { id: 'e2', source: 'hub1', target: 'station2', label: '冷藏转运', className: 'edge-cold' },
        { id: 'e3', source: 'station2', target: 'addr2', label: '冷链配送', className: 'edge-cold' },
        { id: 'e10', source: 'order1', target: 'addr2', label: '收件地址', className: 'edge-order' },
        { id: 'e11', source: 'order1', target: 'merchant2', label: '发件商家', className: 'edge-order' },
        { id: 'e12', source: 'vehicle1', target: 'order1', label: '冷藏车运输', className: 'edge-transport' },
        { id: 'e13', source: 'order1', target: 'prop1', label: '温控标准', className: 'edge-property' },
        { id: 'e14', source: 'order1', target: 'prop2', label: '计费规则', className: 'edge-property' },
        { id: 'e15', source: 'order1', target: 'tag1', label: '商品类型', className: 'edge-tag' },
        { id: 'e16', source: 'order1', target: 'tag2', label: '运输要求', className: 'edge-tag' },
      ];
    }
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(getSceneNodes(selectedScene));
  const [edges, setEdges, onEdgesChange] = useEdgesState(getSceneEdges(selectedScene));

  // 场景切换时更新图谱
  useEffect(() => {
    setNodes(getSceneNodes(selectedScene));
    setEdges(getSceneEdges(selectedScene));
    setHighlightedNodes([]);
  }, [selectedScene]);

  // 高亮效果
  useEffect(() => {
    const currentNodes = getSceneNodes(selectedScene);
    const updatedNodes = currentNodes.map((node) => ({
      ...node,
      className: highlightedNodes.length > 0
        ? highlightedNodes.includes(node.id)
          ? `${node.className} highlighted`
          : `${node.className} dimmed`
        : node.className,
    }));
    setNodes(updatedNodes);
  }, [highlightedNodes, selectedScene]);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setHighlightedNodes([node.id]);
  }, []);

  return (
    <div className="map-graph-demo">
      <div className="demo-header">
        <h3>物流时空知识图谱：在线地图 × 多模态图谱联动</h3>
        <p className="hint">点击地图标记或图谱节点，查看联动高亮效果 | 切换不同物流场景查看专业图谱</p>
      </div>

      {/* 场景切换 */}
      <div className="scene-selector">
        <button 
          className={`scene-btn ${selectedScene === 'express' ? 'active' : ''}`}
          onClick={() => setSelectedScene('express')}
        >
          📦 小件快递
        </button>
        <button 
          className={`scene-btn ${selectedScene === 'bulky' ? 'active' : ''}`}
          onClick={() => setSelectedScene('bulky')}
        >
          📦 大件物流
        </button>
        <button 
          className={`scene-btn ${selectedScene === 'instant' ? 'active' : ''}`}
          onClick={() => setSelectedScene('instant')}
        >
          ⚡ 同城急送
        </button>
        <button 
          className={`scene-btn ${selectedScene === 'cold-chain' ? 'active' : ''}`}
          onClick={() => setSelectedScene('cold-chain')}
        >
          ❄️ 冷链物流
        </button>
      </div>

      <div className="demo-content">
        {/* 左侧地图 */}
        <div className="demo-map-section">
          <h4>🗺️ 物流空间要素地图</h4>
          <div className="map-legend">
            <span>🏪 配送站</span>
            <span>📍 地址</span>
            <span>🏭 分拨中心</span>
            <span>🏬 自提点</span>
            <span>🚚 配送车</span>
            <span>🏢 商家</span>
          </div>
          <div id="logistics-map" className="demo-map"></div>
        </div>

        {/* 右侧图谱 */}
        <div className="demo-graph-section">
          <h4>🔗 时空知识图谱 - {
            selectedScene === 'express' ? '小件快递场景' :
            selectedScene === 'bulky' ? '大件物流场景' :
            selectedScene === 'instant' ? '同城急送场景' :
            '冷链物流场景'
          }</h4>
          <div className="graph-legend">
            <span>🔵 空间节点</span>
            <span>🟢 订单节点</span>
            <span>🟡 属性节点</span>
            <span>🟣 标签节点</span>
          </div>
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
