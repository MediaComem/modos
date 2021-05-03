/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Row, Col, Navbar, Form, ProgressBar, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import styles from './evaluation_obstacles.module.scss';
import LeafletMap from './LeafletMap';
import Link from 'next/link'
import Router from 'next/router'
import ImpactChooser from './ImpactChooser'
import { getApiBase, addValidationForObservation, setHidePassModal } from '../../libs/modos_api';
import ModalImage from './ModalImage';
import ModalEndSerie from './ModalEndSerie';
import { Cookies } from 'react-cookie'
import { i18n } from '../../libs';
import { isComputedPropertyName } from 'typescript';
const cookies = new Cookies();
const token = cookies.get('token')
const profile = cookies.get('helper')
type State = {
  selected: Number,
  profileImgName: string,
  buttonValue: Number,
  currentObstacleIdx: number,
  currentObstacle: Map<String, String>,
  showModalPass: boolean,
  showImageModal: boolean,
  showEndModal: boolean,
  doneInSerie: number,
  hidePassModal: boolean
}
interface IEvaluationProps {
  lang: String,
  data?: Array<Map<String, String>>
}

class ValidationObstacleLoaded extends Component<IEvaluationProps, State> {
  obstacles_i18n: (value: any) => any
  menu_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.obstacles_i18n = value => i18n('obstacles', value, props.lang)
    this.menu_i18n = value => i18n('menu', value, props.lang)
    this.state = { selected: -1, profileImgName: "", buttonValue: 0, currentObstacleIdx: 0, currentObstacle: this.props.data[0], showModalPass: false, showImageModal: false, showEndModal: false, doneInSerie: 0, hidePassModal: cookies.get("hidePassModal")=="true" };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.openEndSerieModal = this.openEndSerieModal.bind(this);
    this.updateHidePassModal = this.updateHidePassModal.bind(this);
  }

  updateHidePassModal(changeEvent){
    cookies.set('hidePassModal', changeEvent.target.checked?"true":"false", {path: '/'});
    this.setState({hidePassModal: changeEvent.target.checked}); 
    setHidePassModal(changeEvent.target.checked).then((response)=>response.json()).catch((error)=>{console.error(error)});
  }

  handleChange(newval) { 
    this.setState({ selected: newval }); 
    if(newval > -1){
      this.addValidation(false);
    } 
  }
  handleButtonChange(newval) { this.setState({ buttonValue: newval }); }

  addValidation(isOk) {
    const avg = Math.round(this.state.currentObstacle['avgWeight']);
    addValidationForObservation(this.state.currentObstacle['o_id'], this.state.selected, avg, isOk)
      .then((response) => response.json())
      .then((responseJson) => {
        const newIdx = this.state.currentObstacleIdx + 1;
        this.setState({doneInSerie: this.state.doneInSerie+1});
        if (newIdx < this.props.data.length) {
          this.setState({ selected: -1, currentObstacleIdx: newIdx, currentObstacle: this.props.data[newIdx], buttonValue: 0, showImageModal: false });
        } else {
          this.openEndSerieModal();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  passValidation() {
    const newIdx = this.state.currentObstacleIdx + 1;
    if (newIdx < this.props.data.length) {
      this.setState({ selected: -1, currentObstacleIdx: newIdx, currentObstacle: this.props.data[newIdx], showModalPass: false, buttonValue: 0, showImageModal: false });
    } else {
      this.openEndSerieModal();
    }
  }


  openModalPass() {
    this.setState({ showModalPass: true });
  }


  closeModalPass() {
    this.setState({ showModalPass: false });
  }

  openImageModal(){
    this.setState({ showImageModal: true });
  }

  closeImageModal(){
    this.setState({ showImageModal: false });
  }

  openEndSerieModal(){
    this.setState({showEndModal: true})
  }

  render() {
    const obstacleImg = '/images/obstacles/' + this.state.currentObstacle['o_descriptionObstacle'] + '.png';
    const obstacleText = this.obstacles_i18n(this.state.currentObstacle['o_descriptionObstacle'])
    const lat = this.state.currentObstacle['o_locationLatitude']
    const lng = this.state.currentObstacle['o_locationLongitude']
    const avg = Math.round(this.state.currentObstacle['avgWeight'])
    return (
      <>
        <div className={styles.main}>


          <Navbar className="justify-content-between">
            <Form inline>
              <Link href="/main_menu"><img className='lazyload cursorPointer' width="83px" data-src={require('../../images/modos_home.png')} alt='Logo Modos' /></Link>
              <span className="page-title">Sofa app - {this.menu_i18n('obstacle_validate_title')}</span>
            </Form>
            <ProgressBar className="my-progress-bar" now={this.state.currentObstacleIdx * 10 + 1} max={10 * this.props.data.length} label={<span>Obstacle {this.state.currentObstacleIdx + 1}/{this.props.data.length}</span>} />
            <Form inline>
              <Link href="/main_menu"><span className='cursorPointer'><img className='lazyload' height="31px" data-src={require('../../images/home.png')} />{this.menu_i18n('back')}</span></Link>
            </Form>
          </Navbar>
          <br/>
          <Row className="purpleBackground">
            <Col md="1"></Col>
            <Col>
            <Row className="whiteTitle">
            {this.menu_i18n('obstacle_validate_subtitle')}
            </Row>
              <Row>
                <Col md="1"></Col>
                <Col md="3" className={styles.colImg}><img onClick={this.openImageModal} className='lazyload obstacle-img' src={getApiBase()+"/observations/images/"+this.state.currentObstacle['o_imageBasename']} /></Col>
                <Col md="7" className={styles.colImg}><LeafletMap center={{ lat: lat, lng: lng }} markers={[{ lat: lat, lng: lng, type: 2 }]} height={450}></LeafletMap></Col>
                <Col md="1"></Col>
              </Row>
              <Row></Row>
              <Row>
              <Col md={4}><Row>Type d'obstacle : </Row><Row><br/><h3 className={styles.category}> {obstacleText} <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Popover id={`popover-positioned-top`}>
                      <Popover.Title as="h3"><img className="lazyload" data-src={require('../../images/tooltip.svg')} /> Qu’est ce qu’un obstacle de type {obstacleText} ? <img className='lazyload' width="50px" src={obstacleImg} alt='Logo Modos' /></Popover.Title>
                      <Popover.Content>
                        Problème lié à l’accessibilité de certains tronçons piétons, notamment pour franchir un trottoir ou des escaliers. Ces problèmes sont traduits par un manque ou un défaut d’aménagement.
            </Popover.Content>
                    </Popover>
                  }
                >
                  <img className="lazyload tooltipimg" data-src={require('../../images/info.svg')} />
                </OverlayTrigger></h3></Row></Col>
                
              </Row>
            </Col>
            <Col md="1"></Col>
          </Row>

          <hr></hr>
          <Row>
            <Col md={4}>L’impact de cet obstacle a été évalué comme </Col>
            <Col md={2} className={"center impact-chooser-col background-impact-" + avg}><span className="impact-name">{this.obstacles_i18n('impact_' + avg)} ({avg}/5)</span><br /><span className="impact-description">{this.obstacles_i18n('impact_' + avg + '_description')}</span></Col>
          </Row>
          <Row><br /></Row>
          <Row>
            <Col md={4}>Êtes-vous d’accord avec cette évaluation ? </Col>
            <Col md={2}><Button className={this.state.buttonValue == 1 ? "okButtonChecked" : "okButton"} onClick={() => this.addValidation(true)}>Je suis d'accord <img src={this.state.buttonValue == 1 ? '/images/check.svg' : '/images/check_green.svg'} /></Button></Col>
            <Col md={2}><Button className={this.state.buttonValue == 2 ? "nokButtonChecked" : "nokButton"} onClick={() => this.handleButtonChange(2)}>Je ne suis pas d'accord <img src={this.state.buttonValue == 2 ? '/images/cross.svg' : '/images/cross_red.svg'} /></Button></Col>
            <Col md={2}><Button className="buttonNotKnow" onClick={this.passValidation.bind(this)}>Passer</Button></Col>
          </Row>
          {this.state.buttonValue == 2 ? <>
            <Row>
              <Col>À mon avis, l'impact est:</Col>
            </Row>
            <Row>
              <Col className="center impact-chooser-col background-impact-0"><span className="impact-name">{this.obstacles_i18n('impact_0')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_0_description')}</span></Col>
              <Col className="center impact-chooser-col background-impact-1"><span className="impact-name">{this.obstacles_i18n('impact_1')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_1_description')}</span></Col>
              <Col className="center impact-chooser-col background-impact-2"><span className="impact-name">{this.obstacles_i18n('impact_2')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_2_description')}</span></Col>
              <Col className="center impact-chooser-col background-impact-3"><span className="impact-name">{this.obstacles_i18n('impact_3')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_3_description')}</span></Col>
              <Col className="center impact-chooser-col background-impact-4"><span className="impact-name">{this.obstacles_i18n('impact_4')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_4_description')}</span></Col>
              <Col className="center impact-chooser-col background-impact-5"><span className="impact-name">{this.obstacles_i18n('impact_5')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_5_description')}</span></Col>
            </Row>
            <ImpactChooser lang={this.props.lang} helpername="" selected={this.state.selected} onChange={this.handleChange} showFirstLast={false} disabledProfile={false} onDisabledChange={()=>{}}></ImpactChooser>
          </> : <></>}
        </div>
        <Modal show={this.state.showModalPass} onHide={this.closeModalPass.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title><img className="lazyload" data-src={require('../../images/exclamation.svg')} /> Évaluer un autre obstacle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Êtes-vous sûr·e de vouloir changer d’obstacle ? <br /><br /><i>Il se peut qu’il vous soit proposé à nouveau dans le futur.</i></p>
          </Modal.Body>

          <Modal.Footer>
          <input className="impact-radio" checked={this.state.hidePassModal} type="checkbox" onChange={this.updateHidePassModal}></input>Ne plus montrer cette fenêtre
            <Row>
              <Button onClick={this.closeModalPass.bind(this)} variant="outline-primary">Non, rester ici <img className="lazyload" data-src={require('../../images/pass.svg')} /></Button>
              <Button onClick={this.passValidation.bind(this)} variant="primary">Oui, changer d’obstacle <img className="lazyload" data-src={require('../../images/passwhite.svg')} /></Button>
            </Row>
          </Modal.Footer>
        </Modal>
        <ModalImage imglink={getApiBase()+"/observations/images/"+this.state.currentObstacle['o_imageBasename']} showModal={this.state.showImageModal} onModalClose={this.closeImageModal}></ModalImage>
        <ModalEndSerie showModal={this.state.showEndModal} type="validé" nb={this.state.doneInSerie}></ModalEndSerie>
      </>
    );
  }
};
export default ValidationObstacleLoaded;
