/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import Router from 'next/router'
import { Button, FormGroup, FormControl, Row, Col, Navbar, Form, ProgressBar, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import styles from './evaluation_obstacles.module.scss';
import LeafletMap from './LeafletMap';
import Link from 'next/link'
import ImpactChooser from './ImpactChooser'
import { getApiBase, addLabelisationForObservation, setHidePassModal } from '../../libs/modos_api';
import ModalImage from './ModalImage';
import ModalEndSerie from './ModalEndSerie';
import ObstacleChooserButton from './ObstacleChooserButton';
import { Cookies } from 'react-cookie'
import { i18n } from '../../libs';
const cookies = new Cookies();
const token = cookies.get('token')
type State = {
  buttonValue: number,
  selectedCategory: String,
  freeText: string,
  currentObstacle: Map<String, String>,
  currentObstacleIdx: number,
  showModalPass: boolean,
  showImageModal: boolean,
  showComment: boolean,
  showEndModal: boolean,
  doneInSerie: number,
  hidePassModal: boolean
}
interface IEvaluationProps {
  lang: String,
  data?: Array<Map<String, String>>
}

class LabelisationObstacleLoaded extends Component<IEvaluationProps, State> {
  obstacles_i18n: (value: any) => any
  menu_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.obstacles_i18n = value => i18n('obstacles', value, props.lang)
    this.menu_i18n = value => i18n('menu', value, props.lang)
    this.state = { currentObstacle: this.props.data[0], showModalPass: false, buttonValue: 0, currentObstacleIdx: 0, selectedCategory: "", freeText: "", showImageModal: false, showComment: false, showEndModal: false, doneInSerie: 0, hidePassModal: cookies.get("hidePassModal")=="true" };
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleResetCategory = this.handleResetCategory.bind(this);
    this.handleFreetextChange = this.handleFreetextChange.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.showComment = this.showComment.bind(this);
    this.openEndSerieModal = this.openEndSerieModal.bind(this);
    this.updateHidePassModal = this.updateHidePassModal.bind(this);
  }

  updateHidePassModal(changeEvent){
    cookies.set('hidePassModal', changeEvent.target.checked?"true":"false", {path: '/'});
    this.setState({hidePassModal: changeEvent.target.checked}); 
    setHidePassModal(changeEvent.target.checked).then((response)=>response.json()).catch((error)=>{console.error(error)});
  }

  handleButtonChange(newval) { this.setState({ buttonValue: newval }); }
  handleCategoryChange(newval) {
    this.setState({ selectedCategory: newval });
    if(newval=="other"){
      this.setState({ showComment: true });
    }else{
      this.setState({ showComment: false });
    }
  }
  handleResetCategory() { this.setState({ selectedCategory: "" }); }
  handleFreetextChange(event) { this.setState({ freeText: event.target.value }) };

  addLabelisation() {
    addLabelisationForObservation(this.state.currentObstacle['id'], this.state.buttonValue == 1 ? this.state.selectedCategory : "noproblem", String(this.state.freeText))
      .then((response) => response.json())
      .then((responseJson) => {
        const newIdx = this.state.currentObstacleIdx + 1;
        this.setState({doneInSerie: this.state.doneInSerie+1});
        if (newIdx < this.props.data.length) {
          this.setState({ currentObstacleIdx: newIdx, currentObstacle: this.props.data[newIdx], showModalPass: false, selectedCategory: "", buttonValue: 0, freeText: "", showImageModal: false, showComment: false });
        } else {
          this.openEndSerieModal();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  passLabelisation() {
    const newIdx = this.state.currentObstacleIdx + 1;
    if (newIdx < this.props.data.length) {
      this.setState({ currentObstacleIdx: newIdx, currentObstacle: this.props.data[newIdx], showModalPass: false, selectedCategory: "", buttonValue: 0, freeText: "", showImageModal: false, showComment: false });
    } else {
      this.openEndSerieModal();
    }
  }

  showComment(){
    this.setState({ showComment: true });
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
    const obstacleImg = '/images/obstacles/' + this.state.currentObstacle['description']['obstacle'] + '.png';
    const obstacleText = this.obstacles_i18n(this.state.currentObstacle['description']['obstacle'])
    const lat = this.state.currentObstacle['location']['latitude']
    const lng = this.state.currentObstacle['location']['longitude']
    return (

      <>
        <div className={styles.main}>
          <Navbar className="justify-content-between">
            <Form inline>
              <Link href="/main_menu"><img className='lazyload cursorPointer' width="83px" data-src={require('../../images/modos_home.png')} alt='Logo Modos' /></Link>
              <span className="page-title">Sofa app - {this.menu_i18n('obstacle_label_title')}</span>
            </Form>
            <ProgressBar className="my-progress-bar" now={this.state.currentObstacleIdx * 10 + 1} max={10 * this.props.data.length} label={<span>Obstacle {this.state.currentObstacleIdx + 1}/{this.props.data.length}</span>} />
            <Form inline>
              <Link href="/main_menu"><span className='cursorPointer'><img className='lazyload' height="31px" data-src={require('../../images/home.png')} />{this.menu_i18n('back')}</span></Link>
            </Form>
          </Navbar>
          <br />
          <Row className="purpleBackground">
            <Col md="1"></Col>
            <Col>
              <Row className="whiteTitle">
                {this.menu_i18n('obstacle_label_subtitle')}
              </Row>
              <Row>
                <Col md="1"></Col>
                <Col md="3" className={styles.colImg}><img onClick={this.openImageModal} className='lazyload obstacle-img' src={getApiBase()+this.state.currentObstacle['image']['apiLink']} /></Col>
                <Col md="7" className={styles.colImg}><LeafletMap center={{ lat: lat, lng: lng }} markers={[{ lat: lat, lng: lng, type: 1 }]} height={450}></LeafletMap></Col>
                <Col md="1"></Col>
              </Row>
              <Row><br /></Row>
            </Col>
            <Col md="1"></Col>
          </Row>
          <Row><br /></Row>
          <Row>
            <Col md={1}></Col>
            <Col md={4}>D'après vous, y a-t-il une entrave à la mobilité piétonne sur cette photo ?</Col>
            <Col md={2}><Button className={this.state.buttonValue == 1 ? "okButtonChecked" : "okButton"} onClick={() => this.handleButtonChange(1)}>Oui <img src={this.state.buttonValue == 1 ? '/images/check.svg' : '/images/check_green.svg'} /></Button></Col>
            <Col md={2}><Button className={this.state.buttonValue == 2 ? "nokButtonChecked" : "nokButton"} onClick={() => this.handleButtonChange(2)}>Non <img src={this.state.buttonValue == 2 ? '/images/cross.svg' : '/images/cross_red.svg'} /></Button></Col>
            <Col md={2}><Button onClick={this.state.hidePassModal?this.passLabelisation.bind(this):this.openModalPass.bind(this)} block variant="outline-primary" type="submit">Passer  <img className="lazyload" data-src={require('../../images/pass.svg')} /></Button></Col>
            <Col md={1}></Col>
          </Row>
          {this.state.buttonValue == 1 && this.state.selectedCategory == "" ? <>
            <Row>
              <Col md={1}></Col>
              <Col>Comment catégoriseriez-vous cette entrave?</Col>
              <Col md={1}></Col>
            </Row>
            <Row>
              <Col md={1}></Col>
              <ObstacleChooserButton categoryId="coating" categoryName={this.obstacles_i18n('coating')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="obstacle" categoryName={this.obstacles_i18n('obstacle')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="security" categoryName={this.obstacles_i18n('security')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="passability" categoryName={this.obstacles_i18n('passability')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="slope" categoryName={this.obstacles_i18n('slope')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="width" categoryName={this.obstacles_i18n('width')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="other" categoryName={this.obstacles_i18n('other')} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <Col md={1}></Col>
            </Row>
          </> : <></>}
          {this.state.buttonValue == 1 && this.state.selectedCategory != "" ? <>
            <Row>
              <Col md={1}></Col>
              <Col>De quelle catégorie d'entrave s'agit-il?</Col>
              <Col md={1}></Col>
            </Row>
            <Row>
              <Col md={1}></Col>
              <Col><Button onClick={this.handleResetCategory}>Retour</Button></Col>
              <ObstacleChooserButton categoryId={this.state.selectedCategory} categoryName={this.obstacles_i18n(this.state.selectedCategory)} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
              <Col md={7}>
                {this.state.showComment?
                  <><Row>{this.state.selectedCategory == "other" ?<>Expliqez pourquoi <span className="red">* (champ obligatoire)</span></>:<>Si vous le souhaitez, vous pouvez ajouter un commentaire</>} :</Row>
                <Row><textarea className="textAreaFreeText" value={this.state.freeText} onChange={this.handleFreetextChange} /></Row></>:<><Button onClick={this.showComment}>Ajouter un commentaire</Button></>}
                </Col>
              <Col md={1}></Col>
            </Row>
          </> : <></>}
          <Row className="bottom-row">
            <Col xs={4}></Col>
            <Col></Col>
            <Col><Button onClick={this.addLabelisation.bind(this)} block variant="primary" disabled={this.state.buttonValue == 0 || (this.state.buttonValue == 1 && (this.state.selectedCategory == "" || (this.state.selectedCategory == "other" && this.state.freeText == "")))} type="submit">Valider mon analyse <img className="lazyload" data-src={require('../../images/check.svg')} /></Button></Col>
          </Row>
        </div>
        <Modal show={this.state.showModalPass} onHide={this.closeModalPass.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title><img className="lazyload" data-src={require('../../images/exclamation.svg')} /> Labéliser un autre obstacle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Êtes-vous sûr·e de vouloir changer d’obstacle ? <br /><br /><i>Il se peut qu’il vous soit proposé à nouveau dans le futur.</i></p>
          </Modal.Body>

          <Modal.Footer>
            <input className="impact-radio" checked={this.state.hidePassModal} type="checkbox" onChange={this.updateHidePassModal}></input>Ne plus montrer cette fenêtre
            <Row>
              <Button onClick={this.closeModalPass.bind(this)} variant="outline-primary">Non, rester ici <img className="lazyload" data-src={require('../../images/pass.svg')} /></Button>
              <Button onClick={this.passLabelisation.bind(this)} variant="primary">Oui, changer d’obstacle <img className="lazyload" data-src={require('../../images/passwhite.svg')} /></Button>
            </Row>
          </Modal.Footer>
        </Modal>
        <ModalImage imglink={getApiBase()+this.state.currentObstacle['image']['apiLink']} showModal={this.state.showImageModal} onModalClose={this.closeImageModal}></ModalImage>
        <ModalEndSerie showModal={this.state.showEndModal} type="labelisé" nb={this.state.doneInSerie}></ModalEndSerie>
      </>
    )
  }
};
export default LabelisationObstacleLoaded;
