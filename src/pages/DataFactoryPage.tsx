import React from 'react';
import './DataFactoryPage.css';
import { DataFactoryHero } from './DataFactory/HeroSection';
import { DataFactoryPositioning } from './DataFactory/PositioningSection.tsx';
import { DataFactoryPrinciples } from './DataFactory/PrinciplesSection.tsx';
import { DataFactoryUseCases } from './DataFactory/UseCasesSection.tsx';
import { DataFactoryLabeling } from './DataFactory/LabelingSection.tsx';
import { DataFactoryAssetization } from './DataFactory/AssetizationSection.tsx';
import { DataFactoryServing } from './DataFactory/ServingSection.tsx';
import { DataFactoryCTA } from './DataFactory/CTASection.tsx';

export const DataFactoryPage: React.FC = () => {
  return (
    <div className="data-factory-page">
      <DataFactoryHero />
      <DataFactoryPositioning />
      <DataFactoryPrinciples />
      <DataFactoryUseCases />
      <DataFactoryLabeling />
      <DataFactoryAssetization />
      <DataFactoryServing />
      <DataFactoryCTA />
    </div>
  );
};
