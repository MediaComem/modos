/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import styles from './evaluation_obstacles.module.scss';
import { getObservationsToLabelise } from '../libs/modos_api';
import NewLabelisationObstacleLoaded from '../components/general-ui/NewLabelisationObstacleLoaded';
import { Cookies } from 'react-cookie'

const cookies = new Cookies();
const token = cookies.get('token')
type State = {
  data?:Array<Map<String,String>>
}
class Labelisation_Obstacle extends Component<{lang:String}, State> {
  constructor(props) {
    super(props);
    this.state = {
      data : null
    };
  }
  componentDidMount() {
    this.renderMyData();
  }
  
renderMyData(){
  getObservationsToLabelise(15)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data : responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
}


  render() {
    return (
      <div className={styles.main}>
        {this.state.data && this.props.lang ? <NewLabelisationObstacleLoaded lang={this.props.lang} data={this.state.data}></NewLabelisationObstacleLoaded>: <h3>Loading</h3> }
      </div>
    );
  }
};
export default Labelisation_Obstacle;
