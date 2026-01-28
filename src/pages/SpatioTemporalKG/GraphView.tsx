import React, { useState } from 'react';
import './GraphView.css';
import { GraphNode, GraphEdge } from './demoData';

interface GraphViewProps {
  graphData: { nodes: GraphNode[], edges: GraphEdge[] };
  selectedEntity: string | null;
  selectedEvent: string | null;
  onEntityClick: (entityId: string) => void;
  onEventClick: (eventId: string) => void;
  relationHop: number;
}

export const GraphView: React.FC<GraphViewProps> = ({
  graphData,
  selectedEntity,
  selectedEvent,
  onEntityClick,
  onEventClick,
  relationHop
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  
  // 力导向布局 - 知识图谱风格
  const layoutNodes = () => {
    const { nodes, edges } = graphData;
    const width = 700;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // 计算每个节点的连接数（度）
    const nodeDegree = new Map<string, number>();
    nodes.forEach(node => nodeDegree.set(node.id, 0));
    edges.forEach(edge => {
      nodeDegree.set(edge.source, (nodeDegree.get(edge.source) || 0) + 1);
      nodeDegree.set(edge.target, (nodeDegree.get(edge.target) || 0) + 1);
    });

    // 找到中心节点（选中的节点或连接数最多的节点）
    let centerNodeId = selectedEntity || selectedEvent;
    if (!centerNodeId) {
      let maxDegree = 0;
      nodeDegree.forEach((degree, nodeId) => {
        if (degree > maxDegree) {
          maxDegree = degree;
          centerNodeId = nodeId;
        }
      });
    }

    // 按类型和距离中心节点的远近分层
    const centerNode = nodes.find(n => n.id === centerNodeId);
    const typeGroups: { [key: string]: GraphNode[] } = {
      spatial: [],
      service: [],
      goods: [],
      event: []
    };

    nodes.forEach(node => {
      typeGroups[node.type].push(node);
    });

    // 布局中心节点
    if (centerNode) {
      centerNode.x = centerX;
      centerNode.y = centerY;
    }

    // 按类型分布在不同的环形区域
    const typeAngles: { [key: string]: number } = {
      spatial: 0,
      service: Math.PI / 2,
      goods: Math.PI,
      event: (3 * Math.PI) / 2
    };

    Object.entries(typeGroups).forEach(([type, typeNodes]) => {
      const baseAngle = typeAngles[type];
      const angleSpan = (Math.PI * 2) / 4; // 每个类型占据90度
      const radiusBase = 150;
      const radiusSpread = 120;

      typeNodes.forEach((node, index) => {
        if (node.id === centerNodeId) return; // 跳过中心节点

        const count = typeNodes.length - (typeNodes.some(n => n.id === centerNodeId) ? 1 : 0);
        const angleStep = count > 1 ? angleSpan / count : 0;
        const angle = baseAngle + (index * angleStep) - (angleSpan / 2) + (Math.random() - 0.5) * 0.3;
        
        // 根据节点的连接数调整距离（连接多的离中心近）
        const degree = nodeDegree.get(node.id) || 1;
        const radiusVariation = Math.max(0.5, 1 - (degree / 10)); // 连接越多越靠近中心
        const radius = radiusBase + radiusSpread * radiusVariation + (Math.random() - 0.5) * 40;

        node.x = centerX + radius * Math.cos(angle);
        node.y = centerY + radius * Math.sin(angle);
      });
    });

    return { nodes, edges, width, height, nodeDegree };
  };
  
  const { nodes, edges, width, height, nodeDegree } = layoutNodes();
  
  // 获取节点颜色
  const getNodeColor = (node: GraphNode) => {
    if (node.type === 'spatial') return '#10b981';
    if (node.type === 'service') return '#3b82f6';
    if (node.type === 'goods') return '#f59e0b';
    if (node.type === 'event') {
      if (node.category === 'cold_chain') return '#06b6d4';
      if (node.category === 'volume_surge') return '#f59e0b';
      if (node.category === 'congestion') return '#ef4444';
    }
    return '#9c27b0';
  };
  
  // 判断节点是否应该高亮
  const isNodeHighlighted = (nodeId: string) => {
    if (selectedEntity === nodeId || selectedEvent === nodeId) return true;
    
    // 如果选中了实体，高亮相关的节点（1-hop或2-hop）
    if (selectedEntity) {
      const relatedNodes = new Set<string>();
      
      // 1-hop
      edges.forEach(edge => {
        if (edge.source === selectedEntity) relatedNodes.add(edge.target);
        if (edge.target === selectedEntity) relatedNodes.add(edge.source);
      });
      
      if (relationHop === 2) {
        // 2-hop
        const firstHop = Array.from(relatedNodes);
        firstHop.forEach(node1 => {
          edges.forEach(edge => {
            if (edge.source === node1) relatedNodes.add(edge.target);
            if (edge.target === node1) relatedNodes.add(edge.source);
          });
        });
      }
      
      return relatedNodes.has(nodeId);
    }
    
    return false;
  };
  
  // 判断边是否应该高亮
  const isEdgeHighlighted = (edge: GraphEdge) => {
    if (!selectedEntity && !selectedEvent) return false;
    
    const highlightedNodes = new Set<string>();
    if (selectedEntity) highlightedNodes.add(selectedEntity);
    if (selectedEvent) highlightedNodes.add(selectedEvent);
    
    nodes.forEach(node => {
      if (isNodeHighlighted(node.id)) {
        highlightedNodes.add(node.id);
      }
    });
    
    return highlightedNodes.has(edge.source) || highlightedNodes.has(edge.target);
  };
  
  const handleNodeClick = (node: GraphNode) => {
    if (node.type === 'event') {
      onEventClick(node.id);
    } else {
      onEntityClick(node.id);
    }
  };
  
  return (
    <div className="graph-view">
      <svg width="100%" height="600" viewBox={`0 0 ${width} ${height}`}>
        {/* 绘制边 */}
        <g className="edges">
          {edges.map((edge, index) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const highlighted = isEdgeHighlighted(edge);
            const isHovered = hoveredEdge === index;
            
            return (
              <g key={index}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={highlighted || isHovered ? '#9c27b0' : 'rgba(156, 39, 176, 0.3)'}
                  strokeWidth={highlighted || isHovered ? 3 : 1.5}
                  opacity={highlighted || isHovered ? 1 : 0.5}
                  className={edge.type}
                  onMouseEnter={() => setHoveredEdge(index)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  style={{ cursor: 'pointer' }}
                />
                {(highlighted || isHovered) && (
                  <text
                    x={(sourceNode.x! + targetNode.x!) / 2}
                    y={(sourceNode.y! + targetNode.y!) / 2 - 5}
                    fill="rgba(255, 255, 255, 0.9)"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none' }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
        
        {/* 绘制节点 */}
        <g className="nodes">
          {nodes.map((node) => {
            const isSelected = selectedEntity === node.id || selectedEvent === node.id;
            const highlighted = isNodeHighlighted(node.id);
            const isHovered = hoveredNode === node.id;
            const color = getNodeColor(node);
            const opacity = !selectedEntity && !selectedEvent ? 1 : (isSelected || highlighted ? 1 : 0.3);
            
            // 根据节点的连接数动态调整大小
            const degree = nodeDegree.get(node.id) || 1;
            const baseRadius = 8 + Math.min(degree * 2, 20);
            const radius = isSelected ? baseRadius + 6 : (isHovered ? baseRadius + 3 : baseRadius);
            
            return (
              <g 
                key={node.id} 
                className="graph-node"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill={color}
                  opacity={opacity}
                  stroke={isSelected ? '#fff' : (isHovered ? '#fff' : color)}
                  strokeWidth={isSelected ? 3 : (isHovered ? 2 : 1)}
                />
                {(isSelected || highlighted || isHovered || (!selectedEntity && !selectedEvent)) && (
                  <text
                    x={node.x}
                    y={node.y! + radius + 16}
                    fill="rgba(255, 255, 255, 0.9)"
                    fontSize="12"
                    textAnchor="middle"
                    fontWeight={isSelected ? 'bold' : '600'}
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.label.length > 15 ? node.label.substring(0, 15) + '...' : node.label}
                  </text>
                )}
                {/* 悬浮时显示更多信息 */}
                {isHovered && (
                  <g>
                    <rect
                      x={node.x! - 80}
                      y={node.y! - radius - 50}
                      width="160"
                      height="40"
                      fill="rgba(0, 0, 0, 0.9)"
                      stroke="rgba(156, 39, 176, 0.8)"
                      strokeWidth="2"
                      rx="6"
                      style={{ pointerEvents: 'none' }}
                    />
                    <text
                      x={node.x}
                      y={node.y! - radius - 35}
                      fill="white"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x}
                      y={node.y! - radius - 20}
                      fill="rgba(156, 39, 176, 0.9)"
                      fontSize="9"
                      textAnchor="middle"
                      style={{ pointerEvents: 'none' }}
                    >
                      类型: {node.type === 'spatial' ? '空间实体' : node.type === 'service' ? '服务' : node.type === 'goods' ? '商品' : '事件'}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      
      {/* 图例 */}
      <div className="graph-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#10b981' }}></div>
          <span>空间实体</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>服务类型</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>商品品类</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#ef4444' }}></div>
          <span>事件</span>
        </div>
      </div>
    </div>
  );
};
