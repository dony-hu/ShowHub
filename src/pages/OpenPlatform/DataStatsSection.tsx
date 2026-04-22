import React from 'react';
import './DataStatsSection.css';

interface Stat {
  value: string;
  label: string;
  detail: string;
}

const stats: Stat[] = [
  { value: '7+', label: '工具域', detail: '地图、路线、编码、地址、围栏、态势、数据服务统一开放' },
  { value: '3', label: '接入模式', detail: 'REST API、SDK 集成、MCP-like 工具发现与编排' },
  { value: '1', label: '权限体系', detail: '按应用、密钥、角色和空间范围管理调用边界' },
  { value: '100%', label: '结构化输出', detail: '响应结果面向机器消费，便于智能体继续推理与执行' },
  { value: '24/7', label: '可观测治理', detail: '调用统计、审计追踪、配额控制和异常告警持续在线' },
];

export const OpenPlatformDataStats: React.FC = () => {
  return (
    <section className="op-stats">
      <div className="op-section-inner">
        <div className="op-stats-strip">
          <div className="op-section-heading left">
            <span className="op-section-kicker">平台底座</span>
            <h2>从调用、编排到治理，完整支撑空间智能化生产</h2>
          </div>
          <p className="op-stats-copy">
            对于智能体来说，最关键的不是“有没有地图”，而是能否稳定找到正确工具、拿到可解释结果、
            并在权限和审计边界内持续执行。
          </p>
        </div>

        <div className="op-stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="op-stat-card">
              <div className="op-stat-value">{stat.value}</div>
              <div className="op-stat-label">{stat.label}</div>
              <p className="op-stat-detail">{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
