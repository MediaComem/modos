/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { i18n } from '../../libs';

interface IObstacleChooserButtonProps {
    categoryId: String,
    categoryName: String,
    onChange: (newval: String) => void ,
    selected: boolean
}

class ObstacleChooserButton extends Component<IObstacleChooserButtonProps, {}> {
  helper_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.helper_i18n = value => i18n('helper', value, props.lang);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(changeEvent) {
      this.props.onChange(this.props.categoryId)
  }


  render() {

    return (
      <Col><Button className={this.props.selected?"categoryChooserBt selectedCategoryChooserBt":"categoryChooserBt"} onClick={this.handleChange} block variant="outline-primary"><img src={"/images/obstacles/"+this.props.categoryId+".png"} width="100"/><br/>{this.props.categoryName}<br/><OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Popover id={`popover-positioned-top`}>
          <Popover.Title as="h3"><img className="lazyload" data-src={require('../../images/tooltip.svg')} /> Qu’est ce qu’un obstacle de type {this.props.categoryName} ? <img className='lazyload' width="50px" src={"/images/obstacles/"+this.props.categoryId+".png"} alt='Logo Modos' /></Popover.Title>
          <Popover.Content>
            Problème lié à l’accessibilité de certains tronçons piétons, notamment pour franchir un trottoir ou des escaliers. Ces problèmes sont traduits par un manque ou un défaut d’aménagement.
</Popover.Content>
        </Popover>
      }
    >
      <img className="lazyload tooltipimg" data-src={require('../../images/info.svg')} />
    </OverlayTrigger></Button></Col>
    );
  }
};
export default ObstacleChooserButton;

