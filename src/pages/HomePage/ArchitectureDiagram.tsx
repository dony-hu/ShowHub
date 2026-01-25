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
        <div className="cards grid-3">
          <div className="card">
            <h4>物流 / 货运</h4>
            {chips(['网络规划','投递决策','路径合规','成本决策'])}
          </div>
          <div className="card">
            <h4>公安 / 政数 / 城市治理运营</h4>
            {chips(['空间态势','警务决策','数据治理','决策支撑','部件治理','事件决策'])}
          </div>
          <div className="card">
            <h4>环卫 / 城市管理</h4>
            {chips(['作业调度','覆盖分析','运维优化'])}
          </div>
          <div className="card">
            <h4>金融 / 电力 / 运营商</h4>
            {chips(['风控','网点决策','设施运维','调度决策','网络规划','选址决策'])}
          </div>
          <div className="card">
            <h4>零售 / 电商</h4>
            {chips(['选址','商圈决策','履约','区域运营决策'])}
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
          <div className="card">
            <h4>空间数据与地图服务</h4>
            {chips(['丰图地图','地址','AOI','空间实体模型','空间关系与语义'])}
          </div>
          <div className="card">
            <h4>基础位置能力</h4>
            {chips(['搜索','定位','匹配','路径规划','可达性分析','覆盖分析'])}
          </div>
          <div className="card">
            <h4>时空分析与指标能力</h4>
            {chips(['行为与流动分析','变化与趋势识别','指标空间化'])}
          </div>
          <div className="card">
            <h4>平台化服务能力</h4>
            {chips(['API','SDK','服务编排','权限','安全','审计','多部署形态'])}
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
          <div className="card">
            <h4>基础空间数据</h4>
            {chips(['道路','区域','网格'])}
          </div>
          <div className="card">
            <h4>地址与 AOI 数据</h4>
            {chips(['标准地址','空间实体','关系网络'])}
          </div>
          <div className="card">
            <h4>业务行为数据</h4>
            {chips(['物流轨迹','作业行为','事件反馈'])}
          </div>
          <div className="card">
            <h4>行业专题数据</h4>
            {chips(['行业规则','设施','运行状态'])}
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
          <div className="card">
            <h4>数据获取与接入</h4>
            {chips(['多源采集','实时接入','质量检测'])}
          </div>
          <div className="card">
            <h4>加工生产流水线</h4>
            {chips(['标注与评估','融合与校准','特征与规则沉淀'])}
          </div>
          <div className="card">
            <h4>治理与服务化</h4>
            {chips(['数据编排','版本与可追溯','服务发布'])}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
