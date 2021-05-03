/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, Row, Col, Modal } from "react-bootstrap";
import Router from 'next/router'
type State = {
}
interface IModalEndSerieProps {
  showModal: boolean,
  type: string,
  nb: number
}

class ModalEndSerie extends Component<IModalEndSerieProps, State> {
  constructor(props) {
    super(props);
  }

  actionContinue(){
    Router.reload();
  }

  actionEnd(){
    Router.push('/main_menu');
  }

  render() {
    return (

      <>
        <Modal show={this.props.showModal}>
          <Modal.Body>
          <Row><Col className="center"><b>Félicitation !</b></Col></Row>
          Vous avez {this.props.type} {this.props.nb} obstacles dans cette série.<br/>
          Voulez-vous continuer ?

            <Row className="center">
             <Col>
                <Button onClick={this.actionEnd}>Retour à la page d'accueil</Button>
             </Col>
             <Col md="1"></Col>
             <Col>
                <Button onClick={this.actionContinue}>Oui, continuer</Button>
             </Col>
            </Row>
        </Modal.Body>
      </Modal>
      </>
    )
  }
};
export default ModalEndSerie;
