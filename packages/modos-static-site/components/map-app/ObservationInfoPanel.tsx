import React from 'react';
import { IObservation } from '../../libs/modos-api';
import { Navbar } from 'react-bootstrap';

interface IProps {
  id?: string;
  className?: string;
  observation: IObservation;
  onClickExit: (evt: any) => void;
}

export const ObservationInfoPanel = (props: IProps) =>
  <div id={props.id} className={props.className}>
    <Navbar expand='lg' >

      <div className='mr-auto'></div>

      <div>
        <button onClick={evt => props.onClickExit(evt)} className='navbar-btn'>
          <i className='material-icons'>close</i>
        </button>
      </div>

    </Navbar>
    
    <img src={props.observation.image} />
    <h1>Observation N° {props.observation._id}</h1>
    <p>{props.observation.description.freeText}</p>
  </div>
  ;
