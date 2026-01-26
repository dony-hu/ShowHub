import React, { useEffect, useRef } from 'react';
import './DiagramShared.css';

export const UnmannedLogisticsDiagram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 清除画布
    ctx.fillStyle = 'rgba(15, 15, 30, 0)';
    ctx.fillRect(0, 0, width, height);

    // 绘制园区/社区俯视图
    drawAerialView(ctx, width, height);

    // 绘制无人车和路径
    drawUnmannedVehicles(ctx, width, height);

    // 绘制设施和语义元素
    drawFacilities(ctx, width, height);

    // 绘制合规边界
    drawComplianceBoundary(ctx, width, height);
  }, []);

  const drawAerialView = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 背景网格
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.lineWidth = 0.8;

    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 园区区域 - 建筑物
    drawBuilding(ctx, 60, 50, 90, 80, 'rgba(59, 130, 246, 0.3)', '#3b82f6');
    drawBuilding(ctx, 180, 50, 90, 80, 'rgba(59, 130, 246, 0.3)', '#3b82f6');
    drawBuilding(ctx, 300, 50, 90, 80, 'rgba(59, 130, 246, 0.3)', '#3b82f6');

    // 仓储区
    drawBuilding(ctx, 60, 160, 110, 70, 'rgba(249, 115, 22, 0.2)', '#f97316');
    drawBuilding(ctx, 210, 160, 110, 70, 'rgba(249, 115, 22, 0.2)', '#f97316');

    // 停泊区
    drawParking(ctx, 100, 270, 200, 80);
  };

  const drawBuilding = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    strokeColor: string
  ) => {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // 窗户
    ctx.strokeStyle = `${strokeColor}60`;
    ctx.lineWidth = 1;
    const windowSize = 12;
    for (let i = 0; i < width; i += windowSize + 8) {
      for (let j = 0; j < height; j += windowSize + 8) {
        ctx.strokeRect(x + 8 + i, y + 8 + j, windowSize, windowSize);
      }
    }
  };

  const drawParking = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, width, height);

    // 停车位
    const spotWidth = 40;
    const spotHeight = 25;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        const px = x + 20 + i * (spotWidth + 8);
        const py = y + 15 + j * (spotHeight + 10);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, spotWidth, spotHeight);
      }
    }

    // 标签
    ctx.font = '11px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = 'rgba(168, 85, 247, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('停泊区', x + width / 2, y - 8);
  };

  const drawUnmannedVehicles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 无人车运行路径
    const paths = [
      { color: '#10b981', points: [[100, 150], [150, 160], [180, 140], [200, 170]] },
      { color: '#06b6d4', points: [[250, 150], [280, 160], [310, 140], [330, 170]] },
    ];

    paths.forEach((path) => {
      // 路径线
      ctx.strokeStyle = `${path.color}60`;
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(path.points[0][0], path.points[0][1]);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i][0], path.points[i][1]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // 路径节点
      path.points.forEach((point) => {
        const nodeGradient = ctx.createRadialGradient(point[0], point[1], 0, point[0], point[1], 10);
        nodeGradient.addColorStop(0, `${path.color}80`);
        nodeGradient.addColorStop(1, `${path.color}00`);
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(point[0], point[1], 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = path.color;
        ctx.beginPath();
        ctx.arc(point[0], point[1], 4, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // 无人车图标
    drawRobot(ctx, 180, 140, '#10b981', 'A');
    drawRobot(ctx, 310, 140, '#06b6d4', 'B');
  };

  const drawRobot = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, label: string) => {
    // 机器人主体
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, 12, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // 边框
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 车轮
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(x - 8, y + 12, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 8, y + 12, 3, 0, Math.PI * 2);
    ctx.fill();

    // 标签
    ctx.font = 'bold 10px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y - 16);
  };

  const drawFacilities = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 设施标记
    const facilities = [
      { x: 130, y: 260, icon: '📦', label: '配送点' },
      { x: 260, y: 260, icon: '🔌', label: '充电站' },
      { x: 340, y: 220, icon: '🚫', label: '禁区' },
    ];

    facilities.forEach((facility) => {
      // 设施圆形标记
      const gradient = ctx.createRadialGradient(facility.x, facility.y, 0, facility.x, facility.y, 12);
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(facility.x, facility.y, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(facility.x, facility.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 8px "Inter", "Helvetica Neue", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '9px "Inter", "Helvetica Neue", sans-serif';
      ctx.fillText(facility.label, facility.x, facility.y + 18);
    });
  };

  const drawComplianceBoundary = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 合规边界
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    ctx.beginPath();
    ctx.moveTo(40, 40);
    ctx.lineTo(width - 40, 40);
    ctx.lineTo(width - 40, height - 40);
    ctx.lineTo(40, height - 40);
    ctx.closePath();
    ctx.stroke();

    ctx.setLineDash([]);

    // 合规标签
    ctx.font = '10px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.textAlign = 'right';
    ctx.fillText('合规区域', width - 50, 55);
  };

  return (
    <div className="unmanned-logistics-diagram">
      <canvas
        ref={canvasRef}
        width={400}
        height={380}
        className="diagram-canvas"
      />
      <div className="diagram-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span>路径规划</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
          <span>建筑/设施</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
          <span>合规边界</span>
        </div>
      </div>
    </div>
  );
};
