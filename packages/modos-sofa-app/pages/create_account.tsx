/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, {useState  } from 'react';
import Router from 'next/router'
import { Button, FormGroup, FormControl, Row, Col } from "react-bootstrap";
import { i18n } from '../libs';
import styles from './index.module.scss';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const Home = props => {
  const hi18n = value => i18n('index', value, props.lang);
  const erri18n = value => i18n('errors', value, props.lang);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
    if(cookies.get("isLogged")=="true"){
      Router.push('/main_menu');
    }


    async function handleSubmit(event) {
      event.preventDefault();
      try {
        const response = await fetch("http://192.168.0.17:3000/api/v1/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "email": email, "password": password })
        });
        if (response.ok) {
          const { token } = await response.json();
          cookies.set('token',token);
          cookies.set('isLogged',"true");
          try {
            const response = await fetch("http://192.168.0.17:3000/api/v1/users/profile", {
              method: "GET",
              headers: { 
                "Content-Type": "application/json" , 
                "authorization": "Bearer "+token
              },
            });
            if (response.ok) {
              const { helper } = await response.json();
              cookies.set('profile',helper);
              Router.push('/main_menu');
            }else{
              Router.push('/main_menu');
            }
          } catch (error) {
            setErrorMsg(erri18n('network_error'));
          }
        } else {
          setErrorMsg(erri18n('login_error'));
        }
      } catch (error) {
        setErrorMsg(erri18n('network_error'));
      }
    }
  return (
    <div className={styles.main}>
      <img className='lazyload' width="250px" data-src={require('../images/modos_home.png')} alt='Logo Modos' />
      <div className={styles.login}>
        {errorMsg}
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <FormGroup controlId="email">
            <FormControl
              autoFocus
              type="email"
              value={email}
              placeholder={hi18n('mail_placeholder')}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email">
            <FormControl
              autoFocus
              type="email"
              value={email}
              placeholder={hi18n('username_placeholder')}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl
              value={password}
              placeholder={hi18n('pass_placeholder')}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type="submit">
            {hi18n('create_account')}
          </Button>
        </form>
        </div>
        <br/>
        <br/>
        {hi18n('explaining_text')}<br/>
      <a href="https://modos.heig-vd.ch/">{hi18n('modos_project')}</a>
      </div>
  );
};
export default Home;
