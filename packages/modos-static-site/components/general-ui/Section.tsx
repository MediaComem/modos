import React from 'react';
import { Container } from 'react-bootstrap';

export const Section = props =>
  <Container
    id={props.id}
    className={props.className}
    style={{
      minHeight: '650px'
    }}
    fluid>
    {props.children}
  </Container>
  ;
