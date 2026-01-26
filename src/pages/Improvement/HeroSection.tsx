import React from 'react';
import './HeroSection.css';

interface HeroSectionProps {
  onNavigate: (tab: 'bugs' | 'features' | 'map-corrections') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="hero-section improvement-hero">
      <div className="hero-content">
        <h1>反馈与建议</h1>
        <p className="hero-subtitle">
          我们重视您的反馈，请告诉我们如何使产品更好
        </p>
        
        <div className="improvement-buttons">
          <button 
            className="improvement-button map-corrections"
            onClick={() => onNavigate('map-corrections')}
          >
            <div className="button-icon">🗺️</div>
            <div className="button-content">
              <h3>地图纠错</h3>
              <p>报告地图数据问题</p>
            </div>
          </button>
          
          <button 
            className="improvement-button bug-reports"
            onClick={() => onNavigate('bugs')}
          >
            <div className="button-icon">🐛</div>
            <div className="button-content">
              <h3>产品缺陷</h3>
              <p>报告功能或界面问题</p>
            </div>
          </button>
          
          <button 
            className="improvement-button feature-requests"
            onClick={() => onNavigate('features')}
          >
            <div className="button-icon">✨</div>
            <div className="button-content">
              <h3>功能改进</h3>
              <p>建议新功能或改进</p>
            </div>
          </button>
        </div>

        {/* 其他反馈方式 */}
        <div className="feedback-info">
          <h2>其他反馈方式</h2>
          <div className="contact-methods">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4>邮件联系</h4>
                <p>发送邮件至：<a href="mailto:feedback@fengtukj.com">feedback@fengtukj.com</a></p>
                <p className="contact-note">我们将在 1-2 个工作日内回复</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div className="contact-details">
                <h4>在线客服</h4>
                <p>工作日 9:00-18:00 在线服务</p>
                <button className="contact-button">联系客服</button>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>微信公众号</h4>
                <p>关注"丰图科技"获取最新动态</p>
                <p className="contact-note">扫码关注，留言反馈</p>
              </div>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="faq-section">
          <h2>常见问题</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>❓ 如何提交地图纠错？</h4>
              <p>点击"地图纠错"按钮，填写详细的位置信息和问题描述，我们会尽快处理。</p>
            </div>
            
            <div className="faq-item">
              <h4>❓ 产品缺陷会多久修复？</h4>
              <p>我们会根据问题的严重程度和影响范围，优先级高的缺陷会在下个版本修复。</p>
            </div>
            
            <div className="faq-item">
              <h4>❓ 功能建议会被采纳吗？</h4>
              <p>我们重视每一条建议，符合产品方向且需求量大的功能会纳入开发计划。</p>
            </div>
            
            <div className="faq-item">
              <h4>❓ 如何查看反馈处理进度？</h4>
              <p>提交后会收到反馈编号，可通过邮件或联系客服查询处理状态。</p>
            </div>
          </div>
        </div>

        {/* 反馈统计 */}
        <div className="feedback-stats">
          <h2>反馈统计</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1,234</div>
              <div className="stat-label">总反馈数</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">856</div>
              <div className="stat-label">已处理</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">满意度</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24h</div>
              <div className="stat-label">平均响应</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
