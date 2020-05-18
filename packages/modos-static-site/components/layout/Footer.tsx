import React from 'react';
import { i18n } from '../../libs';

import styles from './Footer.module.scss';
import { Container, Row, Col } from 'react-bootstrap';


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
        <Container>
          <Row>
            <Col>HES SO</Col>
            <Col>HEIG</Col>
            <Col>HEARC</Col>
            <Col>HEIA-FR</Col>
          </Row>
          <Row>
            <Col>© 2020 MEI</Col>
            <Col>Back to Top /\</Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export { Footer };
