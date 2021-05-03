/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import Router from 'next/router'
import styles from './index.module.scss';
import { getEvaluationsForUser, getObservationsToEvaluate, getValidationsForUser } from '../libs/modos_api';
import MainMenuLoaded from '../components/general-ui/MainMenuLoaded';
import { getMenu } from '../libs/modos_api';
import { Cookies } from 'react-cookie'

const cookies = new Cookies();
const token = cookies.get('token')
type State = {
  dataMenu?: any
}
class Main_Menu extends Component<{lang:String}, State> {
  constructor(props) {
    super(props);
    this.state = {
      dataMenu : null
    };
  }
  componentDidMount() {
    this.renderMyData();
  }

  logout() {
    cookies.set('isLogged', "false");
    cookies.remove('token');
    cookies.remove('profile');
    cookies.remove('username');
    Router.push('/index');
  }
  
  renderMyData() {
    getMenu()
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataMenu: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    return (
      <div className={styles.main}>
        {this.state.dataMenu ? <MainMenuLoaded lang={this.props.lang} dataMenu={this.state.dataMenu}></MainMenuLoaded>: <><h3>Loading</h3><a onClick={(event) => { this.logout() }}>Logout</a></> }
      </div>
    );
  }
};
export default Main_Menu;
