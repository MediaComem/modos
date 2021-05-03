/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import { i18n } from '../../libs';
import styles from './menu_header.module.scss';

class MenuHeader extends Component<{lang:String}, {}> {
    hi18n: (value: any) => any
    constructor(props) {
        super(props);
        this.hi18n = value => i18n('header', value, props.lang)
    }
    render() {
        return (
            <div className={styles.headerDiv}>
                <Row>
                    <Col md="2"><img className='lazyload' width="115px" data-src={require('../../images/modos_home.png')} alt='Logo Modos' /></Col>
                    <Col className={styles.headerTitle}><span>{this.hi18n("title")}</span></Col>
                </Row>
                <Row>
                    <Col md="2" className={styles.headerSofaapp}>SofaApp</Col>
                    <Col className={styles.headerSubtitle}>{this.hi18n("subtitle")}</Col>
                </Row>
            </div>
        );
    }
}
export default MenuHeader;
