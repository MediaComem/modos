import dynamic from 'next/dynamic';
import React from 'react';


const ModosMapWithNoSSR = dynamic<any>(
  () => import('../components/map-app/ModosMap'),
  { ssr: false }
);

const MapPage = () => <ModosMapWithNoSSR />;

export default MapPage;
