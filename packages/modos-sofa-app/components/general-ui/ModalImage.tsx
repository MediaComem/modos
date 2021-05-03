/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, Row, Col, Modal } from "react-bootstrap";
type State = {
  rotation: number
}
interface IModalImageProps {
  imglink: string,
  onModalClose: () => void,
  showModal: boolean
}

class ModalImage extends Component<IModalImageProps, State> {
  constructor(props) {
    super(props);
    this.state = { rotation: 0};
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
  }

  rotateLeft(){
    this.setState({ rotation: (this.state.rotation+270)%360 });
  }

  rotateRight(){
    this.setState({ rotation: (this.state.rotation+90)%360 });
  }

  render() {
    return (

      <>
        <Modal show={this.props.showModal} dialogClassName="max700" onHide={this.props.onModalClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row className="centerImage">
              <img className={"modalImg rotate"+this.state.rotation} src={this.props.imglink}/>
            </Row>
            <Row className="center">
             <Col>
                <Button onClick={this.rotateLeft}>Tourner à gauche</Button>
             </Col>
             <Col></Col>
             <Col>
                <Button onClick={this.rotateRight}>Tourner à droite</Button>
             </Col>
            </Row>
        </Modal.Body>
      </Modal>
      </>
    )
  }
};
export default ModalImage;
