import React from 'react';
import { useLeaflet, WMSTileLayer } from 'react-leaflet';

const URLWMS = `https://www.mapnv.ch/mapserv_proxy?ogcserver=source for image/png`;

const DISPLAYED_LAYER = [
  'ste_voi_banc',
  // 'div_point_interet_handicap_langage_signe',
  // 'div_point_interet_handicap_boucle_magnetique',
  'div_point_interet_handicap_batiments_noaccess',
  'div_point_interet_handicap_batiments_partial',
  // 'div_point_interet_handicap_batiments_full',
  'div_point_interet_handicap_toilettes_noaccess',
  'div_point_interet_handicap_toilettes_partial'
  // 'div_point_interet_handicap_toilettes_full'
  // 'MOB_sta_handicape'
];

const MapnvAccessibilityLayer = () => {
  const leafletCtxt = useLeaflet();
  const mapSize = leafletCtxt.map.getSize();

  return (
    <WMSTileLayer
      tileSize={mapSize.x}
      minZoom={15}
      maxZoom={20}
      url={URLWMS}
      version='1.3.0'
      keepBuffer={1}
      updateWhenZooming={false}
      updateWhenIdle={false}
      updateInterval={100}
      transparent
      format='image/png'
      layers={DISPLAYED_LAYER.join(',')}
    />
  );
};
export default MapnvAccessibilityLayer;
