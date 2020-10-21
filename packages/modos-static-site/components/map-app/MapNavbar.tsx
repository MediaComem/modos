import React from 'react';
import { Navbar } from 'react-bootstrap';

import styles from './map.module.scss';

interface IProps {
  onClickToggleNavPanel: () => void;
}

export const MapNavbar = (props: IProps) => (
  <Navbar id={styles['map-app-navbar']} expand='lg'>
    <Navbar.Brand href='/'>
      <img
        src={require('../../images/logo.svg')}
        width='30'
        height='30'
        className='d-inline-block align-top'
        alt='MoDos Logo'
      />
    </Navbar.Brand>

    <div className='mr-auto'></div>

    <div>
      {/* Navigation is desactivated for now... */}
      {/* <button
      className={styles['navbar-btn']}
      onClick={() => props.onClickToggleNavPanel()}
    >
      <i className='material-icons'>navigation</i>
    </button> */}
    </div>
  </Navbar>
);
