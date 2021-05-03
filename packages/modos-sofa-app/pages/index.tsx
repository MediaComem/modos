/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import styles from './index.module.scss';
import IndexLoaded from '../components/general-ui/IndexLoaded';
import { Cookies } from 'react-cookie'

const cookies = new Cookies();
const token = cookies.get('token')
type State = {
}
interface IIndexProps {
  lang: String
}
class Index extends Component<IIndexProps, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.main}>
        {this.props.lang ? <IndexLoaded lang={this.props.lang}></IndexLoaded>: <h3>Loading</h3> }
      </div>
    );
  }
};
export default Index;
