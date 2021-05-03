/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-require-imports */
import { LatLng, LeafletMouseEvent } from 'leaflet';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  GeoJSON,
  LayersControl,
  Map,
  TileLayer /* , WMSTileLayer */,
  Viewport
} from 'react-leaflet';
import { useI18N } from '../../libs';
//import { i18n } from '../../libs';
import {
  IMapnvFeature,
  translateSwissGridCoordinateToLatLng
} from '../../libs/mapnv-api';
import {
  getEvents,
  getItineraryForProfile,
  OBSTACLES_TYPE
} from '../../libs/modos_api';
import { LeafletCustomControl } from './LeafletCustomControl';
import styles from './map.module.scss';
import { MapNavbar } from './MapNavbar';
import MapnvAccessibilityLayer from './MapnvAccessibilityLayer';
import ModosFootpathLayer from './ModosFootpathLayer';
import { NavigationPanel } from './NavigationPanel';
import { NavLayerGroup } from './NavLayerGroup';
import { ObservationInfoPanel } from './ObservationInfoPanel';
import ObservationsLayerGroup from './ObservationsLayerGroup';

enum SEARCHED_POINT {
  FROM = 'from',
  TO = 'to',
  NOT_SEARCHING = ''
}

const ModosMap = () => {
  // ------------ ROUTING QUERY PARAM MANAGEMENT
  const router = useRouter();

  // ------------ STATE DECLARATION
  const [displayNavPanel, setDisplayNavPanel] = useState(false);
  const [currentSearchedPoint, setCurrentSearchedPoint] = useState(
    SEARCHED_POINT.NOT_SEARCHING
  );
  const [navPanelLocation, setNavPanelLocation] = useState({
    from: null,
    to: null,
    profile: "",
  });
  const [itinerarySpeed, setItinerarySpeed] = useState({
    generatedDate: Date.now(), // We need a generated date to force react-leaflet to re-render the geojson
    geojson: null
  });
  const [itineraryEasy, setItineraryEasy] = useState({
    generatedDate: Date.now(), // We need a generated date to force react-leaflet to re-render the geojson
    geojson: null
  });
  const [displayObservationPanel, setDisplayObersvationPanel] = useState(false);
  const [currentSelectedObservation, setCurrentSelectedObservation] = useState(
    undefined
  );
  const [eventID, setEventID] = useState(undefined);

  const [hasInitMapPos, setHasInitMapPos] = useState(false);
  const [mapPosition, setMapPos] = useState(new LatLng(46.7833, 6.65));
  const [mapZoom, setMapZoom] = useState(15);
  const [distancesGetted, setDistancesGetted] = useState({
    kmSpeed: -1.0,
    kmEasy: -1.0
  })

  /**
   * Will change the url and keep already existing param
   * @param newParams
   */
  const managePageURL = async (newParams: {
    newMapLat?: any;
    newMapLng?: any;
    newMapZoom?: any;
    newObservationID?: any;
  }) => {
    const { newMapLat, newMapLng, newMapZoom, newObservationID } = newParams;
    await router.replace(
      {
        pathname: '/map',
        query: {
          mapLat: newMapLat || router.query.mapLat || undefined,
          mapLng: newMapLng || router.query.mapLng || undefined,
          mapZoom: newMapZoom || router.query.mapZoom || undefined,
          observationID:
            (newObservationID ?? router.query.observationID) || undefined
        }
      },
      undefined,
      {
        shallow: true
      }
    );
  };

  // ------------ APP INIT
  useEffect(() => {
    const {
      mapLat: paramMapLat,
      mapLng: paramMapLng,
      mapZoom: paramMapZoom
    } = router.query;

    if (!hasInitMapPos && paramMapLat && paramMapLng && mapZoom) {
      setMapPos(
        new LatLng(
          Number.parseFloat(paramMapLat as string),
          Number.parseFloat(paramMapLng as string)
        )
      );
      setMapZoom(Number.parseInt(paramMapZoom as string, 10));
      setHasInitMapPos(true);
    }
  }, [router.query.mapLat, router.query.mapLng, router.query.mapZoom]);

  // ------------ EVENT MANAGEMENT FOR NAVIGATION PANEL

  const onSearchingLocation = (
    point: SEARCHED_POINT.FROM | SEARCHED_POINT.TO
  ) => {
    setDisplayNavPanel(false);
    setCurrentSearchedPoint(point);
  };

  const onChooseLocationOnMap = (evt: LeafletMouseEvent) => {
    if (currentSearchedPoint !== '') {
      const currLocation = navPanelLocation;
      currLocation[currentSearchedPoint] = evt.latlng;
      setNavPanelLocation({ ...navPanelLocation, ...currLocation });
      setDisplayNavPanel(true);
      setCurrentSearchedPoint(SEARCHED_POINT.NOT_SEARCHING);
    }
  };

  const onChooseLocationByText = (evt: IMapnvFeature, point: string) => {
    const currLocation = navPanelLocation;
    currLocation[point] = translateSwissGridCoordinateToLatLng(evt);
    setNavPanelLocation({ ...navPanelLocation, ...currLocation });
  };

  const onChangeValue = (e, field: string) => {
    const currLocation = navPanelLocation;
    currLocation[field] = e.target.value;
    setNavPanelLocation({ ...navPanelLocation, ...currLocation });
  };

  const onSubmitLocation = (evt: Event) => {
    evt.preventDefault();

    const currLocation = navPanelLocation;
    getItineraryForProfile(
      [currLocation.from.lat, currLocation.from.lng],
      [currLocation.to.lat, currLocation.to.lng],
      currLocation.profile,
      [1,5,20,100,100000]
    )
      .then(result =>{
          var total = 0.0;
          result.features.forEach(element => {
            var g = element.geometry.coordinates;
            total+=calcCrow(g[0][0],g[0][1],g[1][0],g[1][1]);
          });
          const dist = distancesGetted;
          dist['kmSpeed'] = total;
          setDistancesGetted({ ...distancesGetted, ...dist });
          setItinerarySpeed({ generatedDate: Date.now(), geojson: result });
        }
      )
      .catch(err => console.error(err));

    getItineraryForProfile(
      [currLocation.from.lat, currLocation.from.lng],
      [currLocation.to.lat, currLocation.to.lng],
      currLocation.profile,
      [200,300,500,750,100000]
    )
      .then(result =>{
        var total = 0.0;
          result.features.forEach(element => {
            var g = element.geometry.coordinates;
            total+=calcCrow(g[0][0],g[0][1],g[1][0],g[1][1]);
          });
          const dist = distancesGetted;
          dist['kmEasy'] = total;
          setDistancesGetted({ ...distancesGetted, ...dist });
          setItineraryEasy({ generatedDate: Date.now(), geojson: result })
        }
      )
      .catch(err => console.error(err));
  };

  // ------------- EVENT MANAGEMENT FOR OBSERVATION PANEL

  const onObservationClick = async observation => {
    setCurrentSelectedObservation(observation);
    setDisplayObersvationPanel(true);
    await managePageURL({
      newObservationID: observation.id
    });
  };

  const onObservationInfoPanelExit = async () => {
    setCurrentSelectedObservation(null);
    setDisplayNavPanel(false);
    await managePageURL({
      newObservationID: 0
    });
  };

  // ------------- EVENT MANAGEMENT FOR THE MAP

  const onViewportChanged = async (viewport: Viewport) => {
    setHasInitMapPos(true);
    await managePageURL({
      newMapLat: viewport.center[0],
      newMapLng: viewport.center[1],
      newMapZoom: viewport.zoom
    });
  };

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  function calcCrow(lat1, lon1, lat2, lon2) 
  {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var rLat1 = toRad(lat1);
    var rLat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) 
  {
      return Value * Math.PI / 180;
  }

  // ------------- RENDERED COMPONENT
  return (
    <div id={styles['map-app']}>
      <MapNavbar
        onClickToggleNavPanel={() => setDisplayNavPanel(!displayNavPanel)}
      />

      <div id={styles['map-app-container']}>
        {displayNavPanel && (
          <NavigationPanel
            id={styles['map-app-navigation-panel']}
            onClickExit={() => setDisplayNavPanel(false)}
            onClickFrom={() => onSearchingLocation(SEARCHED_POINT.FROM)}
            onClickTo={() => onSearchingLocation(SEARCHED_POINT.TO)}
            onChooseFrom={evt => onChooseLocationByText(evt, SEARCHED_POINT.FROM)}
            onChooseTo={evt => onChooseLocationByText(evt, SEARCHED_POINT.TO)}
            onProfileChange={evt => onChangeValue(evt, "profile")}
            onSubmitLocation={evt => onSubmitLocation(evt)}
            distances={distancesGetted} 
            location={navPanelLocation}></NavigationPanel>
        )}

        {displayObservationPanel && currentSelectedObservation && (
          <ObservationInfoPanel
            id={styles['map-app-observation-panel']}
            observation={currentSelectedObservation}
            onClickExit={() => onObservationInfoPanelExit()}
          />
        )}

        <Map
          id={styles.map}
          center={mapPosition}
          zoom={mapZoom}
          maxZoom={30}
          onclick={onChooseLocationOnMap}
          onViewportChanged={onViewportChanged}>
          <LayersControl position='bottomleft'>
            <LayersControl.BaseLayer checked name='Carte'>
              <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name='Satellite'>
              <TileLayer
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay name='Observations' checked={true}>
              <ObservationsLayerGroup
                eventID={eventID}
                onObservationClick={onObservationClick}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name='Réseau pédestre' checked={true}>
              <ModosFootpathLayer />
            </LayersControl.Overlay>

            {/* Bellow are layer and control for navigation, don't remove it */}

            <LayersControl.Overlay
              name='Marqueurs de navigation'
              checked={true}>
              <NavLayerGroup
                from={navPanelLocation.from}
                to={navPanelLocation.to}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name='Itineraire rapide' checked={true}>
              {itinerarySpeed?.geojson && (
                <GeoJSON
                  key={itinerarySpeed.generatedDate}
                  data={itinerarySpeed.geojson}
                />
              )}
            </LayersControl.Overlay>

            <LayersControl.Overlay name='Itineraire facile' checked={true}>
              {itineraryEasy?.geojson && (
                <GeoJSON
                  key={itineraryEasy.generatedDate}
                  data={itineraryEasy.geojson}
                  style={{'color': 'red'}}
                />
              )}
            </LayersControl.Overlay>

            {/* Bellow are control any layer for accessibility, don't remove it */}

            <LayersControl.Overlay name='Accessibilité' checked={false}>
              <MapnvAccessibilityLayer />
            </LayersControl.Overlay>
          </LayersControl>

          <Events onChange={eEventID => setEventID(eEventID)} />

          <Legends />
        </Map>
      </div>
    </div>
  );
};

export default ModosMap;

const Legends = () => {
  const i18n = useI18N('map');
  return (
    <LeafletCustomControl
      id={styles['map-legends']}
      className={styles['map-legends']}
      position='bottomright'>
      {Object.values(OBSTACLES_TYPE).map(
        type =>
          type !== OBSTACLES_TYPE.UNLABELLED &&
          type !== OBSTACLES_TYPE.NOPROBLEM && (
            <div key={type}>
              <img src={`/assets/${type}-icon.png`} />
              <span>{i18n(type)}</span>
            </div>
          )
      )}
    </LeafletCustomControl>
  );
};

const Events = (props: any) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then(result => {
        setEvents(result);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <LeafletCustomControl id='map-events' position='topright'>
      {events && events.length > 0 && (
        <Form.Control
          onChange={event => props.onChange(event.target.value)}
          as='select'
          size='sm'
          custom
          placeholder='Evénements'>
          <option value=''>Choisissez un événement</option>
          {events?.map(event => (
            <option value={event.id} key={event.id}>
              {event.title}
            </option>
          ))}
        </Form.Control>
      )}
    </LeafletCustomControl>
  );
};
