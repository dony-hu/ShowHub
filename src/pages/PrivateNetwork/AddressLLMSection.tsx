import React from 'react';
import './AddressLLMSection.css';

export const PrivateNetworkAddressLLM: React.FC = () => {
  const capabilities = [
    {
      icon: '🔐',
      title: '专网推理',
      description: '在本地环境中完成地址解析、检索和推理，不依赖公网服务',
      examples: ['内网地址查询', '隔离区语义检索', '本地模型推理']
    },
    {
      icon: '🗺️',
      title: '地址语义理解',
      description: '识别非标准地址、简称、方言表达和业务习惯写法，自动映射到可用空间实体',
      examples: ['老院区南门旁', '二期仓库西侧', '行政楼对面的会议中心']
    },
    {
      icon: '⏳',
      title: '时态变更认知',
      description: '理解地址、楼宇、机构和设施随时间的拆分、合并、更名与迁移关系',
      examples: ['去年这里是什么楼', '旧地址现在对应哪一栋', '追踪历史变更链路']
    },
    {
      icon: '🧭',
      title: '空间关系推理',
      description: '推理拓扑、邻近、包含、方位和路径关系，为 Agent 提供空间判断依据',
      examples: ['A 点到 B 点经过哪些区域', '找出周边 500 米内资源', '判断是否跨越风险边界']
    },
    {
      icon: '🧠',
      title: '知识图谱问答',
      description: '基于私域知识图谱回答地址、对象、组织和事件的空间关联问题',
      examples: ['这个地址归哪个部门管', '附近有哪些应急资源', '这片区域的对象关系是什么']
    },
    {
      icon: '🔍',
      title: '多源实体融合',
      description: '统一地图、业务、资产和组织数据，消除重复实体并形成可追溯的主数据',
      examples: ['楼栋与地址对齐', '部门与位置绑定', '重复对象自动去重']
    },
    {
      icon: '🗣️',
      title: '自然语言问图',
      description: '把业务人员的日常提问转成可执行的空间查询、检索和分析任务',
      examples: ['找最近的应急点', '查这个区域有哪些资产', '统计网格内的事件数量']
    },
    {
      icon: '⚙️',
      title: '持续训练与校准',
      description: '支持本地数据增量更新、规则校准和离线评测，让地址大模型长期可用',
      examples: ['数据更新后自动重建索引', '规则变更后回归校验', '本地评测集持续扩充']
    },
    {
      icon: '📦',
      title: '合规输出控制',
      description: '对外提供的检索结果和回答可按权限、范围和脱敏规则受控输出',
      examples: ['按角色返回不同粒度', '限制敏感区域信息', '对结果做审计留痕']
    }
  ];

  return (
    <section id="address-llm" className="pn-address-llm">
      <div className="pn-address-llm-container">
        <div className="pn-address-llm-header">
          <h2 className="pn-section-title">地址大模型：专网空间智能的语义引擎</h2>
          <p className="pn-address-llm-subtitle">
            面向企业和政务专网环境构建的地址大模型，把<strong>地址实体、空间关系、时态变化和私域知识</strong>统一进一个本地可控的语义系统，
            让 Agent 不只会“查地址”，还能<strong>理解、追问、推理、校准</strong>空间信息。
          </p>
        </div>

        <div className="pn-llm-capabilities">
          {capabilities.map((capability, index) => (
            <div key={index} className="pn-llm-card">
              <div className="pn-llm-card-header">
                <span className="pn-llm-icon">{capability.icon}</span>
                <h3 className="pn-llm-title">{capability.title}</h3>
              </div>
              <p className="pn-llm-description">{capability.description}</p>
              <div className="pn-llm-examples">
                {capability.examples.map((example, idx) => (
                  <span key={idx} className="pn-llm-example">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pn-llm-vision">
          <h3 className="pn-llm-vision-title">技术目标</h3>
          <div className="pn-llm-vision-content">
            <p>
              让地址大模型成为<strong>专网空间智能的基础设施</strong>，与地图底座、私域图谱和业务 Agent 协同工作，
              支撑政务协同、企业运营、应急指挥和行业调度等真实业务场景。
            </p>
            <div className="pn-llm-vision-grid">
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">本地推理</div>
                <div className="pn-llm-vision-label">不出网</div>
              </div>
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">私域图谱</div>
                <div className="pn-llm-vision-label">可追溯</div>
              </div>
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">时态一致</div>
                <div className="pn-llm-vision-label">可演化</div>
              </div>
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">Agent 可用</div>
                <div className="pn-llm-vision-label">可编排</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
