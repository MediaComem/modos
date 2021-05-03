/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import Router from 'next/router'
import { Button, FormGroup, FormControl, Row, Col, Navbar, Form, ProgressBar, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import styles from './evaluation_obstacles.module.scss';
import LeafletMap from './LeafletMap';
import Link from 'next/link'
import ImpactChooser from './ImpactChooser'
import { getApiBase, addEvaluationForObservation, addLabelisationForObservation, setDisabledProfilesMask, setHidePassModal } from '../../libs/modos_api';
import ObstacleChooserButton from './ObstacleChooserButton';
import ModalImage from './ModalImage';
import ModalEndSerie from './ModalEndSerie';
import { Cookies } from 'react-cookie'
import { i18n } from '../../libs';
const cookies = new Cookies();
const token = cookies.get('token')
type State = {
  selectedNoHelper: Number,
  selectedCane: Number,
  selectedWalker: Number,
  selectedWheelchair: Number,
  currentObstacleIdx: number,
  currentObstacle: Map<String, String>,
  showModalPass: boolean,
  selectedCategory: String,
  freeText: string,
  showModalLabel: boolean,
  showImageModal: boolean,
  showEndModal: boolean,
  doneInSerie: number,
  disabledProfiles: number,
  hidePassModal: boolean
}
interface IEvaluationProps {
  lang: String,
  data?: Array<Map<String, String>>
}

class EvaluationObstacleLoaded extends Component<IEvaluationProps, State> {
  obstacles_i18n: (value: any) => any
  menu_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.obstacles_i18n = value => i18n('obstacles', value, props.lang)
    this.menu_i18n = value => i18n('menu', value, props.lang)
    this.state = { selectedNoHelper: -1, selectedCane: -1, selectedWalker: -1, selectedWheelchair: -1, currentObstacleIdx: 0, currentObstacle: this.props.data[0], showModalPass: false, selectedCategory: "", freeText: "", showModalLabel: false, showImageModal: false, showEndModal: false, doneInSerie: 0, disabledProfiles: cookies.get("disabledProfiles"), hidePassModal: cookies.get("hidePassModal")=="true" };
    this.handleNoHelperChange = this.handleNoHelperChange.bind(this);
    this.handleCaneChange = this.handleCaneChange.bind(this);
    this.handleWalkerChange = this.handleWalkerChange.bind(this);
    this.handleWheelchairChange = this.handleWheelchairChange.bind(this);

    this.handleDisabledNoHelperChange = this.handleDisabledNoHelperChange.bind(this);
    this.handleDisabledCaneChange = this.handleDisabledCaneChange.bind(this);
    this.handleDisabledWalkerChange = this.handleDisabledWalkerChange.bind(this);
    this.handleDisabledWheelchairChange = this.handleDisabledWheelchairChange.bind(this);
    
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleResetCategory = this.handleResetCategory.bind(this);
    this.handleFreetextChange = this.handleFreetextChange.bind(this);

    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.openEndSerieModal = this.openEndSerieModal.bind(this);

    this.updateDisableProfiles = this.updateDisableProfiles.bind(this);
    this.updateHidePassModal = this.updateHidePassModal.bind(this);
  }

  handleNoHelperChange(newval) { this.setState({ selectedNoHelper: newval }); }
  handleCaneChange(newval) { this.setState({ selectedCane: newval }); }
  handleWalkerChange(newval) { this.setState({ selectedWalker: newval }); }
  handleWheelchairChange(newval) { this.setState({ selectedWheelchair: newval }); }

  updateDisableProfiles(newval){
    cookies.set('disabledProfiles', newval, {path: '/'});
    this.setState({disabledProfiles: newval}); 
    setDisabledProfilesMask(newval).then((response)=>response.json()).catch((error)=>{console.error(error)});
  }

  updateHidePassModal(changeEvent){
    cookies.set('hidePassModal', changeEvent.target.checked?"true":"false", {path: '/'});
    this.setState({hidePassModal: changeEvent.target.checked}); 
    setHidePassModal(changeEvent.target.checked).then((response)=>response.json()).catch((error)=>{console.error(error)});
  }

  handleDisabledNoHelperChange(newval) {this.updateDisableProfiles(newval?this.state.disabledProfiles|1:this.state.disabledProfiles & 14 );  }
  handleDisabledCaneChange(newval) { this.updateDisableProfiles(newval?this.state.disabledProfiles|2:this.state.disabledProfiles & 13 ); }
  handleDisabledWalkerChange(newval) { this.updateDisableProfiles(newval?this.state.disabledProfiles|4:this.state.disabledProfiles & 11 ); }
  handleDisabledWheelchairChange(newval) { this.updateDisableProfiles(newval?this.state.disabledProfiles|8:this.state.disabledProfiles & 7 ); }

  addEvaluation() {
    addEvaluationForObservation(this.state.currentObstacle['id'], this.state.selectedNoHelper, this.state.selectedCane, this.state.selectedWalker, this.state.selectedWheelchair)
      .then((response) => response.json())
      .then((responseJson) => {
        const newIdx = this.state.currentObstacleIdx + 1;
        this.setState({doneInSerie: this.state.doneInSerie+1});
        if (newIdx < this.props.data.length) {
          this.setState({ selectedNoHelper: -1, selectedCane: -1, selectedWalker: -1, selectedWheelchair: -1, currentObstacleIdx: newIdx, currentObstacle: this.props.data[newIdx], showImageModal: false });
        } else {
          this.openEndSerieModal();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addLabelisation() {
    addLabelisationForObservation(this.state.currentObstacle['id'], this.state.selectedCategory, String(this.state.freeText))
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({ showModalLabel: false, selectedCategory: "", freeText: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleCategoryChange(newval) { this.setState({ selectedCategory: newval }); }
  handleResetCategory(){this.setState({selectedCategory: ""});}
  handleFreetextChange(event) {this.setState({freeText: event.target.value});}

  passEvaluation() {
    const newIdx = this.state.currentObstacleIdx + 1;
    if (newIdx < this.props.data.length) {
      this.setState({ selectedNoHelper: -1, selectedCane: -1, selectedWalker: -1, selectedWheelchair: -1, currentObstacleIdx: newIdx, currentObstacle: this.props.data[newIdx], showModalPass: false, showImageModal: false });
    } else {
      this.openEndSerieModal();
    }
  }

  openModalPass() {
    this.setState({ showModalPass: true });
  }

  openModalLabel(){
    this.setState({ showModalLabel: true });
  }

  closeModalPass() {
    this.setState({ showModalPass: false });
  }

  closeModalLabel(){
    this.setState({ showModalLabel: false });
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
              <span className="page-title">Sofa app - {this.menu_i18n('obstacle_evaluate_title')}</span>
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
              {this.menu_i18n('obstacle_evaluate_subtitle')}
            </Row>
              <Row>
                <Col md="1"></Col>
                <Col md="3" className={styles.colImg}><img onClick={this.openImageModal} className='lazyload obstacle-img' src={getApiBase()+this.state.currentObstacle['image']['apiLink']} /></Col>
                <Col md="7" className={styles.colImg}><LeafletMap center={{ lat: lat, lng: lng }} markers={[{ lat: lat, lng: lng, type: 1 }]} height={450}></LeafletMap></Col>
                <Col md="1"></Col>
              </Row>
              <Row></Row>
              <Row>
                <Col md={4}><Row>Type d'obstacle: </Row><Row><br/><h3 className={styles.category}>{obstacleText} <OverlayTrigger
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
                <Col md={4}><Button className="whitebg-button" variant="outline-primary" onClick={this.openModalLabel.bind(this)}>Proposer un autre type d’obstacle pour cette photographie</Button></Col>
                <Col></Col>
              </Row>
            </Col>
            <Col md="1"></Col>
          </Row>

          <hr></hr>
          <Row>
            <Col xs={3} className="impact-chooser-col"></Col>
            <Col>À mon avis, l'impact est:</Col>
          </Row>
          <Row>
            <Col xs={3} className="impact-chooser-col"><span className="impact-name"></span><br />Pour une personne:</Col>
            <Col className="center impact-chooser-col"><span className="impact-name"></span><br /><span className="impact-description">Ne plus évaluer ce profile</span></Col>
            <Col className="center impact-chooser-col background-impact-0"><span className="impact-name">{this.obstacles_i18n('impact_0')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_0_description')}</span></Col>
            <Col className="center impact-chooser-col background-impact-1"><span className="impact-name">{this.obstacles_i18n('impact_1')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_1_description')}</span></Col>
            <Col className="center impact-chooser-col background-impact-2"><span className="impact-name">{this.obstacles_i18n('impact_2')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_2_description')}</span></Col>
            <Col className="center impact-chooser-col background-impact-3"><span className="impact-name">{this.obstacles_i18n('impact_3')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_3_description')}</span></Col>
            <Col className="center impact-chooser-col background-impact-4"><span className="impact-name">{this.obstacles_i18n('impact_4')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_4_description')}</span></Col>
            <Col className="center impact-chooser-col background-impact-5"><span className="impact-name">{this.obstacles_i18n('impact_5')}</span><br /><span className="impact-description">{this.obstacles_i18n('impact_5_description')}</span></Col>
            <Col xs={1} className="impact-chooser-remove center"></Col>
          </Row>
          <ImpactChooser lang={this.props.lang} helpername="nohelper" selected={this.state.selectedNoHelper} onChange={this.handleNoHelperChange} showFirstLast={true} disabledProfile={(this.state.disabledProfiles>>0)%2==1} onDisabledChange={this.handleDisabledNoHelperChange}></ImpactChooser>
          <ImpactChooser lang={this.props.lang} helpername="cane" selected={this.state.selectedCane} onChange={this.handleCaneChange} showFirstLast={true} disabledProfile={(this.state.disabledProfiles>>1)%2==1} onDisabledChange={this.handleDisabledCaneChange}></ImpactChooser>
          <ImpactChooser lang={this.props.lang} helpername="walker" selected={this.state.selectedWalker} onChange={this.handleWalkerChange} showFirstLast={true} disabledProfile={(this.state.disabledProfiles>>2)%2==1} onDisabledChange={this.handleDisabledWalkerChange}></ImpactChooser>
          <ImpactChooser lang={this.props.lang} helpername="wheelchair" selected={this.state.selectedWheelchair} onChange={this.handleWheelchairChange} showFirstLast={true} disabledProfile={(this.state.disabledProfiles>>3)%2==1} onDisabledChange={this.handleDisabledWheelchairChange}></ImpactChooser>
          <Row className="bottom-row">
            <Col xs={4}></Col>
            <Col><Button onClick={this.state.hidePassModal?this.passEvaluation.bind(this):this.openModalPass.bind(this)} block variant="outline-primary" type="submit">{this.menu_i18n('pass')} <img className="lazyload" data-src={require('../../images/pass.svg')} /></Button></Col>
            <Col><Button onClick={this.addEvaluation.bind(this)} block type="submit" disabled={this.state.selectedNoHelper < 0 && this.state.selectedCane < 0 && this.state.selectedWalker < 0 && this.state.selectedWheelchair < 0}>{this.menu_i18n('submit')} <img className="lazyload" data-src={require('../../images/check.svg')} /></Button></Col>
          </Row>
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
              <Button onClick={this.passEvaluation.bind(this)} variant="primary">Oui, changer d’obstacle <img className="lazyload" data-src={require('../../images/passwhite.svg')} /></Button>
            </Row>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalLabel} dialogClassName="modal-90w" onHide={this.closeModalLabel.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title><img className="lazyload" data-src={require('../../images/exclamation.svg')} /> Changer la catégorie d'obstacle</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          {this.state.selectedCategory == "" ? <>
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
          </>:<></>}
          {this.state.selectedCategory != "" ? <>
            <Row>
              <Col md={1}></Col>
              <Col>De quelle catégorie d'entrave s'agit-il?</Col>
              <Col md={1}></Col>
            </Row>
            <Row>
              <Col md={1}></Col>
              <Col></Col>
              <ObstacleChooserButton categoryId={this.state.selectedCategory} categoryName={this.obstacles_i18n(this.state.selectedCategory)} onChange={this.handleCategoryChange} selected={false}></ObstacleChooserButton>
                <Col md={7}><Row>{this.state.selectedCategory == "other" ?<>Expliqez pourquoi <span className="red">* (champ obligatoire)</span></>:<>Si vous le souhaitez, vous pouvez ajouter un commentaire</>} :</Row>
                <Row><textarea className="textAreaFreeText" value={this.state.freeText} onChange={this.handleFreetextChange} /></Row></Col>
              <Col md={1}></Col>
            </Row>
          </> : <></>}

          </Modal.Body>

        <Modal.Footer>
          {this.state.selectedCategory != "" ? <><Button onClick={this.handleResetCategory}>Retour</Button></>:<></>}
          <Col></Col>
          <Button onClick={this.closeModalLabel.bind(this)} variant="outline-primary">Annuler <img className="lazyload" data-src={require('../../images/pass.svg')} /></Button>
          <Button onClick={this.addLabelisation.bind(this)} variant="primary" disabled={(this.state.selectedCategory == "" || (this.state.selectedCategory == "other" && this.state.freeText == ""))}>Changer la catégorie de l'obstacle <img className="lazyload" data-src={require('../../images/passwhite.svg')} /></Button>
        </Modal.Footer>
      </Modal>
      <ModalImage imglink={getApiBase()+this.state.currentObstacle['image']['apiLink']} showModal={this.state.showImageModal} onModalClose={this.closeImageModal}></ModalImage>
      <ModalEndSerie showModal={this.state.showEndModal} type="évalué" nb={this.state.doneInSerie}></ModalEndSerie>
      </>
    )
  }
};
export default EvaluationObstacleLoaded;
