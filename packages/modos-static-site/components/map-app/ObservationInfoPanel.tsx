import React from 'react';
import { API_URL, IObservation, OBSTACLES_TYPE } from '../../libs/modos-api';
import { Navbar } from 'react-bootstrap';

import styles from './map.module.scss';
import { useI18N } from '../../libs';

interface IProps {
  id?: string;
  className?: string;
  observation: IObservation;
  onClickExit: (evt: any) => void;
}

export const ObservationInfoPanel = (props: IProps) => {
  const i18n = useI18N('map');

  const { id, description, image, owner } = props.observation;
  return (
    <div id={props.id} className={`${styles.observations} ${props.className}`}>
      <Navbar expand='lg'>
        <div className='mr-auto'></div>

        <div>
          <button
            onClick={evt => props.onClickExit(evt)}
            className={styles['navbar-btn']}>
            <i className='material-icons'>close</i>
          </button>
        </div>
      </Navbar>

      <div className={styles.infos}>
        <div className={styles['infos-details']}>
          <h3>Observation N°{id}</h3>
          <figure>
            <img
              className='img-fluid'
              src={`${API_URL}${image.apiLink}`}
              alt={image.basename}
            />
            <figcaption>{description.freeText}</figcaption>
          </figure>
        </div>

        <div className={styles['infos-owner']}>
          {owner ? `Publié par ${owner.pseudonym}` : 'Publicateur inconnu'}
        </div>

        <div className={styles['infos-category']}>
          <div>
            <div>{i18n(description.obstacle)}</div>
            <div>
              {description.obstacle !== OBSTACLES_TYPE.UNLABELLED &&
                description.obstacle !== OBSTACLES_TYPE.NOPROBLEM && (
                  <img src={`/assets/${description.obstacle}-icon.png`} />
                )}
            </div>
          </div>
          <div className={styles['infos-category-impact']}>
            <div>Impact</div>
            <div>{description.impact}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
