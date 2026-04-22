import React from 'react';
import './CTASection.css';

const supportItems = [
  '空间工具清单',
  '接入样例',
  '权限与审计',
  '方案咨询',
];

export const OpenPlatformCTA: React.FC = () => {
  return (
    <section className="op-cta">
      <div className="op-section-inner op-cta-inner">
        <div className="op-cta-copy">
          <span className="op-section-kicker">下一步</span>
          <h2>把你的空间能力，变成智能体可调用的生产级工具</h2>
          <p>
            无论你要做地图展示、地址理解、路径调度还是空间规则执行，都可以从一套统一的平台开始。
          </p>
          <div className="op-cta-actions">
            <a className="op-cta-button primary" href="https://lbs.sfmap.com.cn/" target="_blank" rel="noopener noreferrer">
              立即试用
            </a>
            <a className="op-cta-button secondary" href="https://lbs.sfmap.com.cn/" target="_blank" rel="noopener noreferrer">
              联系方案团队
            </a>
          </div>
        </div>

        <div className="op-cta-panel">
          {supportItems.map((item) => (
            <div key={item} className="op-cta-chip">{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
