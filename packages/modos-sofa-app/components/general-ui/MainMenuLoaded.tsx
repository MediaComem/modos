/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import Router from 'next/router'
import { Button, FormGroup, FormControl, Row, Col, Navbar, Form, ProgressBar, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import styles from '../../pages/index.module.scss';
import {updateUser} from '../../libs/modos_api';
import MenuHeader from './MenuHeader'
import MenuFooter from './MenuFooter'
import MenuButton from './MenuButton'
import LeafletMap, { MarkerInfo } from './LeafletMap';
import { Cookies } from 'react-cookie';
import { i18n } from '../../libs';
const cookies = new Cookies();
const token = cookies.get('token')
type State = {
    errorMsg: string,
    createAccountErrorMsg: string,
    modalAnonym: boolean,
    modalCreateAccount: boolean,
    modalCreatedAccount: boolean,
    email: string,
    username: string,
    password: string,
    password2: string,
    secBeforeLogin: number,
    hideCreateAccountPage: boolean
}
interface IMainMenuProps {
    lang: String,
    dataMenu?: any
}

class MainMenuLoaded extends Component<IMainMenuProps, State> {
    obstacles_i18n: (value: any) => any
    menu_i18n: (value: any) => any
    constructor(props) {
        super(props);
        this.menu_i18n = value => i18n('menu', value, props.lang)
        this.showErrorLabel = this.showErrorLabel.bind(this);
        this.showErrorEvaluate = this.showErrorEvaluate.bind(this);
        this.showErrorValidate = this.showErrorValidate.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPassword2 = this.setPassword2.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.changeHideCreateAccountPage = this.changeHideCreateAccountPage.bind(this);
        this.state = { errorMsg: "", createAccountErrorMsg:"", modalAnonym: props.dataMenu['evaluations']==undefined?false:cookies.get('ano') == "true" && cookies.get('hideCreateAccountPage') == "false" && (props.dataMenu['labelisations'].length>0 || props.dataMenu['evaluations'].length>0 || props.dataMenu['validations'].length>0), modalCreateAccount: false, modalCreatedAccount: false, username: "", email: "", password: "", password2: "", secBeforeLogin: 10, hideCreateAccountPage: cookies.get("hideCreateAccountPage")=="true" }
    }

    logout() {
        cookies.set('isLogged', "false", { path: '/' });
        cookies.remove('token', { path: '/' });
        cookies.remove('profile', { path: '/' });
        cookies.remove('username', { path: '/' });
        Router.push('/index');
    }

    reloadPage(){
        Router.push('/index');
    }

    changeHideCreateAccountPage(changeEvent){
        this.setState({hideCreateAccountPage: changeEvent.target.checked});
        cookies.set('hideCreateAccountPage', changeEvent.target.checked?"true":"false", { path: '/' });
    }

    setEmail(newval) { this.setState({ email: newval }); }
    setUsername(newval) { this.setState({ username: newval }); }
    setPassword(newval) { this.setState({ password: newval }); }
    setPassword2(newval) { this.setState({ password2: newval }); }

    showErrorLabel() {
        this.setState({ errorMsg: "Aucun obstacle à labeliser" });
    }
    showErrorEvaluate() {
        this.setState({ errorMsg: "Aucun obstacle à évaluer" });
    }
    showErrorValidate() {
        this.setState({ errorMsg: "Aucun obstacle à valider" });
    }

    showModalAnonym() {
        this.setState({ modalAnonym: true });
    }

    closeModalAnonym() {
        this.setState({ modalAnonym: false });
    }

    showModalCreateAccount() {
        this.setState({ modalCreateAccount: true });
        this.setState({ modalAnonym: false });
    }

    showModalCreatedAccount() {
        this.setState({ modalCreateAccount: false });
        this.setState({ modalCreatedAccount: true });
    }

    closeModalCreateAccount() {
        this.setState({ modalCreateAccount: false });
    }

    validateForm() { return this.state.email.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.password==this.state.password2; }

    async updateUserBt(){
        const response = await updateUser(this.state.username, this.state.email, this.state.password);
        if (response.ok) {
            this.showModalCreatedAccount();
            cookies.set('username', this.state.username, { path: '/' });
            cookies.set('ano', "false", { path: '/' });
        }else{
            if(response.status==409){
                this.setState({createAccountErrorMsg: "Erreur: nom d'utilisateur ou email déjà utilisée"})
            }else{
                this.setState({createAccountErrorMsg: "Erreur: email non valide"})
            }
        }
    }

    render() {
        const dataLabelisations = this.props.dataMenu['labelisations'];
        const dataEvaluations = this.props.dataMenu['evaluations'];
        const dataValidations = this.props.dataMenu['validations'];
        const dailyChallenges = this.props.dataMenu['todayChallenges'];
        if (!dataLabelisations || !dataEvaluations || !dataValidations || !dailyChallenges) {
            this.logout();
            return (<h3>Token error, you will be redirected to login page</h3>)
        }
        var points = 0;
        const username = cookies.get('username')
        const helper = cookies.get('helper')
        const age = cookies.get('ageRange')
        const anonym = cookies.get('ano') == "true"
        const showValidation = true; //for testing, everyone can access to validation// helper != "no helper" || age == "66 +";
        var markers = []
        var debug = "";
        for (var i = 0; i < dataLabelisations.length; i++) {
            points += 1;
            markers.push(new MarkerInfo(
                dataLabelisations[i]['observation']['location']['latitude'],
                dataLabelisations[i]['observation']['location']['longitude'],
                1));
        }
        for (var i = 0; i < dataEvaluations.length; i++) {
            points += 1;
            markers.push(new MarkerInfo(
                dataEvaluations[i]['observation']['location']['latitude'],
                dataEvaluations[i]['observation']['location']['longitude'],
                2));
        }
        for (var i = 0; i < dataValidations.length; i++) {
            points += 1;
            markers.push(new MarkerInfo(
                dataValidations[i]['observation']['location']['latitude'],
                dataValidations[i]['observation']['location']['longitude'],
                3));
        }
        points += parseInt(this.props.dataMenu['challengeScore']);

        return (
            <><div className={styles.main}>
                <MenuHeader lang={this.props.lang} />
                {anonym ? <>
                    <div className="profilInfo">
                        <img onClick={this.showModalAnonym.bind(this)} className="lazyload" data-src={require('../../images/anonym.svg')} />
                        <span className="profilUsername">Session anonyme</span>
                        <span className="profilPts">{points} pts</span>
                    </div>
                </> : <>
                        <div className="profilInfo">
                            <img className="lazyload" data-src={require('../../images/profilpic.svg')} />
                            <span className="profilUsername">{username}</span>
                            <span className="profilPts">{points} pts</span>
                        </div>
                    </>}

                <div className="dailyObj">
                    <span className="dailyObjTitle">Défis du jour</span>
                    <hr className="dailyObjHrTitle" />
                    <span className={dailyChallenges[0]['nbCrt'] == dailyChallenges[0]['nbGoal'] ? "dailyObjName dailyObjDone" : "dailyObjName"}>{this.menu_i18n(dailyChallenges[0]['type'])} {dailyChallenges[0]['nbGoal']} obstacles</span>
                    <span className={dailyChallenges[0]['nbCrt'] == dailyChallenges[0]['nbGoal'] ? "dailyObjVal dailyObjDone" : "dailyObjVal"}>{dailyChallenges[0]['nbCrt']} / {dailyChallenges[0]['nbGoal']}</span>
                    <hr className="dailyObjHrSeparator" />
                    <span className={dailyChallenges[1]['nbCrt'] == dailyChallenges[1]['nbGoal'] ? "dailyObjName dailyObjDone" : "dailyObjName"}>{this.menu_i18n(dailyChallenges[1]['type'])} {dailyChallenges[1]['nbGoal']} obstacles</span>
                    <span className={dailyChallenges[1]['nbCrt'] == dailyChallenges[1]['nbGoal'] ? "dailyObjVal dailyObjDone" : "dailyObjVal"}>{dailyChallenges[1]['nbCrt']} / {dailyChallenges[1]['nbGoal']}</span>
                    <hr className="dailyObjHrSeparator" />
                    <span className={dailyChallenges[2]['nbCrt'] == dailyChallenges[2]['nbGoal'] ? "dailyObjName dailyObjDone" : "dailyObjName"}>{this.menu_i18n(dailyChallenges[2]['type'])} {dailyChallenges[2]['nbGoal']} obstacles</span>
                    <span className={dailyChallenges[2]['nbCrt'] == dailyChallenges[2]['nbGoal'] ? "dailyObjVal dailyObjDone" : "dailyObjVal"}>{dailyChallenges[2]['nbCrt']} / {dailyChallenges[2]['nbGoal']}</span>
                </div>
                <div className="contentMenu">
                    {this.state.errorMsg == "" ? <></> : <><span className="menuErr">{this.state.errorMsg}</span><br /></>}
                    <span className="menuTitle">De quelle manière voulez-vous contribuer ?</span>
                    <Row>
                        <Col>
                            <MenuButton title={this.menu_i18n('obstacle_label_title')} subtitle={this.menu_i18n('obstacle_label_subtitle')} logo="label.png" link="/labelisation_obstacles" isOk={this.props.dataMenu['canLabelise']} errorFunc={this.showErrorLabel}></MenuButton>
                            <MenuButton title={this.menu_i18n('obstacle_evaluate_title')} subtitle={this.menu_i18n('obstacle_evaluate_subtitle')} logo="evaluate.png" link="/evaluation_obstacles" isOk={this.props.dataMenu['canEvaluate']} errorFunc={this.showErrorEvaluate}></MenuButton>
                            {showValidation ? <><MenuButton title={this.menu_i18n('obstacle_validate_title')} subtitle={this.menu_i18n('obstacle_validate_subtitle')} logo="validate.png" link="/validation_obstacles" isOk={this.props.dataMenu['canValidate']} errorFunc={this.showErrorValidate}></MenuButton></> : <></>}
                        </Col>
                        <Col>
                            <div className="myObservations">
                                <div className="myObservationsTitleDiv"><span className="menuTitle">Mes observations</span></div>
                                <div className="myObservationsIconsDiv">
                                    <Row className="justify-content-md-center">
                                        <Col md="2" className="center">
                                            <img height="80" className="lazyload" data-src={require('../../images/label.png')} /><br />{dataLabelisations.length}
                                        </Col><Col md="2" className="center">
                                            <img height="80" className="lazyload" data-src={require('../../images/evaluate.png')} /><br />{dataEvaluations.length}
                                        </Col>{showValidation ? <><Col md="2" className="center">
                                            <img height="80" className="lazyload" data-src={require('../../images/validate.png')} /><br />{dataValidations.length}
                                        </Col></> : <></>}
                                    </Row>
                                </div>
                                <div>
                                    <LeafletMap center={{ lat: 46.7833, lng: 6.65 }} markers={markers} height={326}></LeafletMap>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row></Row>
                <Button onClick={(event) => { this.logout() }}>{anonym ? "Retour à l'accueil" : this.menu_i18n('logout')}</Button>
            </div>
                <Modal show={this.state.modalAnonym} onHide={this.closeModalAnonym.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title><img className="lazyload" data-src={require('../../images/exclamation.svg')} /> Session anonyme </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Vous êtes actuellement en train d’utiliser l’application de manière <b>anonyme</b>.  <br /><br />Voulez-vous créer un compte pour sauvegarder votre progression et retrouver vos observations ? </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <input className="impact-radio" checked={this.state.hideCreateAccountPage} type="checkbox" onChange={this.changeHideCreateAccountPage}></input>Ne plus montrer cette fenêtre
                        <Button onClick={this.closeModalAnonym.bind(this)} variant="outline-primary">Non, continuer sans compte</Button>
                        <Button onClick={this.showModalCreateAccount.bind(this)} variant="primary">Oui, créer un compte <img className="lazyload" data-src={require('../../images/passwhite.svg')} /></Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalCreateAccount} onHide={this.closeModalCreateAccount.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title><img className="lazyload" data-src={require('../../images/exclamation.svg')} /> Création d'un compte </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <p>{this.state.createAccountErrorMsg}</p>
                            <FormGroup controlId="email">
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    placeholder="Adresse email"
                                    onChange={e => this.setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="username">
                                <FormControl
                                    value={this.state.username}
                                    placeholder="Nom d'utilisateur"
                                    onChange={e => this.setUsername(e.target.value)}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <FormControl
                                    value={this.state.password}
                                    placeholder="Mot de passe"
                                    onChange={e => this.setPassword(e.target.value)}
                                    type="password"
                                />
                            </FormGroup>
                            <FormGroup controlId="password2">
                                <FormControl
                                    value={this.state.password2}
                                    placeholder="Vérification du mot de passe"
                                    onChange={e => this.setPassword2(e.target.value)}
                                    type="password"
                                />
                            </FormGroup>
                    </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.closeModalCreateAccount.bind(this)} variant="outline-primary">Annuler</Button>
                            <Button disabled={!this.validateForm()} onClick={this.updateUserBt.bind(this)} variant="primary">Créer le compte</Button>
                        </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalCreatedAccount}>
                    <Modal.Header>
                        <Modal.Title><img className="lazyload" data-src={require('../../images/exclamation.svg')} /> Compte créé </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ReactInterval timeout={1000} enabled={this.state.modalCreatedAccount} callback={() => {
                        this.setState({secBeforeLogin: this.state.secBeforeLogin - 1});
                        if(this.state.secBeforeLogin==0){
                            this.reloadPage()
                        }; 
                        } } />
                <p>Votre compte a été créé. La page va être rechargée dans {this.state.secBeforeLogin} secondes</p>
                        <p onClick={(event) => { this.reloadPage() }}>Recharger maintenant</p>
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
};
export default MainMenuLoaded;

