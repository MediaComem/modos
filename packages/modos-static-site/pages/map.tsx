import React, { useState } from 'react';

import { Leaflet } from '../components/index';
import { Navbar, Button, Form, InputGroup, FormControl } from 'react-bootstrap';

import styles from './map.module.scss';
import { LeafletMouseEvent, LatLng, Marker, LayerGroup } from 'leaflet';

interface IPropsNavPanel {
  location: INavPanelLocation;
  onClickExit: any;
  onClickTo: any;
  onClickFrom: any;
}

interface INavPanelLocation {
  to: LatLng;
  from: LatLng;
}

const transformNavPanelLocationIntoMakersArray = (panelLocations: INavPanelLocation) => {
  const arrayMarkers = [];

  for (const key in panelLocations) {
    if (panelLocations[key]) {
      arrayMarkers.push([
        panelLocations[key].lat, panelLocations[key].lng
      ]);
    }
  }

  return arrayMarkers;
};

const NavigationPanel = ({ location, onClickExit, onClickTo, onClickFrom }: IPropsNavPanel) => <div id={styles['map-app-navigation-panel']}>
  <Navbar id={styles['map-app-navbar']} expand='lg' >

    <div className='mr-auto'></div>

    <div>
      <button onClick={e => onClickExit(e)} className={styles['navbar-btn']}>
        <i className='material-icons'>close</i>
      </button>
    </div>

  </Navbar>

  <Form>
    <Form.Group controlId='nav-from'>
      <Form.Label>Depart</Form.Label>

      <InputGroup className='mb-3'>
        <FormControl type='text' name='nav-from'/>
        <InputGroup.Append>
          <Button variant='outline-secondary' className='material-icons' onClick={e => onClickFrom(e)}>
            my_location
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {location.from &&
        <Form.Text>Current selected location: {location.from.lat};{location.from.lng}</Form.Text>}
    </Form.Group>

    <Form.Group controlId='nav-to'>
      <Form.Label>Arrivee</Form.Label>

      <InputGroup className='mb-3'>
        <FormControl type='text' name='nav-to'/>
        <InputGroup.Append>
          <Button variant='outline-secondary' className='material-icons' onClick={e => onClickTo(e)}>
            my_location
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {location.to &&
        <Form.Text>Current selected location: {location.to.lat};{location.to.lng}</Form.Text>}
    </Form.Group>

    <Button type='submit'>GO !</Button>
  </Form>
</div>;

const MapPage = () => {
  const [ isNavigationPanelOpen, setIsNavigationPanelOpen ] = useState(false);
  const [ isUserLookingForPoint, setIsUserLookingForPoint ] = useState('');
  const [ location, setLocation ] = useState({ to: null, from: null });
  const [ layerGroupNavigation, setGroupLayerNavigation ] = useState([]);

  const onSearchingLocaton = point => {
    setIsNavigationPanelOpen(false);
    setIsUserLookingForPoint(point);
  };

  const onChooseLocation = (e: LeafletMouseEvent) => {
    if (isUserLookingForPoint !== '') {
      const currLocation = location;
      currLocation[isUserLookingForPoint] = e.latlng;
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
          onClickExit={() => setIsNavigationPanelOpen(false)}
          onClickFrom={() => onSearchingLocaton('from')}
          onClickTo={() => onSearchingLocaton('to')}
          location={location}></NavigationPanel>}

        <Leaflet
          id={styles.map}
          onMapClick={e => onChooseLocation(e)}
          layerGroups={[ layerGroupNavigation ]}></Leaflet>
      </div>
    </div>
  </>;
};


export default MapPage;
