import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Leaflet, Section } from '../components/index';
import { i18n } from '../libs';

import styles from './index.module.scss';

const Home = props => {
  const hi18n = value => i18n('homepage', value, props.lang);

  return (
    <>
      <Container fluid id={styles['homepage-title']} className={styles.section}>
        <Row>
          <Col>
            <p >{hi18n('title')}</p>
          </Col>
        </Row>
      </Container>

      <Container fluid id={styles['project-section']} className={styles.section}>
        <Row>
          <Col>
            <h2>{hi18n('project-title')}</h2>
            <p>{hi18n('project-description')}</p>
            <Button id={styles['project-link']} className={styles['btn-primary']}>
              {hi18n('project-link-descr')}
            </Button>
          </Col>
        </Row>
      </Container>

      <div id={styles['map-section']}>
        <Leaflet id='leaflet-map'></Leaflet>
      </div>

      <Container fluid id={styles['contribute-section']} className={styles.section}>
        <Row>
          <Col>
            <h2>{hi18n('contribute-title')}</h2>
            <p>{hi18n('contribute-description')}</p>
          </Col>
        </Row>
      </Container>

      <Section id={styles['contribute-action']} className={styles.section}>
        {/* <Grid columns={1} rows={4} gap='3%' id={styles['contribute-action-grid']}>
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
        </Grid> */}
      </Section>
    </>
  );
};
export default Home;
