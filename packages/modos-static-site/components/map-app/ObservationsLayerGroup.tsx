import React, { useEffect, useState } from 'react';
import { LatLng, Icon } from 'leaflet';
import { LayerGroup, Marker } from 'react-leaflet';
import {
  getObservationByOwnerEvent,
  getObservations,
  IObservation,
  OBSTACLES_TYPE
} from '../../libs/modos-api';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [observations, setObservations] = useState<IObservation[]>([]);

  const getInfoObs = observation => {
    props.onObservationClick(observation);
  };

  useEffect(() => {
    getObservations()
      .then(result => {
        setObservations(result);

        // If an observation is selected in the url params
        // trigger the click event to display the obs on the app
        if (router.query.observationID) {
          const permaLinkedObs = result.find(
            obs =>
              obs.id ===
              Number.parseInt(router.query.observationID as string, 10)
          );
          if (permaLinkedObs) {
            getInfoObs(permaLinkedObs);
          }
        }
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
