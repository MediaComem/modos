/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import {
  ContainerWithMargin,
  CardsModosContainer,
  ISliderItemModos,
  SliderModosContainer
} from '../components/index';
import { useI18N } from '../libs';

import styles from './index.module.scss';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

const Home = () => {
  const i18n = useI18N('homepage');

  const CONTRIBUTE_SCHEMA_CAROUSEL: ISliderItemModos[] = [
    {
      caption: i18n('contribute-schema-1'),
      imgAlt: '',
      imgSrc: require('../images/mobile/home-schema-part01-mobile.png?inline')
    },
    {
      caption: i18n('contribute-schema-2'),
      imgAlt: '',
      imgSrc: require('../images/mobile/home-schema-part02-mobile.png?inline')
    },
    {
      caption: i18n('contribute-schema-3'),
      imgAlt: '',
      imgSrc: require('../images/mobile/home-schema-part03-mobile.png?inline')
    }
  ];

  const ACTIONS = [
    {
      imgSrc: require('../images/home-explore.svg?inline'),
      imgAlt: '',
      title: i18n('contribute-explore-title'),
      description: i18n('contribute-explore-description')
    },
    {
      imgSrc: require('../images/home-analyse.svg?inline'),
      imgAlt: '',
      title: i18n('contribute-analyze-title'),
      description: i18n('contribute-analyze-description')
    },
    {
      imgSrc: require('../images/home-evaluation.svg?inline'),
      imgAlt: '',
      title: i18n('contribute-review-title'),
      description: i18n('contribute-review-description')
    }
  ];

  return (
    <>
      <NextSeo
        title='Home'
        description='Améliorer la mobilité douce des seniors au quotidien'
        canonical='https://modos.heig-vd.ch'
        openGraph={{
          url: 'https://modos.heig-vd.ch',
          title: 'modos homepage',
          description: 'Améliorer la mobilité douce des seniors au quotidien'
        }}
      />

      <div id={styles['homepage-title']} className={styles.section}>
        {/*
        To uncomment when we will need translation on homepage
        <p>{hi18n('title')}</p>
        */}
      </div>

      <ContainerWithMargin
        id={styles['project-section']}
        className={styles.section}
        rowClassName={styles['project-section-row']}
        mainColClassName={styles['project-section-col']}>
        <h2>{i18n('project-title')}</h2>
        <ReactMarkdown>{i18n('project-description')}</ReactMarkdown>
        <Link href='/about'>
          <Button id={styles['project-link']} className={styles['btn-secondary']}>
            {i18n('project-link-descr')}
          </Button>
        </Link>
        <Link href='/about#about-publications'>
          <Button id={styles['project-link']} className={styles['btn-secondary-neg']}>
            {i18n('project-link-publications')}
          </Button>
        </Link>
      </ContainerWithMargin>

      <div id={styles['map-section']}>
        <Link href={'/map'}>
          <a>{i18n('discover-map')}</a>
        </Link>
      </div>

      <Container
        id={styles['contribute-section']}
        className={styles.section}
        fluid>
        <Row>
          <Col md={0} lg={1}></Col>
          <Col>
            <h2>{i18n('contribute-title')}</h2>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
        <Row>
          <Col md={0} lg={1}></Col>
          <Col className={styles['contribute-description']}>
            <p>{i18n('contribute-description')}</p>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
        <Row className={styles['contribute-desktop-flow']}>
          <img
            className='lazyload'
            alt='Schema describing how modos work'
            data-src={require('../images/desktop/home-schema-desktop.png')}></img>
          <div>
            <p>{i18n('contribute-schema-1')}</p>
            <p>{i18n('contribute-schema-2')}</p>
            <p>{i18n('contribute-schema-3')}</p>
          </div>
        </Row>
        <Row className={styles['contribute-mobile-flow']}>
          <Col className={styles['contribute-mobile-flow-col']}>
            <SliderModosContainer
              carouselCaptionClassName={
                styles['contribute-mobile-carousel-caption']
              }
              items={CONTRIBUTE_SCHEMA_CAROUSEL}></SliderModosContainer>
          </Col>
        </Row>
      </Container>

      <ContainerWithMargin
        id={styles['contribute-action']}
        className={styles.section}>
        <Container fluid>
          <Row>
            <Col>
              <CardsModosContainer cards={ACTIONS}></CardsModosContainer>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={4}></Col>
            <Col sm={12} lg={4}>
              <Link href='#contact'>
                <Button className={styles['btn-primary']}>
                  {i18n('contribute-link-descr')}
                </Button>
              </Link>
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
