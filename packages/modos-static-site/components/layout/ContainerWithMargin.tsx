import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const ContainerWithMargin = props =>
  <>
    <Container id={props.id} className={props.className} fluid>
      <Row>
        <Col md={0} lg={1}></Col>
        <Col lg={10}>{props.children}</Col>
        <Col md={0} lg={1}></Col>
      </Row>
    </Container>
  </>
;
