/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-quotes */
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
  const i18nG = useI18N('global');

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
        id={styles['about-publications']}
        className={styles.section}>
        <h2 id='about-publications' className={styles['about-publications']}>{i18n('publications-title-1')}</h2>
        <h3>Smart Data Smart Cities (SDSC) 2021</h3>
        <p>Citizen participation & digital tools to improve pedestrian mobility in cities -
           Ertz, O., Sandoz, R. : 6th international Conference on Smart Data and Smart Cities (SDSC´21),
           September 15-17 2021, Stuttgart, Germany</p>
        <p><a href="/documents/20210917_modos_SDSC-OEZ_EN.pdf" target="_blank" rel="noreferrer">{i18nG('link-open-presentation')}</a></p>
        <p>Ertz, O., Fischer, A., Ghorbel, H., Hüsser, O., Sandoz, R., and Scius-Bertrand, A.: CITIZEN PARTICIPATION & DIGITAL TOOLS TO IMPROVE PEDESTRIAN MOBILITY IN CITIES, Int. Arch. Photogramm. Remote Sens. Spatial Inf. Sci., XLVI-4/W1-2021, 29–34, <a href='https://doi.org/10.5194/isprs-archives-XLVI-4-W1-2021-29-2021' target='_blank' rel='noreferrer'>https://doi.org/10.5194/isprs-archives-XLVI-4-W1-2021-29-2021</a>, 2021.</p>
        <h3>5th International Conference on Urban e-Planning</h3>
        <p>The modos project - A framework to assess Soft Mobility of the Elders -
         Blanc, N. : 5th International Conference “Urban e-Planning”, 2021.09.10,
           Online conference, Institute of Geography and Spatial Planning, University of Lisbon, Portugal</p>
        <p><a href="/documents/20210910_modos_IJEPR_presented.pdf" target="_blank" rel="noreferrer">{i18nG('link-open-presentation')}</a></p>
        <h3>Journée Romande de la géoinformation 2021</h3>
        <p>Projet modos - mobilité douce pour les séniors - Participation citoyenne et outils numériques pour améliorer la
          mobilité piétonne dans les villes - Ertz, O., Sandoz, R., JRG2021, 2021.11.23, Lausanne, Switzerland</p>
        <p><a href="/documents/JRG2021_SessionF_Ertz.pdf" target="_blank" rel="noreferrer">{i18nG('link-open-presentation')}</a></p>
        <h3>Citizen Science Helvetia 21</h3>
        <p>Workshop – Outils de crowdsourcing pour améliorer la mobilité douce des villes - Ertz, O., Sandoz, R., CitSciHelvetia 2021,
           Online conference, 2021.01.15</p>
        <h3>Semaine de la mobilité du Senior-lab</h3>
        <p>Projet modos - Sandoz., R., Semaine de la mobilité du Senior-lab, 2021.09.17, Lausanne, Switzerland</p>
        <p><a href="https://senior-lab.ch/2019/09/09/mobilite-douce-des-seniors-modos-une-premiere-etape-reussie/" target="_blank" rel="noreferrer">{i18n('publications-external-link-SeniorLab1')}</a></p>
        <p><a href="https://www.youtube.com/watch?v=sr899DE2UWE" target="_blank" rel="noreferrer" >{i18n('publications-external-link-SeniorLab2')}</a></p>

        <h2 className={styles['about-publications']}>{i18n('publications-title-3')}</h2>
        <h3>ça roule ! TCS - Février 2022</h3>
        <p><a href="https://issuu.com/tcsvaud/docs/0322_vd_high/8" target="_blank" rel="noreferrer">{i18nG('link-open-article')}</a></p>

        <h2 className={styles['about-publications']}>{i18n('publications-title-2')}</h2>
        <h3>Label "Qualité de la vie" de la fondation Dalle Molle 2021</h3>
        <div className={styles['about-logo']}>
          <a href="https://dallemolle.ch" target="_blank" rel="noreferrer">
            <img
              className='lazyload'
              data-src={require('../images/DalleMolle-logo.png')}
              alt='Logo Dalle Molle'
            />
          </a>
        </div>
        <p><a href="https://dallemolle.ch/concours-2021/" target="_blank" rel="noreferrer">{i18n('publications-external-link-DalleMolle1')}</a></p>
        <p><a href="https://portal.klewel.com/watch/webcast/dalle-molle-ceremonie-de-remise-des-prix-2021/talk/X3bpuWWnbkgjWRo9QGmT7E/" target="_blank" rel="noreferrer">{i18n('publications-external-link-DalleMolle2')}</a></p>
      </ContainerWithMargin>

      <ContainerWithMargin
        id={styles['about-codac']}
        className={styles.section}>
        <h2>Une approche globale et interdisciplinaire</h2>
        <br></br>
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

        <h3>{i18n('codac-title')}</h3>
        <br></br>
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
