import React, { useEffect, useState } from 'react';
import { LatLng, Icon } from 'leaflet';
import { LayerGroup, Marker } from 'react-leaflet';
import {
  getObservationByOwnerEvent,
  getObservations,
  IObservation,
  OBSTACLES_TYPE
} from '../../libs/modos-api';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
const modosIconSize: [number, number] = [15, 15];

const getIconFromObstacleType = (type: OBSTACLES_TYPE) =>
  new Icon({
    iconUrl: `/assets/${type}-icon.png`,
    iconSize: modosIconSize
  });

interface IProps {
  onObservationClick?: (observation: IObservation) => void;
  eventID?: number;
}

const ObservationsLayerGroup = (props: IProps) => {
  const [observations, setObservations] = useState<IObservation[]>([]);

  useEffect(() => {
    getObservations()
      .then(result => {
        setObservations(result);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (props.eventID) {
      getObservationByOwnerEvent(props.eventID)
        .then(result => setObservations(result))
        .catch(err => {
          console.error(err);
          setObservations([]);
        });
    } else {
      getObservations()
        .then(result => {
          setObservations(result);
        })
        .catch(err => console.error(err));
    }
  }, [props.eventID]);

  const getInfoObs = observation => {
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
        if (
          !observation?.location?.latitude ||
          !observation?.location?.longitude
        ) {
          return;
        }

        return (
          <Marker
            key={index}
            position={
              new LatLng(
                observation.location.latitude,
                observation.location.longitude
              )
            }
            icon={getIconFromObstacleType(observation?.description?.obstacle)}
            onclick={() => getInfoObs(observation)}></Marker>
        );
      })}
    </LayerGroup>
  );
};

export default ObservationsLayerGroup;
