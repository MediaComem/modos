import React, { useEffect, useRef } from 'react';
import { TileLayer, Map, MapOptions } from 'leaflet';

const initMap = async (id, options: MapOptions) => {
  const leaflet: any = await import('leaflet');
  await import('leaflet-providers');

  const MAP: Map = leaflet.map(id, options);

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
    const MAP_OPTIONS: MapOptions = props.options || {
      zoom: 13,
      scrollWheelZoom: false
    };

    initMap(props.id, MAP_OPTIONS).catch(err => console.error(err)).finally(() => {
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
