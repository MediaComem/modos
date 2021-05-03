/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, {Component   } from 'react';
import { Button, FormGroup, FormControl, Row, Col } from "react-bootstrap";
import styles from './evaluation_obstacles.module.scss';
import { getObservationsToValidate, getEvaluationsForObservation } from '../libs/modos_api';
import ValidationObstacleLoaded from '../components/general-ui/ValidationObstacleLoaded';
import { Cookies } from 'react-cookie'

const cookies = new Cookies();
const token = cookies.get('token')

type State = {
  data?: Array<Map<String, String>>
}
class Validation_Obstacle extends Component<{lang:String}, State> {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    
  }
  componentDidMount() {
    this.renderMyData();
}
renderMyData() {
  getObservationsToValidate()
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ data: responseJson })
    })
    .catch((error) => {
      console.error(error);
    });
}


render(){
  return (
    <div className={styles.main}>
      {this.state.data && this.props.lang ? <ValidationObstacleLoaded lang={this.props.lang} data={this.state.data}></ValidationObstacleLoaded> : <h3>Loading</h3>}
      
    </div>
  );
}
};
export default Validation_Obstacle;
