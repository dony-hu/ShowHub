import React from 'react';
import { Breadcrumb } from './DataFactory/Breadcrumb';
import { MapToGraphDemo } from './DataFactory/MapToGraphDemo';
import './KnowledgeGraphDetailPage.css';

export const KnowledgeGraphDetailPage: React.FC = () => {
  return (
    <div className="knowledge-graph-detail-page">
      <div className="detail-page-container">
        <Breadcrumb items={[
          { label: '首页', path: '/' },
          { label: '核心技术', path: '/data-factory' },
          { label: '物流知识图谱详情' }
        ]} />

        <div className="detail-hero">
          <h1 className="detail-title">物流知识图谱</h1>
          <p className="detail-subtitle">
            基于空间智能的地址理解能力，构建物流全链路多模态融合的知识图谱
          </p>
          <div className="detail-tags">
            <span className="detail-tag">地址LLM理解</span>
            <span className="detail-tag">实体抽取</span>
            <span className="detail-tag">关系图谱</span>
            <span className="detail-tag">智能搜索</span>
          </div>
        </div>

        <section className="graph-demo-section">
          <h2 className="section-title">地址到图谱：双向联动</h2>
          <p className="section-description">
            点击地图上的地址点位，自动定位图谱中的相关节点；点击图谱节点，地图自动飞行到对应地址位置
          </p>
          <MapToGraphDemo />
        </section>

        <section className="search-services-section">
          <h2 className="section-title">图谱智能搜索服务</h2>
          <p className="section-description">
            基于知识图谱的多维度搜索能力，支持地址搜索、站点查询、运单追踪等场景
          </p>

          <div className="search-features-grid">
            <div className="search-feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">地址智能搜索</h3>
              <p className="feature-desc">
                支持模糊地址输入，自动补全标准地址，返回周边POI、配送站点等关联信息
              </p>
              <ul className="feature-list">
                <li>地址规范化与纠错</li>
                <li>周边实体关联推荐</li>
                <li>历史配送记录查询</li>
                <li>配送难度评估</li>
              </ul>
            </div>

            <div className="search-feature-card">
              <div className="feature-icon">📍</div>
              <h3 className="feature-title">站点覆盖查询</h3>
              <p className="feature-desc">
                根据地址或区域，快速查询最近配送站点、覆盖范围、服务能力等信息
              </p>
              <ul className="feature-list">
                <li>最优站点匹配</li>
                <li>服务能力评估</li>
                <li>配送路径规划</li>
                <li>负荷预警提示</li>
              </ul>
            </div>

            <div className="search-feature-card">
              <div className="feature-icon">📦</div>
              <h3 className="feature-title">运单关联追踪</h3>
              <p className="feature-desc">
                基于图谱关系，追踪运单全流程轨迹，关联上下游运单、车辆、人员等信息
              </p>
              <ul className="feature-list">
                <li>多维度轨迹追踪</li>
                <li>异常运单预警</li>
                <li>关联运单推荐</li>
                <li>配送效率分析</li>
              </ul>
            </div>

            <div className="search-feature-card">
              <div className="feature-icon">🗺️</div>
              <h3 className="feature-title">区域洞察分析</h3>
              <p className="feature-desc">
                聚合区域内的地址、运单、站点等实体，生成区域画像和业务洞察报告
              </p>
              <ul className="feature-list">
                <li>订单密度热力图</li>
                <li>配送效率评估</li>
                <li>成本结构分析</li>
                <li>优化建议推荐</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="api-integration-section">
          <h2 className="section-title">开放API集成</h2>
          <p className="section-description">
            提供RESTful API接口，支持快速集成到业务系统中
          </p>

          <div className="api-examples">
            <div className="api-card">
              <h4 className="api-name">地址搜索 API</h4>
              <div className="api-endpoint">
                <span className="api-method">POST</span>
                <span className="api-path">/api/graph/address/search</span>
              </div>
              <p className="api-desc">支持模糊搜索、智能补全、周边实体查询</p>
            </div>

            <div className="api-card">
              <h4 className="api-name">站点查询 API</h4>
              <div className="api-endpoint">
                <span className="api-method">GET</span>
                <span className="api-path">/api/graph/station/nearby</span>
              </div>
              <p className="api-desc">根据坐标或地址查询最近站点及覆盖信息</p>
            </div>

            <div className="api-card">
              <h4 className="api-name">运单追踪 API</h4>
              <div className="api-endpoint">
                <span className="api-method">GET</span>
                <span className="api-path">/api/graph/order/:id/track</span>
              </div>
              <p className="api-desc">获取运单全流程轨迹及关联实体信息</p>
            </div>

            <div className="api-card">
              <h4 className="api-name">区域洞察 API</h4>
              <div className="api-endpoint">
                <span className="api-method">POST</span>
                <span className="api-path">/api/graph/region/insight</span>
              </div>
              <p className="api-desc">基于图谱数据生成区域业务洞察报告</p>
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
                基于地址关系图谱，优化配送路径，减少配送时间和成本。结合历史轨迹和实时路况，动态调整最优路线。
              </p>
            </div>

            <div className="use-case-card">
              <div className="use-case-number">02</div>
              <h3 className="use-case-title">异常检测预警</h3>
              <p className="use-case-desc">
                通过图谱关系分析，识别异常地址、拒收高发区域、欺诈地址等风险点，提前预警避免损失。
              </p>
            </div>

            <div className="use-case-card">
              <div className="use-case-number">03</div>
              <h3 className="use-case-title">网点选址优化</h3>
              <p className="use-case-desc">
                结合地址分布、订单热力、现有站点覆盖情况，为新网点选址提供数据支持，优化配送网络布局。
              </p>
            </div>

            <div className="use-case-card">
              <div className="use-case-number">04</div>
              <h3 className="use-case-title">客户画像分析</h3>
              <p className="use-case-desc">
                基于地址、运单、收件人等实体关系，构建客户画像，支持精准营销和个性化服务推荐。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
