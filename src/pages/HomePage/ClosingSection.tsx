import React from 'react';
import './ClosingSection.css';

export const ClosingSection: React.FC = () => {
  return (
    <section className="closing-section">
      <div className="closing-container">
        <h2>从可信数据，到智能决策</h2>
        
        <div className="closing-content">
          <p>
            丰图通过 <span className="highlight">空间智能数据工厂</span>，构建可信、可持续的数据体系；<br/>
            通过 <span className="highlight">位置智能决策平台</span>，将这些数据转化为可执行的行业决策能力。
          </p>
          
          <p className="closing-highlight">
            二者共同构成丰图的核心技术与产品体系
          </p>
        </div>
        
        <div className="closing-tagline">
          <p>以可信数据为基础</p>
          <p>让智能决策真正落地</p>
        </div>
        
        <button className="cta-button">开始合作</button>
      </div>
    </section>
  );
};

export default ClosingSection;
