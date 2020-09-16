import React from 'react';
import { IObservation } from '../../libs/modos-api';
import { Navbar } from 'react-bootstrap';

import styles from './map.module.scss';

interface IProps {
  id?: string;
  className?: string;
  observation: IObservation;
  onClickExit: (evt: any) => void;
}

export const ObservationInfoPanel = (props: IProps) =>
  <div id={props.id} className={props.className}>
    <Navbar expand='lg'>
      <div className='mr-auto'></div>

      <div>
        <button
          onClick={evt => props.onClickExit(evt)}
          className={styles['navbar-btn']}
        >
          <i className='material-icons'>close</i>
        </button>
      </div>
    </Navbar>

    <img src={props.observation.image} />
    {/* eslint-disable-next-line no-underscore-dangle*/}
    <h3>Observation N° {props.observation._id}</h3>
    <p>{props.observation.description.freeText}</p>
  </div>
;
