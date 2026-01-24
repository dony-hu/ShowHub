import React from 'react';
import HeroSection from './HomePage/HeroSection';
import MissionSection from './HomePage/MissionSection';
import PlatformSection from './HomePage/PlatformSection';
import BaseServicesSection from './HomePage/BaseServicesSection';
import DataFactorySection from './HomePage/DataFactorySection';
import ClosingSection from './HomePage/ClosingSection';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <MissionSection />
      <PlatformSection />
      <BaseServicesSection />
      <DataFactorySection />
      <ClosingSection />
    </div>
  );
};

export default HomePage;
