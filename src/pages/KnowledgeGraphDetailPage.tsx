import React from 'react';
import { Breadcrumb } from './DataFactory/Breadcrumb';
import { MapToGraphDemo } from './DataFactory/MapToGraphDemo';
import './KnowledgeGraphDetailPage.css';

export const KnowledgeGraphDetailPage: React.FC = () => {
  return (
    <div className="knowledge-graph-detail-page">
      <div className="detail-page-container">
        <Breadcrumb
          items={[
            { label: '首页', path: '/' },
            { label: '核心技术', path: '/data-factory' },
            { label: '时空知识图谱详情' },
          ]}
        />

        <div className="detail-hero">
          <p className="detail-kicker">Spatio-Temporal Knowledge Graph</p>
          <h1 className="detail-title">时空知识图谱</h1>
          <p className="detail-subtitle">
            让语义地址成为锚点、让动态事件成为状态变化、让实体关系成为可推理网络，最终把地图升级为 AI 可调用的世界模型。
          </p>

          <div className="detail-tags">
            <span className="detail-tag">语义地址</span>
            <span className="detail-tag">动态事件</span>
            <span className="detail-tag">可推理关系</span>
            <span className="detail-tag">仿真闭环</span>
          </div>

          <div className="detail-cta">
            <a className="detail-cta-button" href="/data-factory-detail">
              查看数据工厂详情 →
            </a>
            <p className="detail-cta-subtitle">先把世界采准，再把世界连起来，最后让智能应用在世界里执行动作。</p>
          </div>
        </div>

        <section className="graph-demo-section">
          <h2 className="section-title">地图到图谱：语义地址与关系联动</h2>
          <p className="section-description">
            点击地图点位可定位图谱实体，点击图谱节点可回到空间位置。地址、站点、事件和运单在同一套语义坐标中互相指向。
          </p>
          <MapToGraphDemo />
        </section>

        <section className="search-services-section">
          <h2 className="section-title">世界模型的四类能力</h2>
          <p className="section-description">搜索、推理、仿真、执行，让知识图谱从检索工具升级为行动底座。</p>

          <div className="search-features-grid">
            <div className="search-feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">语义检索</h3>
              <p className="feature-desc">
                支持模糊地址、站点、事件、运单等实体统一搜索，返回结构化上下文与关联关系。
              </p>
              <ul className="feature-list">
                <li>地址标准化与纠错</li>
                <li>实体归一与别名对齐</li>
                <li>事件上下文回溯</li>
                <li>多跳关联定位</li>
              </ul>
            </div>

            <div className="search-feature-card">
              <div className="feature-icon">🧠</div>
              <h3 className="feature-title">关系推理</h3>
              <p className="feature-desc">
                通过实体间的拓扑、时序和因果关系，识别异常根因、影响范围和下一步动作建议。
              </p>
              <ul className="feature-list">
                <li>覆盖关系推断</li>
                <li>事件影响传播</li>
                <li>异常根因分析</li>
                <li>路径与网络推演</li>
              </ul>
            </div>

            <div className="search-feature-card">
              <div className="feature-icon">🧪</div>
              <h3 className="feature-title">情景仿真</h3>
              <p className="feature-desc">
                把候选动作放进图谱世界状态里试跑，评估时效、成本、容量和风险变化。
              </p>
              <ul className="feature-list">
                <li>时空状态快照</li>
                <li>动作后果模拟</li>
                <li>负荷变化估算</li>
                <li>资源占用评估</li>
              </ul>
            </div>

            <div className="search-feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">决策执行</h3>
              <p className="feature-desc">
                将推理和仿真的结果写回业务系统，驱动调度、预警、运营和复盘。
              </p>
              <ul className="feature-list">
                <li>调度建议输出</li>
                <li>异常联动告警</li>
                <li>策略效果回流</li>
                <li>闭环复盘迭代</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="api-integration-section">
          <h2 className="section-title">开放 API 集成</h2>
          <p className="section-description">把世界模型能力封装成可直接接入的服务接口。</p>

          <div className="api-examples">
            <div className="api-card">
              <h4 className="api-name">语义地址 API</h4>
              <div className="api-endpoint">
                <span className="api-method">POST</span>
                <span className="api-path">/api/graph/address/resolve</span>
              </div>
              <p className="api-desc">支持模糊输入、地址纠错、标准化和上下文回填。</p>
            </div>

            <div className="api-card">
              <h4 className="api-name">事件追踪 API</h4>
              <div className="api-endpoint">
                <span className="api-method">GET</span>
                <span className="api-path">/api/graph/event/:id/trace</span>
              </div>
              <p className="api-desc">追踪事件影响路径、关联实体和状态变化时间线。</p>
            </div>

            <div className="api-card">
              <h4 className="api-name">关系推理 API</h4>
              <div className="api-endpoint">
                <span className="api-method">POST</span>
                <span className="api-path">/api/graph/reason</span>
              </div>
              <p className="api-desc">输入实体和约束，输出多跳关系、影响范围和解释链路。</p>
            </div>

            <div className="api-card">
              <h4 className="api-name">仿真决策 API</h4>
              <div className="api-endpoint">
                <span className="api-method">POST</span>
                <span className="api-path">/api/graph/simulate</span>
              </div>
              <p className="api-desc">对候选动作进行世界状态推演，返回成本、风险和收益评估。</p>
            </div>
          </div>
        </section>

        <section className="use-cases-section">
          <h2 className="section-title">典型应用场景</h2>

          <div className="use-cases-grid">
            <div className="use-case-card">
              <div className="use-case-number">01</div>
              <h3 className="use-case-title">智能路径规划</h3>
              <p className="use-case-desc">
                结合语义地址、实时事件和路网关系，动态选择最优路径并持续重算。
              </p>
            </div>

            <div className="use-case-card">
              <div className="use-case-number">02</div>
              <h3 className="use-case-title">异常检测预警</h3>
              <p className="use-case-desc">
                利用事件传播和关系影响链，提前识别异常地址、拥堵风险和履约失效。
              </p>
            </div>

            <div className="use-case-card">
              <div className="use-case-number">03</div>
              <h3 className="use-case-title">网点与资源优化</h3>
              <p className="use-case-desc">
                通过区域画像、覆盖关系和负荷变化，优化站点选址、调度和资源配置。
              </p>
            </div>

            <div className="use-case-card">
              <div className="use-case-number">04</div>
              <h3 className="use-case-title">决策复盘与学习</h3>
              <p className="use-case-desc">
                把执行结果回写图谱和数据工厂，持续校正策略与知识，形成闭环学习。
              </p>
            </div>
          </div>
        </section>

        <div className="detail-footer-link">
          <a className="detail-footer-button" href="/data-factory-detail">
            返回数据工厂 →
          </a>
        </div>
      </div>
    </div>
  );
};
