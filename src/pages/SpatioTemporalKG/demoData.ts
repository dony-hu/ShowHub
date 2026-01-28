// 示例数据：物流时空知识图谱

export interface SpatialEntity {
  id: string;
  type: 'POINT';
  name: string;
  category: string;
  scenario?: string; // 场景：冷链、大件、同城急送、快递
  tags?: string[];
  metrics?: Record<string, string>;
  coordinates: [number, number];
  status?: 'normal' | 'busy' | 'warning';
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  timeConstraint?: string;
  volumeConstraint?: string;
}

export interface GoodsCategory {
  id: string;
  name: string;
  tempControl?: string;
  timeLimit?: string;
  volumeConstraint?: string;
  sensitivity?: string[];
}

export interface LogisticsEvent {
  id: string;
  time: string;
  timestamp: number;
  type: 'cold_chain' | 'volume_surge' | 'congestion' | 'normal';
  relatedEntities: string[];
  description: string;
  impact?: string;
}

export interface Relationship {
  from: string;
  to: string;
  type: string;
  label: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'spatial' | 'service' | 'goods' | 'event';
  category?: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
  type: string;
}

// 空间点位实体（丰富的物流点位）
export const spatialEntities: SpatialEntity[] = [
  // 冷链场景点位
  { id: 'PT_001', type: 'POINT', name: '生鲜配送站A', category: '配送站', scenario: '冷链', coordinates: [0.15, 0.25], status: 'normal', tags: ['冷链', '生鲜'] },
  { id: 'PT_002', type: 'POINT', name: '冷库中转点', category: '冷库', scenario: '冷链', coordinates: [0.25, 0.35], status: 'busy', tags: ['冷链', '中转'] },
  { id: 'PT_003', type: 'POINT', name: '医药配送中心', category: '配送中心', scenario: '冷链', coordinates: [0.35, 0.28], status: 'normal', tags: ['冷链', '医药'] },
  { id: 'PT_004', type: 'POINT', name: '农产品集散地', category: '集散地', scenario: '冷链', coordinates: [0.20, 0.40], status: 'normal', tags: ['冷链', '农产品'] },
  
  // 大件场景点位
  { id: 'PT_005', type: 'POINT', name: '家具仓储点', category: '仓储', scenario: '大件', coordinates: [0.45, 0.22], status: 'normal', tags: ['大件', '家具'] },
  { id: 'PT_006', type: 'POINT', name: '家电配送站', category: '配送站', scenario: '大件', coordinates: [0.55, 0.30], status: 'busy', tags: ['大件', '家电'] },
  { id: 'PT_007', type: 'POINT', name: '建材中转场', category: '中转场', scenario: '大件', coordinates: [0.50, 0.42], status: 'warning', tags: ['大件', '建材'] },
  { id: 'PT_008', type: 'POINT', name: '大型设备仓', category: '仓储', scenario: '大件', coordinates: [0.60, 0.35], status: 'normal', tags: ['大件', '设备'] },
  
  // 同城急送场景点位
  { id: 'PT_009', type: 'POINT', name: '商圈配送点1', category: '配送点', scenario: '同城急送', coordinates: [0.70, 0.25], status: 'busy', tags: ['同城急送', '商圈'] },
  { id: 'PT_010', type: 'POINT', name: '商圈配送点2', category: '配送点', scenario: '同城急送', coordinates: [0.75, 0.32], status: 'normal', tags: ['同城急送', '商圈'] },
  { id: 'PT_011', type: 'POINT', name: '社区驿站A', category: '驿站', scenario: '同城急送', coordinates: [0.80, 0.28], status: 'normal', tags: ['同城急送', '社区'] },
  { id: 'PT_012', type: 'POINT', name: '写字楼服务点', category: '服务点', scenario: '同城急送', coordinates: [0.72, 0.40], status: 'busy', tags: ['同城急送', '写字楼'] },
  { id: 'PT_013', type: 'POINT', name: '餐饮配送站', category: '配送站', scenario: '同城急送', coordinates: [0.85, 0.35], status: 'normal', tags: ['同城急送', '餐饮'] },
  
  // 快递场景点位
  { id: 'PT_014', type: 'POINT', name: '快递分拨中心', category: '分拨中心', scenario: '快递', coordinates: [0.15, 0.55], status: 'busy', tags: ['快递', '分拨'] },
  { id: 'PT_015', type: 'POINT', name: '快递站点A', category: '快递站', scenario: '快递', coordinates: [0.25, 0.60], status: 'normal', tags: ['快递', '末端'] },
  { id: 'PT_016', type: 'POINT', name: '快递站点B', category: '快递站', scenario: '快递', coordinates: [0.35, 0.58], status: 'normal', tags: ['快递', '末端'] },
  { id: 'PT_017', type: 'POINT', name: '快递站点C', category: '快递站', scenario: '快递', coordinates: [0.30, 0.70], status: 'warning', tags: ['快递', '末端'] },
  { id: 'PT_018', type: 'POINT', name: '电商仓库', category: '仓库', scenario: '快递', coordinates: [0.20, 0.65], status: 'busy', tags: ['快递', '电商'] },
  
  // 综合场景点位
  { id: 'PT_019', type: 'POINT', name: '物流园区总部', category: '物流园区', scenario: '综合', coordinates: [0.50, 0.50], status: 'normal', tags: ['综合', '园区'] },
  { id: 'PT_020', type: 'POINT', name: '多式联运中心', category: '联运中心', scenario: '综合', coordinates: [0.45, 0.62], status: 'busy', tags: ['综合', '联运'] },
  { id: 'PT_021', type: 'POINT', name: '分拨集散点', category: '集散点', scenario: '综合', coordinates: [0.60, 0.58], status: 'normal', tags: ['综合', '集散'] },
  { id: 'PT_022', type: 'POINT', name: '智能仓储基地', category: '仓储', scenario: '综合', coordinates: [0.55, 0.70], status: 'normal', tags: ['综合', '智能'] },
  
  // 额外补充点位
  { id: 'PT_023', type: 'POINT', name: '社区服务站', category: '服务站', scenario: '同城急送', coordinates: [0.82, 0.45], status: 'normal', tags: ['同城急送'] },
  { id: 'PT_024', type: 'POINT', name: '冷链前置仓', category: '前置仓', scenario: '冷链', coordinates: [0.28, 0.48], status: 'busy', tags: ['冷链'] },
  { id: 'PT_025', type: 'POINT', name: '大件暂存点', category: '暂存点', scenario: '大件', coordinates: [0.48, 0.35], status: 'normal', tags: ['大件'] },
];

