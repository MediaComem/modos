/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Row, Col } from "react-bootstrap";
import { i18n } from '../../libs';

interface IImpactChooserProps {
    lang: String,
    helpername: String,
    selected: Number,
    showFirstLast: Boolean,
    disabledProfile: boolean,
    onChange: (newval: Number) => void ,
    onDisabledChange: (newval: Boolean) => void
}

class EvaluationObstacleLoaded extends Component<IImpactChooserProps, {}> {
  helper_i18n: (value: any) => any
  constructor(props) {
    super(props);
    this.helper_i18n = value => i18n('helper', value, props.lang);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDisabledChange = this.handleDisabledChange.bind(this);
  }

  handleChange(changeEvent) {
      this.props.onChange(parseInt(changeEvent.target.value))
  }
  handleDisabledChange(changeEvent) {
    this.props.onDisabledChange(changeEvent.target.checked)
  }
  handleRemove(changeEvent) {
    this.props.onChange(-1)
  }


  render() {

    return (
        <Row className={"background-impact-" + this.props.selected+" impact-row"}>
          {!this.props.showFirstLast?<></>:this.props.helpername=="" ? <Col className="impact-chooser-col"></Col> :
            <>
              <Col xs={3} className="impact-chooser-col"><img className='lazyload category-img' width="50px" data-src={require('../../images/category/'+this.props.helpername+'.png')} /><span className="category-name">{this.helper_i18n(this.props.helpername)}</span></Col>
              <Col className="impact-chooser-col center"><input className="impact-radio" checked={this.props.disabledProfile} type="checkbox" onChange={this.handleDisabledChange}></input></Col>
            </>
          } 
            <Col className="impact-chooser-col center">{this.props.disabledProfile?<></>:<input className="impact-radio" type="radio" value="0" checked={this.props.selected == 0} onChange={this.handleChange} />} </Col>
            <Col className="impact-chooser-col center">{this.props.disabledProfile?<></>:<input className="impact-radio" type="radio" value="1" checked={this.props.selected == 1} onChange={this.handleChange} />} </Col>
            <Col className="impact-chooser-col center">{this.props.disabledProfile?<></>:<input className="impact-radio" type="radio" value="2" checked={this.props.selected == 2} onChange={this.handleChange} />} </Col>
            <Col className="impact-chooser-col center">{this.props.disabledProfile?<></>:<input className="impact-radio" type="radio" value="3" checked={this.props.selected == 3} onChange={this.handleChange} />} </Col>
            <Col className="impact-chooser-col center">{this.props.disabledProfile?<></>:<input className="impact-radio" type="radio" value="4" checked={this.props.selected == 4} onChange={this.handleChange} />} </Col>
            <Col className="impact-chooser-col center">{this.props.disabledProfile?<></>:<input className="impact-radio" type="radio" value="5" checked={this.props.selected == 5} onChange={this.handleChange} />} </Col>
          {this.props.showFirstLast?<Col xs={1} className="impact-chooser-remove center">{this.props.selected<0? "" : <svg onClick={this.handleRemove} width="60" height="60" viewBox="-10 -10 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 0C7.38508 0 0 7.38508 0 16.5C0 25.6149 7.38508 33 16.5 33C25.6149 33 33 25.6149 33 16.5C33 7.38508 25.6149 0 16.5 0ZM16.5 29.8065C9.14819 29.8065 3.19355 23.8518 3.19355 16.5C3.19355 9.14819 9.14819 3.19355 16.5 3.19355C23.8518 3.19355 29.8065 9.14819 29.8065 16.5C29.8065 23.8518 23.8518 29.8065 16.5 29.8065ZM23.273 12.3617L19.1347 16.5L23.273 20.6383C23.5857 20.951 23.5857 21.4567 23.273 21.7694L21.7694 23.273C21.4567 23.5857 20.951 23.5857 20.6383 23.273L16.5 19.1347L12.3617 23.273C12.049 23.5857 11.5433 23.5857 11.2306 23.273L9.72702 21.7694C9.41432 21.4567 9.41432 20.951 9.72702 20.6383L13.8653 16.5L9.72702 12.3617C9.41432 12.049 9.41432 11.5433 9.72702 11.2306L11.2306 9.72702C11.5433 9.41432 12.049 9.41432 12.3617 9.72702L16.5 13.8653L20.6383 9.72702C20.951 9.41432 21.4567 9.41432 21.7694 9.72702L23.273 11.2306C23.5857 11.5433 23.5857 12.049 23.273 12.3617Z" fill="#E70000"/>
</svg>}</Col>:<></>}
        </Row>
    );
  }
};
export default EvaluationObstacleLoaded;

