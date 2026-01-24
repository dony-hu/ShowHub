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
      </div>
    </div>
  );
};

export default HeroSection;
