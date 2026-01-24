import React from 'react';
import './AddressLLMSection.css';

export const PrivateNetworkAddressLLM: React.FC = () => {
  const capabilities = [
    {
      icon: '🧠',
      title: '超强泛化能力',
      description: '理解各类非标准地址描述，包括方言、俗称、历史地名、模糊表达',
      examples: ['老王家隔壁那个卖煎饼的店', '北京西站往东走200米', '原来的百盛商场']
    },
    {
      icon: '🔗',
      title: '空间关系推理',
      description: '理解并推理空间实体间的拓扑、距离、方向、包含等复杂关系',
      examples: ['从A到B途径哪些区域', '找出所有临街商铺', '计算两地最短路径']
    },
    {
      icon: '⏳',
      title: '时空演化认知',
      description: '理解地址随时间的变迁，追踪实体的更名、拆分、合并历史',
      examples: ['这个地方以前叫什么', '2010年这里是什么建筑', '追溯POI变更历史']
    },
    {
      icon: '🗣️',
      title: '自然语言交互',
      description: '以对话方式理解用户意图，无需学习复杂的查询语法',
      examples: ['帮我找附近的咖啡店，要安静的那种', '这条街上有哪些老字号', '从我家到公司怎么走最快']
    },
    {
      icon: '🎯',
      title: '语义地址解析',
      description: '理解基于语义的地址描述，而非仅依赖行政区划和门牌号',
      examples: ['三里屯酒吧街最热闹的那条', '故宫北门对面', '五道口地铁站C口出来右转']
    },
    {
      icon: '🔍',
      title: '多源数据融合',
      description: '整合地图、点评、社交、物流等多源数据，形成统一的实体理解',
      examples: ['这家店在美团上叫什么', '大众点评和高德上是同一个地方吗', '合并重复POI']
    },
    {
      icon: '🌐',
      title: '跨语言地址映射',
      description: '理解不同语言、不同文字系统中的同一地址表达',
      examples: ['北京 → Beijing → 베이징', '中英文地址互译', '识别外文地名']
    },
    {
      icon: '📊',
      title: '空间知识问答',
      description: '基于空间知识图谱回答复杂的地理相关问题',
      examples: ['北京有多少个星巴克', '朝阳区最高的建筑是哪个', '这条路的平均车速是多少']
    },
    {
      icon: '🚀',
      title: '智能地址补全',
      description: '根据上下文和历史，智能预测和补全不完整的地址信息',
      examples: ['输入"三里"预测"三里屯"', '根据用户习惯补全常去地址', '纠正拼写错误']
    },
    {
      icon: '🏙️',
      title: '城市语义理解',
      description: '理解城市的功能分区、文化特征、人群活动等抽象概念',
      examples: ['找一个适合带孩子玩的地方', '哪里能体验老北京文化', '科技公司聚集区在哪']
    },
    {
      icon: '📍',
      title: '个性化地址推荐',
      description: '基于用户偏好、历史行为和实时场景，提供个性化的地址推荐',
      examples: ['根据你的口味推荐餐厅', '适合约会的咖啡厅', '你可能喜欢的书店']
    },
    {
      icon: '🔄',
      title: '地址规范化与标准化',
      description: '将各类非标准地址自动转换为标准格式，支持地址清洗与校验',
      examples: ['统一不同系统的地址格式', '批量清洗物流地址', '验证地址真实性']
    }
  ];

  return (
    <section id="address-llm" className="pn-address-llm">
      <div className="pn-address-llm-container">
        <div className="pn-address-llm-header">
          <h2 className="pn-section-title">地址大模型：空间智能的未来</h2>
          <p className="pn-address-llm-subtitle">
            基于<strong>全国空间实体知识图谱</strong>训练的地址大模型，将包含所有地图实体及其关联关系、别名、时态变化属性，
            赋予机器真正理解空间语义的能力。相比传统的地址服务接口，大模型不仅具有<strong>更强的泛化能力</strong>和<strong>空间推理能力</strong>，
            更能开启全新的空间智能应用范式。
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
          <h3 className="pn-llm-vision-title">🌟 技术愿景</h3>
          <div className="pn-llm-vision-content">
            <p>
              地址大模型将成为<strong>空间智能的基础设施</strong>，赋能智慧城市、物流配送、本地生活、自动驾驶等众多场景。
              它不再是简单的"地址查询工具"，而是能够<strong>理解、推理、生成</strong>的空间智能体，
              让机器具备接近人类的空间认知能力。
            </p>
            <div className="pn-llm-vision-grid">
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">10亿+</div>
                <div className="pn-llm-vision-label">空间实体</div>
              </div>
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">100亿+</div>
                <div className="pn-llm-vision-label">关系三元组</div>
              </div>
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">时空一体</div>
                <div className="pn-llm-vision-label">多维建模</div>
              </div>
              <div className="pn-llm-vision-item">
                <div className="pn-llm-vision-number">实时更新</div>
                <div className="pn-llm-vision-label">持续进化</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
