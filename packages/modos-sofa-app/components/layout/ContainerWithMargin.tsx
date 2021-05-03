import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface IProps {
  id?: string;
  className?: string;
  rowClassName?: string;
  mainColClassName?: string;
  children?: any;
}

export const ContainerWithMargin = (props: IProps) =>
  <>
    <Container id={props.id} className={props.className} fluid>
      <Row className={props.rowClassName}>
        <Col md={0} lg={1}></Col>
        <Col className={props.mainColClassName} lg={10}>
          {props.children}
        </Col>
        <Col md={0} lg={1}></Col>
      </Row>
    </Container>
  </>
;
