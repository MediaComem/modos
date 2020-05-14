import React from 'react';

import { Leaflet, Section, Button, Grid, Cell } from '../components/index';
import { i18n } from '../libs';

import styles from './index.module.scss';

const Home = (props) =>
  <>
    <Section>
      <p
        id={styles['homepage-title']}
      >
        {i18n('homepage', 'title', props.lang)}
      </p>
    </Section>
    <Section>
      <h2>{i18n('homepage', 'project-title', props.lang)}</h2>
      <p>{i18n('homepage', 'project-description', props.lang)}</p>
    </Section>
    <Section>
      <h2>{i18n('homepage', 'contribute-title', props.lang)}</h2>
      <p>{i18n('homepage', 'contribute-description', props.lang)}</p>

    </Section>
    <Section>

    </Section>
    <Section>
      <Leaflet id='leaflet-map'></Leaflet>
    </Section>
  </>
;
export default Home;
