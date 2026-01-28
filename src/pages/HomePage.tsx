import React from 'react';
import HeroSection from './HomePage/HeroSection';
import CompanyProfileSection from './HomePage/CompanyProfileSection';
import ProductArchitectureSection from './HomePage/ProductArchitectureSection';
import DataAssetsSection from './HomePage/DataAssetsSection';
import ClosingSection from './HomePage/ClosingSection';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <CompanyProfileSection />
      <ProductArchitectureSection />
      <DataAssetsSection />
      <ClosingSection />
    </div>
  );
};

export default HomePage;
