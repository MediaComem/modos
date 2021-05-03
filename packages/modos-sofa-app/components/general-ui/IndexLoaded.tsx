/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { useState, Component } from 'react';
import Router from 'next/router'
import { Button, FormGroup, FormControl, Row, Col } from "react-bootstrap";
import { i18n } from '../../libs';
import MenuHeader from './MenuHeader'
import MenuFooter from './MenuFooter'
import MobilityChooserButton from './MobilityChooserButton'
import AgeChooserButton from './AgeChooserButton'
import { login, getProfile, setProfile, getUser, addAnonymUser, addUser, loginAnonym } from '../../libs/modos_api';
import styles from './index.module.scss';
import { Cookies } from 'react-cookie';
import Link from 'next/link'
const cookies = new Cookies();
type State = {
  email: string,
  password: string,
  errorMsg: string,
  loginState: number, // 0: login form, 1: create account , 2: choose mobility, 3: choose age
  anonym: boolean,
  newuser: boolean,
  newEmail: string,
  newPass1: string,
  newPass2: string,
  newUsername: string,
  btMobility: string,
  btAge: string
}

interface IIndexProps {
  lang: String
}

class IndexLoaded extends Component<IIndexProps, State> {
  hi18n: (value: any) => any
  erri18n: (value: any) => any
  constructor(props) {
    super(props);
    this.hi18n = value => i18n('index', value, props.lang);
    this.erri18n = value => i18n('errors', value, props.lang);
    this.state = { email: "", password: "", errorMsg: "", loginState: 0, anonym: false, newuser: false, newUsername:"",newPass1:"",newPass2:"",newEmail:"", btMobility: "", btAge: "" };
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);

    this.setNewEmail = this.setNewEmail.bind(this);
    this.setNewPass1 = this.setNewPass1.bind(this);
    this.setNewPass2 = this.setNewPass2.bind(this);
    this.setNewUsername = this.setNewUsername.bind(this);

    this.validateForm = this.validateForm.bind(this);
    this.validateNewUserForm = this.validateNewUserForm.bind(this)
    this.continue_user = this.continue_user.bind(this);
    this.continue_anonym = this.continue_anonym.bind(this);
    this.continue_new_user = this.continue_new_user.bind(this);
    this.changeAge = this.changeAge.bind(this);
    this.changeMobility = this.changeMobility.bind(this);
    this.setStep = this.setStep.bind(this);
    this.addProfile = this.addProfile.bind(this);
    this.add_new_user = this.add_new_user.bind(this);
  }

  setEmail(newval) { this.setState({ email: newval }); }
  setPassword(newval) { this.setState({ password: newval }); }
  setNewEmail(newval) { this.setState({ newEmail: newval }); }
  setNewPass1(newval) { this.setState({ newPass1: newval }); }
  setNewPass2(newval) { this.setState({ newPass2: newval }); }
  setNewUsername(newval) { this.setState({ newUsername: newval }); }
  changeMobility(newval) { this.setState({ btMobility: newval }) }
  changeAge(newval) { this.setState({ btAge: newval }) }
  setStep(newval) { this.setState({ loginState: newval }) }

  continue_anonym() {
    this.setState({ loginState: 2, anonym: true });
  }

  continue_new_user() {
    this.setState({ loginState: 1, anonym: false });
  }

  async addProfile() {
    if (this.state.anonym) {
      try {
        const anonymId = Date.now();
        const response = await addAnonymUser(anonymId);
        if (response.ok) {
          try {
            const response = await loginAnonym(anonymId);
            if (response.ok) {
              const { token } = await response.json();
              cookies.set('token', token);
              try {
                const response = await setProfile(this.state.btMobility,this.state.btAge);
                if (response.ok) {
                  cookies.set('isLogged', "true", { path: '/' });
                  cookies.set('ano', "true", { path: '/' });
                  cookies.set('hideCreateAccountPage', "false", { path: '/' });
                  cookies.set('helper', this.state.btMobility, { path: '/' });
                  cookies.set('ageRange', this.state.btAge, { path: '/' });
                  cookies.set('disabledProfiles', 0, {path: '/'});
                  cookies.set('hidePassModal', "false", {path: '/'});
                  Router.push('/main_menu');
                }
                else{
                  this.setState({ errorMsg: this.erri18n('network_error') });
                  this.setState({ loginState: 0 });
                }
              }
              catch (error) {
                this.setState({ errorMsg: this.erri18n('network_error') });
                this.setState({ loginState: 0 });
              }
            }
            else{
              this.setState({ errorMsg: this.erri18n('network_error') });
              this.setState({ loginState: 0 });
            }
          }
          catch (error) {
            this.setState({ errorMsg: this.erri18n('network_error') });
            this.setState({ loginState: 0 });
          }
        }
        else{
          this.setState({ errorMsg: this.erri18n('network_error') });
          this.setState({ loginState: 0 });
        }
      }
      catch (error) {
        this.setState({ errorMsg: this.erri18n('network_error') });
        this.setState({ loginState: 0 });
      }
    } else {
      try {
        const response = await setProfile(this.state.btMobility,this.state.btAge);
        if (response.ok) {
          cookies.set('isLogged', "true", { path: '/' });
          cookies.set('ano', "false", { path: '/' });
          cookies.set('helper', this.state.btMobility, { path: '/' });
          cookies.set('ageRange', this.state.btAge, { path: '/' });
          cookies.set('disabledProfiles', 0, {path: '/'});
          cookies.set('hidePassModal', "false", {path: '/'});
          Router.push('/main_menu');
        }
        else{
          this.setState({ errorMsg: this.erri18n('network_error') });
          this.setState({ loginState: 0 });
        }
      }
      catch (error) {
        this.setState({ errorMsg: this.erri18n('network_error') });
        this.setState({ loginState: 0 });
      }
  }
}

