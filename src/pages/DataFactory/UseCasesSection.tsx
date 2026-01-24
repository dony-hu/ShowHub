import React, { useState } from 'react';
import './UseCasesSection.css';

export const DataFactoryUseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const useCases = [
    // ========== 服务顺丰物流场景 ==========
    {
      id: 'sf-waybill',
      title: '运单数据接入与地址资产化',
      icon: '📦',
      category: '顺丰物流',
      inputs: ['运单地址（非标准）', '收寄件地址文本', '投递异常记录', '地址变更反馈'],
      actions: [
        '地址文本解析与标准化（POI匹配、坐标纠偏）',
        '多源地址冲突检测与融合（运单vs基础地图）',
        '投递异常数据挖掘，生成地图更新线索'
      ],
      outputs: ['标准化地址库', '地址-实体映射关系', '地图更新线索资产'],
      example: '日均百万级运单地址 → 持续更新标准地址库 → 支撑精准配送与地图维护'
    },
    {
      id: 'sf-trajectory',
      title: '轨迹数据接入与路网资产生产',
      icon: '🚚',
      category: '顺丰物流',
      inputs: ['车辆GPS轨迹（原始点位）', '配送时效数据', '路径偏移记录'],
      actions: [
        '轨迹清洗（去噪、漂移处理）与路网匹配',
        '实际通行路径提取，识别新建/变更道路',
        '时效数据融合，生成路网通行性权重'
      ],
      outputs: ['路网通行性资产', '道路更新线索库', '配送时效画像数据'],
      example: '千万级轨迹点 → 路网匹配与融合 → 产出高精度通行性数据资产'
    },
    {
      id: 'sf-local',
      title: '同城配送数据接入与商圈资产构建',
      icon: '🏍️',
      category: '顺丰物流',
      inputs: ['同城订单数据', '骑手配送轨迹', '商户POI地址', '配送范围多边形'],
      actions: [
        '订单地址解析与商户POI关联',
        '配送热力分析与商圈边界聚类',
        '骑手可达性计算，生成配送范围资产'
      ],
      outputs: ['商圈空间资产库', '配送热力图数据', '站点覆盖分析资产'],
      example: '百万级同城订单 → 空间聚合与边界提取 → 产出商圈画像资产'
    },
    {
      id: 'sf-trunk',
      title: '货运规则数据接入与路径约束资产化',
      icon: '🚛',
      category: '顺丰物流',
      inputs: ['限高限重规则（文本）', '收费站数据', '禁行规则', '货运路径记录'],
      actions: [
        '规则文本结构化解析与语义标注',
        '规则与道路/区域实体关联（空间化表达）',
        '多规则融合，生成可计算的约束图层'
      ],
      outputs: ['货运规则资产图层', '路径约束计算服务', '合规路径推荐数据'],
      example: '分散的文本规则 → 结构化与空间化处理 → 产出可计算的约束资产'
    },

    // ========== 服务外部客户场景 ==========
    {
      id: 'public-safety',
      title: '警情数据接入与时空事件资产化',
      icon: '🚨',
      category: '外部客户',
      inputs: ['警情文本记录', '地址描述', '时间信息', '监控视频元数据'],
      actions: [
        '警情地址解析与空间定位（地址标准化）',
        '时空信息结构化，构建事件时空索引',
        '高发区域聚类分析，生成风险热力资产'
      ],
      outputs: ['警情时空事件库', '风险热力图资产', '区域风险评分数据'],
      example: '文本警情记录 → 地址解析与时空建模 → 产出可查询的事件资产'
    },
    {
      id: 'city-ops',
      title: '城市多源数据接入与运行态势资产',
      icon: '🏙️',
      category: '外部客户',
      inputs: ['城市事件流', '人流传感器数据', '交通流量数据', '设施状态数据'],
      actions: [
        '多源异构数据清洗与时间对齐',
        '空间关联融合（事件-区域-设施）',
        '实时态势计算，生成城市运行指标资产'
      ],
      outputs: ['城市运行态势资产', '多维指标数据库', '异常事件识别规则库'],
      example: '多源异构数据流 → 融合与指标计算 → 产出城市态势资产'
    },
    {
      id: 'urban-mgmt',
      title: 'G2城管数据接入与部件资产治理',
      icon: '🏗️',
      category: '外部客户',
      inputs: ['部件采集数据', '部件状态更新', '维护记录', '巡检照片'],
      actions: [
        '部件数据标准化与去重（唯一ID生成）',
        '部件生命周期管理（新增/变更/报废）',
        '维护记录关联，形成部件画像资产'
      ],
      outputs: ['标准化城市部件库', '部件状态变更资产', '维护历史溯源数据'],
      example: '分散的部件采集数据 → 标准化与生命周期管理 → 产出统一部件资产'
    },
    {
      id: 'sanitation',
      title: '环卫数据接入与作业质量资产化',
      icon: '🧹',
      category: '外部客户',
      inputs: ['清扫轨迹GPS', '作业打卡记录', '垃圾桶位置', '作业人员信息'],
      actions: [
        '轨迹与作业区域匹配验证（覆盖率计算）',
        '作业质量评估建模（频次、时长、覆盖）',
        '垃圾桶与服务范围关联，生成设施资产'
      ],
      outputs: ['作业质量评估资产', '覆盖率分析数据', '环卫设施资产库'],
      example: '轨迹与打卡记录 → 匹配验证与质量建模 → 产出作业评估资产'
    },
    {
      id: 'power',
      title: '电力设施数据接入与资产精细化管理',
      icon: '⚡',
      category: '外部客户',
      inputs: ['设施台账数据', '巡检GPS轨迹', '设施照片', '故障报修记录'],
      actions: [
        '设施位置精确化（GPS纠偏、影像匹配）',
        '设施属性标准化与资产编码',
        '运行状态与维护记录关联，形成设施画像'
      ],
      outputs: ['精细化电力设施资产库', '设施状态变更资产', '巡检轨迹分析数据'],
      example: '粗粒度台账数据 → 位置精细化与属性标准化 → 产出高精度设施资产'
    }
  ];

  const activeUseCase = useCases[activeTab];

  return (
    <section id="use-cases" className="df-use-cases">
      <div className="df-use-cases-container">
        <h2 className="df-section-title">场景与数据接入</h2>
        
        <div className="df-use-cases-layout">
          <div className="df-use-cases-tabs">
            <div className="df-tab-category">
              <div className="df-category-label">顺丰物流场景</div>
              {useCases.filter(uc => uc.category === '顺丰物流').map((useCase, index) => {
                const globalIndex = useCases.indexOf(useCase);
                return (
                  <button
                    key={useCase.id}
                    className={`df-use-case-tab ${activeTab === globalIndex ? 'active' : ''}`}
                    onClick={() => setActiveTab(globalIndex)}
                  >
                    <span className="df-tab-icon">{useCase.icon}</span>
                    <span className="df-tab-title">{useCase.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="df-tab-category">
              <div className="df-category-label">外部客户场景</div>
              {useCases.filter(uc => uc.category === '外部客户').map((useCase, index) => {
                const globalIndex = useCases.indexOf(useCase);
                return (
                  <button
                    key={useCase.id}
                    className={`df-use-case-tab ${activeTab === globalIndex ? 'active' : ''}`}
                    onClick={() => setActiveTab(globalIndex)}
                  >
                    <span className="df-tab-icon">{useCase.icon}</span>
                    <span className="df-tab-title">{useCase.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="df-use-case-detail">
            <div className="df-use-case-header">
              <span className="df-use-case-icon-large">{activeUseCase.icon}</span>
              <h3 className="df-use-case-title">{activeUseCase.title}</h3>
            </div>
            
            <div className="df-use-case-section">
              <h4 className="df-use-case-subtitle">输入数据</h4>
              <div className="df-chips">
                {activeUseCase.inputs.map((input, index) => (
                  <span key={index} className="df-chip">{input}</span>
                ))}
              </div>
            </div>
            
            <div className="df-use-case-section">
              <h4 className="df-use-case-subtitle">治理/融合动作</h4>
              <ul className="df-action-list">
                {activeUseCase.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
            
            <div className="df-use-case-section">
              <h4 className="df-use-case-subtitle">产出资产</h4>
              <ul className="df-output-list">
                {activeUseCase.outputs.map((output, index) => (
                  <li key={index}>{output}</li>
                ))}
              </ul>
            </div>
            
            <div className="df-use-case-example">
              <strong>典型示例：</strong> {activeUseCase.example}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
