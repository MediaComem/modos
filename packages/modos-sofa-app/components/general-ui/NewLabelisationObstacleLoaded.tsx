/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import Router from 'next/router'
import { Button, FormGroup, FormControl, Row, Col, Navbar, Form, ProgressBar, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import styles from './evaluation_obstacles.module.scss';
import LeafletMap from './LeafletMap';
import Link from 'next/link'
import ImpactChooser from './ImpactChooser'
import { getApiBase, addLabelisationsForObservation, setHidePassModal } from '../../libs/modos_api';
import ModalImageRotation from './ModalImageRotation';
import ModalEndSerie from './ModalEndSerie';
import ObstacleChooserButton from './ObstacleChooserButton';
import { Cookies } from 'react-cookie'
import { i18n } from '../../libs';
import { start } from 'repl';
import { textChangeRangeIsUnchanged } from 'typescript';
const cookies = new Cookies();
const token = cookies.get('token')
type State = {
  buttonValue: number,
  selectedCategory: String,
  freeText: string,
  currentObstacles: Array<Map<String, String>>,
  currentPageIdx: number,
  showModalPass: boolean,
  showImageModal: Array<boolean>,
  showChangeCatModal: boolean,
  showComment: boolean,
  showEndModal: boolean,
  doneInSerie: number,
  hidePassModal: boolean,
  selected: Array<boolean>,
  obstacleType: string,
  obstacleTypeChoosed: boolean,
  rotation: Array<number>
}
interface IEvaluationProps {
  lang: String,
  data?: Array<Map<String, String>>
}

class NewLabelisationObstacleLoaded extends Component<IEvaluationProps, State> {
  obstacles_i18n: (value: any) => any
  menu_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.obstacles_i18n = value => i18n('obstacles', value, props.lang)
    this.menu_i18n = value => i18n('menu', value, props.lang)
    var types=["coating", "obstacle", "security", "passability", "slope", "width"]
    this.state = { currentObstacles: [this.props.data[0],this.props.data[1],this.props.data[2]], showModalPass: false, showChangeCatModal:false, buttonValue: 0, currentPageIdx: 0, selectedCategory: "", freeText: "", showImageModal: [false,false,false], showComment: false, showEndModal: false, doneInSerie: 0, hidePassModal: cookies.get("hidePassModal")=="true", selected: [false, false, false], obstacleType: types[Math.floor(Math.random() * types.length)], obstacleTypeChoosed: false, rotation: [0,0,0]};
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleResetCategory = this.handleResetCategory.bind(this);
    this.handleFreetextChange = this.handleFreetextChange.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.showComment = this.showComment.bind(this);
    this.openEndSerieModal = this.openEndSerieModal.bind(this);
    this.updateHidePassModal = this.updateHidePassModal.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
  }

  updateHidePassModal(changeEvent){
    cookies.set('hidePassModal', changeEvent.target.checked?"true":"false", {path: '/'});
    this.setState({hidePassModal: changeEvent.target.checked}); 
    setHidePassModal(changeEvent.target.checked).then((response)=>response.json()).catch((error)=>{console.error(error)});
  }

  handleButtonChange(newval) { this.setState({ buttonValue: newval }); }

  handleCategoryChange(newval) {
    this.setState({ obstacleType: newval });
  }
  handleResetCategory() { this.setState({ selectedCategory: "" }); }
  handleFreetextChange(event) { this.setState({ freeText: event.target.value }) };

  addLabelisation() {
    var toAdd = []
    for(var i=0; i<3; i++){
        if(this.state.selected[i]){
            toAdd.push(this.state.currentObstacles[i]['id']);
            this.setState({doneInSerie: this.state.doneInSerie+1});
        }
    }
    if(toAdd.length>0){
        for(var i=0; i<(3-toAdd.length);i++){
            toAdd.push(-1);
        }
        addLabelisationsForObservation(toAdd[0],toAdd[1],toAdd[2], this.state.obstacleType, "")
                .then((response) => response.json())
                .then((responseJson) => {
                    const newIdx = this.state.currentPageIdx + 1;
                    if (newIdx < this.props.data.length/3) {
                        this.setState({ currentPageIdx: newIdx, currentObstacles: [this.props.data[newIdx*3], this.props.data[newIdx*3+1], this.props.data[newIdx*3+2]], showModalPass: false, buttonValue: 0, showImageModal: [false,false,false], showComment: false, selected: [false, false, false], rotation: [0,0,0] });
                    } else {
                        this.openEndSerieModal();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else{
            const newIdx = this.state.currentPageIdx + 1;
            if (newIdx < this.props.data.length/3) {
                this.setState({ currentPageIdx: newIdx, currentObstacles: [this.props.data[newIdx*3], this.props.data[newIdx*3+1], this.props.data[newIdx*3+2]], showModalPass: false, buttonValue: 0, showImageModal: [false,false,false], showComment: false, selected: [false, false, false], rotation: [0,0,0] });
            } else {
                this.openEndSerieModal();
            }
        }
    }

  passLabelisation() {
    const newIdx = this.state.currentPageIdx + 1;
    if (newIdx < this.props.data.length) {
      this.setState({ currentPageIdx: newIdx, currentObstacles: [this.props.data[newIdx*3],this.props.data[newIdx*3+1],this.props.data[newIdx*3+2]], showModalPass: false, selectedCategory: "", buttonValue: 0, freeText: "", showImageModal: [false,false,false], showComment: false, selected: [false, false, false], rotation: [0,0,0] });
    } else {
      this.openEndSerieModal();
    }
  }

  start(){
    this.setState({ obstacleTypeChoosed: true });
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

  rotateLeft(i){
    var tmp = this.state.rotation;
    tmp[i] = (tmp[i]+270)%360;
    this.setState({rotation: tmp})
  }

  rotateRight(i){
    var tmp = this.state.rotation;
    tmp[i] = (tmp[i]+90)%360;
    this.setState({rotation: tmp})
  }

  toggleImage(i){
      var tmp = this.state.selected;
      tmp[i] = !tmp[i];
      this.setState({selected: tmp})
  }

  openImageModal(i){
    var state = this.state.showImageModal
    state[i] = true;
    this.setState({ showImageModal: state });
  }

  closeImageModal(i){
    var state = this.state.showImageModal
    state[i] = false;
    this.setState({ showImageModal: state });
  }

  openEndSerieModal(){
    this.setState({showEndModal: true})
  }

  openChangeCatModal(){
    this.setState({showChangeCatModal: true})
  }

  closeChangeCatModal(){
    this.setState({showChangeCatModal: false})
  }


  render() {
    const obstacleImg = '/images/obstacles/' + this.state.obstacleType + '.png';
    return (
      <>
        {this.state.obstacleTypeChoosed?<>
        <div className={styles.main}>
          <Navbar className="justify-content-between">
            <Form inline>
              <Link href="/main_menu"><img className='lazyload cursorPointer' width="83px" data-src={require('../../images/modos_home.png')} alt='Logo Modos' /></Link>
              <span className="page-title">Sofa app - {this.menu_i18n('obstacle_label_title')}</span>
            </Form>
            <ProgressBar className="my-progress-bar" now={this.state.currentPageIdx * 10 + 1} max={10 * this.props.data.length/3} label={<span>Page {this.state.currentPageIdx + 1}/{this.props.data.length/3}</span>} />
            <Form inline>
              <Link href="/main_menu"><span className='cursorPointer'><img className='lazyload' height="31px" data-src={require('../../images/home.png')} />{this.menu_i18n('back')}</span></Link>
            </Form>
          </Navbar>
          <br />
          
          <Row className="purpleBackground">
            <Col md="1"></Col>
            <Col>
              <Row><br /></Row>
              <Row className="whiteTitle">
                <Col md={6}>Séléctionnez la ou les photos contenant un obstacle de type "{this.obstacles_i18n(this.state.obstacleType)}"<OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Popover id={`popover-positioned-top`}>
                      <Popover.Title as="h3"><img className="lazyload" data-src={require('../../images/tooltip.svg')} /> Qu’est ce qu’un obstacle de type {this.obstacles_i18n(this.state.obstacleType)} ? <img className='lazyload' width="50px" src={obstacleImg} alt='Logo Modos' /></Popover.Title>
                      <Popover.Content>
                        Problème lié à l’accessibilité de certains tronçons piétons, notamment pour franchir un trottoir ou des escaliers. Ces problèmes sont traduits par un manque ou un défaut d’aménagement.
            </Popover.Content>
                    </Popover>
                  }
                >
                  <img className="lazyload tooltipimg" data-src={require('../../images/info.svg')} />
                </OverlayTrigger> puis validez. Si vous ne voyez pas cet obstacle dans une des photos, passez.</Col>
                <Col md={3}><Button onClick={this.addLabelisation.bind(this)} block type="submit">{this.menu_i18n('submit')} <img className="lazyload" data-src={require('../../images/check.svg')} /></Button></Col>
                <Col md={3}><Button onClick={this.state.hidePassModal?this.passLabelisation.bind(this):this.openModalPass.bind(this)} block variant="outline-primary" type="submit">Passer <img className="lazyload" data-src={require('../../images/pass.svg')} /></Button></Col>
              </Row>
              <Row><br /></Row>
            </Col>
            <Col md="1"></Col>
          </Row>
          <Row className="">
            <Col md="1"></Col>
            <Col>
              <Row><br /></Row>
              <Row>
                <Col md="4" className={styles.colImg} onClick={()=>this.toggleImage(0)}>
                  <img className={this.state.selected[0]?"lazyload obstacle-img purpleBorder rotate"+this.state.rotation[0]:"lazyload obstacle-img transparentBorder rotate"+this.state.rotation[0]} src={getApiBase()+this.state.currentObstacles[0]['image']['apiLink']} />
                  <img className={this.state.rotation[0]%180==0?"full_img":"full_img_landscape"} src='/images/full.svg' onClick={(e)=>{e.stopPropagation();this.openImageModal(0);}}/>
                  <img className={this.state.rotation[0]%180==0?"rot_left":"rot_left_landscape"} src='/images/rot_left.svg' onClick={(e)=>{e.stopPropagation();this.rotateLeft(0);}}/>
                  <img className={this.state.rotation[0]%180==0?"rot_right":"rot_right_landscape"} src='/images/rot_right.svg' onClick={(e)=>{e.stopPropagation();this.rotateRight(0);}}/>
                </Col>
                <Col md="4" className={styles.colImg} onClick={()=>this.toggleImage(1)}>
                  <img className={this.state.selected[1]?"lazyload obstacle-img purpleBorder rotate"+this.state.rotation[1]:"lazyload obstacle-img transparentBorder rotate"+this.state.rotation[1]} src={getApiBase()+this.state.currentObstacles[1]['image']['apiLink']} />
                  <img className={this.state.rotation[1]%180==0?"full_img":"full_img_landscape"} src='/images/full.svg' onClick={(e)=>{e.stopPropagation();this.openImageModal(1);}}/>
                  <img className={this.state.rotation[1]%180==0?"rot_left":"rot_left_landscape"} src='/images/rot_left.svg' onClick={(e)=>{e.stopPropagation();this.rotateLeft(1);}}/>
                  <img className={this.state.rotation[1]%180==0?"rot_right":"rot_right_landscape"} src='/images/rot_right.svg' onClick={(e)=>{e.stopPropagation();this.rotateRight(1);}}/>
                </Col>
                <Col md="4" className={styles.colImg} onClick={()=>this.toggleImage(2)}>
                  <img className={this.state.selected[2]?"lazyload obstacle-img purpleBorder rotate"+this.state.rotation[2]:"lazyload obstacle-img transparentBorder rotate"+this.state.rotation[2]} src={getApiBase()+this.state.currentObstacles[2]['image']['apiLink']} />
                  <img className={this.state.rotation[2]%180==0?"full_img":"full_img_landscape"} src='/images/full.svg' onClick={(e)=>{e.stopPropagation();this.openImageModal(2);}}/>
                  <img className={this.state.rotation[2]%180==0?"rot_left":"rot_left_landscape"} src='/images/rot_left.svg' onClick={(e)=>{e.stopPropagation();this.rotateLeft(2);}}/>
                  <img className={this.state.rotation[2]%180==0?"rot_right":"rot_right_landscape"} src='/images/rot_right.svg' onClick={(e)=>{e.stopPropagation();this.rotateRight(2);}}/>
                  </Col>
              </Row>
              <Row><br /></Row>
            </Col>
            <Col md="1"></Col>
          </Row>
        </div>

        </>:<>

        <div className={styles.main}>
          <Navbar className="justify-content-between">
            <Form inline>
              <Link href="/main_menu"><img className='lazyload cursorPointer' width="83px" data-src={require('../../images/modos_home.png')} alt='Logo Modos' /></Link>
              <span className="page-title">Sofa app - {this.menu_i18n('obstacle_label_title')}</span>
            </Form>
            
            <Form inline>
              <Link href="/main_menu"><span className='cursorPointer'><img className='lazyload' height="31px" data-src={require('../../images/home.png')} />{this.menu_i18n('back')}</span></Link>
            </Form>
          </Navbar>
          <br />
          
          <Row className="purpleBackground">
            <Col md="1"></Col>
            <Col>
              <Row><br /></Row>
              <Row className="whiteTitle">
                <Col>Une série de 5 pages de 3 photographies vous sera présentée.<br/>Pour chaque photographie, vous devrez indiquer si vous y voyez un obstacle à la mobilité piétonne du type suivant :</Col>
              </Row>
              <Row><br /></Row>
            </Col>
            <Col md="1"></Col>
          </Row>
          <Row className="">
            <Col md="1"></Col>
            <Col>
              <Row><br /></Row>
              <Row>
                <Col md="4"></Col>
                <Col md="4" className="center"><img className="lazyload" src={obstacleImg} /><br/><span className="obstacleName">{this.obstacles_i18n(this.state.obstacleType)}<OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Popover id={`popover-positioned-top`}>
                      <Popover.Title as="h3"><img className="lazyload" data-src={require('../../images/tooltip.svg')} /> Qu’est ce qu’un obstacle de type {this.obstacles_i18n(this.state.obstacleType)} ? <img className='lazyload' width="50px" src={obstacleImg} alt='Logo Modos' /></Popover.Title>
                      <Popover.Content>
                        Problème lié à l’accessibilité de certains tronçons piétons, notamment pour franchir un trottoir ou des escaliers. Ces problèmes sont traduits par un manque ou un défaut d’aménagement.
            </Popover.Content>
                    </Popover>
                  }
                >
                  <img className="lazyload tooltipimg" data-src={require('../../images/info_violet.svg')} />
                </OverlayTrigger></span>
                <br/><br/><br/><br/>
                <Button className="whitebg-button" variant="outline-primary" onClick={this.start.bind(this)}>Commencer</Button>
                <br/><br/><br/><br/>
                <a onClick={this.openChangeCatModal.bind(this)}>choisir une autre catégorie d’obstacle</a>
                </Col>
                <Col md="4"></Col>
              </Row>
              <Row><br /></Row>
            </Col>
            <Col md="1"></Col>
          </Row>
        </div>
        </>}
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
        <Modal show={this.state.showChangeCatModal} onHide={this.closeChangeCatModal.bind(this)} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>Choix la catégorie d’obstacle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Quelle catégorie d’obstacle voulez vous labelliser ?</p>
            <Row>
              <Col md={1}></Col>
              <ObstacleChooserButton categoryId="coating" categoryName={this.obstacles_i18n('coating')} onChange={this.handleCategoryChange} selected={this.state.obstacleType=="coating"}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="obstacle" categoryName={this.obstacles_i18n('obstacle')} onChange={this.handleCategoryChange} selected={this.state.obstacleType=="obstacle"}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="security" categoryName={this.obstacles_i18n('security')} onChange={this.handleCategoryChange} selected={this.state.obstacleType=="security"}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="passability" categoryName={this.obstacles_i18n('passability')} onChange={this.handleCategoryChange} selected={this.state.obstacleType=="passability"}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="slope" categoryName={this.obstacles_i18n('slope')} onChange={this.handleCategoryChange} selected={this.state.obstacleType=="slope"}></ObstacleChooserButton>
              <ObstacleChooserButton categoryId="width" categoryName={this.obstacles_i18n('width')} onChange={this.handleCategoryChange} selected={this.state.obstacleType=="width"}></ObstacleChooserButton>
              <Col md={1}></Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Row>
              <Button onClick={this.closeChangeCatModal.bind(this)} variant="primary">Valider mon choix <img className="lazyload" data-src={require('../../images/check.svg')} /></Button>
            </Row>
          </Modal.Footer>
        </Modal>
        <ModalImageRotation imglink={getApiBase()+this.state.currentObstacles[0]['image']['apiLink']} showModal={this.state.showImageModal[0]} onModalClose={()=>this.closeImageModal(0)} rotation={this.state.rotation[0]} rotateLeft={()=>this.rotateLeft(0)} rotateRight={()=>this.rotateRight(0)}></ModalImageRotation>
        <ModalImageRotation imglink={getApiBase()+this.state.currentObstacles[1]['image']['apiLink']} showModal={this.state.showImageModal[1]} onModalClose={()=>this.closeImageModal(1)} rotation={this.state.rotation[1]} rotateLeft={()=>this.rotateLeft(1)} rotateRight={()=>this.rotateRight(1)}></ModalImageRotation>
        <ModalImageRotation imglink={getApiBase()+this.state.currentObstacles[2]['image']['apiLink']} showModal={this.state.showImageModal[2]} onModalClose={()=>this.closeImageModal(2)} rotation={this.state.rotation[2]} rotateLeft={()=>this.rotateLeft(2)} rotateRight={()=>this.rotateRight(2)}></ModalImageRotation>
        <ModalEndSerie showModal={this.state.showEndModal} type="labelisé" nb={this.state.doneInSerie}></ModalEndSerie>
      </>
    )
  }
};
export default NewLabelisationObstacleLoaded;
