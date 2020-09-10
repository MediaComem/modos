/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-require-imports */
import { LatLng, LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { Map, TileLayer, GeoJSON as GeoJSONLayer } from 'react-leaflet';
import {
  IMapnvFeature,
  translateSwissGridCoordinateToLatLng
} from '../../libs/mapnv-api';
import { getSimpleItinerary } from '../../libs/modos-api';
import { MapNavbar } from './MapNavbar';
import { NavigationPanel } from './NavigationPanel';
import ObservationsLayerGroup from './ObservationsLayerGroup';
import { ObservationInfoPanel } from './ObservationInfoPanel';

// import scss
import styles from './map.module.scss';
import { NavLayerGroup } from './NavLayerGroup';

const ModosMap = () => {
  const [ displayNavPanel, setDisplayNavPanel ] = useState(false);
  const [ currentSearchedPoint, setCurrentSearchedPoint ] = useState('');
  const [ navPanelLocation, setNavPanelLocation ] = useState({
    from: null,
    to: null
  });
  const [ itinerary, setItinerary ] = useState({
    generatedDate: Date.now(),
    geojson: null
  });
  const [ displayObservationPanel, setDisplayObersvationPanel ] = useState(false);
  const [ currentSelectedObservation, setCurrentSelectedObservation ] = useState(
    undefined
  );

  const START_POSITION = new LatLng(46.7833, 6.65);

  // ------------ EVENT MANAGEMENT FOR NAVIGATION PANEL

  const onSearchingLocation = (point: 'from' | 'to') => {
    setDisplayNavPanel(false);
    setCurrentSearchedPoint(point);
  };

  const onChooseLocationOnMap = (evt: LeafletMouseEvent) => {
    if (currentSearchedPoint !== '') {
      const currLocation = navPanelLocation;
      currLocation[currentSearchedPoint] = evt.latlng;
      setNavPanelLocation({ ...navPanelLocation, ...currLocation });
      setDisplayNavPanel(true);
    }
  };

  const onChooseLocationByText = (evt: IMapnvFeature, point: string) => {
    const currLocation = navPanelLocation;
    currLocation[point] = translateSwissGridCoordinateToLatLng(evt);
    setNavPanelLocation({ ...navPanelLocation, ...currLocation });
  };

  const onSubmitLocation = (evt: Event) => {
    evt.preventDefault();

    const currLocation = navPanelLocation;
    getSimpleItinerary(
      [ currLocation.from.lat, currLocation.from.lng ],
      [ currLocation.to.lat, currLocation.to.lng ]
    )
      .then(result =>
        setItinerary({ generatedDate: Date.now(), geojson: result }))
      .catch(err => console.error(err))
      .finally(() => setDisplayNavPanel(false));
  };

  // ------------- EVENT MANAGEMENT FOR OBSERVATION PANEL

  const onObservationClick = observation => {
    setCurrentSelectedObservation(observation);
    setDisplayObersvationPanel(true);
  };

  const onObservationInfoPanelExit = () => {
    setCurrentSelectedObservation(null);
    setDisplayNavPanel(false);
  };

  return (
    <div id={styles['map-app']}>
      <MapNavbar
        onClickToggleNavPanel={() => setDisplayNavPanel(!displayNavPanel)}
      />

      <div id={styles['map-app-container']}>
        {displayNavPanel &&
          <NavigationPanel
            id={styles['map-app-navigation-panel']}
            onClickExit={() => setDisplayNavPanel(false)}
            onClickFrom={() => onSearchingLocation('from')}
            onClickTo={() => onSearchingLocation('to')}
            onChooseFrom={evt => onChooseLocationByText(evt, 'from')}
            onChooseTo={evt => onChooseLocationByText(evt, 'to')}
            onSubmitLocation={evt => onSubmitLocation(evt)}
            location={navPanelLocation}
          ></NavigationPanel>
        }

        {displayObservationPanel && currentSelectedObservation &&
          <ObservationInfoPanel
            id={styles['map-app-observation-panel']}
            observation={currentSelectedObservation}
            onClickExit={evt => onObservationInfoPanelExit()}
          />
        }

        <Map
          id={styles.map}
          center={START_POSITION}
          zoom={13}
          onclick={onChooseLocationOnMap}
        >
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <ObservationsLayerGroup onObservationClick={onObservationClick} />

          {navPanelLocation.from && navPanelLocation.to &&
            <NavLayerGroup
              from={navPanelLocation.from}
              to={navPanelLocation.to}
            />
          }

          {itinerary?.geojson &&
            <GeoJSONLayer
              key={itinerary.generatedDate}
              data={itinerary.geojson}
            />
          }
        </Map>
      </div>
    </div>
  );
};

export default ModosMap;
