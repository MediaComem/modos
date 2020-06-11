/* eslint-disable max-lines-per-function */
import React from 'react';

import styles from './about.module.scss';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { i18n } from '../libs';
import {
  ContainerWithMargin,
  CardsModosContainer,
  ISliderItemModos,
  SliderModosContainer
} from '../components/index';
import ReactMarkdown from 'react-markdown';

const About = props => {
  const ai18n = value => i18n('about', value, props.lang);

  const SLIDER_TECH_SCHEM: ISliderItemModos[] = [
    {
      caption: '',
      imgAlt: '',
      imgSrc: './assets/mobile/about-schema-part01-mobile.svg'
    },
    {
      caption: '',
      imgAlt: '',
      imgSrc: './assets/mobile/about-schema-part02-mobile.svg'
    },
    {
      caption: '',
      imgAlt: '',
      imgSrc: './assets/mobile/about-schema-part03-mobile.svg'
    }
  ];

  const CARDS_COMPETENCES = [
    {
      imgSrc: './assets/about-digiimgpro.svg',
      imgAlt: '',
      title: ai18n('competence-digiimgpro'),
      description: ''
    },
    {
      imgSrc: './assets/about-ml.svg',
      imgAlt: '',
      title: ai18n('competence-ml'),
      description: ''
    },
    {
      imgSrc: './assets/about-ux.svg',
      imgAlt: '',
      title: ai18n('competence-ux'),
      description: ''
    },
    {
      imgSrc: './assets/about-geoinf.svg',
      imgAlt: '',
      title: ai18n('competence-geoinf'),
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
      <div id={styles['about-title-mobile']}>
        <h1>{ai18n('title')}</h1>
      </div>

      <ContainerWithMargin
        id={styles['about-intro-mobile']}
        className={styles.section}
      >
        <div>
          <ReactMarkdown>{ai18n('intro')}</ReactMarkdown>
        </div>
        <Button>{ai18n('intro-btn')}</Button>
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-intro-desktop']}
        className={styles.section}
        mainColClassName={styles['about-intro-desktop-maincol']}
        rowClassName={styles['about-intro-desktop-row']}
      >
        <h1>{ai18n('title')}</h1>
        <div>
          <ReactMarkdown>{ai18n('intro')}</ReactMarkdown>
        </div>
        <Button>{ai18n('intro-btn')}</Button>
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-conception']}
        className={styles.section}
      >
        <h2>{ai18n('conception-title')}</h2>
        <div className={styles['conception-description']}>
          <ReactMarkdown source={ai18n('conception-description')}></ReactMarkdown>
        </div>
        <Image
          className={styles['about-conception-img-desktop']}
          src='./assets/desktop/about-technicalschema-desktop.svg'
          fluid
        />
      </ContainerWithMargin>

      <Container className={styles['about-conception-img-mobile']}>
        <Row>
          <Col>
            <SliderModosContainer
              items={SLIDER_TECH_SCHEM}
            ></SliderModosContainer>
          </Col>
        </Row>
      </Container>

      <ContainerWithMargin className={styles.section}>
        <h2>{ai18n('competence-title')}</h2>
        <CardsModosContainer cards={CARDS_COMPETENCES}></CardsModosContainer>
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-codac']}
        className={styles.section}
      >
        <p>{ai18n('codac-intro')}</p>

        <div className={styles['about-universities']}>
          <a href='https://heig-vd.ch'>
            <img src='assets/heig-logo.png' alt='Logo HEIG-VD' />
          </a>
          <a href='https://he-arc.ch'>
            <img src='assets/hearc-logo.png' alt='Logo HEARC' />
          </a>
          <a href='https://heia-fr.ch'>
            <img src='assets/heia-logo.png' alt='Logo HEIA-FR' />
          </a>
        </div>

        <h2>{ai18n('codac-title')}</h2>
        <p>{ai18n('codac-descr')}</p>
        <div className={styles['about-members']}>
          {MEMBERS.map((member, index) =>
            <div key={index} className={styles['about-members-item']}>
              <span>{member}</span>
            </div>)}
        </div>
      </ContainerWithMargin>

      {/* <ContainerWithMargin className={styles.section}>
        <h2>{ai18n('publication-title')}</h2>
      </ContainerWithMargin> */}
    </>
  );
};
export default About;
