/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import styles from './evaluation_obstacles.module.scss';
import { getObservationsToEvaluate } from '../libs/modos_api';
import EvaluationObstacleLoaded from '../components/general-ui/EvaluationObstacleLoaded';
import { Cookies } from 'react-cookie'

const cookies = new Cookies();
const token = cookies.get('token')
type State = {
  data?:Array<Map<String,String>>
}
class Evaluation_Obstacle extends Component<{lang:String}, State> {
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
  getObservationsToEvaluate()
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
        {this.state.data && this.props.lang ? <EvaluationObstacleLoaded lang={this.props.lang} data={this.state.data}></EvaluationObstacleLoaded>: <h3>Loading</h3> }
      </div>
    );
  }
};
export default Evaluation_Obstacle;
