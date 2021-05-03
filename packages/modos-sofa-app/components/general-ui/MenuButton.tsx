/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import { i18n } from '../../libs';
import Link from 'next/link'

class MenuButton extends Component<{ title: String, subtitle: String, logo: String, link: string, isOk: boolean, errorFunc: ()=>any }, {}> {
    hi18n: (value: any) => any
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Link href={this.props.isOk?this.props.link:"#"}>
            <div onClick={this.props.isOk?(event)=>{}:(event)=> {this.props.errorFunc()}} className="menuCategory">
                <Row>
                    <Col md="2">
                        <img height="130" className="lazyload" data-src={require('../../images/' + this.props.logo)} />
                    </Col>
                    <Col md="10">
                        <span className="menuCategoryTitle">{this.props.title}<br />
                            <span className="menuCategorySubtitle">{this.props.subtitle}</span>
                        </span>
                    </Col>
                </Row>
            </div>
            </Link>
        );
    }
}
export default MenuButton;
