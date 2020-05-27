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
            <Col sm={12} lg={4}>
              <h2>{this.i18n('contact')}</h2>
              <p>
                {this.i18n('moreinfo')}
              </p>
              <Button>{this.i18n('takecontact')}</Button>
            </Col>
            <Col md={0} lg={1}></Col>
          </Row>
          <Row className={styles.universities}>
            <Col>HES SO</Col>
            <Col>HEIG</Col>
            <Col>HEARC</Col>
            <Col>HEIA-FR</Col>
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
