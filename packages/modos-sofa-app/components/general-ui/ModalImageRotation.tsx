/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, Row, Col, Modal } from "react-bootstrap";
type State = {
}
interface IModalImageProps {
  imglink: string,
  onModalClose: () => void,
  showModal: boolean,
  rotation: number,
  rotateLeft: ()=>void,
  rotateRight: ()=>void
}

class ModalImage extends Component<IModalImageProps, State> {
  constructor(props) {
    super(props);
  }



  render() {
    return (

      <>
        <Modal show={this.props.showModal} dialogClassName="max700" onHide={this.props.onModalClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row className="centerImage">
              <img className={"modalImg rotate"+this.props.rotation} src={this.props.imglink}/>
            </Row>
            <Row className="center">
             <Col>
                <Button onClick={this.props.rotateLeft}>Tourner à gauche</Button>
             </Col>
             <Col></Col>
             <Col>
                <Button onClick={this.props.rotateRight}>Tourner à droite</Button>
             </Col>
            </Row>
        </Modal.Body>
      </Modal>
      </>
    )
  }
};
export default ModalImage;