// 物流业务类型
export const serviceTypes: ServiceType[] = [
  {
    id: 'LS_EXPRESS_SMALL',
    name: '小件快递',
    description: '标准快递服务',
    timeConstraint: 'T+1/T+2'
  },
  {
    id: 'LS_EXPRESS_FAST',
    name: '快运',
    description: '更快时效的快递服务',
    timeConstraint: 'T+0/T+1'
  },
  {
    id: 'LS_BULK',
    name: '大件',
    description: '大体积货物运输',
    volumeConstraint: '>0.5m³'
  },
  {
    id: 'LS_COLD_CHAIN',
    name: '冷运',
    description: '温控运输服务',
    timeConstraint: '温控 2–8℃'
  },
  {
    id: 'LS_CITY_RUSH',
    name: '同城急送',
    description: '同城即时配送',
    timeConstraint: '<2小时'
  }
];

// 商品品类
export const goodsCategories: GoodsCategory[] = [
  {
    id: 'GC_FRESH_FRUIT',
    name: '生鲜水果',
    tempControl: '2–8℃',
    timeLimit: '48h',
    sensitivity: ['延误', '震动', '温度']
  },
  {
    id: 'GC_MEDICAL',
    name: '医药制品',
    tempControl: '2–8℃',
    timeLimit: '严格',
    sensitivity: ['温度', '合规', '签收']
  },
  {
    id: 'GC_LARGE_EQUIPMENT',
    name: '大型设备',
    volumeConstraint: '>1m³',
    sensitivity: ['尺寸', '重量', '装卸', '通行限制']
  }
];

// 物流事件（3个时间点）
export const logisticsEvents: LogisticsEvent[] = [
  {
    id: 'EVT_20260124_0918',
    time: '09:18',
    timestamp: 1737681480000,
    type: 'cold_chain',
    relatedEntities: ['AOI_310115_LG_PARK_02', 'GC_FRESH_FRUIT'],
    description: '冷运事件：生鲜水果时效接近阈值',
    impact: '需要加快分拨速度'
  },
  {
    id: 'EVT_20260124_1032',
    time: '10:32',
    timestamp: 1737685920000,
    type: 'volume_surge',
    relatedEntities: ['AOI_310115_LG_PARK_02'],
    description: '运单激增：园区负载上升',
    impact: 'AOI状态变为繁忙'
  },
  {
    id: 'EVT_20260124_1105',
    time: '11:05',
    timestamp: 1737687900000,
    type: 'congestion',
    relatedEntities: ['ROAD_S_021349', 'AOI_310115_LG_PARK_02'],
    description: '出入口拥堵：道路拥堵触发园区异常',
    impact: 'AOI进入异常状态'
  }
];

