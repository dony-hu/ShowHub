import React, { useState } from 'react';
import './SpatioTemporalKGPage.css';

// Section Components
import { STKGHero } from './SpatioTemporalKG/STKGHero';
import { MapToGraphEvolution } from './SpatioTemporalKG/MapToGraphEvolution';
import { STKGDefinition } from './SpatioTemporalKG/STKGDefinition';
import { EngineeringPath } from './SpatioTemporalKG/EngineeringPath';
import { MapGraphInteraction } from './SpatioTemporalKG/MapGraphInteraction';
import { WorldModelSection } from './SpatioTemporalKG/WorldModelSection';
import { CTASection } from './SpatioTemporalKG/CTASection';

export const SpatioTemporalKGPage: React.FC = () => {
  return (
    <div className="stkg-page">
      <STKGHero />
      <MapToGraphEvolution />
      <STKGDefinition />
      <EngineeringPath />
      <MapGraphInteraction />
      <WorldModelSection />
      <CTASection />
    </div>
  );
};

export default SpatioTemporalKGPage;
