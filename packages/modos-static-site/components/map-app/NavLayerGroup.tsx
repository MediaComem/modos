import React, { } from 'react';
import { LayerGroup, Marker } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';

const BASE_ICON = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [13, 41]
});


interface IProps {
  from?: LatLng;
  to?: LatLng;
}

export const NavLayerGroup = (props: IProps) => (
  <LayerGroup>
    {props?.to && <Marker icon={BASE_ICON} position={props.to}></Marker>}
    {props?.from && <Marker icon={BASE_ICON} position={props.from}></Marker>}
  </LayerGroup>
);
