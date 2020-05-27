import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Leaflet, ContainerWithMargin } from '../components/index';
import { i18n } from '../libs';

import styles from './index.module.scss';

const Home = props => {
  const hi18n = value => i18n('homepage', value, props.lang);

  return (
    <>
      <ContainerWithMargin id={styles['homepage-title']} className={styles.section}>
        <p>{hi18n('title')}</p>
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['project-section']}
        className={styles.section}
      >
        <h2>{hi18n('project-title')}</h2>
        <p>{hi18n('project-description')}</p>
        <Button
          id={styles['project-link']}
          className={styles['btn-primary']}
        >
          {hi18n('project-link-descr')}
        </Button>
      </ContainerWithMargin>

      <div id={styles['map-section']}>
        <Leaflet id='leaflet-map'></Leaflet>
      </div>

      <ContainerWithMargin
        id={styles['contribute-section']}
        className={styles.section}>
        <h2>{hi18n('contribute-title')}</h2>
        <p>{hi18n('contribute-description')}</p>
      </ContainerWithMargin>

      <ContainerWithMargin id={styles['contribute-action']} className={styles.section}>
        <Container fluid >
          <Row>
            <Col sm={12} lg={4}>
              <h3>{hi18n('contribute-explore-title')}</h3>
              <p>{hi18n('contribute-explore-description')}</p>
            </Col>
            <Col sm={12} lg={4}>
              <h3>{hi18n('contribute-analyze-title')}</h3>
              <p>{hi18n('contribute-analyze-description')}</p>
            </Col>
            <Col sm={12} lg={4}>
              <h3>{hi18n('contribute-review-title')}</h3>
              <p>{hi18n('contribute-review-description')}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={4}></Col>
            <Col sm={12} lg={4}>
              <Button className={styles['btn-primary']}>
                {hi18n('contribute-link-descr')}
              </Button>
            </Col>
            <Col sm={12} lg={4}></Col>
          </Row>
        </Container>
      </ContainerWithMargin>

      <ContainerWithMargin >
      </ContainerWithMargin>
    </>
  );
};
export default Home;
