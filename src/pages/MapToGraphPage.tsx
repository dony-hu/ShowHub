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
import './MapToGraphPage.css';

// 地址点数据
interface AddressPoint {
  id: string;
  name: string;
  type: 'address' | 'road' | 'poi' | 'community' | 'park' | 'company';
  coordinates: [number, number];
  industries: string[]; // ['logistics', 'police', 'sanitation']
  category?: string; // POI类别：商场、酒店、医院等
}

const addressPoints: AddressPoint[] = [
  // 地址
  {
    id: 'addr1',
    name: '上海市浦东新区世纪大道100号',
    type: 'address',
    coordinates: [121.505, 31.239],
    industries: ['logistics'],
  },
  {
    id: 'addr2',
    name: '上海市静安区南京西路1601号',
    type: 'address',
    coordinates: [121.445, 31.228],
    industries: ['logistics', 'police'],
  },
  {
    id: 'addr3',
    name: '上海市徐汇区虹桥路3号',
    type: 'address',
    coordinates: [121.435, 31.197],
    industries: ['logistics', 'sanitation'],
  },
  // 道路
  {
    id: 'road1',
    name: '南京西路',
    type: 'road',
    coordinates: [121.450, 31.229],
    industries: ['logistics', 'police'],
  },
  {
    id: 'road2',
    name: '世纪大道',
    type: 'road',
    coordinates: [121.508, 31.240],
    industries: ['logistics'],
  },
  // POI - 商场
  {
    id: 'poi1',
    name: '恒隆广场',
    type: 'poi',
    category: '商场',
    coordinates: [121.446, 31.227],
    industries: ['logistics', 'police'],
  },
  {
    id: 'poi2',
    name: '正大广场',
    type: 'poi',
    category: '商场',
    coordinates: [121.506, 31.241],
    industries: ['logistics'],
  },
  // POI - 酒店
  {
    id: 'poi3',
    name: '静安香格里拉大酒店',
    type: 'poi',
    category: '酒店',
    coordinates: [121.444, 31.229],
    industries: ['logistics'],
  },
  // POI - 医院
  {
    id: 'poi4',
    name: '华山医院',
    type: 'poi',
    category: '医院',
    coordinates: [121.433, 31.198],
    industries: ['police', 'sanitation'],
  },
  // 小区
  {
    id: 'community1',
    name: '仁恒河滨花园',
    type: 'community',
    coordinates: [121.507, 31.237],
    industries: ['logistics', 'sanitation'],
  },
  {
    id: 'community2',
    name: '静安别墅',
    type: 'community',
    coordinates: [121.448, 31.230],
    industries: ['logistics', 'police'],
  },
  // 园区
  {
    id: 'park1',
    name: '陆家嘴金融城',
    type: 'park',
    coordinates: [121.503, 31.236],
    industries: ['logistics', 'police'],
  },
  {
    id: 'park2',
    name: '张江高科技园区',
    type: 'park',
    coordinates: [121.595, 31.195],
    industries: ['logistics'],
  },
  // 企业
  {
    id: 'company1',
    name: '上海银行总部',
    type: 'company',
    coordinates: [121.504, 31.238],
    industries: ['logistics', 'police'],
  },
  {
    id: 'company2',
    name: '顺丰速运上海总部',
    type: 'company',
    coordinates: [121.595, 31.197],
    industries: ['logistics'],
  },
];

// 行业颜色配置
const industryColors = {
  logistics: '#10b981', // 绿色
  police: '#3b82f6',    // 蓝色
  sanitation: '#eab308', // 黄色
  base: '#9ca3af',      // 基础灰色
};

type IndustryType = 'all' | 'logistics' | 'police' | 'sanitation';

const MapToGraphPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('all');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // 初始化地图
  useEffect(() => {
    // 使用OpenStreetMap初始化Leaflet地图
    const initLeafletMap = () => {
      const container = document.getElementById('leaflet-map');
      if (!container) {
        console.error('地图容器未找到');
        return;
      }

      try {
        console.log('开始创建Leaflet地图...');
        
        // 创建地图实例
        const map = L.map('leaflet-map', {
          center: [31.220, 121.465],
          zoom: 11,
          zoomControl: true,
        });

        // 添加OSM瓦片层 - 使用暗色主题
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors © CartoDB',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;
        setMapLoaded(true);
        console.log('Leaflet地图创建成功');

        // 根据实体类型创建不同的图标
        const getIconByType = (type: string, category?: string) => {
          const iconMap: { [key: string]: { emoji: string; color: string } } = {
            address: { emoji: '📍', color: '#00d4ff' },
            road: { emoji: '🛣️', color: '#9ca3af' },
            poi: { emoji: category === '商场' ? '🏬' : category === '酒店' ? '🏨' : category === '医院' ? '🏥' : '📌', color: '#f59e0b' },
            community: { emoji: '🏘️', color: '#8b5cf6' },
            park: { emoji: '🏢', color: '#06b6d4' },
            company: { emoji: '🏭', color: '#ec4899' },
          };
          
          const config = iconMap[type] || iconMap.address;
          return L.divIcon({
            className: 'custom-marker',
            html: `<div style="font-size: 24px; text-shadow: 0 0 10px rgba(0,0,0,0.8);">${config.emoji}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
        };

        // 添加地址标记
        addressPoints.forEach((point, index) => {
          console.log(`添加标记 ${index + 1}:`, point.name, point.type);
          
          const marker = L.marker([point.coordinates[1], point.coordinates[0]], {
            icon: getIconByType(point.type, point.category),
            title: point.name,
          }).addTo(map);

          // 创建弹窗内容
          const typeNames: { [key: string]: string } = {
            address: '地址',
            road: '道路',
            poi: 'POI',
            community: '小区',
            park: '园区',
            company: '企业',
          };
          
          const popupContent = `
            <div style="padding: 12px; background: rgba(0,0,0,0.95); color: white; border-radius: 8px; min-width: 200px;">
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #00d4ff;">
                ${point.name}
              </div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 4px;">
                类型：${typeNames[point.type]}${point.category ? ` - ${point.category}` : ''}
              </div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.8);">
                涉及行业：${point.industries.map(ind => {
                  const names: any = { logistics: '物流', police: '公安', sanitation: '环卫' };
                  return names[ind];
                }).join('、')}
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          
          marker.on('click', () => {
            handleMapMarkerClick(point.id);
          });

          markersRef.current.push(marker);
        });

        console.log(`成功添加 ${addressPoints.length} 个标记`);
      } catch (error) {
        console.error('地图初始化失败:', error);
        setMapLoaded(false);
      }
    };

    // 延迟初始化，确保DOM已渲染
    const timer = setTimeout(initLeafletMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          console.error('地图销毁失败:', e);
        }
      }
    };
  }, []);

  const initMap = () => {
    // 不再需要这个函数，已移到useEffect中
  };

  const handleMapMarkerClick = (addressId: string) => {
    setSelectedAddress(addressId);
    // 高亮相关节点
    const relatedNodes = getRelatedNodes(addressId);
    setHighlightedNodes(relatedNodes);
  };

  const getRelatedNodes = (addressId: string): string[] => {
    // 根据地址ID返回相关节点ID
    const nodeMap: { [key: string]: string[] } = {
      addr1: ['addr1', 'aoi1', 'wb1001', 'courier1', 'vehicle1', 'station1', 'event1', 'time1', 'road2', 'poi2', 'park1', 'company1'],
      addr2: ['addr2', 'aoi2', 'wb1002', 'wb1003', 'depot1', 'event2', 'time2', 'alert1', 'case1', 'camera1', 'disposal1', 'road1', 'poi1', 'poi3', 'community1'],
      addr3: ['addr3', 'aoi3', 'wb1004', 'sanitask1', 'sanitworker1', 'sanitstation1', 'route1', 'time3', 'poi4', 'community2', 'park2', 'company2'],
      road1: ['road1', 'addr2', 'poi3'],
      road2: ['road2', 'addr1', 'poi2', 'park1'],
      poi1: ['poi1', 'addr2', 'community1'],
      poi2: ['poi2', 'addr1', 'road2', 'company1'],
      poi3: ['poi3', 'addr2', 'road1'],
      poi4: ['poi4', 'addr3', 'community2'],
      community1: ['community1', 'addr2', 'poi1', 'wb1002'],
      community2: ['community2', 'addr3', 'poi4'],
      park1: ['park1', 'addr1', 'road2', 'company1'],
      park2: ['park2', 'addr3', 'sanitstation1', 'company2'],
      company1: ['company1', 'park1', 'poi2'],
      company2: ['company2', 'park2', 'depot1'],
    };
    return nodeMap[addressId] || [];
  };

  // 知识图谱节点定义
  const initialNodes: Node[] = [
    // ========== 地址簇 1: 世纪大道（物流为主）==========
    {
      id: 'addr1',
      type: 'default',
      position: { x: 100, y: 150 },
      data: { 
        label: '📍 地址：上海市浦东新区\n世纪大道100号',
        industries: ['logistics'],
      },
      className: 'address-node',
      style: {
        border: '3px solid #10b981',
      },
    },
    {
      id: 'aoi1',
      position: { x: 100, y: 50 },
      data: { label: '🏢 区域：陆家嘴金融区', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'wb1001',
      position: { x: 250, y: 120 },
      data: { label: '📦 运单：WB1001\n（在途）', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'courier1',
      position: { x: 400, y: 80 },
      data: { label: '👤 快递员：张三', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'vehicle1',
      position: { x: 400, y: 160 },
      data: { label: '🚗 配送车：沪A·D12345', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'station1',
      position: { x: 250, y: 200 },
      data: { label: '🏪 驿站：世纪大道\n快件驿站', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'event1',
      position: { x: 550, y: 120 },
      data: { label: '📋 扫描事件：网点入库', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'time1',
      position: { x: 700, y: 120 },
      data: { label: '⏰ 时间：2026-01-24 09:10', industry: 'base' },
      className: 'base-node time-node',
    },

    // ========== 地址簇 2: 南京西路（物流 + 公安叠加）==========
    {
      id: 'addr2',
      position: { x: 100, y: 450 },
      data: { 
        label: '📍 地址：上海市静安区\n南京西路1601号',
        industries: ['logistics', 'police'],
      },
      className: 'address-node',
      style: {
        border: '3px solid',
        borderImage: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%) 1',
      },
    },
    {
      id: 'aoi2',
      position: { x: 100, y: 350 },
      data: { label: '🏪 区域：静安寺商圈', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'wb1002',
      position: { x: 250, y: 390 },
      data: { label: '📦 运单：WB1002\n（已签收）', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'wb1003',
      position: { x: 250, y: 470 },
      data: { label: '📦 运单：WB1003\n（异常待处理）', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'depot1',
      position: { x: 250, y: 550 },
      data: { label: '🏢 网点：顺丰静安网点', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'event2',
      position: { x: 400, y: 470 },
      data: { label: '⚠️ 异常事件：\n地址不匹配', industry: 'logistics' },
      className: 'logistics-node',
    },
    {
      id: 'time2',
      position: { x: 700, y: 450 },
      data: { label: '⏰ 时间：2026-01-24 10:25', industry: 'base' },
      className: 'base-node time-node',
    },
    // 公安叠加
    {
      id: 'alert1',
      position: { x: 100, y: 580 },
      data: { label: '🚨 告警：异常揽收触发', industry: 'police' },
      className: 'police-node',
    },
    {
      id: 'case1',
      position: { x: 250, y: 650 },
      data: { label: '🔍 警情：可疑包裹核查\n（高）', industry: 'police' },
      className: 'police-node',
    },
    {
      id: 'camera1',
      position: { x: 400, y: 580 },
      data: { label: '📹 摄像头：南京西路-01', industry: 'police' },
      className: 'police-node',
    },
    {
      id: 'disposal1',
      position: { x: 400, y: 680 },
      data: { label: '👮 处置：民警到场核查', industry: 'police' },
      className: 'police-node',
    },

    // ========== 地址簇 3: 虹桥路（物流 + 环卫叠加）==========
    {
      id: 'addr3',
      position: { x: 100, y: 850 },
      data: { 
        label: '📍 地址：上海市徐汇区\n虹桥路3号',
        industries: ['logistics', 'sanitation'],
      },
      className: 'address-node',
      style: {
        border: '3px solid',
        borderImage: 'linear-gradient(135deg, #10b981 0%, #eab308 100%) 1',
      },
    },
    {
      id: 'aoi3',
      position: { x: 100, y: 750 },
      data: { label: '🚉 区域：徐家汇枢纽', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'wb1004',
      position: { x: 250, y: 820 },
      data: { label: '📦 运单：WB1004\n（派送中）', industry: 'logistics' },
      className: 'logistics-node',
    },
    // 环卫叠加
    {
      id: 'sanitask1',
      position: { x: 250, y: 900 },
      data: { label: '🧹 环卫任务：\n早班清扫-330（中）', industry: 'sanitation' },
      className: 'sanitation-node',
    },
    {
      id: 'sanitworker1',
      position: { x: 400, y: 850 },
      data: { label: '👷 环卫工：王五', industry: 'sanitation' },
      className: 'sanitation-node',
    },
    {
      id: 'sanitstation1',
      position: { x: 250, y: 980 },
      data: { label: '🏭 环卫站点：\n徐汇环卫站', industry: 'sanitation' },
      className: 'sanitation-node',
    },
    {
      id: 'route1',
      position: { x: 400, y: 950 },
      data: { label: '🛣️ 作业路线：\n徐家汇枢纽-主干道', industry: 'sanitation' },
      className: 'sanitation-node',
    },
    {
      id: 'time3',
      position: { x: 700, y: 900 },
      data: { label: '⏰ 时间：2026-01-24 11:40', industry: 'base' },
      className: 'base-node time-node',
    },

    // ========== 新增实体节点 ==========
    // 道路节点
    {
      id: 'road1',
      position: { x: 100, y: 300 },
      data: { label: '🛣️ 道路：南京西路', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'road2',
      position: { x: 100, y: 230 },
      data: { label: '🛣️ 道路：世纪大道', industry: 'base' },
      className: 'base-node',
    },
    // POI节点 - 商场
    {
      id: 'poi1',
      position: { x: 250, y: 300 },
      data: { label: '🏬 POI：恒隆广场', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'poi2',
      position: { x: 250, y: 230 },
      data: { label: '🏬 POI：正大广场', industry: 'base' },
      className: 'base-node',
    },
    // POI节点 - 酒店/医院
    {
      id: 'poi3',
      position: { x: 400, y: 300 },
      data: { label: '🏨 POI：静安香格里拉', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'poi4',
      position: { x: 100, y: 1050 },
      data: { label: '🏥 POI：华山医院', industry: 'base' },
      className: 'base-node',
    },
    // 小区节点
    {
      id: 'community1',
      position: { x: 400, y: 230 },
      data: { label: '🏘️ 小区：仁恒河滨花园', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'community2',
      position: { x: 400, y: 420 },
      data: { label: '🏘️ 小区：静安别墅', industry: 'base' },
      className: 'base-node',
    },
    // 园区节点
    {
      id: 'park1',
      position: { x: 250, y: 50 },
      data: { label: '🏢 园区：陆家嘴金融城', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'park2',
      position: { x: 550, y: 230 },
      data: { label: '🏢 园区：张江高科技园区', industry: 'base' },
      className: 'base-node',
    },
    // 企业节点
    {
      id: 'company1',
      position: { x: 550, y: 50 },
      data: { label: '🏭 企业：上海银行总部', industry: 'base' },
      className: 'base-node',
    },
    {
      id: 'company2',
      position: { x: 700, y: 230 },
      data: { label: '🏭 企业：顺丰速运总部', industry: 'base' },
      className: 'base-node',
    },
  ];

  // 知识图谱边定义
  const initialEdges: Edge[] = [
    // 地址簇1的边
    { id: 'e-addr1-aoi1', source: 'addr1', target: 'aoi1', label: '位于', className: 'base-edge' },
    { id: 'e-wb1001-addr1', source: 'wb1001', target: 'addr1', label: '派送至', className: 'logistics-edge' },
    { id: 'e-courier1-wb1001', source: 'courier1', target: 'wb1001', label: '负责', className: 'logistics-edge' },
    { id: 'e-vehicle1-wb1001', source: 'vehicle1', target: 'wb1001', label: '承运', className: 'logistics-edge' },
    { id: 'e-station1-addr1', source: 'station1', target: 'addr1', label: '服务覆盖', className: 'logistics-edge' },
    { id: 'e-event1-wb1001', source: 'event1', target: 'wb1001', label: '关联运单', className: 'logistics-edge' },
    { id: 'e-event1-time1', source: 'event1', target: 'time1', label: '发生于', className: 'base-edge' },

    // 地址簇2的边（物流部分）
    { id: 'e-addr2-aoi2', source: 'addr2', target: 'aoi2', label: '位于', className: 'base-edge' },
    { id: 'e-wb1002-addr2', source: 'wb1002', target: 'addr2', label: '派送至', className: 'logistics-edge' },
    { id: 'e-wb1003-addr2', source: 'wb1003', target: 'addr2', label: '派送至', className: 'logistics-edge' },
    { id: 'e-depot1-addr2', source: 'depot1', target: 'addr2', label: '服务覆盖', className: 'logistics-edge' },
    { id: 'e-event2-wb1003', source: 'event2', target: 'wb1003', label: '关联运单', className: 'logistics-edge' },
    { id: 'e-event2-time2', source: 'event2', target: 'time2', label: '发生于', className: 'base-edge' },
    
    // 地址簇2的边（公安部分）
    { id: 'e-alert1-case1', source: 'alert1', target: 'case1', label: '触发', className: 'police-edge' },
    { id: 'e-case1-addr2', source: 'case1', target: 'addr2', label: '发生地', className: 'police-edge' },
    { id: 'e-camera1-addr2', source: 'camera1', target: 'addr2', label: '覆盖', className: 'police-edge' },
    { id: 'e-disposal1-case1', source: 'disposal1', target: 'case1', label: '处置', className: 'police-edge' },
    { id: 'e-case1-time2', source: 'case1', target: 'time2', label: '发生于', className: 'base-edge' },

    // 地址簇3的边（物流部分）
    { id: 'e-addr3-aoi3', source: 'addr3', target: 'aoi3', label: '位于', className: 'base-edge' },
    { id: 'e-wb1004-addr3', source: 'wb1004', target: 'addr3', label: '派送至', className: 'logistics-edge' },
    
    // 地址簇3的边（环卫部分）
    { id: 'e-sanitask1-addr3', source: 'sanitask1', target: 'addr3', label: '作业覆盖', className: 'sanitation-edge' },
    { id: 'e-sanitask1-worker1', source: 'sanitask1', target: 'sanitworker1', label: '指派', className: 'sanitation-edge' },
    { id: 'e-sanitstation1-addr3', source: 'sanitstation1', target: 'addr3', label: '服务覆盖', className: 'sanitation-edge' },
    { id: 'e-sanitask1-route1', source: 'sanitask1', target: 'route1', label: '执行路线', className: 'sanitation-edge' },
    { id: 'e-route1-aoi3', source: 'route1', target: 'aoi3', label: '路线经过', className: 'sanitation-edge' },
    { id: 'e-sanitask1-time3', source: 'sanitask1', target: 'time3', label: '计划时间', className: 'base-edge' },
    
    // 道路相关的边
    { id: 'e-addr1-road2', source: 'addr1', target: 'road2', label: '位于', className: 'base-edge' },
    { id: 'e-addr2-road1', source: 'addr2', target: 'road1', label: '位于', className: 'base-edge' },
    { id: 'e-poi2-road2', source: 'poi2', target: 'road2', label: '临近', className: 'base-edge' },
    { id: 'e-poi3-road1', source: 'poi3', target: 'road1', label: '临近', className: 'base-edge' },
    
    // POI相关的边
    { id: 'e-poi1-addr2', source: 'poi1', target: 'addr2', label: '临近', className: 'base-edge' },
    { id: 'e-poi2-addr1', source: 'poi2', target: 'addr1', label: '临近', className: 'base-edge' },
    { id: 'e-poi3-addr2', source: 'poi3', target: 'addr2', label: '临近', className: 'base-edge' },
    { id: 'e-poi4-addr3', source: 'poi4', target: 'addr3', label: '临近', className: 'base-edge' },
    
    // 小区相关的边
    { id: 'e-community1-addr2', source: 'community1', target: 'addr2', label: '属于', className: 'base-edge' },
    { id: 'e-community1-poi1', source: 'community1', target: 'poi1', label: '临近', className: 'base-edge' },
    { id: 'e-community2-addr3', source: 'community2', target: 'addr3', label: '属于', className: 'base-edge' },
    { id: 'e-community2-poi4', source: 'community2', target: 'poi4', label: '临近', className: 'base-edge' },
    { id: 'e-wb1002-community1', source: 'wb1002', target: 'community1', label: '派送至', className: 'logistics-edge' },
    
    // 园区相关的边
    { id: 'e-park1-addr1', source: 'park1', target: 'addr1', label: '位于', className: 'base-edge' },
    { id: 'e-park1-road2', source: 'park1', target: 'road2', label: '临近', className: 'base-edge' },
    { id: 'e-park2-addr3', source: 'park2', target: 'addr3', label: '位于', className: 'base-edge' },
    { id: 'e-sanitstation1-park2', source: 'sanitstation1', target: 'park2', label: '服务', className: 'sanitation-edge' },
    
    // 企业相关的边
    { id: 'e-company1-park1', source: 'company1', target: 'park1', label: '入驻', className: 'base-edge' },
    { id: 'e-company1-poi2', source: 'company1', target: 'poi2', label: '临近', className: 'base-edge' },
    { id: 'e-company2-park2', source: 'company2', target: 'park2', label: '入驻', className: 'base-edge' },
    { id: 'e-depot1-company2', source: 'depot1', target: 'company2', label: '服务', className: 'logistics-edge' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 过滤节点和边
  useEffect(() => {
    let filteredNodes = [...initialNodes];
    let filteredEdges = [...initialEdges];

    if (selectedIndustry !== 'all') {
      // 过滤节点
      filteredNodes = initialNodes.filter((node) => {
        // 保留基础节点（地址、区域、时间）
        if (node.className?.includes('base-node') || node.className?.includes('address-node')) {
          return true;
        }
        // 保留选中行业的节点
        return node.className?.includes(`${selectedIndustry}-node`);
      });

      const nodeIds = new Set(filteredNodes.map((n) => n.id));
      
      // 过滤边
      filteredEdges = initialEdges.filter((edge) => {
        return nodeIds.has(edge.source) && nodeIds.has(edge.target);
      });
    }

    // 应用高亮
    filteredNodes = filteredNodes.map((node) => ({
      ...node,
      className: highlightedNodes.length > 0
        ? highlightedNodes.includes(node.id)
          ? `${node.className} highlighted`
          : `${node.className} dimmed`
        : node.className,
    }));

    setNodes(filteredNodes);
    setEdges(filteredEdges);
  }, [selectedIndustry, highlightedNodes]);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    // 如果点击的是地址节点，在地图上定位
    if (node.id.startsWith('addr')) {
      const address = addressPoints.find((p) => p.id === node.id);
      if (address && mapRef.current) {
        mapRef.current.setView([address.coordinates[1], address.coordinates[0]], 15);
      }
      setSelectedAddress(node.id);
      setHighlightedNodes(getRelatedNodes(node.id));
    } else {
      // 找到相关的地址节点
      const relatedAddr = initialEdges
        .filter((e) => e.source === node.id || e.target === node.id)
        .map((e) => (e.source.startsWith('addr') ? e.source : e.target))
        .find((id) => id.startsWith('addr'));

      if (relatedAddr) {
        setSelectedAddress(relatedAddr);
        setHighlightedNodes(getRelatedNodes(relatedAddr));
        
        const address = addressPoints.find((p) => p.id === relatedAddr);
        if (address && mapRef.current) {
          mapRef.current.setView([address.coordinates[1], address.coordinates[0]], 15);
        }
      }
    }
  }, []);

  return (
    <div className="map-to-graph-page">
      {/* 顶部标题栏 */}
      <div className="page-header">
        <div className="title-section">
          <h1>空间智能实验室</h1>
          <p className="subtitle">
            基于大模型微调和训练技术，构筑AI-Native的地址服务，围绕地址服务构建时空知识图谱
          </p>
        </div>
      </div>

      {/* 技术介绍区 */}
      <div className="intro-section">
        <div className="intro-grid">
          <div className="intro-card">
            <div className="intro-icon">🤖</div>
            <h3>大模型微调与训练</h3>
            <p>利用领域数据对大语言模型进行微调，提升地址理解、归一化和语义解析能力，实现AI驱动的智能地址服务</p>
          </div>
          <div className="intro-card">
            <div className="intro-icon">📍</div>
            <h3>AI-Native地址服务</h3>
            <p>基于深度学习的地址识别、纠错、补全和标准化，支持多语言、多格式的地址智能处理和精准匹配</p>
          </div>
          <div className="intro-card">
            <div className="intro-icon">🕸️</div>
            <h3>时空知识图谱</h3>
            <p>以地址为锚点，构建人、物、事件、时间的多维关系网络，实现跨行业数据融合与智能推理</p>
          </div>
        </div>
      </div>

      {/* 示例展示标题 */}
      <div className="demo-section-header">
        <h2>从"地图"到"图谱"：实例演示</h2>
        <p className="demo-subtitle">
          地图回答"在哪里"，图谱回答"发生了什么、涉及谁、何时发生、与哪些行业要素有关、下一步联动什么"
        </p>
        <div className="legend">
          <span className="legend-item logistics">物流</span>
          <span className="legend-item police">公安</span>
          <span className="legend-item sanitation">环卫</span>
          <span className="legend-item base">基础实体</span>
        </div>
      </div>

      {/* 主体内容区 */}
      <div className="content-container">
        {/* 左侧：地图区域 */}
        <div className="map-section">
          <div className="section-header">
            <h2>在线地图（空间坐标与覆盖）</h2>
            <p className="hint">
              点击地址点，右侧高亮该地址相关的跨行业对象；点击右侧图谱中的地址实体，地图自动定位并弹出详情
            </p>
          </div>
          <div className="map-container">
            <div id="leaflet-map" style={{ width: '100%', height: '100%' }}></div>
            {/* 如果地图未加载，显示备用内容 */}
            {!mapLoaded && (
              <div className="map-placeholder">
                <h3>上海市地址分布图</h3>
                <div className="placeholder-markers">
                  {addressPoints.map((point) => (
                    <div
                      key={point.id}
                      className="placeholder-marker"
                      onClick={() => handleMapMarkerClick(point.id)}
                      style={{
                        cursor: 'pointer',
                        padding: '12px 20px',
                        margin: '12px 0',
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '2px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                        📍 {point.name}
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.7 }}>
                        涉及行业：{point.industries.map(ind => {
                          const names: any = { logistics: '物流', police: '公安', sanitation: '环卫' };
                          return names[ind];
                        }).join('、')}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.5, textAlign: 'center' }}>
                  提示：正在加载高德地图...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：知识图谱区域 */}
        <div className="graph-section">
          <div className="section-header">
            <h2>时空知识图谱实例</h2>
            <div className="controls">
              <button
                className={`filter-btn ${selectedIndustry === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedIndustry('all');
                  setHighlightedNodes([]);
                }}
              >
                全部
              </button>
              <button
                className={`filter-btn ${selectedIndustry === 'logistics' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedIndustry('logistics');
                  setHighlightedNodes([]);
                }}
              >
                物流
              </button>
              <button
                className={`filter-btn ${selectedIndustry === 'police' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedIndustry('police');
                  setHighlightedNodes([]);
                }}
              >
                公安
              </button>
              <button
                className={`filter-btn ${selectedIndustry === 'sanitation' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedIndustry('sanitation');
                  setHighlightedNodes([]);
                }}
              >
                环卫
              </button>
              <span className="hint-icon" title="过滤后仅显示本行业对象及其关联的地址、区域与时间">
                ℹ️
              </span>
            </div>
          </div>
          <div className="graph-container">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
              connectionMode={ConnectionMode.Loose}
              fitView
              attributionPosition="bottom-right"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          <div className="graph-info">
            <p>✓ 地址实体是跨行业对齐的共同锚点</p>
            <p>✓ 行业要素叠加在同一空间实体上，形成联动处置能力</p>
            <p>✓ 图谱支持检索、推理与下一步动作（例如调用摄像头回放、定位异常链路、下发环卫任务）</p>
          </div>
        </div>
      </div>

      {/* 实验室扩展内容：替换为“地址大模型的未来展望”，不动现有地图与图谱板块 */}
      <div className="lab-extra">
        <section className="lab-section">
          <h2 className="lab-title">地址大模型的未来展望</h2>
          <p className="lab-subtitle">从“能理解地址”到“以地址驱动城市级联动”，迈向可解释、合规、可持续的空间智能基础设施</p>
          <div className="lab-grid">
            <div className="lab-card">
              <div className="lab-icon">🖼️</div>
              <h3>多模态空间理解</h3>
              <p>融合地图、街景、卫星影像与POI文本，将地址从单一字符串提升为可推理的空间语义对象。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🧾</div>
              <h3>结构化生成</h3>
              <p>从自然语言自动生成标准化地址、层级编码与图谱三元组，支持“语句→动作”的端到端编排。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🤝</div>
              <h3>智能体协同</h3>
              <p>Address Agent 与物流/公安/环卫行业Agent协作，实现告警、核查、调度的自动联动闭环。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🔁</div>
              <h3>持续学习与自我纠错</h3>
              <p>利用用户反馈与业务日志进行在线学习，形成“识别→纠错→评估→再学习”的迭代机制。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🛡️</div>
              <h3>隐私计算与边缘部署</h3>
              <p>在专网与边缘节点进行本地推理与联邦学习，兼顾性能、合规与数据主权。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🏙️</div>
              <h3>城市级时空操作系统</h3>
              <p>以地址作为统一API，对齐事件、资源与动作，构建可扩展的城市级空间智能底座。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🔍</div>
              <h3>可解释与风险防控</h3>
              <p>提供可追溯的决策链与风险评估，设定红线约束，确保输出安全、稳健且可审计。</p>
            </div>
            <div className="lab-card">
              <div className="lab-icon">🔧</div>
              <h3>开放生态与标准</h3>
              <p>与主流图商及政企标准对齐接口与数据模式，促进生态共建与跨平台互操作。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MapToGraphPage;
