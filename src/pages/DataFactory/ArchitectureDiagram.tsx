import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './ArchitectureDiagram.css';

export const ArchitectureDiagram: React.FC = () => {
  const nodes: Node[] = [
    // ========== 数据源层 (左侧) ==========
    {
      id: 'source-logistics',
      type: 'input',
      data: { label: '🚚\n物流运单' },
      position: { x: 0, y: 30 },
      className: 'source-node',
    },
    {
      id: 'source-freight',
      type: 'input',
      data: { label: '🚛\n货运规则' },
      position: { x: 0, y: 140 },
      className: 'source-node',
    },
    {
      id: 'source-urban',
      type: 'input',
      data: { label: '🏗️\n城管部件' },
      position: { x: 0, y: 250 },
      className: 'source-node',
    },
    {
      id: 'source-events',
      type: 'input',
      data: { label: '📡\n互联网情报' },
      position: { x: 0, y: 360 },
      className: 'source-node',
    },
    {
      id: 'source-camera',
      type: 'input',
      data: { label: '📹\n摄像头' },
      position: { x: 0, y: 470 },
      className: 'source-node',
    },
    {
      id: 'source-sensors',
      type: 'input',
      data: { label: '📡\nIoT传感器' },
      position: { x: 0, y: 580 },
      className: 'source-node',
    },

    // ========== 数据接入层 ==========
    {
      id: 'ingestion',
      data: { label: '📥\n数据接入' },
      position: { x: 250, y: 250 },
      className: 'process-node ingestion-node',
    },

    // ========== 预处理层 ==========
    {
      id: 'preprocessing',
      data: { label: '⚙️\n数据预处理' },
      position: { x: 480, y: 150 },
      className: 'process-node',
    },

    // ========== 实体治理核心 ==========
    {
      id: 'entity-matching',
      data: { label: '🎯\n实体匹配' },
      position: { x: 480, y: 300 },
      className: 'process-node core-node',
    },

    {
      id: 'conflict-detection',
      data: { label: '⚠️\n冲突检测' },
      position: { x: 480, y: 450 },
      className: 'process-node',
    },

    // ========== 决策分支 ==========
    {
      id: 'auto-decision',
      data: { label: '🤖\n自动决策' },
      position: { x: 720, y: 200 },
      className: 'decision-node auto-node',
    },

    {
      id: 'manual-decision',
      data: { label: '👤\n人工标注' },
      position: { x: 720, y: 400 },
      className: 'decision-node manual-node',
    },

    // ========== 标注平台 ==========
    {
      id: 'labeling-platform',
      data: { label: '🏷️\n标注平台' },
      position: { x: 950, y: 400 },
      className: 'process-node labeling-node',
    },

    // ========== 资产库 ==========
    {
      id: 'entity-registry',
      data: { label: '🗂️\n实体库' },
      position: { x: 1200, y: 150 },
      className: 'asset-node',
    },

    {
      id: 'address-registry',
      data: { label: '📍\n地址库' },
      position: { x: 1200, y: 280 },
      className: 'asset-node',
    },

    {
      id: 'semantic-tags',
      data: { label: '🏷️\n标签体系' },
      position: { x: 1200, y: 410 },
      className: 'asset-node',
    },

    {
      id: 'audit-log',
      data: { label: '📜\n溯源记录' },
      position: { x: 1200, y: 540 },
      className: 'asset-node',
    },

    // ========== 服务输出层 ==========
    {
      id: 'search-service',
      data: { label: '🔍\n统一搜索' },
      position: { x: 1480, y: 120 },
      className: 'output-node',
    },

    {
      id: 'query-service',
      data: { label: '🔗\n关联查询' },
      position: { x: 1480, y: 240 },
      className: 'output-node',
    },

    {
      id: 'api-service',
      data: { label: '⚡\nAPI服务' },
      position: { x: 1480, y: 360 },
      className: 'output-node',
    },

    {
      id: 'feed-service',
      data: { label: '📊\n数据推送' },
      position: { x: 1480, y: 480 },
      className: 'output-node',
    },

    // ========== 质量监控 ==========
    {
      id: 'quality-monitor',
      data: { label: '📈\n质量监控' },
      position: { x: 950, y: 100 },
      className: 'monitor-node',
    },

    // ========== AI模型训练闭环 (上方子流程) ==========
    {
      id: 'ai-training-data',
      data: { label: '🤖\n训练数据' },
      position: { x: 250, y: -150 },
      className: 'ai-node',
    },
    {
      id: 'ai-model-training',
      data: { label: '🧠\n模型训练' },
      position: { x: 450, y: -150 },
      className: 'ai-node ai-core',
    },
    {
      id: 'ai-validation',
      data: { label: '✅\n模型验证' },
      position: { x: 650, y: -150 },
      className: 'ai-node',
    },
    {
      id: 'ai-inference',
      data: { label: '⚡\n模型推理' },
      position: { x: 850, y: -150 },
      className: 'ai-node ai-core',
    },
    {
      id: 'ai-feedback',
      data: { label: '🔄\n效果反馈' },
      position: { x: 1050, y: -150 },
      className: 'ai-node',
    },
    {
      id: 'ai-iteration',
      data: { label: '♻️\n持续迭代' },
      position: { x: 650, y: -50 },
      className: 'ai-node ai-iteration',
    },

    // ========== 三维建模与对象提取子流程 (下方) ==========
    {
      id: '3d-input',
      data: { label: '📷\n位姿图片' },
      position: { x: 250, y: 750 },
      className: 'process-node three-d-process-node',
    },
    {
      id: '3d-sfm-mvs',
      data: { label: '🔧\nSFM/MVS' },
      position: { x: 450, y: 750 },
      className: 'process-node three-d-process-node',
    },
    {
      id: '3d-gaussian',
      data: { label: '✨\n3DGS' },
      position: { x: 650, y: 750 },
      className: 'process-node three-d-process-node',
    },
    {
      id: '3d-street-view',
      data: { label: '🗺️\n街景提取' },
      position: { x: 850, y: 750 },
      className: 'process-node three-d-process-node',
    },
    {
      id: '3d-model-generation',
      data: { label: '🗿\n三维建模' },
      position: { x: 1050, y: 750 },
      className: 'process-node three-d-process-node',
    },
    {
      id: '3d-object-extraction',
      data: { label: '🎯\n对象提取' },
      position: { x: 1250, y: 750 },
      className: 'process-node three-d-process-node',
    },
    {
      id: '3d-entity-mapping',
      data: { label: '🔗\n三维关联' },
      position: { x: 1450, y: 750 },
      className: 'process-node three-d-core-node',
    },
  ];

  const edges: Edge[] = [
    // 数据源 → 接入层
    { id: 'e1', source: 'source-logistics', target: 'ingestion', animated: true, className: 'data-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e2', source: 'source-freight', target: 'ingestion', animated: true, className: 'data-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e3', source: 'source-urban', target: 'ingestion', animated: true, className: 'data-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e4', source: 'source-events', target: 'ingestion', animated: true, className: 'data-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e5', source: 'source-camera', target: 'ingestion', animated: true, className: 'data-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e6a', source: 'source-sensors', target: 'ingestion', animated: true, className: 'data-flow', type: ConnectionLineType.SmoothStep },

    // 接入层 → 预处理
    { id: 'e6b', source: 'ingestion', target: 'preprocessing', animated: true, type: ConnectionLineType.SmoothStep },

    // 预处理 → 实体治理
    { id: 'e7', source: 'preprocessing', target: 'entity-matching', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e8', source: 'ingestion', target: 'entity-matching', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e9', source: 'ingestion', target: 'conflict-detection', animated: true, type: ConnectionLineType.SmoothStep },

    // 实体治理 → 决策分支
    { id: 'e10', source: 'entity-matching', target: 'auto-decision', label: '高置信度', className: 'auto-path', type: ConnectionLineType.SmoothStep },
    { id: 'e11', source: 'entity-matching', target: 'manual-decision', label: '低置信度', className: 'manual-path', type: ConnectionLineType.SmoothStep },
    { id: 'e12', source: 'conflict-detection', target: 'manual-decision', label: '冲突', className: 'conflict-path', type: ConnectionLineType.SmoothStep },

    // 人工标注
    { id: 'e13', source: 'manual-decision', target: 'labeling-platform', animated: true, className: 'manual-flow', type: ConnectionLineType.SmoothStep },

    // 质量监控反馈
    { id: 'e14', source: 'labeling-platform', target: 'quality-monitor', label: '质量反馈', className: 'feedback-path', type: ConnectionLineType.SmoothStep },
    { id: 'e15', source: 'quality-monitor', target: 'entity-matching', label: '模型优化', className: 'feedback-path', type: ConnectionLineType.SmoothStep },

    // 入库
    { id: 'e16', source: 'auto-decision', target: 'entity-registry', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e17', source: 'labeling-platform', target: 'entity-registry', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e18', source: 'auto-decision', target: 'address-registry', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e19', source: 'labeling-platform', target: 'address-registry', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e20', source: 'labeling-platform', target: 'semantic-tags', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e21', source: 'labeling-platform', target: 'audit-log', className: 'audit-path', type: ConnectionLineType.SmoothStep },
    { id: 'e22', source: 'auto-decision', target: 'audit-log', className: 'audit-path', type: ConnectionLineType.SmoothStep },

    // 资产库 → 服务
    { id: 'e23', source: 'entity-registry', target: 'search-service', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e24', source: 'address-registry', target: 'search-service', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e25', source: 'entity-registry', target: 'query-service', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e26', source: 'semantic-tags', target: 'query-service', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e27', source: 'entity-registry', target: 'api-service', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e28', source: 'address-registry', target: 'api-service', animated: true, type: ConnectionLineType.SmoothStep },
    { id: 'e29', source: 'entity-registry', target: 'feed-service', animated: true, type: ConnectionLineType.SmoothStep },

    // ========== AI训练闭环流程 ==========
    // 主流程 → AI训练数据
    { id: 'ai1', source: 'labeling-platform', target: 'ai-training-data', label: '标注数据', className: 'ai-flow', type: ConnectionLineType.SmoothStep },
    { id: 'ai2', source: 'ingestion', target: 'ai-training-data', label: '原始数据', className: 'ai-flow', type: ConnectionLineType.SmoothStep },
    
    // AI训练流程内部
    { id: 'ai3', source: 'ai-training-data', target: 'ai-model-training', animated: true, className: 'ai-flow', type: ConnectionLineType.SmoothStep },
    { id: 'ai4', source: 'ai-model-training', target: 'ai-validation', animated: true, className: 'ai-flow', type: ConnectionLineType.SmoothStep },
    { id: 'ai5', source: 'ai-validation', target: 'ai-inference', animated: true, className: 'ai-flow', type: ConnectionLineType.SmoothStep },
    { id: 'ai6', source: 'ai-inference', target: 'ai-feedback', animated: true, className: 'ai-flow', type: ConnectionLineType.SmoothStep },
    
    // AI反馈闭环
    { id: 'ai7', source: 'ai-feedback', target: 'ai-iteration', className: 'ai-feedback-loop', label: '问题样本', type: ConnectionLineType.SmoothStep },
    { id: 'ai8', source: 'ai-iteration', target: 'ai-training-data', className: 'ai-feedback-loop', label: '再训练', type: ConnectionLineType.SmoothStep },
    { id: 'ai9', source: 'ai-validation', target: 'ai-iteration', className: 'ai-feedback-loop', label: '未通过', type: ConnectionLineType.SmoothStep },
    
    // AI模型应用到主流程
    { id: 'ai10', source: 'ai-inference', target: 'entity-matching', label: 'AI辅助', className: 'ai-apply', type: ConnectionLineType.SmoothStep },
    { id: 'ai11', source: 'ai-inference', target: 'conflict-detection', label: 'AI检测', className: 'ai-apply', type: ConnectionLineType.SmoothStep },

    // ========== 三维建模与对象提取流程 ==========
    // 空间数据 → 三维建模流程输入
    { id: 'e3d1', source: 'source-urban', target: '3d-input', className: 'three-d-flow', type: ConnectionLineType.SmoothStep, animated: true },
    { id: 'e3d2', source: 'source-camera', target: '3d-input', className: 'three-d-flow', type: ConnectionLineType.SmoothStep, animated: true },
    
    // 三维建模流程内部：输入 → SFM/MVS
    { id: 'e3d3', source: '3d-input', target: '3d-sfm-mvs', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // SFM/MVS → 3DGS
    { id: 'e3d4', source: '3d-sfm-mvs', target: '3d-gaussian', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // 并行处理：3DGS 和街景提取
    { id: 'e3d5', source: '3d-gaussian', target: '3d-street-view', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e3d5b', source: '3d-sfm-mvs', target: '3d-street-view', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // 街景提取 → 三维建模
    { id: 'e3d6', source: '3d-street-view', target: '3d-model-generation', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // 三维建模 → 对象提取
    { id: 'e3d7', source: '3d-model-generation', target: '3d-object-extraction', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // 对象提取 → 三维实体关联
    { id: 'e3d8', source: '3d-object-extraction', target: '3d-entity-mapping', animated: true, className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // 地址库与实体库 → 三维实体关联
    { id: 'e3d9', source: 'address-registry', target: '3d-entity-mapping', className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    { id: 'e3d10', source: 'entity-registry', target: '3d-entity-mapping', className: 'three-d-flow', type: ConnectionLineType.SmoothStep },
    
    // 三维关联结果反馈
    { id: 'e3d11', source: '3d-entity-mapping', target: 'api-service', className: 'three-d-output', type: ConnectionLineType.SmoothStep },
  ];

  return (
    <div className="architecture-flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-left"
        className="architecture-flow"
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 250, zoom: 0.35 }}
      >
        <Background color="#00d4ff" gap={16} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.className?.includes('source')) return '#00d4ff';
            if (node.className?.includes('core')) return '#00f5ff';
            if (node.className?.includes('labeling')) return '#ff006e';
            if (node.className?.includes('asset')) return '#8338ec';
            if (node.className?.includes('output')) return '#06ffa5';
            if (node.className?.includes('ai')) return '#9d4edd';
            return '#00d4ff';
          }}
          maskColor="rgba(15, 15, 30, 0.8)"
        />
      </ReactFlow>
    </div>
  );
};
