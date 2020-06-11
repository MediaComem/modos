import React from 'react';
import { i18n } from '../../libs';

import styles from './Footer.module.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';


interface Props {
  lang;
}
interface State {}

class Footer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  i18n(value) {
    return i18n('footer', value, this.props.lang);
  }

  render() {
    return (
      <footer className={styles['main-footer']}>
        <Container fluid>
          <Row className={styles.contact}>
            <Col md={0} lg={1}></Col>
            <Col sm={12} lg={3} className={styles['contact-col']}>
              <h2>{this.i18n('contact')}</h2>
              <p>
                {this.i18n('moreinfo')}
              </p>
              <Button>{this.i18n('takecontact')}</Button>
            </Col>
            <Col md={0} lg={1}></Col>
          </Row>
          <Row className={styles.universities}>
            <Col>
              <a href='https://hes-so.ch'><img src='assets/hes-logo.png' alt='Logo HES-SO' /></a>
              <a href='https://heig-vd.ch'><img src='assets/heig-logo.png' alt='Logo HEIG-VD' /></a>
              <a href='https://he-arc.ch'><img src='assets/hearc-logo.png' alt='Logo HEARC' /></a>
              <a href='https://heia-fr.ch'><img src='assets/heia-logo.png' alt='Logo HEIA-FR' /></a>
            </Col>
          </Row>
          <Row className={styles.copyright}>
            <Col>© 2020 MEI</Col>
            <Col><a href='#'><i className='material-icons md-36'>arrow_upward</i></a></Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export { Footer };
