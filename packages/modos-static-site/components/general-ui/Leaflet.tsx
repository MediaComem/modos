import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, Map, MapOptions, LeafletMouseEvent } from 'leaflet';

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

  return MAP;
};

const Leaflet = props => {
  const [ isMapInit, setIsMapInit ] = useState(false);
  const [ initializedMap, initializeMap ] = useState(null);
  const map = useRef(null);

  useEffect(() => {
    if (!isMapInit) {
      const MAP_OPTIONS: MapOptions = props.options || {
        zoom: 13,
        scrollWheelZoom: true
      };

      initMap(props.id, MAP_OPTIONS)
        .catch(err => console.error(err))
        .then(mapResult => initializeMap(mapResult))
        .finally(() => {
          setIsMapInit(true);
        });

    }

    return () => {
      setIsMapInit(false);
    };
  }, [ map ]);

  useEffect(() => {
    if (map.current && initializedMap) {
      const currentMap = initializedMap;
      currentMap.off('click');
      currentMap.on('click', e=>props.onMapClick(e));
    }
  }, [ props.onMapClick ]);

  return (
    <div id={props.id} ref={map}>

    </div>
  );
};

export { Leaflet };
