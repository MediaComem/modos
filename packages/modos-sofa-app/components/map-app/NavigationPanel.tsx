import { LatLng } from 'leaflet';
import React from 'react';
import { Button, Form, Navbar, InputGroup } from 'react-bootstrap';
import { GeocodingInput } from './GeocodingInput';
import styles from './map.module.scss';


/**
 * Define the props for NavPanel (Navigation Panel) component
 *
 * id: (optional) HTML id of the component
 * location: contains all the lat/lng points of the different step for the commute
 * onClickExit: Event which occurs when the user clicked on the exit button from the panel
 * onClickTo: Event which occurs when user click on the locate button for the step "to"
 * onClickTo: Event which occurs when user click on the locate button the step "from"
 */
export interface IPropsNavPanel {
  id?: string;
  location: INavPanelLocation;
  onClickExit: any;
  onClickTo: any;
  onClickFrom: any;
  onChooseFrom: any;
  onChooseTo: any;
  onProfileChange: any;
  onSubmitLocation: any;
  distances: any;
}

/**
 * @see IPropsNavPanel -> location proprety
 */
interface INavPanelLocation {
  to: LatLng;
  from: LatLng;
  profile: String;
}

/**
 * Will transform the panelLocation object, which contains all the step and theirs lat/lng
 * in an array which will contains marker. A marker is an array with this structure->[lat, lng]
 * @param panelLocations Step with their lat/lng
 * @returns an array of marker
 */
export const transformNavPanelLocationIntoMakersArray = (panelLocations: INavPanelLocation) => {
  const arrayMarkers: any[] = [];

  for (const key in panelLocations) {
    if (panelLocations[key]) {
      arrayMarkers.push({ coordinate: [
        panelLocations[key].lat, panelLocations[key].lng
      ] });
    }
  }

  return arrayMarkers;
};

/**
 * The NavigationPanel Component
 *
 * This component's job is to allow user to describe his commute and ask for the shorter traject
 * which will be calculated on the backend
 * @param props React props of the object
 * @returns the React component
 */
export const NavigationPanel = (
  {
    id,
    location,
    onClickExit,
    onClickTo,
    onClickFrom,
    onChooseFrom,
    onChooseTo,
    onProfileChange,
    onSubmitLocation,
    distances
  }: IPropsNavPanel
) =>
  <div id={id}>
    <Navbar expand='lg' >

      <div className='mr-auto'></div>

      <div>
        <button onClick={evt => onClickExit(evt)} className={styles['navbar-btn']}>
          <i className='material-icons'>close</i>
        </button>
      </div>

    </Navbar>

    <Form onSubmit={onSubmitLocation}>
      <Form.Group controlId="profile">
        <Form.Label>Mobilité</Form.Label>
        <Form.Control name="profile" as="select" onChange={onProfileChange} >
          <option value="nohelper">Aucune aide</option>
          <option value="cane">Cane</option>
          <option value="walker">Tintébin</option>
          <option value="wheelchair">Chaise roulante</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId='nav-from'>
        <Form.Label>Départ</Form.Label>

        <InputGroup className='mb-3'>
          <GeocodingInput type='text' name='nav-from' onChooseLocation={evt => onChooseFrom(evt)}/>
          <InputGroup.Append>
            <Button variant='outline-secondary' className='material-icons btn_location' onClick={evt => onClickFrom(evt)}>
            my_location
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {location.from &&
        <Form.Text>Current selected location: {location.from.lat};{location.from.lng}</Form.Text>}
      </Form.Group>

      <Form.Group controlId='nav-to'>
        <Form.Label>Arrivée</Form.Label>

        <InputGroup className='mb-3'>
          <GeocodingInput type='text' name='nav-to' onChooseLocation={evt => onChooseTo(evt)}/>
          <InputGroup.Append>
            <Button variant='outline-secondary' className='material-icons btn_location' onClick={evt => onClickTo(evt)}>
            my_location
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {location.to &&
        <Form.Text>Current selected location: {location.to.lat};{location.to.lng}</Form.Text>}
      </Form.Group>

      <Button type='submit'>GO !</Button>
    </Form>
    {distances.kmSpeed && distances.kmSpeed>0 && <div className="itinaryDetails blueLeft">
      <span>Itineraire rapide: </span>
      <span>{Math.round(distances.kmSpeed*100)/100} km</span>
    </div>}
    {distances.kmEasy && distances.kmEasy>0 && <div className="itinaryDetails redLeft">
      <span>Itineraire facile: </span>
      <span>{Math.round(distances.kmEasy*100)/100} km</span>
    </div>}
    <div>
      <span></span>
    </div>
  </div>;