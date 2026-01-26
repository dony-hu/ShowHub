import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImprovementPage.css';
import HeroSection from './Improvement/HeroSection.tsx';
import FeatureImprovementsSection from './Improvement/FeatureImprovementsSection.tsx';
import BugReportsSection from './Improvement/BugReportsSection.tsx';

type ImprovementTab = 'overview' | 'bugs' | 'features' | 'map-corrections';

const ImprovementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ImprovementTab>('overview');
  const navigate = useNavigate();

  const handleTabClick = (tab: ImprovementTab) => {
    if (tab === 'map-corrections') {
      navigate('/map-correction');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="improvement-page">
      {activeTab === 'overview' && <HeroSection onNavigate={handleTabClick} />}
      {activeTab === 'bugs' && <BugReportsSection onBack={() => setActiveTab('overview')} />}
      {activeTab === 'features' && <FeatureImprovementsSection onBack={() => setActiveTab('overview')} />}
      {activeTab === 'map-corrections' && (
        <div className="improvement-section">
          <button className="back-button" onClick={() => setActiveTab('overview')}>
            ← 返回
          </button>
          <h2>地图纠错</h2>
          <p className="coming-soon">即将上线...</p>
        </div>
      )}
    </div>
  );
};

export default ImprovementPage;
