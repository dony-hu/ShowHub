import React from 'react';
import HeroSection from './HomePage/HeroSection';
import MissionSection from './HomePage/MissionSection';
import CapabilitiesSection from './HomePage/CapabilitiesSection';
import PlatformSection from './HomePage/PlatformSection';
import ClosingSection from './HomePage/ClosingSection';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <MissionSection />
      <CapabilitiesSection />
      <PlatformSection />
      <ClosingSection />
    </div>
  );
};

export default HomePage;
