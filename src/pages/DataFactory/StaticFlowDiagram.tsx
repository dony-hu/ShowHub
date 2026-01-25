import './StaticFlowDiagram.css';

const StaticFlowDiagram: React.FC = () => {
  return (
    <div className="static-flow-diagram">
      <div className="flow-container">
        <div className="diagram-canvas">
          <h2 className="flow-title">空间智能数据工厂 · 全流程架构</h2>
          
          {/* 上行：数据输入(左) | 工具集(中) | 决策服务(右) */}
          <div className="diagram-top-row">
            {/* 区域1：数据输入 */}
            <div className="section-area section-input">
              <div className="section-box">
                <h3>来自业务场景的数据输入</h3>
                <div className="hierarchy-content">
                  <div className="hierarchy-item">
                    <h4>🚚 物流 / 货运</h4>
                    <ul className="hierarchy-list">
                      <li>车货位置、运单</li>
                      <li>站点/仓库</li>
                      <li>成本与路况</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🛡️ 公安 / 消防</h4>
                    <ul className="hierarchy-list">
                      <li>态势与警情</li>
                      <li>消防资源</li>
                      <li>应急调度</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🏛️ 政数 / 城市运营</h4>
                    <ul className="hierarchy-list">
                      <li>部件状态</li>
                      <li>运行监测</li>
                      <li>治理规则</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🧹 环卫 / 城市管理</h4>
                    <ul className="hierarchy-list">
                      <li>作业轨迹</li>
                      <li>网格设施</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>💳 金融 / 电力 / 运营商</h4>
                    <ul className="hierarchy-list">
                      <li>交易告警</li>
                      <li>网点资产</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🛒 零售 / 电商</h4>
                    <ul className="hierarchy-list">
                      <li>门店仓库</li>
                      <li>商圈订单</li>
                      <li>库存履约</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 区域3：中间 - 数据工厂治理工具集 */}
            <div className="section-area section-factory">
              <div className="section-title">数据工厂治理工具集</div>
              <div className="factory-grid-vertical">
                {/* 步骤1：接入与预处理 */}
                <div className="factory-step">
                  <div className="factory-box">
                    <h3>🔌 接入与预处理</h3>
                    <div className="two-column-list">
                      <ul className="list-compact dark-text">
                        <li>多协议、多格式接入</li>
                        <li>数据清洗与标准化</li>
                        <li>质量评估与改善</li>
                      </ul>
                      <ul className="list-compact dark-text">
                        <li>异常检测与修复</li>
                        <li>数据版本管理</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 步骤2：标注、治理与训练 */}
                <div className="factory-step">
                  <div className="factory-box">
                    <h3>✏️ 标注、治理与训练</h3>
                    <div className="two-column-list">
                      <ul className="list-compact dark-text">
                        <li>数据编排与组织</li>
                        <li>业务规则与约束</li>
                        <li>标注任务分配</li>
                      </ul>
                      <ul className="list-compact dark-text">
                        <li>AI模型训练</li>
                        <li>模型评估与调优</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 步骤3：空间实体标注与治理（核心模块，突出显示）*/}
                <div className="factory-step">
                  <div className="factory-box">
                    <h3>📍 空间实体标注与治理</h3>
                    <div className="two-column-list">
                      <ul className="list-compact dark-text">
                        <li>实体识别与分类</li>
                        <li>拓扑关系维护</li>
                        <li>属性完善与更新</li>
                        <li>空间索引构建</li>
                      </ul>
                      <ul className="list-compact dark-text">
                        <li>三维场景构建</li>
                        <li>目标对象提取</li>
                        <li>语义理解增强</li>
                        <li>模型优化迭代</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 步骤4：推理、服务与反馈 */}
                <div className="factory-step">
                  <div className="factory-box">
                    <h3>⚡ 推理、服务与反馈</h3>
                    <div className="two-column-list">
                      <ul className="list-compact dark-text">
                        <li>模型推理引擎</li>
                        <li>服务 API 接口</li>
                        <li>实时监控告警</li>
                      </ul>
                      <ul className="list-compact dark-text">
                        <li>运营数据反馈</li>
                        <li>持续优化迭代</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 步骤5：时空数据关联融合 */}
                <div className="factory-step">
                  <div className="factory-box">
                    <h3>🔗 时空数据 关联融合</h3>
                    <div className="two-column-list">
                      <ul className="list-compact dark-text">
                        <li>跨源数据融合</li>
                        <li>时间序列关联</li>
                        <li>空间邻近性分析</li>
                      </ul>
                      <ul className="list-compact dark-text">
                        <li>多维数据整合</li>
                        <li>知识图谱构建</li>
                        <li>实时流批一体</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 区域2：决策服务 */}
            <div className="section-area section-output">
              <div className="section-box">
                <h3>面向业务场景的决策服务</h3>
                <div className="hierarchy-content">
                  <div className="hierarchy-item">
                    <h4>🚚 物流 / 货运</h4>
                    <ul className="hierarchy-list">
                      <li>网络优化</li>
                      <li>成本决策</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🛡️ 公安 / 消防</h4>
                    <ul className="hierarchy-list">
                      <li>警情研判</li>
                      <li>勤务调度</li>
                      <li>应急处置</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🏛️ 政数 / 城市运营</h4>
                    <ul className="hierarchy-list">
                      <li>运行监测</li>
                      <li>事件闭环</li>
                      <li>运营决策</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🧹 环卫 / 城市管理</h4>
                    <ul className="hierarchy-list">
                      <li>作业调度与优化</li>
                      <li>覆盖分析与运维</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>💳 金融 / 电力 / 运营商</h4>
                    <ul className="hierarchy-list">
                      <li>风险监测</li>
                      <li>网点规划</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>🛒 零售 / 电商</h4>
                    <ul className="hierarchy-list">
                      <li>选址分析</li>
                      <li>履约优化</li>
                    </ul>
                  </div>
                  <div className="hierarchy-item">
                    <h4>💡 基础能力</h4>
                    <ul className="hierarchy-list dark-text">
                      <li>二三维/街景一体化地图</li>
                      <li>文本/图片统一搜索</li>
                      <li>网格化管理与空间分析</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 下行：数据资产体系（全宽） */}
          <div className="section-area section-assets">
            <div className="section-title">数据资产体系</div>
            <div className="assets-grid">
              <div className="asset-item">
                <div className="asset-box">
                  <h3>📁 原始资料库</h3>
                  <div className="paragraph-content dark-text">
                    <p>多源原始数据归档、版本留存、权限管理、审计追踪</p>
                  </div>
                </div>
              </div>

              <div className="asset-item">
                <div className="asset-box">
                  <h3>🧠 知识与模型库</h3>
                  <div className="paragraph-content dark-text">
                    <p>知识图谱、规则库、模型资产、特征仓、评测与迭代记录</p>
                  </div>
                </div>
              </div>

              <div className="asset-item">
                <div className="asset-box">
                  <h3>📦 数据资产库</h3>
                  <div className="paragraph-content dark-text">
                    <p>标注数据资产、模型资产存储、业务规则库、质量指标体系</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticFlowDiagram;
