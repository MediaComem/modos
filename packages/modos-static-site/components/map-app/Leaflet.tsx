import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, Map, MapOptions, LeafletMouseEvent, LayerGroup, Marker } from 'leaflet';

/**
 * Define the avaible props for the LeafletMap component
 *
 * id: the HTML id of the component. This must be defined as if not the component will not work
 * className: the HTML class of the component
 * onMapClick: Event which occurs when the user click on the map
 * options: Define the Leaflet options of the component @see https://leafletjs.com/reference-1.6.0.html#map-option
 * layerGroups: Define the different LayerGroup of the map.
 */
interface IPropsLeafletMap {
  id: string;
  className?: string;
  onMapClick?: (evt: LeafletMouseEvent) => any;
  options?: MapOptions;
  layerGroups?: any[];
}

/**
 * This function job's is to initialize the Leaflet Map
 * @param id HTML id of the div where the map must be initialize
 * @param options @see https://leafletjs.com/reference-1.6.0.html#map-option
 */
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

/**
 * Custom Leaflet Map React Component
 *
 * This component manage all leaflet related logic.
 *
 * @param props React Props @see IPropsLeafletMap
 */
const LeafletCustomMap = (props: IPropsLeafletMap) => {
  const [ isMapInit, setIsMapInit ] = useState(false);
  const [ initializedMap, initializeMap ] = useState(null);
  const map = useRef(null);

  /*
   * The map must re-render when the div is changing.
   */
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

  /*
   * This effect will manage the different event
   * related to leaflet map. It is necessary to always
   * clean all previous binded event with the leaflet "off" function.
   * Otherwise, there would be multiple function binded on only one event
   */
  useEffect(() => {
    if (map.current && initializedMap) {
      const currentMap = initializedMap;

      currentMap.off('click');
      currentMap.on('click', evt => props.onMapClick(evt));
    }
  }, [ props.onMapClick ]);

  /*
   * This effect is managing the display of the layerGroup on the map
   */
  useEffect(() => {
    // Prevent the "window is not defined" error
    // see: https://stackoverflow.com/a/55196385
    if (!process.browser) {
      return;
    }

    if (map.current && initializedMap) {

      const LEAFLET = window.L;
      const baseIcon = LEAFLET.icon({ iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png' });

      const currentMap: Map = initializedMap;

      props.layerGroups.forEach(layerGrp => {
        const markers: Marker[] = [];
        layerGrp.forEach(marker => {
          markers.push(LEAFLET.marker(marker, { icon: baseIcon }));
        });
        const newLayerGroup: LayerGroup = new LEAFLET.LayerGroup(markers);

        newLayerGroup.addTo(currentMap);

      });
    }
  }, [ props.layerGroups ]);

  return (
    <div id={props.id} ref={map}>

    </div>
  );
};

export { LeafletCustomMap };
