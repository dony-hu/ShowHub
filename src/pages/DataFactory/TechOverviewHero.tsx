import React from 'react';
import './TechOverviewHero.css';

export const TechOverviewHero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="tech-overview-hero">
      <div className="hero-container">
        {/* 主标题区 */}
        <div className="hero-header">
          <h2 className="hero-subtitle hero-subtitle-enlarged">数据工厂 × 知识图谱双轮驱动</h2>
          <p className="hero-tagline hero-tagline-enlarged">从原始数据到时空智能决策的完整闭环</p>
        </div>

        {/* 双板块对比卡片 */}
        <div className="tech-cards">
          {/* 数据工厂卡片 */}
          <div className="tech-card factory-card">
            <div className="card-icon">🏭</div>
            <h3 className="card-title">时空智能数据工厂</h3>
            <div className="card-divider"></div>
            
            <div className="card-section">
              <h4 className="section-label">核心能力</h4>
              <ul className="capability-list">
                <li>
                  <span className="bullet">•</span>
                  <span>AI标注与智能治理</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>空间实体精准识别</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>多源异构数据融合</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>全流程质量保障</span>
                </li>
              </ul>
            </div>

            <div className="card-section">
              <h4 className="section-label">技术优势</h4>
              <ul className="capability-list">
                <li>
                  <span className="bullet">•</span>
                  <span>TB级数据处理能力</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>2D/3D/街景一体化标注</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>支持6+行业场景</span>
                </li>
              </ul>
            </div>

            <button 
              className="card-button"
              onClick={() => scrollToSection('data-factory-section')}
            >
              深入了解 ↓
            </button>
          </div>

          {/* 时空图谱卡片 */}
          <div className="tech-card graph-card">
            <div className="card-icon">🗺️</div>
            <h3 className="card-title">物流时空知识图谱</h3>
            <div className="card-divider"></div>
            
            <div className="card-section">
              <h4 className="section-label">核心能力</h4>
              <ul className="capability-list">
                <li>
                  <span className="bullet">•</span>
                  <span>地址实体跨场景对齐</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>时空关系智能推理</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>图网络深度分析</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>实时知识图谱更新</span>
                </li>
              </ul>
            </div>

            <div className="card-section">
              <h4 className="section-label">数据规模</h4>
              <ul className="capability-list">
                <li>
                  <span className="bullet">•</span>
                  <span>基于顺丰真实物流数据</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>10亿+时空实体节点</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span>50亿+关系边</span>
                </li>
              </ul>
            </div>

            <button 
              className="card-button"
              onClick={() => scrollToSection('knowledge-graph-section')}
            >
              深入了解 ↓
            </button>
          </div>
        </div>

        {/* 协同价值说明 */}
        <div className="synergy-banner">
          <div className="synergy-icon">⚡</div>
          <div className="synergy-text">
            <strong>协同优势：</strong>数据工厂输出的高质量空间实体数据，为知识图谱提供坚实基础；
            图谱的关联推理能力，反哺数据工厂的标注策略优化
          </div>
        </div>
      </div>
    </section>
  );
};
