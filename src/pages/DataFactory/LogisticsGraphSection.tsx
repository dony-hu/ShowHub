import React from 'react';
import './LogisticsGraphSection.css';
import { MapToGraphDemo } from './MapToGraphDemo';

export const LogisticsGraphSection: React.FC = () => {
  return (
    <section className="logistics-graph-section" id="knowledge-graph-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">Map to Graph</p>
          <h2 className="section-title">从地图到图谱，把空间语义变成 AI 能调用的知识</h2>
          <p className="section-subtitle">
            语义地址是锚点，动态事件是变化，关系网络是结构，图谱最终服务于理解、推理与决策执行。
          </p>
        </div>

        <div className="intro-cards">
          <div className="intro-card">
            <div className="card-icon">📍</div>
            <h3>语义地址</h3>
            <p>把地址从字符串升级为可对齐坐标、POI、区域、画像和事件的统一语义对象。</p>
          </div>

          <div className="intro-card">
            <div className="card-icon">🕓</div>
            <h3>动态事件</h3>
            <p>把拥堵、异常、变更和风险抽象为事件节点，让世界状态随时间持续演化。</p>
          </div>

          <div className="intro-card">
            <div className="card-icon">🧠</div>
            <h3>可推理关系</h3>
            <p>把覆盖、邻近、依赖、影响和协作建成可计算关系，为智能应用提供推理路径。</p>
          </div>
        </div>

        <MapToGraphDemo />

        <div className="use-cases">
          <h3 className="cases-title">面向 AI 应用的四类调用方式</h3>
          <div className="cases-grid">
            <div className="case-card">
              <div className="case-icon">🔎</div>
              <h4>语义检索</h4>
              <p>地址、站点、事件、运单统一查询，返回可解释的上下文和关联实体。</p>
            </div>

            <div className="case-card">
              <div className="case-icon">🔗</div>
              <h4>关系推理</h4>
              <p>围绕实体和事件进行多跳推理，找出影响路径、上下游关系和异常根因。</p>
            </div>

            <div className="case-card">
              <div className="case-icon">🧪</div>
              <h4>情景仿真</h4>
              <p>把候选动作投影到世界模型上，估算时效、成本、风险和资源占用变化。</p>
            </div>

            <div className="case-card">
              <div className="case-icon">🚀</div>
              <h4>决策执行</h4>
              <p>把推理结果输出到调度、预警、搜索和运营系统，形成可执行闭环。</p>
            </div>
          </div>
        </div>

        <div className="stats-panel">
          <h3 className="stats-title">生产级世界模型规模</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10亿+</div>
              <div className="stat-label">实体节点</div>
              <div className="stat-detail">地址、站点、运单、设备</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">50亿+</div>
              <div className="stat-label">关系边</div>
              <div className="stat-detail">覆盖、邻近、依赖、影响</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">100万+</div>
              <div className="stat-label">日更新量</div>
              <div className="stat-detail">事件流、轨迹流、状态流</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">识别可信度</div>
              <div className="stat-detail">业务验证后的稳定输出</div>
            </div>
          </div>
        </div>

        <div className="key-points">
          <div className="point-item">
            <span className="point-icon">✓</span>
            <span className="point-text">语义地址把地图位置、业务含义和历史状态绑在一起。</span>
          </div>
          <div className="point-item">
            <span className="point-icon">✓</span>
            <span className="point-text">动态事件让图谱不只是静态知识库，而是持续变化的世界状态。</span>
          </div>
          <div className="point-item">
            <span className="point-icon">✓</span>
            <span className="point-text">推理、仿真、执行、复盘串起来之后，图谱才真正成为空间智能的操作系统。</span>
          </div>
        </div>
      </div>
    </section>
  );
};
