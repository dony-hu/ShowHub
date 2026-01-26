import React, { useState } from 'react';
import './MapCorrectionPage.css';

interface ErrorReport {
  title: string;
  description: string;
}

export const MapCorrectionPage: React.FC = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorReport, setErrorReport] = useState<ErrorReport>({
    title: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmitError = async () => {
    if (!errorReport.title.trim() || !errorReport.description.trim()) {
      setSubmitMessage('问题描述和问题详情不能为空');
      return;
    }

    setSubmitting(true);
    try {
      // 这里可以替换为真实的 API 请求
      console.log('提交错误报告：', errorReport);
      setSubmitMessage('感谢您的反馈，我们已收到您的报错信息！');
      
      // 2秒后关闭弹窗
      setTimeout(() => {
        setShowErrorModal(false);
        setErrorReport({ title: '', description: '' });
        setSubmitMessage(null);
      }, 2000);
    } catch (error) {
      setSubmitMessage('提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (!submitting) {
      setShowErrorModal(false);
      setErrorReport({ title: '', description: '' });
      setSubmitMessage(null);
    }
  };

  return (
    <div className="map-correction-page">
      <div className="map-correction-container">
        <div className="map-correction-header">
          <h1>地图纠错</h1>
          <p>发现地图数据问题？点击下方按钮报告给我们</p>
        </div>

        {/* 地图工具 iframe */}
        <div className="map-tool-wrapper">
          <iframe
            src="https://lbs.sfmap.com.cn/mapTool/data2map"
            title="丰图地图纠错工具"
            className="map-tool-iframe"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>

        {/* 报错按钮 */}
        <div className="map-correction-footer">
          <button 
            className="report-error-btn"
            onClick={() => setShowErrorModal(true)}
          >
            🐛 报告问题
          </button>
        </div>
      </div>

      {/* 错误报告弹窗 */}
      {showErrorModal && (
        <div className="error-modal-overlay" onClick={handleCloseModal}>
          <div className="error-modal" onClick={e => e.stopPropagation()}>
            <div className="error-modal-header">
              <h2>报告地图问题</h2>
              <button 
                className="error-modal-close"
                onClick={handleCloseModal}
                disabled={submitting}
              >
                ✕
              </button>
            </div>

            <div className="error-modal-content">
              <div className="form-group">
                <label htmlFor="error-title">问题描述 *</label>
                <input
                  id="error-title"
                  type="text"
                  placeholder="请简要描述问题，如：某地址显示错误"
                  className="form-input"
                  value={errorReport.title}
                  onChange={e => setErrorReport({ ...errorReport, title: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="error-description">问题详情 *</label>
                <textarea
                  id="error-description"
                  placeholder="请详细说明问题的具体情况，包括位置、预期结果、实际结果等"
                  className="form-textarea"
                  value={errorReport.description}
                  onChange={e => setErrorReport({ ...errorReport, description: e.target.value })}
                  disabled={submitting}
                  rows={5}
                />
              </div>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('感谢') ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
            </div>

            <div className="error-modal-footer">
              <button 
                className="btn-cancel"
                onClick={handleCloseModal}
                disabled={submitting}
              >
                取消
              </button>
              <button 
                className="btn-submit"
                onClick={handleSubmitError}
                disabled={submitting}
              >
                {submitting ? '提交中...' : '提交报告'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
