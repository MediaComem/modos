/* eslint-disable @typescript-eslint/no-require-imports */
import { LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import {
  LeafletCustomMap,
  NavigationPanel,
  transformNavPanelLocationIntoMakersArray,
  ICustomLeafletLayerGroup
} from '../components/index';
import styles from './map.module.scss';

/**
 *
 */
interface IMapPageState {
  isNavigationPanelOpen: boolean;
  currentSearchedPoint: string;
  location: { to: any; from: any };
  navigationLayer: ICustomLeafletLayerGroup;
}

const INTIAL_STATE: IMapPageState = {
  isNavigationPanelOpen: false,
  currentSearchedPoint: '',
  location: { to: null, from: null },
  navigationLayer: { id: 1, lastUpdate: Date.now(), markers: [] }
};

enum MAP_ACTION {
  SEARCH_LOCATION,
  CHOOSE_LOCATION,
  TOGGLE_PANEL
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

    default:
      return currentState;
  }
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
  const onSearchingLocaton = point =>
    setState(reducer(state, MAP_ACTION.SEARCH_LOCATION, point));

  /**
   *
   * @param evt
   */
  const onChooseLocation = (evt: LeafletMouseEvent) => {
    if (state.currentSearchedPoint !== '') {
      const currLocation = state.location;
      currLocation[state.currentSearchedPoint] = evt.latlng;

      const layer = [];
      transformNavPanelLocationIntoMakersArray(currLocation).forEach(marker =>
        layer.push(marker));

      setState(
        reducer(state, MAP_ACTION.CHOOSE_LOCATION, {
          location: currLocation,
          layer
        })
      );
    }
  };

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

            <button className={styles['navbar-btn']}>
              <i className='material-icons'>info</i>
            </button>
          </div>
        </Navbar>

        <div id={styles['map-app-container']}>
          {state.isNavigationPanelOpen &&
            <NavigationPanel
              id={styles['map-app-navigation-panel']}
              onClickExit={() =>
                setState(reducer(state, MAP_ACTION.TOGGLE_PANEL))
              }
              onClickFrom={() => onSearchingLocaton('from')}
              onClickTo={() => onSearchingLocaton('to')}
              location={state.location}
            ></NavigationPanel>
          }

          <LeafletCustomMap
            id={styles.map}
            onMapClick={evt => onChooseLocation(evt)}
            layerGroups={[ state.navigationLayer ]}
          ></LeafletCustomMap>
        </div>
      </div>
    </>
  );
};

export default MapPage;
