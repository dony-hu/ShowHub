import React from 'react';
import './FeatureImprovementsSection.css';

interface FeatureImprovementsSectionProps {
  onBack: () => void;
}

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  category: string;
  votes: number;
  status: 'pending' | 'planned' | 'in-progress' | 'completed';
  date: string;
  impact?: string;
  technicalDetails?: string;
  proposedBy?: string;
}

const FeatureImprovementsSection: React.FC<FeatureImprovementsSectionProps> = ({ onBack }) => {
  const featureRequests: FeatureRequest[] = [
    {
      id: 1,
      title: '统一认证参数：key 兼容 ak',
      description: '对齐高德（key）与百度（ak），统一推荐 key，ak 仅做兼容别名',
      category: 'API设计',
      votes: 112,
      status: 'pending',
      date: '2026-01-24',
      impact: '降低多图商接入时的心智成本，减少参数命名混淆带来的接入错误。',
      technicalDetails: '接口层支持 key 参数；ak 作为别名；文档主推 key；6-12 个月后评估是否废弃 ak；SDK 内部统一 key。',
      proposedBy: '系统设计组'
    },
    {
      id: 2,
      title: '路径 REST 化 + 版本号',
      description: '对标高德/百度的 /v3/ 风格，采用 /v1/{resource} 资源化命名',
      category: 'API设计',
      votes: 98,
      status: 'pending',
      date: '2026-01-24',
      impact: '支持多版本共存，避免一次性 breaking change，便于灰度与回滚。',
      technicalDetails: '将 /seg/api/relation/query 迁移到 /v1/districts；旧路径标注 deprecated；提供迁移映射表与灰度策略。',
      proposedBy: '技术架构组'
    },
    {
      id: 3,
      title: '字段命名规范化（snake_case + 复数列表）',
      description: '对齐高德 geocodes/pois 复数命名，修正 mediumname/smallname 等无分隔命名',
      category: 'API设计',
      votes: 76,
      status: 'planned',
      date: '2026-01-24',
      impact: '提升可读性与类型清晰度，便于多语言 SDK 与文档的一致性。',
      technicalDetails: '统一 snake_case；示例：medium_name、small_name、result_type；列表字段用复数 districts/streets；输出《API命名规范》。',
      proposedBy: '开发者体验组'
    },
    {
      id: 4,
      title: '返回结构扁平化',
      description: '参考高德 status+info+geocodes，去掉 result/query 嵌套，直接返回具名数据列表',
      category: 'API设计',
      votes: 84,
      status: 'planned',
      date: '2026-01-24',
      impact: '减少 JSON 解析深度，简化前后端类型定义，降低序列化/反序列化成本。',
      technicalDetails: '将 data 改为具名复数字段（districts/streets）；移除 result/query；保留 status/info/count 元信息。',
      proposedBy: '移动开发组'
    },
    {
      id: 5,
      title: '标准状态与错误返回',
      description: '对齐高德 status+info 与百度 status+message，统一成功/失败语义并提供可读错误文案',
      category: 'API设计',
      votes: 105,
      status: 'in-progress',
      date: '2026-01-24',
      impact: '快速定位权限、配额、限流、参数等问题，无需反复联调。',
      technicalDetails: 'status=1 成功/0 失败；info/message 文字说明；预留 error_code 与可重试标识；发布统一错误码表。',
      proposedBy: '技术服务组'
    },
    {
      id: 6,
      title: '坐标系与精度说明',
      description: '补充 GCJ-02/WGS-84 等坐标系说明，对齐高德文档的坐标与误差描述',
      category: 'API设计',
      votes: 71,
      status: 'pending',
      date: '2026-01-24',
      impact: '避免跨服务坐标偏移问题，减少定位误差带来的业务故障。',
      technicalDetails: '在响应中声明坐标系；提供坐标转换参数或工具；文档中给出精度/误差范围与样例。',
      proposedBy: '地图数据组'
    },
    {
      id: 7,
      title: '分页与批量接口设计',
      description: '补充分页/批量规范，对齐高德的 offset/page_size 方案，避免大结果集一次性返回',
      category: 'API设计',
      votes: 69,
      status: 'planned',
      date: '2026-01-24',
      impact: '提升大数据量场景的性能与稳定性，避免超大响应导致超时或内存暴涨。',
      technicalDetails: '为列表接口增加 limit/offset 或 page/page_size；提供批量调用端点；文档列出返回总量与分页示例。',
      proposedBy: '后端架构组'
    },
    {
      id: 8,
      title: '参数必填性与组合规则澄清',
      description: '修复表格“必填”与正文组合规则矛盾的问题，给出可选/必填的清晰矩阵',
      category: '文档',
      votes: 74,
      status: 'planned',
      date: '2026-01-24',
      impact: '减少因参数误解导致的调用失败和无效工单，提升接入成功率。',
      technicalDetails: '在参数表内直接列出有效组合：为空->全国、省->市、省+市->区、省+市+区->街道；对每个组合给示例与返回预期；移除“全部必填”与正文冲突的描述。',
      proposedBy: '文档团队'
    },
    {
      id: 9,
      title: '类型与示例一致性校对',
      description: '确保返回类型表与示例一致，如 data 标注为数组而非 object，并注明空值返回形态',
      category: '文档',
      votes: 63,
      status: 'planned',
      date: '2026-01-24',
      impact: '避免解析错误与类型定义偏差，降低前端/SDK 兼容成本。',
      technicalDetails: '逐项校对：data/pois/districts 等标为 array<string|object>；注明“无数据返回空数组/空字符串”；补充必需字段的可空性说明。',
      proposedBy: 'QA 文档组'
    },
    {
      id: 10,
      title: '错误码与错误示例覆盖',
      description: '为每个接口补充失败示例与错误码表，涵盖鉴权/限流/无效参数/无数据/服务异常',
      category: 'API设计',
      votes: 97,
      status: 'in-progress',
      date: '2026-01-24',
      impact: '开发者可快速自检并做降级重试，减少支持成本和线上事故。',
      technicalDetails: '统一错误返回：status=0, info/message=原因, error_code=具体码；示例覆盖：无 key、key 无效、QPS 超限、参数缺失/非法、无数据、内部错误、超时；标注哪些可重试。',
      proposedBy: '技术支持组'
    },
    {
      id: 11,
      title: '文档导航与可用性修复',
      description: '修复 404/“无此产品或服务”，提供 API 总览、搜索、Changelog 与新增/下线公告',
      category: '文档',
      votes: 81,
      status: 'planned',
      date: '2026-01-24',
      impact: '新手可快速定位接口，减少迷路与无效链接，提升平台可信度。',
      technicalDetails: '建立 API 总览页与分类导航；修复失效链接；增加站内搜索；发布变更日志与废弃计划；在控制台/文档显式提示迁移路径。',
      proposedBy: '平台运营'
    },
    {
      id: 12,
      title: '术语/拼写统一与多语言支持',
      description: '修正 mediumname/smallname 等拼写；统一术语（key、city_code、type_code）；补充英文版/双语描述',
      category: '文档',
      votes: 58,
      status: 'planned',
      date: '2026-01-24',
      impact: '减少阅读障碍与误解，方便国际化开发者接入。',
      technicalDetails: '字段重命名或在文档中给出别名；提供英/中对照；在返回中预留英文描述字段（可选）；更新术语表。',
      proposedBy: '国际化组'
    },
    {
      id: 13,
      title: '调用限制与性能最佳实践',
      description: '补充 QPS/日配额/超时/重试/幂等等约束与建议，对标高德配额说明',
      category: '性能与运营',
      votes: 88,
      status: 'planned',
      date: '2026-01-24',
      impact: '帮助开发者合理限流与降级，避免突发流量导致的整体不可用。',
      technicalDetails: '公开各接口 QPS/日额度；建议客户端/服务端超时值；说明重试策略与幂等要求；给出示例：缓存、退避重试、批量/分页优先。',
      proposedBy: '运维与 SRE'
    }
  ];

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: '待评估',
      planned: '已规划',
      'in-progress': '开发中',
      completed: '已完成'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: '#1976d2',
      planned: '#f57c00',
      'in-progress': '#7b1fa2',
      completed: '#388e3c'
    };
    return colors[status] || '#666';
  };

  return (
    <div className="feature-improvements-section">
      <button className="back-button" onClick={onBack}>
        ← 返回
      </button>
      
      <div className="section-header">
        <h2>功能改进</h2>
        <p className="section-subtitle">用户建议的新功能和改进</p>
      </div>

      <div className="features-list">
        {featureRequests.map((feature) => (
          <div key={feature.id} className="feature-item">
            <div className="feature-header">
              <h3>{feature.title}</h3>
              <div className="feature-meta">
                <span 
                  className="status-badge feature-status"
                  style={{ backgroundColor: `${getStatusColor(feature.status)}20`, color: getStatusColor(feature.status) }}
                >
                  {getStatusLabel(feature.status)}
                </span>
              </div>
            </div>
            <p className="feature-description">{feature.description}</p>
            {feature.impact && (
              <p className="feature-impact">🎯 影响：{feature.impact}</p>
            )}
            {feature.technicalDetails && (
              <div className="feature-tech">
                <div className="tech-label">🛠 实施要点：</div>
                <div className="tech-content">{feature.technicalDetails}</div>
              </div>
            )}
            <div className="feature-footer">
              <div className="feature-info">
                <span className="category-tag">{feature.category}</span>
                <span className="date">{feature.date}</span>
                {feature.proposedBy && (
                  <span className="proposed-by">提议：{feature.proposedBy}</span>
                )}
              </div>
              <div className="votes">
                <span className="vote-icon">👍</span>
                <span className="vote-count">{feature.votes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureImprovementsSection;
