/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React from 'react';

import styles from './about.module.scss';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useI18N } from '../libs';
import {
  ContainerWithMargin,
  CardsModosContainer,
  ISliderItemModos,
  SliderModosContainer
} from '../components/index';
import ReactMarkdown from 'react-markdown';
import { NextSeo } from 'next-seo';

const About = () => {
  const i18n = useI18N('about');

  const SLIDER_TECH_SCHEM: ISliderItemModos[] = [
    {
      caption: '',
      imgAlt: '',
      imgSrc: require('../images/mobile/about-schema-part01-mobile.png')
    },
    {
      caption: '',
      imgAlt: '',
      imgSrc: require('../images/mobile/about-schema-part02-mobile.png')
    },
    {
      caption: '',
      imgAlt: '',
      imgSrc: require('../images/mobile/about-schema-part03-mobile.png')
    }
  ];

  const CARDS_COMPETENCES = [
    {
      imgSrc: require('../images/about-digiimgpro.svg'),
      imgAlt: '',
      title: i18n('competence-digiimgpro'),
      description: ''
    },
    {
      imgSrc: require('../images/about-ml.svg'),
      imgAlt: '',
      title: i18n('competence-ml'),
      description: ''
    },
    {
      imgSrc: require('../images/about-ux.svg'),
      imgAlt: '',
      title: i18n('competence-ux'),
      description: ''
    },
    {
      imgSrc: require('../images/about-geoinf.svg'),
      imgAlt: '',
      title: i18n('competence-geoinf'),
      description: ''
    }
  ];

  const MEMBERS = [
    'ID-Geo',
    "Ville d'Yverdon",
    'Prosenectute',
    'Senior Lab',
    'MobilitePietonne.ch',
    'Ergo-sum.ch',
    'SeniorsConsulting.ch'
  ];

  return (
    <>
      <NextSeo
        title='About'
        description='Le projet modos cherche à développer de nouveaux procédés pour accompagner les seniors en mobilité...'
        canonical='https://modos.heig-vd.ch/about'
        openGraph={{
          url: 'https://modos.heig-vd.ch/about',
          title: 'About MoDos',
          description:
            'Le projet modos cherche à développer de nouveaux procédés pour accompagner les seniors en mobilité...'
        }}
      />

      <div id={styles['about-title-mobile']}>
        <h1>{i18n('title')}</h1>
      </div>

      <ContainerWithMargin
        id={styles['about-intro-mobile']}
        className={styles.section}>
        <div>
          <ReactMarkdown>{i18n('intro')}</ReactMarkdown>
        </div>
        {/* <Button>{i18n('intro-btn')}</Button> */}
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-intro-desktop']}
        className={styles.section}
        mainColClassName={styles['about-intro-desktop-maincol']}
        rowClassName={styles['about-intro-desktop-row']}>
        <h1>{i18n('title')}</h1>
        <div>
          <ReactMarkdown>{i18n('intro')}</ReactMarkdown>
        </div>
        {/* <Button>{i18n('intro-btn')}</Button> */}
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-conception']}
        className={styles.section}>
        <h2>{i18n('conception-title')}</h2>
        <div className={styles['conception-description']}>
          <ReactMarkdown
            source={i18n('conception-description')}></ReactMarkdown>
        </div>
        <Image
          className={styles['about-conception-img-desktop']}
          src={require('../images/desktop/about-technicalschema-desktop.png')}
          fluid
        />
      </ContainerWithMargin>

      <Container className={styles['about-conception-img-mobile']}>
        <Row>
          <Col>
            <SliderModosContainer
              items={SLIDER_TECH_SCHEM}></SliderModosContainer>
          </Col>
        </Row>
      </Container>

      <ContainerWithMargin className={styles.section}>
        <h2>{i18n('competence-title')}</h2>
        <CardsModosContainer cards={CARDS_COMPETENCES}></CardsModosContainer>
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-codac']}
        className={styles.section}>
        <p>{i18n('codac-intro')}</p>

        <div className={styles['about-universities']}>
          <a href='https://heig-vd.ch'>
            <img
              className='lazyload'
              data-src={require('../images/heig-logo.png')}
              alt='Logo HEIG-VD'
            />
          </a>
          <a href='https://he-arc.ch'>
            <img
              className='lazyload'
              data-src={require('../images/hearc-logo.png')}
              alt='Logo HEARC'
            />
          </a>
          <a href='https://heia-fr.ch'>
            <img
              className='lazyload'
              data-src={require('../images/heia-logo.png')}
              alt='Logo HEIA-FR'
            />
          </a>
        </div>

        <h2>{i18n('codac-title')}</h2>
        <p>{i18n('codac-descr')}</p>
        <div className={styles['about-members']}>
          {MEMBERS.map((member, index) => (
            <div key={index} className={styles['about-members-item']}>
              <span>{member}</span>
            </div>
          ))}
        </div>
      </ContainerWithMargin>

      {/* <ContainerWithMargin className={styles.section}>
        <h2>{ai18n('publication-title')}</h2>
      </ContainerWithMargin> */}
    </>
  );
};
export default About;
