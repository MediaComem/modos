/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { i18n } from '../../libs';

interface IMobilityChooserButtonProps {
    crtValue: String,
    category: String,
    text: String,
    image: String,
    onChange: (newval: String) => void 
}

class MobilityChooserButton extends Component<IMobilityChooserButtonProps, {}> {
  helper_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.helper_i18n = value => i18n('helper', value, props.lang);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(changeEvent) {
      this.props.onChange(this.props.category)
  }

  render() {

    return (
      <Col>
        <Button className="categoryChooserBt" onClick={this.handleChange} block variant={this.props.crtValue==this.props.category?"primary":"outline-primary"}>
          <img src={"/images/category/"+this.props.image+".png"} width="100"/><br/>
          {this.props.text}<br/>
        </Button>
      </Col>
    );
  }
};
export default MobilityChooserButton;

