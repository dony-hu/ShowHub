import React from 'react';
import './LogisticsGraphSection.css';
import { MapToGraphDemo } from './MapToGraphDemo';

export const LogisticsGraphSection: React.FC = () => {
  return (
    <section className="logistics-graph-section" id="knowledge-graph-section">
      <div className="section-container">
        {/* 顶部介绍 */}
        <div className="section-header">
          <h2 className="section-title">基于物流的时空知识图谱</h2>
          <p className="section-subtitle">顺丰真实业务数据构建的生产级图谱系统</p>
        </div>

        {/* 三个核心能力卡片 */}
        <div className="intro-cards">
          <div className="intro-card">
            <div className="card-icon">📍</div>
            <h3>地址深度理解</h3>
            <p>融合地图、街景、卫星影像与POI文本，将地址从单一字符串提升为可推理的空间语义对象</p>
          </div>

          <div className="intro-card">
            <div className="card-icon">🔍</div>
            <h3>实体智能抽取</h3>
            <p>从物流订单、运单、轨迹中自动提取地址、站点、仓库等空间实体，构建物流网络拓扑</p>
          </div>

          <div className="intro-card">
            <div className="card-icon">🤖</div>
            <h3>多模态融合</h3>
            <p>结合文本、图像、位置信号，实现地址标准化、POI识别、场景理解的多模态推理</p>
          </div>
        </div>

        {/* 地图+图谱联动展示 */}
        <MapToGraphDemo />

        {/* 物流专属应用场景 */}
        <div className="use-cases">
          <h3 className="cases-title">物流场景深度应用</h3>
          <div className="cases-grid">
            <div className="case-card">
              <div className="case-icon">📦</div>
              <h4>智能运单追踪</h4>
              <p>基于图谱关联分析，实时追踪运单状态，预测配送时效，异常提前告警</p>
            </div>

            <div className="case-card">
              <div className="case-icon">🚚</div>
              <h4>网络优化决策</h4>
              <p>分析站点覆盖、路径效率、成本分布，为网点布局和路由规划提供数据支撑</p>
            </div>

            <div className="case-card">
              <div className="case-icon">⚠️</div>
              <h4>异常智能告警</h4>
              <p>通过图谱推理识别异常配送模式、地址欺诈风险、流量拥堵预警</p>
            </div>

            <div className="case-card">
              <div className="case-icon">📊</div>
              <h4>经营分析洞察</h4>
              <p>区域订单热力、客户分布、竞争态势的多维度图谱分析</p>
            </div>
          </div>
        </div>

        {/* 数据规模统计面板 */}
        <div className="stats-panel">
          <h3 className="stats-title">生产级图谱规模</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10亿+</div>
              <div className="stat-label">时空实体节点</div>
              <div className="stat-detail">地址、站点、运单、轨迹</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">50亿+</div>
              <div className="stat-label">关系边</div>
              <div className="stat-detail">派送、覆盖、邻近、协作</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">100万+</div>
              <div className="stat-label">日更新量</div>
              <div className="stat-detail">实时运单、轨迹增量</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">地址识别准确率</div>
              <div className="stat-detail">基于顺丰真实业务验证</div>
            </div>
          </div>
        </div>

        {/* 底部要点说明 */}
        <div className="key-points">
          <div className="point-item">
            <span className="point-icon">✓</span>
            <span className="point-text">地址实体是跨行业对齐的共同锚点，物流场景验证最为充分</span>
          </div>
          <div className="point-item">
            <span className="point-icon">✓</span>
            <span className="point-text">物流要素叠加在同一空间实体上，形成联动处置能力</span>
          </div>
          <div className="point-item">
            <span className="point-icon">✓</span>
            <span className="point-text">图谱支持检索、推理与下一步动作（路径规划、异常告警、智能调度）</span>
          </div>
        </div>
      </div>
    </section>
  );
};
