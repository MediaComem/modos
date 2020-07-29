/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-require-imports */
import { LeafletMouseEvent } from 'leaflet';
import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import {
  LeafletCustomMap,
  NavigationPanel,
  transformNavPanelLocationIntoMakersArray,
  ICustomLeafletLayerGroup,
  ICustomMarker
} from '../components/index';
import styles from './map.module.scss';
import { getObservations } from '../libs/modos-api';
import { IMapnvFeature, translateSwissGridCoordinateToLatLng } from '../libs/mapnv-api';

/**
 *
 */
interface IMapPageState {
  isNavigationPanelOpen: boolean;
  currentSearchedPoint: string;
  location: { to: any; from: any };
  navigationLayer: ICustomLeafletLayerGroup;
  obstaclesLayer: ICustomLeafletLayerGroup;
}

/**
 *
 */
const INTIAL_STATE: IMapPageState = {
  isNavigationPanelOpen: false,
  currentSearchedPoint: '',
  location: { to: null, from: null },
  navigationLayer: { id: 'Navigation', lastUpdate: Date.now(), markers: [] },
  obstaclesLayer: { id: 'Obstacles', isClusterized: true, lastUpdate: Date.now(), markers: [] }
};

/**
 *
 */
enum MAP_ACTION {
  SEARCH_LOCATION,
  CHOOSE_LOCATION,
  TOGGLE_PANEL,
  OBSERVATIONS_LOADED
}

enum OBSTACLES_TYPE {
  CURB_RAMP='curb ramp',
  MISSING_CURB_RAMP='missing curb ramp',
  SURFACE_PROBLEM='surface problem',
  OBSTACLE='obstacle',
  WIDTH='width',
  SECURITY='security',
  SLOPE='slope',
  NO_PROBLEM='no problem',
  BONUS='bonus'
}

/**
 *
 * @param action
 * @param payload
 */
const reducer = (
  currentState: IMapPageState,
  action: MAP_ACTION,
  payload?
): IMapPageState => {
  switch (action) {
    case MAP_ACTION.SEARCH_LOCATION:
      return {
        ...currentState,
        isNavigationPanelOpen: false,
        currentSearchedPoint: payload
      };

    case MAP_ACTION.CHOOSE_LOCATION:
      return {
        ...currentState,
        location: payload.location,
        isNavigationPanelOpen: true,
        currentSearchedPoint: '',
        navigationLayer: {
          ...currentState.navigationLayer,
          lastUpdate: Date.now(),
          markers: payload.layer
        }
      };

    case MAP_ACTION.TOGGLE_PANEL:
      return {
        ...currentState,
        isNavigationPanelOpen: !currentState.isNavigationPanelOpen
      };

    case MAP_ACTION.OBSERVATIONS_LOADED:
      return {
        ...currentState,
        obstaclesLayer: {
          ...currentState.obstaclesLayer,
          markers: payload,
          lastUpdate: Date.now()
        }
      };

    default:
      return currentState;
  }
};

/**
 *
 * @param observations
 */
const processObservationRequest = observations => {
  const observationsAsMarkers: ICustomMarker[] = [];
  observations.forEach(
    observation => {
      if (observation.location &&
              observation.location.latitude &&
              observation.location.longitude) {
        observationsAsMarkers.push({
          coordinate: [ observation.location.latitude, observation.location.longitude ],
          icon: '/assets/sidewalk-icon.png'
        });
      }
    }
  );
  return { observationsAsMarkers };
};

/**
 * The MapPage Component
 *
 * This Component is the page for the modos application
 *
 * @param props React props (for now there is no props avaible)
 * @returns The MapPage React Component
 */
const MapPage = () => {
  const [ state, setState ] = useState(INTIAL_STATE);

  /**
   *
   * @param point
   */
  const onSearchingLocation = point =>
    setState(reducer(state, MAP_ACTION.SEARCH_LOCATION, point));

  /**
     *
     */
  const updateLocationMarker = location => {
    const layer = [];
    transformNavPanelLocationIntoMakersArray(location).forEach(marker =>
      layer.push(marker));

    setState(
      reducer(state, MAP_ACTION.CHOOSE_LOCATION, {
        location,
        layer
      })
    );
  };

  /**
   *
   * @param evt
   */
  const onChooseLocationOnMap = (evt: LeafletMouseEvent) => {
    if (state.currentSearchedPoint !== '') {
      const currLocation = state.location;
      currLocation[state.currentSearchedPoint] = evt.latlng;
      updateLocationMarker(currLocation);
    }
  };

  /**
   *
   * @param evt
   * @param point
   */
  const onChooseLocationByText = (evt: IMapnvFeature, point: string) => {
    const currLocation = state.location;
    currLocation[point] = translateSwissGridCoordinateToLatLng(evt);
    updateLocationMarker(currLocation);
  };

  /**
   *
   */
  useEffect(() => {
    getObservations()
      .then(observations => {
        const { observationsAsMarkers } = processObservationRequest(observations);
        setState(reducer(state, MAP_ACTION.OBSERVATIONS_LOADED, observationsAsMarkers));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div id={styles['map-app']}>
        <Navbar id={styles['map-app-navbar']} expand='lg'>
          <Navbar.Brand href='/'>
            <img
              src={require('../images/logo.svg')}
              width='30'
              height='30'
              className='d-inline-block align-top'
              alt='MoDos Logo'
            />
          </Navbar.Brand>

          <div className='mr-auto'></div>

          <div>
            <button
              className={styles['navbar-btn']}
              onClick={() => setState(reducer(state, MAP_ACTION.TOGGLE_PANEL))}
            >
              <i className='material-icons'>navigation</i>
            </button>

            {/* <button className={styles['navbar-btn']}>
              <i className='material-icons'>layers</i>
            </button> */}
          </div>
        </Navbar>

        <div id={styles['map-app-container']}>
          {state.isNavigationPanelOpen &&
            <NavigationPanel
              id={styles['map-app-navigation-panel']}

              onClickExit={() =>
                setState(reducer(state, MAP_ACTION.TOGGLE_PANEL))
              }

              onClickFrom={() => onSearchingLocation('from')}
              onClickTo={() => onSearchingLocation('to')}

              onChooseFrom={evt => onChooseLocationByText(evt, 'from')}
              onChooseTo={evt => onChooseLocationByText(evt, 'to')}

              location={state.location}
            ></NavigationPanel>
          }

          <LeafletCustomMap
            id={styles.map}
            onMapClick={evt => onChooseLocationOnMap(evt)}
            layerGroups={[ state.navigationLayer, state.obstaclesLayer ]}
          ></LeafletCustomMap>
        </div>
      </div>
    </>
  );
};

export default MapPage;
