import React from 'react';
import './PrivateNetworkPage.css';
import { PrivateNetworkHero } from './PrivateNetwork/HeroSection';
import { PrivateNetworkFeatures } from './PrivateNetwork/FeaturesSection';
import { PrivateNetworkDetailedFeatures } from './PrivateNetwork/DetailedFeaturesSection';
import { PrivateNetworkUseCases } from './PrivateNetwork/UseCasesSection.tsx';
import { PrivateNetworkDeployment } from './PrivateNetwork/DeploymentSection.tsx';
import { PrivateNetworkAddressLLM } from './PrivateNetwork/AddressLLMSection.tsx';
import { PrivateNetworkCTA } from './PrivateNetwork/CTASection.tsx';

export const PrivateNetworkPage: React.FC = () => {
  return (
    <div className="private-network-page">
      <PrivateNetworkHero />
      <PrivateNetworkFeatures />
      <PrivateNetworkDetailedFeatures />
      <PrivateNetworkUseCases />
      <PrivateNetworkDeployment />
      <PrivateNetworkAddressLLM />
      <PrivateNetworkCTA />
    </div>
  );
};

export default PrivateNetworkPage;
