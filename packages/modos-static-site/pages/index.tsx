/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { Leaflet, ContainerWithMargin } from '../components/index';
import { i18n } from '../libs';

import styles from './index.module.scss';

const Home = props => {
  const hi18n = value => i18n('homepage', value, props.lang);
  const [ sliderActiveIndex, setSliderActiveIndex ] = useState(0);

  return (
    <>
      <div
        id={styles['homepage-title']}
        className={styles.section}
      >
        <p>{hi18n('title')}</p>
      </div>

      <ContainerWithMargin
        id={styles['project-section']}
        className={styles.section}
      >
        <h2>{hi18n('project-title')}</h2>
        <ReactMarkdown>{hi18n('project-description')}</ReactMarkdown>
        <Button id={styles['project-link']} className={styles['btn-primary']}>
          {hi18n('project-link-descr')}
        </Button>
      </ContainerWithMargin>

      <div id={styles['map-section']}>
        <p>{hi18n('discover-map')}</p>
      </div>

      <Container
        id={styles['contribute-section']}
        className={styles.section}
        fluid
      >
        <Row>
          <Col md={0} lg={1}></Col>
          <Col>
            <h2>{hi18n('contribute-title')}</h2>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
        <Row className={styles['contribute-desktop-flow']}>
          <img alt='' src='./assets/desktop/home-schema-desktop.svg'></img>
          <div>
            <p>{hi18n('contribute-schema-1')}</p>
            <p>{hi18n('contribute-schema-2')}</p>
            <p>{hi18n('contribute-schema-3')}</p>
          </div>
        </Row>
        <Row className={styles['contribute-mobile-flow']}>
          <Col className={styles['contribute-mobile-flow-col']}>
            <Carousel
              className={styles['custom-carousel']}
              interval={null}
              indicators={false}
              wrap={false}
              controls={false}
              activeIndex={sliderActiveIndex}
              onSelect={event => {
                setSliderActiveIndex(event);
              }}
            >
              <Carousel.Item className={styles['custom-carousel-item']}>
                <img
                  className='d-block w-100'
                  src='./assets/mobile/home-schema-part01-mobile.svg'
                  alt='First slide'
                />
                <Carousel.Caption
                  className={styles['custom-carousel-item-caption']}
                >
                  <p>
                    {hi18n('contribute-schema-1')}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className={styles['custom-carousel-item']}>
                <img
                  className='d-block w-100'
                  src='./assets/mobile/home-schema-part02-mobile.svg'
                  alt='Third slide'
                />

                <Carousel.Caption
                  className={styles['custom-carousel-item-caption']}
                >
                  <p>
                    {hi18n('contribute-schema-2')}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className={styles['custom-carousel-item']}>
                <img
                  className='d-block w-100'
                  src='./assets/mobile/home-schema-part03-mobile.svg'
                  alt='Third slide'
                />

                <Carousel.Caption
                  className={styles['custom-carousel-item-caption']}
                >
                  <p>
                    {hi18n('contribute-schema-3')}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <div className={styles['custom-carousel-indicators']}>
              <a onClick={() => setSliderActiveIndex(0)}>
                <div className={`${styles['custom-carousel-indicator']} ${
                  sliderActiveIndex === 0 ? styles.active : ''
                }`}></div>
              </a>
              <a onClick={() => setSliderActiveIndex(1)}>
                <div className={`${styles['custom-carousel-indicator']} ${
                  sliderActiveIndex === 1 ? styles.active : ''
                }`}></div>
              </a>
              <a onClick={() => setSliderActiveIndex(2)}>
                <div
                  className={`${styles['custom-carousel-indicator']} ${
                    sliderActiveIndex === 2 ? styles.active : ''
                  }`}
                ></div>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={0} lg={1}></Col>
          <Col className={styles['contribute-description']}>
            <p>{hi18n('contribute-description')}</p>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
      </Container>

      <ContainerWithMargin
        id={styles['contribute-action']}
        className={styles.section}
      >
        <Container fluid>
          <Row>
            <Col className={styles['contribute-action-items']}>
              <div className={styles['contribute-action-item']}>
                <div className={styles['contribute-action-item-pic']}>
                  <img alt='' src='./assets/home-explore.svg'></img>
                </div>
                <h3>{hi18n('contribute-explore-title')}</h3>
                <p>{hi18n('contribute-explore-description')}</p>
              </div>
              <div className={styles['contribute-action-item']}>
                <div className={styles['contribute-action-item-pic']}>
                  <img alt='' src='./assets/home-analyse.svg'></img>
                </div>
                <h3>{hi18n('contribute-analyze-title')}</h3>
                <p>{hi18n('contribute-analyze-description')}</p>
              </div>
              <div className={styles['contribute-action-item']}>
                <div className={styles['contribute-action-item-pic']}>
                  <img alt='' src='./assets/home-evaluation.svg'></img>
                </div>
                <h3>{hi18n('contribute-review-title')}</h3>
                <p>{hi18n('contribute-review-description')}</p>
              </div>
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

      <ContainerWithMargin></ContainerWithMargin>
    </>
  );
};
export default Home;
