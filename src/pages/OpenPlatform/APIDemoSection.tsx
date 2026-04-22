import React, { useMemo, useState } from 'react';
import './APIDemoSection.css';

type DemoKey = 'address' | 'route' | 'fence';

interface DemoScenario {
  key: DemoKey;
  title: string;
  summary: string;
  intent: string;
  toolchain: string[];
  request: string;
  response: string;
}

const scenarios: DemoScenario[] = [
  {
    key: 'address',
    title: '地址理解链路',
    summary: '适合表单补全、地址清洗、门店匹配和客户地址纠错。',
    intent: '把一段自然语言地址转成可执行、可定位、可回写的结构化结果。',
    toolchain: ['地址理解', '行政区识别', '正向地理编码', '结果回写'],
    request: '{ "address": "深圳市南山区科技园南区", "normalize": true }',
    response: '{ "province": "广东省", "city": "深圳市", "district": "南山区", "lng": 113.95, "lat": 22.54 }',
  },
  {
    key: 'route',
    title: '路线规划链路',
    summary: '适合派单、巡检、补给和多点任务调度。',
    intent: '在多个约束条件下给出可执行的路径建议和任务顺序。',
    toolchain: ['地点解析', '路线规划', '约束筛选', '调度输出'],
    request: '{ "origin": "仓库A", "destinations": ["网点1", "网点2"], "avoid": ["限行区"] }',
    response: '{ "distance": "18.6km", "duration": "41min", "route": ["仓库A", "网点2", "网点1"] }',
  },
  {
    key: 'fence',
    title: '地理围栏链路',
    summary: '适合进出告警、现场巡查、区域运营和风险监控。',
    intent: '监测对象是否进入、离开或停留在指定空间范围内。',
    toolchain: ['围栏创建', '对象订阅', '进出判断', '事件触发'],
    request: '{ "area": "产业园B区", "subject": "巡检车12", "event": "enter" }',
    response: '{ "status": "triggered", "time": "2026-04-22 09:18:21", "policy": "notify-workflow" }',
  },
];

export const APIDemoSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState<DemoKey>('address');
  const activeScenario = useMemo(
    () => scenarios.find((item) => item.key === activeKey) ?? scenarios[0],
    [activeKey]
  );

  return (
    <section className="op-demo">
      <div className="op-section-inner">
        <div className="op-section-heading">
          <span className="op-section-kicker">调用演示</span>
          <h2>看智能体如何把空间能力串成一条真正可执行的工具链</h2>
          <p>
            这里不是简单的参数表，而是从意图识别、工具选择、参数组织到结果输出的完整调用路径。
          </p>
        </div>

        <div className="op-demo-tabs">
          {scenarios.map((scenario) => (
            <button
              key={scenario.key}
              className={`op-demo-tab ${scenario.key === activeKey ? 'active' : ''}`}
              onClick={() => setActiveKey(scenario.key)}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        <div className="op-demo-panel">
          <div className="op-demo-panel-head">
            <div>
              <h3>{activeScenario.title}</h3>
              <p>{activeScenario.summary}</p>
            </div>
            <span className="op-demo-badge">Agent Ready</span>
          </div>

          <div className="op-demo-layout">
            <div className="op-demo-column">
              <div className="op-demo-card">
                <span className="op-demo-label">意图</span>
                <p>{activeScenario.intent}</p>
              </div>
              <div className="op-demo-card">
                <span className="op-demo-label">工具链</span>
                <div className="op-demo-flow">
                  {activeScenario.toolchain.map((item, index) => (
                    <React.Fragment key={item}>
                      <span className="op-demo-step">{item}</span>
                      {index < activeScenario.toolchain.length - 1 && <span className="op-demo-link" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="op-demo-column">
              <div className="op-demo-code">
                <div className="op-demo-code-head">请求示例</div>
                <pre>{activeScenario.request}</pre>
              </div>
              <div className="op-demo-code result">
                <div className="op-demo-code-head">结构化结果</div>
                <pre>{activeScenario.response}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APIDemoSection;
