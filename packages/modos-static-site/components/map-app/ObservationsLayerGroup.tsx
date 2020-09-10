import React, { useEffect, useState } from 'react';
import { LatLng, Icon } from 'leaflet';
import { LayerGroup, Marker } from 'react-leaflet';
import { getObservations, IObservation, OBSTACLES_TYPE } from '../../libs/modos-api';
// import MarkerClusterGroup from 'react-leaflet-markercluster';

const SIDEWALK_ICON = new Icon({
  iconUrl: '/assets/sidewalk-icon.png',
  iconSize: [ 15, 15 ]
});

const OBSTACLE_ICON = new Icon({
  iconUrl: '/assets/obstacle-icon.png',
  iconSize: [ 15, 15 ]
});

const getIconFromObstacleType = (type: OBSTACLES_TYPE) => {
  switch (type) {
    case OBSTACLES_TYPE.SIDEWALK:
      return SIDEWALK_ICON;
    case OBSTACLES_TYPE.OBSTACLE:
      return OBSTACLE_ICON;
    default:
      return OBSTACLE_ICON;
  }
};

interface IProps {
  onObservationClick?: (observation: IObservation) => void;
}

const ObservationsLayerGroup = (props: IProps) => {
  const [ observations, setObservations ] = useState<IObservation[]>([]);

  useEffect(() => {
    getObservations()
      .then(result => {
        setObservations(result);
      })
      .catch(err => console.error(err));
  }, []);

  const test = observation => {
    // console.log(observation);
    props.onObservationClick(observation);
  };
  // For now Clustering is disabled as it impact a lot the perfomances of the interface
  // return (
  //   <MarkerClusterGroup>
  //     {observations?.map((observation, index) => {
  //       if (!observation?.location?.latitude || !observation?.location?.longitude) {
  //         return;
  //       }

  //       return <Marker
  //         key={index}
  //         position={new LatLng(observation.location.latitude, observation.location.longitude)}
  //         icon={getIconFromObstacleType(observation?.description?.obstacle)}
  //         onclick={() => props.onObservationClick(observation)}
  //       ></Marker>;
  //     })}
  //   </MarkerClusterGroup>
  // );
  return (
    <LayerGroup>
      {observations?.map((observation, index) => {
        if (!observation?.location?.latitude || !observation?.location?.longitude) {
          return;
        }

        return <Marker
          key={index}
          position={new LatLng(observation.location.latitude, observation.location.longitude)}
          icon={getIconFromObstacleType(observation?.description?.obstacle)}
          onclick={() => test(observation)}
        ></Marker>;
      })}
    </LayerGroup>
  );

};

export default ObservationsLayerGroup;
