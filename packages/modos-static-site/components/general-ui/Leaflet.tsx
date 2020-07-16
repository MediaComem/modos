import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, Map, MapOptions, LeafletMouseEvent, LayerGroup, Marker } from 'leaflet';

// declare const L;
// export default window.L;

interface IPropsLeafletMap {
  id: string;
  className?: string;
  onMapClick?: (evt: LeafletMouseEvent) => any;
  options?: MapOptions;
  layerGroups?: any[];
}

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

const Leaflet = (props: IPropsLeafletMap) => {
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
        .then(mapResult => initializeMap(mapResult ? mapResult : null))
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
      currentMap.on('click', e => props.onMapClick(e));
    }
  }, [ props.onMapClick ]);

  useEffect(() => {
    // Prevent the window is not defined error
    // see: https://stackoverflow.com/a/55196385
    if (!process.browser) {
      return;
    }

    const L = window.L;

    if (map.current && initializedMap) {
      const currentMap: Map = initializedMap;

      props.layerGroups.forEach(layerGrp => {
        const markers: Marker[] = [];
        layerGrp.forEach(marker => {
          markers.push(L.marker(marker));
        });
        const newLayerGroup: LayerGroup = new L.LayerGroup(markers);

        newLayerGroup.addTo(currentMap);

      });
    }
  }, [ props.layerGroups ]);

  return (
    <div id={props.id} ref={map}>

    </div>
  );
};

export { Leaflet };
