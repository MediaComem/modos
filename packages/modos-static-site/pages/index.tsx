import React from 'react';

import { Leaflet, Section, Button, Grid, Cell } from '../components/index';
import { i18n } from '../libs';

import styles from './index.module.scss';

const Home = props => {
  const hi18n = value => i18n('homepage', value, props.lang);

  return (
    <>
      <Section>
        <p id={styles['homepage-title']}>{hi18n('title')}</p>
      </Section>

      <Section id={styles['project-section']}>
        <h2>{hi18n('project-title')}</h2>
        <p>{hi18n('project-description')}</p>
        <Button id={styles['project-link']}>
          {hi18n('project-link-descr')}
        </Button>
      </Section>

      <Section>
        <Leaflet id='leaflet-map'></Leaflet>
      </Section>

      <Section id={styles['contribute-section']}>
        <h2>{hi18n('contribute-title')}</h2>
        <p>{hi18n('contribute-description')}</p>
      </Section>

      <Section id={styles['contribute-action']}>
        <Grid columns={1} rows={4} gap='3%' id={styles['contribute-action-grid']}>
          <Cell className={styles.actions}>
            <figure>
              <img src='https://via.placeholder.com/150x150'></img>
            </figure>
            <h3>{hi18n('contribute-explore-title')}</h3>
            <p>{hi18n('contribute-explore-description')}</p>
          </Cell>
          <Cell className={styles.actions}>
            <figure>
              <img src='https://via.placeholder.com/150x150'></img>
            </figure>
            <h3>{hi18n('contribute-analyze-title')}</h3>
            <p>{hi18n('contribute-analyze-description')}</p>
          </Cell>
          <Cell className={styles.actions}>
            <figure>
              <img src='https://via.placeholder.com/150x150'></img>
            </figure>
            <h3>{hi18n('contribute-review-title')}</h3>
            <p>{hi18n('contribute-review-description')}</p>
          </Cell>
          <Cell id={styles['contribute-call-to-action']}>
            <Button>{hi18n('contribute-link-descr')}</Button>
          </Cell>
        </Grid>
      </Section>
    </>
  );
};
export default Home;