// 关系
export const relationships: Relationship[] = [
  // 冷链场景点位之间的物流路径
  { from: 'PT_001', to: 'PT_002', type: 'transport', label: '配送路径' },
  { from: 'PT_002', to: 'PT_003', type: 'transport', label: '配送路径' },
  { from: 'PT_003', to: 'PT_024', type: 'transport', label: '前置补货' },
  
  // 大件场景点位关系
  { from: 'PT_005', to: 'PT_006', type: 'transport', label: '配送路径' },
  { from: 'PT_006', to: 'PT_007', type: 'transport', label: '中转' },
  { from: 'PT_008', to: 'PT_025', type: 'transport', label: '暂存' },
  
  // 同城急送网络
  { from: 'PT_009', to: 'PT_010', type: 'transport', label: '急送' },
  { from: 'PT_009', to: 'PT_011', type: 'transport', label: '急送' },
  { from: 'PT_010', to: 'PT_012', type: 'transport', label: '中转' },
  { from: 'PT_012', to: 'PT_013', type: 'transport', label: '最后一公里' },
  { from: 'PT_023', to: 'PT_010', type: 'transport', label: '社区配送' },
  
  // 快递场景主干网
  { from: 'PT_014', to: 'PT_015', type: 'transport', label: '干线运输' },
  { from: 'PT_014', to: 'PT_016', type: 'transport', label: '干线运输' },
  { from: 'PT_015', to: 'PT_017', type: 'transport', label: '派送' },
  { from: 'PT_016', to: 'PT_018', type: 'transport', label: '派送' },
  
  // 综合场景枢纽连接
  { from: 'PT_019', to: 'PT_001', type: 'hub', label: '冷链专线' },
  { from: 'PT_019', to: 'PT_005', type: 'hub', label: '大件专线' },
  { from: 'PT_019', to: 'PT_014', type: 'hub', label: '快递干线' },
  { from: 'PT_020', to: 'PT_019', type: 'hub', label: '联运' },
  { from: 'PT_021', to: 'PT_009', type: 'hub', label: '同城分拨' },
  { from: 'PT_022', to: 'PT_020', type: 'hub', label: '智能调度' },
  
  // 服务能力关系
  { from: 'PT_001', to: 'LS_COLD_CHAIN', type: 'capability', label: '提供' },
  { from: 'PT_005', to: 'LS_BULK', type: 'capability', label: '提供' },
  { from: 'PT_009', to: 'LS_CITY_RUSH', type: 'capability', label: '提供' },
  { from: 'PT_014', to: 'LS_EXPRESS_SMALL', type: 'capability', label: '提供' },
  { from: 'PT_014', to: 'LS_EXPRESS_FAST', type: 'capability', label: '提供' },
  
  // 商品承载关系
  { from: 'LS_COLD_CHAIN', to: 'GC_FRESH_FRUIT', type: 'carry', label: '承载' },
  { from: 'LS_COLD_CHAIN', to: 'GC_MEDICAL', type: 'carry', label: '承载' },
  { from: 'LS_BULK', to: 'GC_LARGE_EQUIPMENT', type: 'carry', label: '承载' },
  
  // 事件影响关系
  { from: 'EVT_20260124_0918', to: 'PT_001', type: 'event', label: '影响' },
  { from: 'EVT_20260124_0918', to: 'GC_FRESH_FRUIT', type: 'event', label: '涉及' },
  { from: 'EVT_20260124_1032', to: 'PT_019', type: 'event', label: '影响' },
  { from: 'EVT_20260124_1105', to: 'PT_014', type: 'event', label: '影响' },
];

// AOI状态变化
export interface AOIStatus {
  time: string;
  timestamp: number;
  status: 'normal' | 'busy' | 'abnormal';
  color: string;
  description: string;
}

export const aoiStatusTimeline: AOIStatus[] = [
  {
    time: '09:00',
    timestamp: 1737680400000,
    status: 'normal',
    color: '#10b981',
    description: '正常运行'
  },
  {
    time: '10:30',
    timestamp: 1737685800000,
    status: 'busy',
    color: '#f59e0b',
    description: '运单激增 - 繁忙'
  },
  {
    time: '11:05',
    timestamp: 1737687900000,
    status: 'abnormal',
    color: '#ef4444',
    description: '拥堵影响 - 异常'
  }
];

// 生成图谱节点和边
export function generateGraphData(timeIndex: number = 0): { nodes: GraphNode[], edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  
  // 添加空间实体节点
  spatialEntities.forEach(entity => {
    nodes.push({
      id: entity.id,
      label: entity.name,
      type: 'spatial',
      category: entity.type
    });
  });
  
  // 添加服务类型节点
  serviceTypes.forEach(service => {
    nodes.push({
      id: service.id,
      label: service.name,
      type: 'service'
    });
  });
  
  // 添加商品品类节点
  goodsCategories.forEach(goods => {
    nodes.push({
      id: goods.id,
      label: goods.name,
      type: 'goods'
    });
  });
  
  // 根据时间索引添加相关事件
  const relevantEvents = logisticsEvents.filter((_, idx) => idx <= timeIndex);
  relevantEvents.forEach(event => {
    nodes.push({
      id: event.id,
      label: `${event.time} ${event.description.split('：')[0]}`,
      type: 'event',
      category: event.type
    });
  });
  
  // 添加关系边
  relationships.forEach(rel => {
    // 只添加已存在节点之间的关系
    const sourceExists = nodes.find(n => n.id === rel.from);
    const targetExists = nodes.find(n => n.id === rel.to);
    if (sourceExists && targetExists) {
      edges.push({
        source: rel.from,
        target: rel.to,
        label: rel.label,
        type: rel.type
      });
    }
  });
  
  return { nodes, edges };
}
