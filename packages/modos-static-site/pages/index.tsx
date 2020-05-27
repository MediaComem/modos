/* eslint-disable max-lines-per-function */
import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown>{hi18n('project-description')}</ReactMarkdown>
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

      <Container
        id={styles['contribute-section']}
        className={styles.section}
        fluid>
        <Row>
          <Col md={0} lg={1}></Col>
          <Col>
            <h2>{hi18n('contribute-title')}</h2>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
        <Row className={styles['contribute-desktop-flow']}>0</Row>
        <Row className={styles['contribute-mobile-flow']}>
          <Col>
            <Carousel className={styles['custom-carousel']} interval={null} indicators={false}>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='https://via.placeholder.com/300'
                  alt='First slide'
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='https://via.placeholder.com/300'
                  alt='Third slide'
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='https://via.placeholder.com/300'
                  alt='Third slide'
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col md={0} lg={1}></Col>
          <Col>
            <p>{hi18n('contribute-description')}</p>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
      </Container>

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
