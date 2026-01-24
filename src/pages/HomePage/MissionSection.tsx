import React from 'react';
import { Link } from 'react-router-dom';
import './MissionSection.css';

export const MissionSection: React.FC = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <h2 className="section-title">丰图的使命</h2>
        
        <p className="mission-intro">
          构建面向未来的空间智能基础设施
        </p>
        
        <div className="mission-grid">
          <div className="mission-item">
            <div className="mission-icon">📊</div>
            <h3>让每一份空间数据</h3>
            <p>来源可追溯、质量可验证、过程可治理</p>
          </div>
          
          <div className="mission-item">
            <div className="mission-icon">🧠</div>
            <h3>让复杂的空间问题</h3>
            <p>转化为可计算、可推理、可执行的智能决策</p>
          </div>
        </div>
        
        <div className="mission-divider"></div>
        
        <h2 className="section-title">两大核心平台</h2>
        
        <div className="platforms-grid">
          <Link to="/open-platform" className="platform-card">
            <h3>位置智能决策平台</h3>
            <p>面向业务与行业的智能决策服务平台</p>
          </Link>
          
          <Link to="/data-factory" className="platform-card">
            <h3>空间智能数据工厂</h3>
            <p>支撑一切决策能力的数据生产与治理底座</p>
          </Link>
        </div>
        
        <p className="platforms-description">
          二者协同，形成从数据到决策的完整闭环
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
