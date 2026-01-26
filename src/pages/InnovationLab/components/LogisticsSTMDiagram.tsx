import React, { useEffect, useRef } from 'react';
import './LogisticsSTMDiagram.css';

export const LogisticsSTMDiagram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // 清除画布
    ctx.fillStyle = 'rgba(15, 15, 30, 0)';
    ctx.fillRect(0, 0, width, height);

    // 绘制空间网络（城市底图）
    drawUrbanGrid(ctx, width, height);

    // 绘制时间轴
    drawTimeline(ctx, width, height);

    // 绘制物流路径流线
    drawLogisticsPath(ctx, centerX, centerY);

    // 绘制节点和标签
    drawNodes(ctx, width, height);
  }, []);

  const drawUrbanGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 城市网格背景
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    ctx.lineWidth = 1;

    // 纵向线
    for (let x = 40; x < width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, height - 40);
      ctx.stroke();
    }

    // 横向线
    for (let y = 40; y < height; y += 80) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 40, y);
      ctx.stroke();
    }
  };

  const drawTimeline = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 时间轴 - 底部
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, height - 50);
    ctx.lineTo(width - 60, height - 50);
    ctx.stroke();

    // 时间刻度
    ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const x = 60 + (width - 120) * (i / tickCount);
      ctx.fillRect(x - 3, height - 50 - 6, 6, 6);
    }

    // 时间标签
    ctx.font = 'bold 12px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = 'rgba(0, 212, 255, 0.7)';
    ctx.textAlign = 'center';
    const labels = ['T0', 'T1', 'T2', 'T3', 'T4'];
    for (let i = 0; i < labels.length; i++) {
      const x = 60 + (width - 120) * (i / tickCount);
      ctx.fillText(labels[i], x, height - 20);
    }
  };

  const drawLogisticsPath = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    // 主路径流线
    const pathGradient = ctx.createLinearGradient(centerX - 100, centerY - 80, centerX + 100, centerY + 80);
    pathGradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
    pathGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.8)');
    pathGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

    ctx.strokeStyle = pathGradient;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 绘制多条递送路径
    const paths = [
      { points: [[80, 100], [150, 140], [200, 120], [280, 160], [350, 140]] },
      { points: [[90, 200], [160, 220], [220, 200], [300, 240], [360, 220]] },
      { points: [[100, 280], [170, 300], [240, 280], [310, 310], [370, 290]] }
    ];

    paths.forEach((path) => {
      ctx.beginPath();
      ctx.moveTo(path.points[0][0], path.points[0][1]);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i][0], path.points[i][1]);
      }
      ctx.stroke();
    });

    // 流向箭头
    drawArrow(ctx, 150, 140, 200, 120, 'rgba(16, 185, 129, 0.6)');
    drawArrow(ctx, 160, 220, 220, 200, 'rgba(16, 185, 129, 0.6)');
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string
  ) => {
    const arrowSize = 8;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - arrowSize * Math.cos(angle - Math.PI / 6), toY - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - arrowSize * Math.cos(angle + Math.PI / 6), toY - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };

  const drawNodes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 节点数据：地址、AOI、站点等
    const nodes = [
      { x: 80, y: 100, label: '地址', color: '#3b82f6', size: 8 },
      { x: 200, y: 120, label: 'AOI', color: '#10b981', size: 8 },
      { x: 280, y: 160, label: '站点', color: '#f59e0b', size: 8 },
      { x: 350, y: 140, label: '末端', color: '#ec4899', size: 8 },

      { x: 90, y: 200, label: '地址', color: '#3b82f6', size: 8 },
      { x: 160, y: 220, label: '路径', color: '#06b6d4', size: 8 },
      { x: 240, y: 200, label: '行为', color: '#8b5cf6', size: 8 },
      { x: 310, y: 240, label: '画像', color: '#ec4899', size: 8 },

      { x: 100, y: 280, label: '设施', color: '#14b8a6', size: 8 },
      { x: 170, y: 300, label: '语义', color: '#0ea5e9', size: 8 },
      { x: 240, y: 280, label: '链接', color: '#10b981', size: 8 },
      { x: 310, y: 310, label: '推理', color: '#f59e0b', size: 8 },
    ];

    nodes.forEach((node) => {
      // 节点光晕
      const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 16);
      glowGradient.addColorStop(0, `${node.color}40`);
      glowGradient.addColorStop(1, `${node.color}00`);
      ctx.fillStyle = glowGradient;
      ctx.fillRect(node.x - 16, node.y - 16, 32, 32);

      // 节点圆心
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();

      // 节点边框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 标签
    ctx.font = '11px "Inter", "Helvetica Neue", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

    nodes.forEach((node) => {
      ctx.fillText(node.label, node.x, node.y + 24);
    });
  };

  return (
    <div className="logistics-stm-diagram">
      <canvas
        ref={canvasRef}
        width={400}
        height={380}
        className="diagram-canvas"
      />
      <div className="diagram-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
          <span>地址/实体</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span>空间关系</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>语义标签</span>
        </div>
      </div>
    </div>
  );
};
