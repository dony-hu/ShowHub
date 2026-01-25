import React from 'react';
import './ProductOverviewSection.css';

export const ProductOverviewSection: React.FC = () => {
  return (
    <section className="product-overview-section">
      <div className="overview-container">
        <div className="overview-header">
          <h2>整体产品与解决方案全景</h2>
        </div>

        <div className="overview-content">
          <p className="overview-description">
            基于<strong>空间智能数据工厂</strong>，构建可信、可持续的数据体系；通过丰图的决策服务产品体系，
            将这些数据转化为可执行的行业决策能力。
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductOverviewSection;
