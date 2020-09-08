/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import {
  TileLayer,
  Map,
  MapOptions,
  LeafletMouseEvent,
  LayerGroup,
  Marker,
  LatLngTuple
} from 'leaflet';

/**
 *
 */
export interface ICustomMarker {
  coordinate: LatLngTuple;
  icon?: string;
}

//

export interface ICustomLeafletLayer {
  id: string;
  lastUpdate: number;
  leafletLayer?: any;
}

export interface ICustomLeafletMarkerLayer extends ICustomLeafletLayer {
  markers?: ICustomMarker[];
  isClusterized?: boolean;
}

export interface ICustomLeafletGEOJSONLayer extends ICustomLeafletLayer{
  geojson: any;
}

type ProcessingLayerFnc = (LEAFLET: any, map: any, layer: ICustomLeafletLayer) => LayerGroup;

/**
 * Update a Leaflet layer in leaflet layer group with the needed update done to each layer
 * @param layer
 * @param layerGroup
 * @param map
 * @param LEAFLET
 * @param processingLayerFnc
 */
const updateLayerGroup = (
  layer: ICustomLeafletLayer,
  layerGroup: ICustomLeafletLayer[],
  map: any,
  LEAFLET: any,
  processingLayerFnc: ProcessingLayerFnc
) => {
  const layerIndex = layerGroup.findIndex(stateLayer => stateLayer.id === layer.id);

  if (layerGroup[layerIndex]) {

    // if layer has been updated, we remove it and add it
    if (layerGroup[layerIndex].lastUpdate < layer.lastUpdate) {
      if (layerGroup[layerIndex].leafletLayer) {
        map.removeLayer(layerGroup[layerIndex].leafletLayer);
      }
      layerGroup[layerIndex].leafletLayer = processingLayerFnc(LEAFLET, map, layer);
    }

  } else {
    const newLayerGroup = { id: layer.id, lastUpdate: layer.lastUpdate, leafletLayer: null };
    newLayerGroup.leafletLayer = processingLayerFnc(LEAFLET, map, layer);
    layerGroup.push(newLayerGroup);
  }

  return layerGroup;
};

/**
 *
 * @param layer
 */
const processMarkerLayer: ProcessingLayerFnc = (LEAFLET: any, map: any, layer: ICustomLeafletMarkerLayer) => {
  if (!layer.markers) {
    return null;
  }

  const baseIcon = LEAFLET.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'
  });

  const markers: Marker[] = [];

  layer.markers.forEach((marker: ICustomMarker) => {
    if (marker.icon) {
      const cstmIcon = LEAFLET.icon({
        iconUrl: marker.icon
      });

      markers.push(LEAFLET.marker(marker.coordinate, { icon: cstmIcon }));
    } else {
      markers.push(LEAFLET.marker(marker.coordinate, { icon: baseIcon }));
    }

  });
  // TODO: CLUSTER
  // if (layer.isClusterized) {
  //   const test = new LEAFLET.MarkerClusterGroup();
  //   test.addLayers(markers);
  //   return currentMap.addLayer(test);
  // }

  const newLayerGroup: LayerGroup = new LEAFLET.LayerGroup(markers);

  return newLayerGroup.addTo(map);

};

/**
 * Process a Leaflet geojson and return it if all went okay, null otherwise.
 * @param LEAFLET
 * @param map
 * @param layer
 */
const processGeoJSONLayer: ProcessingLayerFnc = (LEAFLET: any, map: any, layer: ICustomLeafletGEOJSONLayer) => {
  if (!layer.geojson || typeof layer.geojson !== 'object') {
    return null;
  }

  try {
    return LEAFLET.geoJSON(layer.geojson).addTo(map);
  } catch (err) {
    return null;
  }
};

/**
 * Obtain a leaflet overlay compatible object from a layer group
 * @param layerGroup
 */
const getOverlayFromLayerGroups = (layerGroup: ICustomLeafletLayer[]) => {
  if (!layerGroup) {
    return {};
  }

  return layerGroup.reduce((accu, layer) => {
    if (!layer || !layer.leafletLayer) {
      return accu;
    }
    accu[layer.id] = layer.leafletLayer;
    return accu;
  }, {});

};

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
  markerLayerGroups?: ICustomLeafletMarkerLayer[];
  geojsonLayerGroups?: ICustomLeafletGEOJSONLayer[];
}

/**
 * This function job's is to initialize the Leaflet Map
 * @param id HTML id of the div where the map must be initialize
 * @param options @see https://leafletjs.com/reference-1.6.0.html#map-option
 */
const initMap = async (id, options: MapOptions) => {
  const leaflet: any = await import('leaflet');
  await import('leaflet-providers');
  // TODO: CLUSTER
  // await import('leaflet.markercluster');

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
  const [ mapMarkerLayerGroups, setMapMarkerLayerGroups ] = useState([]);
  const [ mapGeojsonLayerGroups, setMapGeoJSONLayerGroups ] = useState([]);
  const [ mapLayersControl, setMapLayerControl ] = useState(null);
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
        .then(mapResult => {
          initializeMap(mapResult ? mapResult : null);
        })
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
      const currentMap: Map = initializedMap;

      // ----------- LAYERS MANAGEMENT

      // Process marker layer
      const newMarkerLayerGroups: ICustomLeafletMarkerLayer[] = mapMarkerLayerGroups;
      if (props.markerLayerGroups) {
        for (const layer of props.markerLayerGroups) {
          updateLayerGroup(layer, newMarkerLayerGroups, currentMap, LEAFLET, processMarkerLayer);
        }
        setMapMarkerLayerGroups(newMarkerLayerGroups);
      }

      // process geojson layer
      const newGeoJSONLayerGroups: ICustomLeafletGEOJSONLayer[] = mapGeojsonLayerGroups;
      if (props.geojsonLayerGroups) {
        for (const layer of props.geojsonLayerGroups) {
          updateLayerGroup(layer, newGeoJSONLayerGroups, currentMap, LEAFLET, processGeoJSONLayer);
        }
        setMapGeoJSONLayerGroups(newGeoJSONLayerGroups);
      }

      // ----------- LEAFLET CONTROL

      if (mapLayersControl) {
        currentMap.removeControl(mapLayersControl);
      }

      // Create a toggle control for each marker layer group if any exist
      const overlayLayerMarker = getOverlayFromLayerGroups(newMarkerLayerGroups);

      // Create a toggle control for each geojson layer group if any exist
      const overlayLayerGeoJSON = getOverlayFromLayerGroups(newGeoJSONLayerGroups);


      setMapLayerControl(
        LEAFLET.control.layers(
          {},
          { ...overlayLayerMarker, ...overlayLayerGeoJSON }
        ).addTo(currentMap)
      );
    }
  }, [ props.markerLayerGroups ]);


  return <div id={props.id} ref={map}></div>;
};

export { LeafletCustomMap };
