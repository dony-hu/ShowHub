import React, { useState } from 'react';
import './SolutionsSection.css';

interface Solution {
  key: string;
  title: string;
  intro: string;
  focus: string[];
  outcome: string;
}

const solutions: Solution[] = [
  {
    key: 'dispatch',
    title: '调度与履约',
    intro: '让智能体根据订单、位置和时效自动选择路线与执行动作。',
    focus: ['派单编排', '路径规划', '时效监控', '异常回传'],
    outcome: '减少人工决策环节，提升调度速度和空间执行稳定性。',
  },
  {
    key: 'retail',
    title: '零售与门店运营',
    intro: '帮助门店、仓配和用户地址场景统一到一套位置语义之下。',
    focus: ['门店匹配', '地址纠错', '商圈分析', '客流渲染'],
    outcome: '把用户定位、门店分配与运营分析打通成统一链路。',
  },
  {
    key: 'gov',
    title: '政务与网格治理',
    intro: '围绕网格、区域、事件和对象构建可追踪的空间治理流程。',
    focus: ['网格下发', '围栏告警', '对象检索', '态势上图'],
    outcome: '增强事件响应效率，让管理动作更清晰、更可审计。',
  },
  {
    key: 'inspection',
    title: '巡检与现场作业',
    intro: '适合移动巡检、设备维护和现场核查等任务型场景。',
    focus: ['轨迹记录', '地理围栏', '拍照定位', '任务回填'],
    outcome: '帮助现场动作与空间位置一一对应，便于闭环管理。',
  },
];

export const OpenPlatformSolutions: React.FC = () => {
  const [activeKey, setActiveKey] = useState(solutions[0].key);
  const current = solutions.find((item) => item.key === activeKey) ?? solutions[0];

  return (
    <section className="op-solutions">
      <div className="op-section-inner">
        <div className="op-section-heading">
          <span className="op-section-kicker">场景方案</span>
          <h2>把工具能力落到真实业务场景，而不是停留在接口目录</h2>
          <p>
            平台的价值最终要体现在任务执行、流程协同和业务结果上。这里展示几类最典型的空间智能场景。
          </p>
        </div>

        <div className="op-solution-tabs">
          {solutions.map((solution) => (
            <button
              key={solution.key}
              className={`op-solution-tab ${solution.key === activeKey ? 'active' : ''}`}
              onClick={() => setActiveKey(solution.key)}
            >
              {solution.title}
            </button>
          ))}
        </div>

        <div className="op-solution-detail">
          <div className="op-solution-copy">
            <span className="op-solution-kicker">Current Scenario</span>
            <h3>{current.title}</h3>
            <p>{current.intro}</p>
            <div className="op-solution-tags">
              {current.focus.map((item) => (
                <span key={item} className="op-solution-tag">{item}</span>
              ))}
            </div>
            <div className="op-solution-outcome">
              <span>业务结果</span>
              <p>{current.outcome}</p>
            </div>
          </div>

          <div className="op-solution-side">
            <div className="op-solution-card">
              <div className="op-solution-card-title">推荐工具链</div>
              <ul>
                {current.focus.map((item, index) => (
                  <li key={item}>
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
