import React from 'react'
import './ArchitectureDiagram.css'

const chips = (list: string[]) => (
  <div className="chips">
    {list.map((t, i) => (
      <span key={i} className="chip">{t}</span>
    ))}
  </div>
)

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="arch-diagram">
      {/* 行业位置智能决策服务 */}
      <div className="layer layer-industry">
        <div className="layer-head">
          <h3>行业位置智能决策服务</h3>
          <p>围绕各行业的决策场景，提供可落地的智能化能力</p>
        </div>
        <div className="cards grid-5">
          <div className="card compact">
            <h4>物流 / 货运</h4>
            <div className="items-list">
              <div className="item">网络规划</div>
              <div className="item">投递决策</div>
              <div className="item">路径合规</div>
              <div className="item">成本决策</div>
            </div>
          </div>
          <div className="card compact">
            <h4>公安 / 政务</h4>
            <div className="items-list">
              <div className="item">空间态势</div>
              <div className="item">警务决策</div>
              <div className="item">数据治理</div>
              <div className="item">决策支撑</div>
            </div>
          </div>
          <div className="card compact">
            <h4>城市管理</h4>
            <div className="items-list">
              <div className="item">部件治理</div>
              <div className="item">事件决策</div>
              <div className="item">作业调度</div>
              <div className="item">覆盖分析</div>
            </div>
          </div>
          <div className="card compact">
            <h4>金融 / 电力</h4>
            <div className="items-list">
              <div className="item">风控决策</div>
              <div className="item">网点选址</div>
              <div className="item">设施运维</div>
              <div className="item">调度决策</div>
            </div>
          </div>
          <div className="card compact">
            <h4>零售 / 电商</h4>
            <div className="items-list">
              <div className="item">门店选址</div>
              <div className="item">商圈分析</div>
              <div className="item">履约决策</div>
              <div className="item">区域运营</div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector"><span className="arrow">↓</span></div>

      {/* 位置智能服务基础平台 */}
      <div className="layer layer-platform">
        <div className="layer-head">
          <h3>位置智能服务基础平台</h3>
          <p>统一的位置与空间能力服务底座，为行业决策提供基础能力</p>
        </div>
        <div className="cards grid-4">
          <div className="card compact">
            <h4>空间数据与地图</h4>
            <div className="items-list">
              <div className="item">丰图地图</div>
              <div className="item">地址数据</div>
              <div className="item">AOI 数据</div>
              <div className="item">空间实体</div>
            </div>
          </div>
          <div className="card compact">
            <h4>基础位置能力</h4>
            <div className="items-list">
              <div className="item">搜索</div>
              <div className="item">定位</div>
              <div className="item">路径规划</div>
              <div className="item">覆盖分析</div>
            </div>
          </div>
          <div className="card compact">
            <h4>时空分析能力</h4>
            <div className="items-list">
              <div className="item">流动分析</div>
              <div className="item">变化识别</div>
              <div className="item">指标计算</div>
              <div className="item">趋势识别</div>
            </div>
          </div>
          <div className="card compact">
            <h4>平台化能力</h4>
            <div className="items-list">
              <div className="item">API</div>
              <div className="item">SDK</div>
              <div className="item">权限安全</div>
              <div className="item">服务编排</div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector"><span className="arrow">↓</span></div>

      {/* 工业级时空数据资产体系 */}
      <div className="layer layer-data">
        <div className="layer-head">
          <h3>工业级时空数据资产体系</h3>
          <p>真实场景持续沉淀的高质量、可验证、可更新的时空数据</p>
        </div>
        <div className="cards grid-4">
          <div className="card compact">
            <h4>基础空间数据</h4>
            <div className="items-list">
              <div className="item">道路网络</div>
              <div className="item">行政区域</div>
              <div className="item">网格数据</div>
            </div>
          </div>
          <div className="card compact">
            <h4>地址与 AOI</h4>
            <div className="items-list">
              <div className="item">标准地址</div>
              <div className="item">空间实体</div>
              <div className="item">关系网络</div>
            </div>
          </div>
          <div className="card compact">
            <h4>业务行为数据</h4>
            <div className="items-list">
              <div className="item">物流轨迹</div>
              <div className="item">作业行为</div>
              <div className="item">事件反馈</div>
            </div>
          </div>
          <div className="card compact">
            <h4>行业专题数据</h4>
            <div className="items-list">
              <div className="item">行业规则</div>
              <div className="item">设施数据</div>
              <div className="item">运行状态</div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector"><span className="arrow">↓</span></div>

      {/* 空间智能数据工厂 */}
      <div className="layer layer-factory">
        <div className="layer-head">
          <h3>空间智能数据工厂</h3>
          <p>面向全栈数据生命周期的自动化生产与治理体系</p>
        </div>
        <div className="cards grid-3">
          <div className="card compact">
            <h4>数据获取与接入</h4>
            <div className="items-list">
              <div className="item">多源采集</div>
              <div className="item">实时接入</div>
              <div className="item">质量检测</div>
            </div>
          </div>
          <div className="card compact">
            <h4>加工生产流水线</h4>
            <div className="items-list">
              <div className="item">标注与评估</div>
              <div className="item">融合与校准</div>
              <div className="item">特征与规则</div>
            </div>
          </div>
          <div className="card compact">
            <h4>治理与服务化</h4>
            <div className="items-list">
              <div className="item">数据编排</div>
              <div className="item">版本管理</div>
              <div className="item">服务发布</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
