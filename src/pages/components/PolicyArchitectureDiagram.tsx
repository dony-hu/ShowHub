
import React from 'react';
import './PolicyArchitectureDiagram.css';
import ServiceDetailTabs from './ServiceDetailTabs';

const PolicyArchitectureDiagram: React.FC = () => {
  return (
    <div className="arch-diagram">
      <div className="arch-header">
        <h2>公安时空决策产品架构</h2>
        <p>三层架构：时空决策服务体系 → 时空数据治理体系 → 专网地图与时空底座</p>
      </div>

      <div className="arch-layers-wrapper">
        {/* LAYER 1: 时空决策服务体系 */}
        <div className="arch-layer-1">
        <div className="layer-header">
          <span className="layer-icon">🎯</span>
          <h3>时空决策服务体系</h3>
        </div>
        <div className="layer-1-content">
          <div className="decision-services">
            <div className="service-item">
              <span className="service-icon"></span>
              <div className="service-info">
                <div className="service-name">时空接处警</div>
                <div className="service-desc">精准定位到风险研判全链支持</div>
              </div>
            </div>

            <div className="service-item">
              <span className="service-icon">🛡️</span>
              <div className="service-info">
                <div className="service-name">风险治理防控</div>
                <div className="service-desc">发现隐患到治理的非现场管控</div>
              </div>
            </div>

            <div className="service-item">
              <span className="service-icon">🎯</span>
              <div className="service-info">
                <div className="service-name">战术空间研判</div>
                <div className="service-desc">攻防决策与环境透明化支持</div>
              </div>
            </div>

            <div className="service-item">
              <span className="service-icon">📊</span>
              <div className="service-info">
                <div className="service-name">勤务资源精算</div>
                <div className="service-desc">警力投放效能量化精算</div>
              </div>
            </div>

            <div className="service-item">
              <span className="service-icon">🎬</span>
              <div className="service-info">
                <div className="service-name">安保仿真推演</div>
                <div className="service-desc">预案制作、风险推演、复盘汇报</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 2: 时空数据治理体系 */}
      <div className="arch-layer-2">
        <div className="layer-header">
          <span className="layer-icon">📊</span>
          <h3>时空数据治理体系</h3>
        </div>
        <div className="layer-2-content">
          <div className="data-modules">
            <div className="data-module">
              <span className="module-icon">📥</span>
              <div className="module-info">
                <div className="module-name">数据接入</div>
                <div className="module-desc">警情、视频、人员统一接入</div>
              </div>
            </div>

            <div className="data-module">
              <span className="module-icon">✅</span>
              <div className="module-info">
                <div className="module-name">质量治理</div>
                <div className="module-desc">数据标注、清洗与校验</div>
              </div>
            </div>

            <div className="data-module">
              <span className="module-icon">🗄️</span>
              <div className="module-info">
                <div className="module-name">实体库</div>
                <div className="module-desc">时空实体构建与关系维护</div>
              </div>
            </div>

            <div className="data-module">
              <span className="module-icon">🤖</span>
              <div className="module-info">
                <div className="module-name">模型服务</div>
                <div className="module-desc">预测、分析与推理能力</div>
              </div>
            </div>

            <div className="data-module">
              <span className="module-icon">🕸️</span>
              <div className="module-info">
                <div className="module-name">知识图谱</div>
                <div className="module-desc">多维数据融合与关联挖掘</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: 专网地图与时空底座 */}
      <div className="arch-layer-3">
        <div className="layer-header">
          <span className="layer-icon">🗺️</span>
          <h3>专网地图与时空底座</h3>
        </div>
        <div className="layer-3-content">
          <div className="foundation-modules">
            <div className="foundation-module">
              <span className="module-icon">🔒</span>
              <div className="module-info">
                <div className="module-name">专网安全</div>
                <div className="module-desc">专网隔离、权限管控</div>
              </div>
            </div>

            <div className="foundation-module">
              <span className="module-icon">🗺️</span>
              <div className="module-info">
                <div className="module-name">地图底座</div>
                <div className="module-desc">底图、地址、POI/AOI</div>
              </div>
            </div>

            <div className="foundation-module">
              <span className="module-icon">🔍</span>
              <div className="module-info">
                <div className="module-name">空间分析</div>
                <div className="module-desc">要素上图、缓冲区、热力</div>
              </div>
            </div>

            <div className="foundation-module">
              <span className="module-icon">📍</span>
              <div className="module-info">
                <div className="module-name">可视落图</div>
                <div className="module-desc">决策结果实时地图呈现</div>
              </div>
            </div>

            <div className="foundation-module">
              <span className="module-icon">🔌</span>
              <div className="module-info">
                <div className="module-name">能力扩展</div>
                <div className="module-desc">模型接入、API 开放</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Capability Detail Tabs Panel */}
      <ServiceDetailTabs />
    </div>
  )
}

export default PolicyArchitectureDiagram
