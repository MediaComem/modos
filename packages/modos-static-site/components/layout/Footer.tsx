import React from 'react';
import { i18n } from '../../libs';

import styles from './Footer.module.scss';


interface Props {
  lang;
}
interface State {}

class Footer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  i18n(value) {
    return i18n('footer', value, this.props.lang);
  }

  render() {
    return (
      <footer className={styles['main-footer']}>

      </footer>
    );
  }
}

export { Footer };
