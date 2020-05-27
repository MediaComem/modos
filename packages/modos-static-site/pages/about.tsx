import React from 'react';

import styles from './about.module.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { i18n } from '../libs';
import { ContainerWithMargin } from '../components/index';


const About = props => {
  const ai18n = value => i18n('about', value, props.lang);

  return (
    <>
      <ContainerWithMargin fluid id={styles['about-title']} className={styles.section}>
        <Row>
          <Col>
            <p>{ai18n('title')}</p>
          </Col>
        </Row>
      </ContainerWithMargin>

      <ContainerWithMargin>
        <div>
          <p>{ai18n('intro')}</p>
        </div>
        <Button>{ai18n('intro-btn')}</Button>
      </ContainerWithMargin>

      <ContainerWithMargin>
        <h2>{ai18n('conception-title')}</h2>
        <p>{ai18n('conception-motor')}</p>
        <p>{ai18n('conception-objective')}</p>
        <p>{ai18n('conception-autolearning')}</p>
        <p>{ai18n('conception-goal')}</p>
      </ContainerWithMargin>

      <ContainerWithMargin>
        <h2>{ai18n('competence-title')}</h2>
      </ContainerWithMargin>

      <ContainerWithMargin>
        <p>{ai18n('codac-intro')}</p>
        <h2>{ai18n('codac-title')}</h2>
        <p>{ai18n('codac-descr')}</p>
      </ContainerWithMargin>

      <ContainerWithMargin>
        <h2>{ai18n('publication-title')}</h2>
      </ContainerWithMargin>
    </>
  );
};
export default About;
