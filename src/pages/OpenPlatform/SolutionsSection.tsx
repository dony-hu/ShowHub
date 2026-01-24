import React, { useState } from 'react';
import './SolutionsSection.css';

interface Solution {
  id: number;
  title: string;
  icon: string;
  description: string;
  features: string[];
  detailLink: string;
  customLink: string;
}

export const OpenPlatformSolutions: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState(0);

  const solutions: Solution[] = [
    {
      id: 0,
      title: 'O2O上门服务',
      icon: '🚗',
      description: '为O2O应用打造全方位LBS解决方案，覆盖到家、到店等多种服务类型',
      features: [
        '设置收货地址',
        '商品配送进度展示',
        '分单系统选择配送员',
        '规划配送路线',
        '大数据分析可视化展示'
      ],
      detailLink: 'https://lbs.sfmap.com.cn/solution/o2o',
      customLink: 'https://lbs.sfmap.com.cn/contact/custom'
    },
    {
      id: 1,
      title: '电商零售',
      icon: '🛒',
      description: '覆盖"用户下单 - 系统派单 - 运输配送 - 运力动态调度 - 商业运营分析"的全流程解决方案',
      features: [
        '设置收货地址',
        '包裹配送进度展示',
        '分单系统选择配送员',
        '规划配送路线',
        '大数据分析可视化展示'
      ],
      detailLink: 'https://lbs.sfmap.com.cn/solution/ecommerce',
      customLink: 'https://lbs.sfmap.com.cn/contact/custom'
    },
    {
      id: 2,
      title: '家电售后',
      icon: '🔧',
      description: '针对家电售后场景，助力企业提升上门服务响应与执行效率',
      features: [
        '网格精细化管理',
        '智能派单，提升效率',
        '一张图经营决策',
        '服务路径优化',
        '客户满意度提升'
      ],
      detailLink: 'https://lbs.sfmap.com.cn/solution/afterservice',
      customLink: 'https://lbs.sfmap.com.cn/contact/custom'
    },
    {
      id: 3,
      title: '智慧物流',
      icon: '📦',
      description: '针对业务特性打造智慧物流解决方案，助力物流行业数字化转型升级',
      features: [
        '地址录入高质量',
        '要求准确自动化',
        '调度和分单',
        '末端收派效率提升',
        '降本提效增收'
      ],
      detailLink: 'https://lbs.sfmap.com.cn/solution/logistics',
      customLink: 'https://lbs.sfmap.com.cn/contact/custom'
    }
  ];

  const current = solutions[selectedSolution];

  return (
    <section className="op-solutions">
      <div className="op-solutions-container">
        <h2 className="section-title">依托工业级地图，提供专业场景解决方案</h2>

        <div className="solutions-tabs">
          {solutions.map((solution) => (
            <button
              key={solution.id}
              className={`solution-tab ${solution.id === selectedSolution ? 'active' : ''}`}
              onClick={() => setSelectedSolution(solution.id)}
            >
              <span className="tab-icon">{solution.icon}</span>
              <span>{solution.title}</span>
            </button>
          ))}
        </div>

        <div className="solution-detail">
          <div className="solution-content">
            <div className="solution-header">
              <span className="solution-icon">{current.icon}</span>
              <h3 className="solution-title">{current.title}</h3>
            </div>
            <p className="solution-description">{current.description}</p>
            <ul className="solution-features">
              {current.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="feature-bullet">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="solution-actions">
              <a href={current.detailLink} className="solution-btn primary" target="_blank" rel="noopener noreferrer">查看详情</a>
              <a href={current.customLink} className="solution-btn secondary" target="_blank" rel="noopener noreferrer">定制化解决方案</a>
            </div>
          </div>
          <div className="solution-visual">
            <div className="visual-placeholder">
              <span className="visual-icon">{current.icon}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
