import { LatLng } from 'leaflet';
import React from 'react';
import { Button, Form, Navbar, InputGroup, FormControl } from 'react-bootstrap';


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
}

/**
 * @see IPropsNavPanel -> location proprety
 */
interface INavPanelLocation {
  to: LatLng;
  from: LatLng;
}

/**
 * Will transform the panelLocation object, which contains all the step and theirs lat/lng
 * in an array which will contains marker. A marker is an array with this structure->[lat, lng]
 * @param panelLocations Step with their lat/lng
 * @returns an array of marker
 */
export const transformNavPanelLocationIntoMakersArray = (panelLocations: INavPanelLocation) => {
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

/**
 * The NavigationPanel Component
 *
 * This component's job is to allow user to describe his commute and ask for the shorter traject
 * which will be calculated on the backend
 * @param props React props of the object
 * @returns the React component
 */
export const NavigationPanel = ({ id, location, onClickExit, onClickTo, onClickFrom }: IPropsNavPanel) =>
  <div id={id}>
    <style jsx>
      {`
        .navbar-btn {
          background:none;
          border:none;
        }
      `}
    </style>
    <Navbar expand='lg' >

      <div className='mr-auto'></div>

      <div>
        <button onClick={evt => onClickExit(evt)} className='navbar-btn'>
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
            <Button variant='outline-secondary' className='material-icons' onClick={evt => onClickFrom(evt)}>
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
            <Button variant='outline-secondary' className='material-icons' onClick={evt => onClickTo(evt)}>
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
