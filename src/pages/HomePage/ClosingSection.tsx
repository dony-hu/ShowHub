import React from 'react';
import './ClosingSection.css';

export const ClosingSection: React.FC = () => {
  return (
    <section className="closing-section">
      <div className="closing-container">
        <h2>从可信数据，到可执行的空间智能 Agent</h2>
        
        <div className="closing-content">
          <p>
            丰图通过 <span className="highlight">空间智能数据工厂</span>，构建可信、可持续的数据体系；<br/>
            通过 <span className="highlight">时空知识图谱与空间工具平台</span>，将真实世界数据转化为 Agent 可调用、可推理、可验证的行业决策能力。
          </p>
          
          <p className="closing-highlight">
            数据、图谱、工具和行业场景共同构成丰图面向智能体时代的核心技术体系
          </p>
        </div>
        
        <div className="closing-tagline">
          <p>以可信数据为基础</p>
          <p>让 Agent 真正理解并行动于真实世界</p>
        </div>
        
        <button className="cta-button">开始合作</button>
      </div>
    </section>
  );
};

export default ClosingSection;
