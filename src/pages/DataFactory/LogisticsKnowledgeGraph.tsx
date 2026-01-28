import React, { useState, useEffect } from 'react';
import './LogisticsKnowledgeGraph.css';

export const LogisticsKnowledgeGraph: React.FC = () => {
  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);

  useEffect(() => {
    // 数字滚动动画
    const nodeTarget = 100;
    const edgeTarget = 50;
    const duration = 2000;
    const steps = 60;
    const nodeIncrement = nodeTarget / steps;
    const edgeIncrement = edgeTarget / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setNodeCount(Math.min(Math.floor(nodeIncrement * currentStep), nodeTarget));
      setEdgeCount(Math.min(Math.floor(edgeIncrement * currentStep), edgeTarget));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const layers = [
    {
      level: 3,
      title: '智能标签引擎',
      icon: '🏷️',
      keyMetric: '20+',
      metricLabel: '标签维度',
      description: '业务标签 + 应用价值输出',
      capabilities: [
        {
          title: '多维标签体系',
          metric: '自动标注准确率 95%+',
          items: ['频次标签（高频/热点）', '质量标签（标准/异常）', '风险标签（拒收/欺诈）', '时效标签（次日达覆盖）']
        },
        {
          title: '业务价值输出',
          metric: '支撑 10+ 业务场景决策',
          items: ['网络规划优化', '异常地址预警', '客户画像分析', '成本精准核算']
        }
      ],
      scenario: '提前识别拒收高风险地址，降低 30% 配送失败率'
    },
    {
      level: 2,
      title: '智能关联网络',
      icon: '🔗',
      keyMetric: '50B+',
      metricLabel: '关系边',
      description: '关系构建 + 动态演进追踪',
      capabilities: [
        {
          title: '多维关系构建',
          metric: '支持 6+ 种关系类型，实时计算',
          items: ['地址→站点覆盖', '站点→订单分配', '时空邻近分析', '异常关联检测']
        },
        {
          title: '时序演变追踪',
          metric: '保留 90 天历史快照，支持回溯分析',
          items: ['日级实体变化', '订单趋势预测', '网络拓扑优化', '质量持续改进']
        }
      ],
      scenario: '基于历史数据预测未来 7 天配送网络负荷'
    },
    {
      level: 1,
      title: '空间数据底座',
      icon: '🗺️',
      keyMetric: '15B+',
      metricLabel: '空间要素',
      description: '地图要素 + 业务实体识别',
      capabilities: [
        {
          title: '核心地图要素',
          metric: '覆盖全国 30 万+ 商业综合体、200 万+ 物流相关站点',
          items: ['商业综合体', '工业园区', '住宅小区', '物流站点/仓库']
        },
        {
          title: '业务实体识别',
          metric: '每日新增/更新 500 万+ 实体',
          items: ['收发地址 10B+', '运营站点 200 万+', '车辆/骑手位置实时']
        }
      ],
      scenario: '10秒内完成全国任意地址的精准匹配与去重'
    }
  ];

  return (
    <section className="logistics-knowledge-graph">
      <div className="graph-header">
        <h3 className="graph-title">从地图到知识图谱</h3>
        <p className="graph-subtitle">
          经过物流业务验证的互联网地图，不仅仅是一张地图。
          地图背后是丰富的空间要素、物流实体、多维关系、时间演变和业务标签，
          层层叠加形成了丰图独有的物流时空知识图谱。
        </p>
      </div>

      <div className="graph-visualization">
        {/* 右侧卡片挪到上面 */}
        <div className="graph-result">
          <div className="result-card">
            <div className="result-icon">🧠</div>
            <h4 className="result-title">物流时空知识图谱</h4>
            
            <div className="result-stats">
              <div className="stat-item">
                <span className="stat-label">节点规模</span>
                <span className="stat-value">{nodeCount}B+</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-label">关系边</span>
                <span className="stat-value">{edgeCount}B+</span>
              </div>
            </div>

            <div className="result-features">
              <h5>核心能力</h5>
              <ul className="features-list">
                <li>
                  <span className="feature-icon">⚡</span>
                  <span>秒级全国地址匹配与去重</span>
                </li>
                <li>
                  <span className="feature-icon">🎯</span>
                  <span>多源实体智能融合</span>
                </li>
                <li>
                  <span className="feature-icon">🔮</span>
                  <span>7 天配送网络负荷预测</span>
                </li>
                <li>
                  <span className="feature-icon">🛡️</span>
                  <span>异常地址提前预警</span>
                </li>
                <li>
                  <span className="feature-icon">📈</span>
                  <span>全链路质量溯源追踪</span>
                </li>
              </ul>
            </div>

            <div className="result-realtime">
              <div className="realtime-header">
                <span className="realtime-badge">实时数据</span>
              </div>
              <div className="realtime-stats">
                <div className="realtime-item">
                  <span className="realtime-label">今日新增实体</span>
                  <span className="realtime-value">500 万+</span>
                </div>
                <div className="realtime-item">
                  <span className="realtime-label">关系更新</span>
                  <span className="realtime-value">实时</span>
                </div>
                <div className="realtime-item">
                  <span className="realtime-label">服务可用性</span>
                  <span className="realtime-value">99.9%</span>
                </div>
              </div>
            </div>

            <div className="result-highlight">
              <span className="highlight-badge">物流业务验证</span>
              <p>基于顺丰真实业务数据积累，持续优化迭代</p>
            </div>
          </div>
        </div>

        {/* 左侧：三层递进，改为全宽 */}
        <div className="graph-layers">
          {layers.map((layer, idx) => (
            <div key={idx} className="layer-block" data-level={layer.level}>
              <div className="layer-header">
                <span className="layer-icon">{layer.icon}</span>
                <div className="layer-info">
                  <div className="layer-title-row">
                    <h4 className="layer-title">{layer.title}</h4>
                    <div className="layer-metric">
                      <span className="metric-number">{layer.keyMetric}</span>
                      <span className="metric-label">{layer.metricLabel}</span>
                    </div>
                  </div>
                  <p className="layer-description">{layer.description}</p>
                </div>
              </div>

              <div className="layer-capabilities">
                {layer.capabilities.map((cap, capIdx) => (
                  <div key={capIdx} className="capability-section">
                    <div className="capability-header">
                      <h5 className="capability-title">{cap.title}</h5>
                      <p className="capability-metric">{cap.metric}</p>
                    </div>
                    <div className="capability-items">
                      {cap.items.map((item, itemIdx) => (
                        <span key={itemIdx} className="capability-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="layer-scenario">
                <span className="scenario-icon">💡</span>
                <span className="scenario-text">{layer.scenario}</span>
              </div>

              {idx < layers.length - 1 && (
                <div className="layer-arrow">
                  <span className="arrow-icon">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 页面底部收尾文案 */}
        <div className="graph-closure">
          <div className="closure-content">
            <h3 className="closure-title">从数据到决策的完整链路</h3>
            <p className="closure-text">
              丰图的物流时空知识图谱不仅是海量数据的堆积，更是围绕真实业务场景的智能化演进。
              从地图底座的精准要素识别，到关联网络的动态演变追踪，再到智能标签的业务价值输出，
              我们搭建了一套完整的从"数据智能"到"业务决策"的链路体系。
            </p>
            <div className="closure-features">
              <div className="closure-feature-item">
                <span className="closure-feature-icon">🎯</span>
                <span>实时决策支撑</span>
              </div>
              <div className="closure-feature-item">
                <span className="closure-feature-icon">📈</span>
                <span>持续演变优化</span>
              </div>
              <div className="closure-feature-item">
                <span className="closure-feature-icon">🚀</span>
                <span>规模化应用</span>
              </div>
            </div>
          </div>
        </div>

        <div className="graph-footer-cta">
          <a className="graph-footer-button" href="/data-factory/stkg">
            深入了解｜时空知识图谱 →
          </a>
        </div>
      </div>
    </section>
  );
};
