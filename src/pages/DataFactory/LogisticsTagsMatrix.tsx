import React from 'react';
import './LogisticsTagsMatrix.css';

export const LogisticsTagsMatrix: React.FC = () => {
  return (
    <div className="logistics-tags-matrix">
      <h3 className="matrix-title">图谱要素：实体 · 关系 · 属性</h3>
      <p className="matrix-subtitle">围绕物流时空数据，按“实体-关系-属性”三类要素构建知识图谱标签</p>

      <div className="tags-categories">
        {/* 实体类要素 */}
        <div className="tag-category">
          <div className="category-header">
            <span className="category-icon">🧩</span>
            <h4 className="category-title">实体（Who & Where）</h4>
          </div>
          <div className="tags-group">
            <div className="tag-section">
              <span className="tag-section-label">物流角色：</span>
              <div className="tags-list">
                <span className="tag">地址/POI</span>
                <span className="tag">站点/仓</span>
                <span className="tag">车辆/骑手</span>
                <span className="tag">运单/包裹</span>
                <span className="tag">客户/商户</span>
              </div>
            </div>
            <div className="tag-section">
              <span className="tag-section-label">时空坐标：</span>
              <div className="tags-list">
                <span className="tag">经纬度</span>
                <span className="tag">行政区/格网</span>
                <span className="tag">道路段/路口</span>
                <span className="tag">时间窗/班次</span>
              </div>
            </div>
            <div className="tag-section">
              <span className="tag-section-label">业务属性：</span>
              <div className="tags-list">
                <span className="tag">时效等级</span>
                <span className="tag">货品类型</span>
                <span className="tag">温控/保价</span>
                <span className="tag">频次/价值</span>
              </div>
            </div>
          </div>
        </div>

        {/* 关系类要素 */}
        <div className="tag-category">
          <div className="category-header">
            <span className="category-icon">🔗</span>
            <h4 className="category-title">关系（Link）</h4>
          </div>
          <div className="tags-group">
            <div className="tag-section">
              <span className="tag-section-label">拓扑关联：</span>
              <div className="tags-list">
                <span className="tag">地址 → 站点覆盖</span>
                <span className="tag">站点 → 运单分配</span>
                <span className="tag">运单 → 轨迹路网</span>
                <span className="tag">车辆 → 路径/停靠</span>
              </div>
            </div>
            <div className="tag-section">
              <span className="tag-section-label">业务逻辑：</span>
              <div className="tags-list">
                <span className="tag">客户 → 地址/偏好</span>
                <span className="tag">仓库 → 库存/补货</span>
                <span className="tag">商户 → 订单簇</span>
                <span className="tag">风险 → 异常关系</span>
              </div>
            </div>
            <div className="tag-section">
              <span className="tag-section-label">时空关联：</span>
              <div className="tags-list">
                <span className="tag">时间序列共现</span>
                <span className="tag">空间邻近/圈层</span>
                <span className="tag">三维场景关联</span>
                <span className="tag">链路全程溯源</span>
              </div>
            </div>
          </div>
        </div>

        {/* 属性类要素 */}
        <div className="tag-category">
          <div className="category-header">
            <span className="category-icon">📊</span>
            <h4 className="category-title">属性（Facts）</h4>
          </div>
          <div className="tags-group">
            <div className="tag-section">
              <span className="tag-section-label">时空属性：</span>
              <div className="tags-list">
                <span className="tag">高频/低频</span>
                <span className="tag">潮汐/峰谷</span>
                <span className="tag">路径耗时</span>
                <span className="tag">停留/驻留</span>
              </div>
            </div>
            <div className="tag-section">
              <span className="tag-section-label">质量属性：</span>
              <div className="tags-list">
                <span className="tag">完整度/唯一性</span>
                <span className="tag">可信度/置信</span>
                <span className="tag">一致性/版本</span>
                <span className="tag">溯源/责任链</span>
              </div>
            </div>
            <div className="tag-section">
              <span className="tag-section-label">风险与保障：</span>
              <div className="tags-list">
                <span className="tag">异常签收</span>
                <span className="tag">地址欺诈</span>
                <span className="tag">路线偏离</span>
                <span className="tag">合规/隐私</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
