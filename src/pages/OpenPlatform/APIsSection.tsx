import React from 'react';
import './APIsSection.css';

interface ToolItem {
  name: string;
  description: string;
  mode: string;
}

interface ToolGroup {
  title: string;
  summary: string;
  tools: ToolItem[];
}

const toolGroups: ToolGroup[] = [
  {
    title: '地图与态势工具',
    summary: '覆盖地图展示、图层控制、专题渲染和态势叠加。',
    tools: [
      { name: '底图加载', description: '按样式、区域和缩放级别加载地图底图。', mode: 'SDK / API' },
      { name: '图层编排', description: '管理点、线、面、热力和轨迹图层。', mode: 'API' },
      { name: '态势渲染', description: '将业务对象映射成可视化空间图层。', mode: 'SDK' },
    ],
  },
  {
    title: '地址与地理编码工具',
    summary: '面向自然语言地址和结构化地址的理解、纠错、转换。',
    tools: [
      { name: '地址理解', description: '拆分、补全、纠错和行政区识别。', mode: 'API' },
      { name: '正向地理编码', description: '地址转坐标，支持批量处理。', mode: 'API' },
      { name: '逆向地理编码', description: '坐标转结构化地址和周边信息。', mode: 'API' },
    ],
  },
  {
    title: '路线与调度工具',
    summary: '服务路径规划、多点调度和约束下的空间计算。',
    tools: [
      { name: '路径规划', description: '输出最优或约束优先的路线建议。', mode: 'API' },
      { name: '多点串联', description: '生成多站点的访问顺序与总里程。', mode: 'API' },
      { name: '实时调度', description: '为派单、巡检和履约提供路径依据。', mode: 'SDK / API' },
    ],
  },
  {
    title: '围栏与规则工具',
    summary: '适合事件触发、进出判断和区域监控。',
    tools: [
      { name: '围栏创建', description: '定义多边形、圆形或行政区范围。', mode: 'API' },
      { name: '进出判定', description: '判断对象是否进入或离开指定区域。', mode: 'API' },
      { name: '规则触发', description: '把空间事件接入业务工作流。', mode: 'Webhook' },
    ],
  },
  {
    title: '数据服务工具',
    summary: '供地址、企业、楼宇、网格等空间数据查询与回写。',
    tools: [
      { name: '空间数据检索', description: '按区域、关键词和对象类型查询。', mode: 'API' },
      { name: '数据回写', description: '将结果写回工单、台账和业务系统。', mode: 'API' },
      { name: '批量导入导出', description: '支撑批量处理和离线作业。', mode: 'SDK / API' },
    ],
  },
];

export const OpenPlatformAPIs: React.FC = () => {
  return (
    <section className="op-apis">
      <div className="op-section-inner">
        <div className="op-section-heading">
          <span className="op-section-kicker">工具矩阵</span>
          <h2>把开放能力拆成智能体能直接理解的工具单元</h2>
          <p>
            每个工具都带着清晰的输入、输出和约束，既可以被前端和后端直接调用，
            也可以被 Agent 以 MCP-like 的方式发现和编排。
          </p>
        </div>

        <div className="op-tool-groups">
          {toolGroups.map((group) => (
            <article key={group.title} className="op-tool-group">
              <div className="op-tool-group-header">
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>
                </div>
                <span className="op-tool-group-count">{group.tools.length} 项</span>
              </div>

              <div className="op-tool-list">
                {group.tools.map((tool) => (
                  <div key={tool.name} className="op-tool-item">
                    <div className="op-tool-item-title">
                      <h4>{tool.name}</h4>
                      <span>{tool.mode}</span>
                    </div>
                    <p>{tool.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
