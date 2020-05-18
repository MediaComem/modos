import React, { useEffect, useState, useRef } from 'react';
import { TileLayer, Map } from 'leaflet';

const initMap = async id => {

  const leaflet: any = await import('leaflet');
  await import('leaflet-providers');

  const MAP: Map = leaflet.map(id);

  MAP.fitBounds([
    [ 45, 6 ],
    [ 48, 11 ]
  ]);

  const CARTO_DB_POSITRON: TileLayer = leaflet.tileLayer.provider(
    'CartoDB.Positron'
  );

  CARTO_DB_POSITRON.addTo(MAP);
};

const Leaflet = props => {
  const isMapInit = useRef(false);

  useEffect(() => {
    initMap(props.id).catch(err => console.log(err)).finally(() => {
      isMapInit.current = true;
    });

    return () => {
      isMapInit.current = false;
    };
  }, [ isMapInit ]);

  return (
    <div id={props.id} style={{ height: '100%', width: '100%' }}>

    </div>
  );
};

export { Leaflet };
