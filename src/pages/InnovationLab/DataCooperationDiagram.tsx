import React, { useEffect, useRef } from 'react';
import './DiagramShared.css';

export const DataCooperationDiagram: React.FC = () => {
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

    // 绘制多源数据块
    drawDataSources(ctx, width, height);

    // 绘制合并过程
    drawMergingProcess(ctx, width, height);

    // 绘制最终结果
    drawFinalResult(ctx, width, height);
  }, []);

  const drawDataSources = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const sources = [
      { x: 40, y: 60, width: 80, height: 100, color: '#3b82f6', label: '空间数据' },
      { x: 140, y: 60, width: 80, height: 100, color: '#10b981', label: '行业数据' },
      { x: 240, y: 60, width: 80, height: 100, color: '#f59e0b', label: '业务数据' },
    ];

    sources.forEach((source) => {
      // 数据块背景
      const gradient = ctx.createLinearGradient(source.x, source.y, source.x, source.y + source.height);
      gradient.addColorStop(0, `${source.color}60`);
      gradient.addColorStop(1, `${source.color}30`);

      ctx.fillStyle = gradient;
      ctx.fillRect(source.x, source.y, source.width, source.height);

      // 边框
      ctx.strokeStyle = source.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(source.x, source.y, source.width, source.height);

      // 内部网格纹理
      ctx.strokeStyle = `${source.color}40`;
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        const y = source.y + (source.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(source.x, y);
        ctx.lineTo(source.x + source.width, y);
        ctx.stroke();
      }

      // 标签
      ctx.font = 'bold 12px "Inter", "Helvetica Neue", sans-serif';
      ctx.fillStyle = source.color;
      ctx.textAlign = 'center';
      ctx.fillText(source.label, source.x + source.width / 2, source.y + source.height + 20);
    });
  };

  const drawMergingProcess = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 合并箭头
    const arrowStartY = 180;
    const arrowEndY = 240;

    ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    // 左边箭头
    ctx.beginPath();
    ctx.moveTo(80, arrowStartY);
    ctx.lineTo(80, arrowEndY);
    ctx.stroke();

    // 中间箭头
    ctx.beginPath();
    ctx.moveTo(180, arrowStartY);
    ctx.lineTo(180, arrowEndY);
    ctx.stroke();

    // 右边箭头
    ctx.beginPath();
    ctx.moveTo(280, arrowStartY);
    ctx.lineTo(280, arrowEndY);
    ctx.stroke();

    ctx.setLineDash([]);

    // 箭头头部
    const arrowSize = 6;
    ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';

    [80, 180, 280].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, arrowEndY);
      ctx.lineTo(x - arrowSize, arrowEndY - arrowSize);
      ctx.lineTo(x + arrowSize, arrowEndY - arrowSize);
      ctx.closePath();
      ctx.fill();
    });

    // 合并标签
    ctx.font = '12px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = 'rgba(0, 212, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('多方', 180, 215);
    ctx.fillText('协同', 180, 230);
  };

  const drawFinalResult = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const resultY = 250;

    // 中心圆形（联合后的空间认知结果）
    const radius = 70;

    // 外层光晕
    const outerGlow = ctx.createRadialGradient(centerX, resultY, radius, centerX, resultY, radius + 30);
    outerGlow.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
    outerGlow.addColorStop(1, 'rgba(0, 212, 255, 0)');
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(centerX, resultY, radius + 30, 0, Math.PI * 2);
    ctx.fill();

    // 主圆
    const mainGradient = ctx.createRadialGradient(centerX, resultY, 0, centerX, resultY, radius);
    mainGradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
    mainGradient.addColorStop(1, 'rgba(0, 212, 255, 0.15)');
    ctx.fillStyle = mainGradient;
    ctx.beginPath();
    ctx.arc(centerX, resultY, radius, 0, Math.PI * 2);
    ctx.fill();

    // 边框
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 内部网络图
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
      const nodeRadius = radius * 0.6;
      const x = centerX + Math.cos(angle) * nodeRadius;
      const y = resultY + Math.sin(angle) * nodeRadius;

      ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // 连接线
      if (i < nodeCount - 1) {
        const nextAngle = ((i + 1) / nodeCount) * Math.PI * 2 - Math.PI / 2;
        const nextX = centerX + Math.cos(nextAngle) * nodeRadius;
        const nextY = resultY + Math.sin(nextAngle) * nodeRadius;

        ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }
    }

    // 中心点
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(centerX, resultY, 3, 0, Math.PI * 2);
    ctx.fill();

    // 合规符号（右下角）
    drawComplianceSymbol(ctx, centerX + 55, resultY + 55);

    // 标签
    ctx.font = 'bold 14px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.textAlign = 'center';
    ctx.fillText('联合智能', centerX, resultY + radius + 35);
  };

  const drawComplianceSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // 合规/协议符号
    const size = 12;

    ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.lineWidth = 1.5;

    // 盾形
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y - size / 2);
    ctx.lineTo(x + size, y);
    ctx.arc(x, y + size / 2, size, 0, Math.PI);
    ctx.lineTo(x - size, y);
    ctx.lineTo(x - size, y - size / 2);
    ctx.closePath();
    ctx.stroke();

    // 对勾
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 3, y);
    ctx.lineTo(x - 1, y + 2);
    ctx.lineTo(x + 3, y - 2);
    ctx.stroke();
  };

  return (
    <div className="data-cooperation-diagram">
      <canvas
        ref={canvasRef}
        width={400}
        height={380}
        className="diagram-canvas"
      />
      <div className="diagram-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
          <span>空间数据</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span>行业数据</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>业务数据</span>
        </div>
      </div>
    </div>
  );
};
