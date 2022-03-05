import React, { Component } from "react";
import { Row, Col, Checkbox } from "antd";
import './Filtercard.css';
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";
import { Filterchart } from "../../store/broadcaster/BroadcastRegister";
import { keys } from "highcharts";

export default class FilterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.radiovalue,
      value: false
    };
  }

  onChange = (value, type) => {
    this.setState({
      checked: value,
      value: !this.state.value
    });
    this.props.checkvalue(this.props.RowValue,type,value)
  };

  render() {
    // console.log(this.props.radiovalue);
    return (
      <Row className='card-content'>
        {/* <Col span={1}>01. </Col> */}
        <Col span={21} className='pl-2'>
          <EllipsisWithTooltip>{this.props.RowValue}</EllipsisWithTooltip>
        </Col>
        <Col span={3} push={1} style={{ float: "right" }}>
          <Checkbox
            checked={this.state.checked}
            onChange={()=>this.onChange(this.state.value,this.props.type)}
          ></Checkbox>
        </Col>
        <hr className="card-content-sepertor mt-2" />
      </Row>
    );
  }
}
