// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal'

type State = {
  zoom: number
}

export class MarkerInfo {
  lat: number;
  lng: number;
  type: number;
  constructor(lat, lng, type) {
    this.lat = lat;
    this.lng = lng;
    this.type = type;
  }
}

type LatLng = {
  lat: number;
  lng: number;
}

interface ILeafletMapProps {
  center: LatLng;
  markers: Array<MarkerInfo>;
  height: number;
}

export default class LeafletMap extends Component<ILeafletMapProps, State> {
  state = {
    zoom: 15,
  }

  render() {
    
    const position = [this.props.center.lat, this.props.center.lng]
    return (
      <Map center={position} zoom={this.state.zoom} style={{height: this.props.height}}>
        {()=> {
    const L = require('leaflet');

    const myIcon = L.icon({
      iconUrl: require('../../images/Map_marker.svg'),
      iconSize: [64,64],
      iconAnchor: [32, 64],
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
    });
    const markers = this.props.markers.map((marker) =>
      <Marker key={marker.lat+","+marker.lng} icon={myIcon} position={[marker.lat, marker.lng]}></Marker>
    );

        return(
          <React.Fragment>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        </React.Fragment>
        );}}
      </Map>
    )
  }
}