validateForm() { return this.state.email.length > 0 && this.state.password.length > 0; }
validateNewUserForm() { return this.state.newEmail.length > 0 && this.state.newPass1.length > 0 && this.state.newPass1 == this.state.newPass2 && this.state.newUsername.length>0 }

async continue_user() {
  try {
    const response = await login(this.state.email, this.state.password)
    if (response.ok) {
      const { token } = await response.json();
      cookies.set('token', token, { path: '/' });
      try {
        const response = await getUser();
        if (response.ok) {
          const { pseudonym } = await response.json();
          cookies.set('username', pseudonym, { path: '/' });
          try {
            const response = await getProfile();
            if (response.ok) {
              const { helper, ageRange, disabledProfilesMask, hidePassModal } = await response.json();
              cookies.set('ano', "false", {path: '/'});
              cookies.set('isLogged', "true", { path: '/' });
              cookies.set('helper', helper, { path: '/' });
              cookies.set('ageRange', ageRange, { path: '/' });
              cookies.set('disabledProfiles', disabledProfilesMask, {path: '/'});
              cookies.set('hidePassModal', hidePassModal?"true":"false", {path: '/'});
              Router.push('/main_menu');
            } else {
              this.setState({ loginState: 2 });
            }
          }

          catch (error) {
            this.setState({ errorMsg: this.erri18n('network_error') });
          }
        }
      } catch (error) {
        this.setState({ errorMsg: this.erri18n('network_error') });
      }
    } else {
      this.setState({ errorMsg: this.erri18n('login_error') });
    }
  } catch (error) {
    this.setState({ errorMsg: this.erri18n('network_error') });
  }
}

async add_new_user() {
  try {
    const response = await addUser(this.state.newUsername,this.state.newEmail, this.state.newPass1);
    if (response.ok) {
      try {
        const response = await login(this.state.newEmail, this.state.newPass1)
        if (response.ok) {
          const { token } = await response.json();
          cookies.set('token', token, { path: '/' });
          try {
            const response = await getUser();
            if (response.ok) {
              const { pseudonym } = await response.json();
              cookies.set('username', this.state.newUsername, { path: '/' });
              this.setState({ loginState: 2 });
            }
          } catch (error) {
            this.setState({ errorMsg: this.erri18n('network_error') });
          }
        } else {
          this.setState({ errorMsg: this.erri18n('login_error') });
        }
      } catch (error) {
        this.setState({ errorMsg: this.erri18n('network_error') });
      }
    }else{
      if(response.status==409){
          this.setState({errorMsg: "Erreur: nom d'utilisateur ou email déjà utilisée"})
      }else{
          this.setState({errorMsg: "Erreur: email non valide"})
      }
    }
  }catch (error) {
    this.setState({ errorMsg: this.erri18n('network_error') });
  }
}

