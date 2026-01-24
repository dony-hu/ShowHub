import React from 'react';
import './OpenPlatformPage.css';
import { OpenPlatformHero } from './OpenPlatform/HeroSection';
import { OpenPlatformProductShowcase } from './OpenPlatform/ProductShowcaseSection';
import { OpenPlatformDataStats } from './OpenPlatform/DataStatsSection';
import { OpenPlatformFeatures } from './OpenPlatform/FeaturesSection';
import { OpenPlatformAPIs } from './OpenPlatform/APIsSection';
import { OpenPlatformSolutions } from './OpenPlatform/SolutionsSection';
import { OpenPlatformIntegration } from './OpenPlatform/IntegrationSection';
import { OpenPlatformCTA } from './OpenPlatform/CTASection';

export const OpenPlatformPage: React.FC = () => {
  return (
    <div className="open-platform-page">
      <OpenPlatformHero />
      <OpenPlatformProductShowcase />
      <OpenPlatformDataStats />
      <OpenPlatformFeatures />
      <OpenPlatformAPIs />
      <OpenPlatformSolutions />
      <OpenPlatformIntegration />
      <OpenPlatformCTA />
    </div>
  );
};

export default OpenPlatformPage;
