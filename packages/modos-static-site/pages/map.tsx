/* eslint-disable @typescript-eslint/no-require-imports */
import { LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { LeafletCustomMap, NavigationPanel, transformNavPanelLocationIntoMakersArray } from '../components/index';
import styles from './map.module.scss';

/**
 * The MapPage Component
 *
 * This Component is the page for the modos application
 *
 * @param props React props (for now there is no props avaible)
 * @returns The MapPage React Component
 */
const MapPage = () => {
  const [ isNavigationPanelOpen, setIsNavigationPanelOpen ] = useState(false);
  const [ isUserLookingForPoint, setIsUserLookingForPoint ] = useState('');
  const [ location, setLocation ] = useState({ to: null, from: null });
  const [ layerGroupNavigation, setGroupLayerNavigation ] = useState([]);

  const onSearchingLocaton = point => {
    setIsNavigationPanelOpen(false);
    setIsUserLookingForPoint(point);
  };

  const onChooseLocation = (evt: LeafletMouseEvent) => {
    if (isUserLookingForPoint !== '') {
      const currLocation = location;
      currLocation[isUserLookingForPoint] = evt.latlng;
      setLocation(currLocation);
      setIsNavigationPanelOpen(true);
      setIsUserLookingForPoint('');

      const layer = [];
      transformNavPanelLocationIntoMakersArray(currLocation)
        .forEach(marker => layer.push(marker));
      setGroupLayerNavigation(layer);
    }
  };

  return <>
    <div id={styles['map-app']}>
      <Navbar id={styles['map-app-navbar']} expand='lg' >
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
          <button className={styles['navbar-btn']} onClick={() => setIsNavigationPanelOpen(true)}>
            <i className='material-icons' >navigation</i>
          </button>

          <button className={styles['navbar-btn']}>
            <i className='material-icons'>info</i>
          </button>
        </div>

      </Navbar>

      <div id={styles['map-app-container']}>

        {
          isNavigationPanelOpen &&
        <NavigationPanel
          id={styles['map-app-navigation-panel']}
          onClickExit={() => setIsNavigationPanelOpen(false)}
          onClickFrom={() => onSearchingLocaton('from')}
          onClickTo={() => onSearchingLocaton('to')}
          location={location}></NavigationPanel>}

        <LeafletCustomMap
          id={styles.map}
          onMapClick={evt => onChooseLocation(evt)}
          layerGroups={[ layerGroupNavigation ]}></LeafletCustomMap>
      </div>
    </div>
  </>;
};


export default MapPage;