render() {
  if (cookies.get("isLogged") == "true") {
    Router.push('/main_menu');
  }



  return (
    <div className={styles.main}>
      <MenuHeader lang={this.props.lang} />

      {this.state.loginState == 0 ? <><div className={styles.login}>
  <span className="loginFormTitle">CONNEXION</span><br />
  <span className="loginFormSubtitle">Vous pouvez utiliser le même compte sur toutes nos applications</span>
        {this.state.errorMsg}
        <form className={styles.login_form}>
          <FormGroup controlId="email">
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              placeholder={this.hi18n('mail_placeholder')}
              onChange={e => this.setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl
              value={this.state.password}
              placeholder={this.hi18n('pass_placeholder')}
              onChange={e => this.setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block disabled={!this.validateForm()} onClick={this.continue_user} className="loginBt">
            {this.hi18n('login_bt')} <img className="lazyload" data-src={require('../../images/login.svg')} />
          </Button>
        </form>
      </div>
        <div className={styles.no_account_div}>
          <Row>
            <Col>
              <Button block type="submit" variant="outline-primary" className="NoAccountBt" onClick={this.continue_new_user}>
              Créer un compte
            </Button>
            </Col>
            <Col>
            <Button block type="submit" variant="outline-primary" className="NoAccountBt" onClick={this.continue_anonym}>
            {this.hi18n('without_account')} <img className="lazyload" data-src={require('../../images/noaccount.svg')} />
          </Button>
            </Col>
          </Row>
          
          
        </div></> : <></>}
        {this.state.loginState == 1 ? <>
          <div className={styles.login}>
  <span className="loginFormTitle">Création d'un compte</span><br />
        {this.state.errorMsg}
        <form className={styles.login_form}>
          <FormGroup controlId="newEmail">
            <FormControl
              autoFocus
              type="email"
              value={this.state.newEmail}
              placeholder="Addresse e-mail"
              onChange={e => this.setNewEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="newUsername">
            <FormControl
              autoFocus
              type="text"
              value={this.state.newUsername}
              placeholder="Nom d'utilisateur"
              onChange={e => this.setNewUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="newPass1">
            <FormControl
              value={this.state.newPass1}
              placeholder="Mot de passe"
              onChange={e => this.setNewPass1(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="newPass2">
            <FormControl
              value={this.state.newPass2}
              placeholder="Verification du mot de passe"
              onChange={e => this.setNewPass2(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block disabled={!this.validateNewUserForm()} onClick={this.add_new_user} className="loginBt">
            Créer le compte
          </Button>
        </form>
      </div>

      </> : <></>}
      {this.state.loginState == 2 ? <>
        {this.state.anonym ? <>
          <h4>SESSION ANONYME</h4>
          <span>Vous allez accéder à la Sofa App en mode Anonyme. Pour continuer, merci de fournir les informations suivantes.</span>
        </> : <>
            <h4>RENSEIGNER VOTRE PROFIL</h4>
            <span>Il semblerait que vous n'ayez pas encore rempli votre profil. Pour continuer, merci de fournir les informations suivantes.</span>
          </>}

        <Row>
          <Col></Col>
          <Col>
            <Row>
              1/2: Durant vos déplacements, utilisez-vous une aide auxillière ?
                </Row>
            <Row>
              <MobilityChooserButton crtValue={this.state.btMobility} category="no helper" image="nohelper" text="Non, je n'utilise aucune aide" onChange={this.changeMobility} ></MobilityChooserButton>
              <MobilityChooserButton crtValue={this.state.btMobility} category="white cane" image="cane" text="Je m'aide d'une canne" onChange={this.changeMobility} ></MobilityChooserButton>
              <MobilityChooserButton crtValue={this.state.btMobility} category="walker" image="walker" text="Je m'aide d'un tintébin" onChange={this.changeMobility} ></MobilityChooserButton>
              <MobilityChooserButton crtValue={this.state.btMobility} category="wheelchair" image="wheelchair" text="Je me déplace en chaise roulante" onChange={this.changeMobility} ></MobilityChooserButton>
            </Row>
            <Row></Row>
            <Row>
              <Col>{this.state.btMobility != "" ? <><Button onClick={() => { this.setStep(3) }}>Suivant</Button></> : <></>}</Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>

      </> : <></>}

      {this.state.loginState == 3 ? <>
        {this.state.anonym ? <>
          <h4>SESSION ANONYME</h4>
          <span>Vous allez accéder à la Sofa App en mode Anonyme. Pour continuer, merci de fournir les informations suivantes.</span>
        </> : <>
            <h4>RENSEIGNER VOTRE PROFIL</h4>
            <span>Il semblerait que vous n'ayez pas encore rempli votre profil. Pour continuer, merci de fournir les informations suivantes.</span>
          </>}

        <Row>
          <Col></Col>
          <Col>
            <Row>
              2/2: À quelle tranche d'âge appartenez vous ?
                </Row>
            <Row>
              <AgeChooserButton crtValue={this.state.btAge} category="- 25" text="25 et moins" onChange={this.changeAge} ></AgeChooserButton>
              <AgeChooserButton crtValue={this.state.btAge} category="26 - 45" text="26 - 45" onChange={this.changeAge} ></AgeChooserButton>
              <AgeChooserButton crtValue={this.state.btAge} category="46 - 65" text="46 - 65" onChange={this.changeAge} ></AgeChooserButton>
              <AgeChooserButton crtValue={this.state.btAge} category="66 +" text="66 et plus" onChange={this.changeAge} ></AgeChooserButton>
            </Row>
            <Row></Row>
            <Row>
              <Col md={2}>{this.state.btMobility != "" ? <><Button onClick={() => { this.setStep(2) }}>Retour</Button></> : <></>}</Col>
              <Col></Col>
              <Col md={2}>{this.state.btMobility != "" ? <><Button onClick={this.addProfile}>Terminer</Button></> : <></>}</Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>

      </> : <></>}
      <MenuFooter lang={this.props.lang} />
    </div>
  );
}
};
export default IndexLoaded;
