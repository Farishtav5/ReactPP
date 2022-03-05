import React, { Component } from "react";
import { DatePicker, Row, Col } from "antd";
import "antd/dist/antd.css";
import "../widget/DatePicker/Datepicker.css";

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (date, dateString) => {
    this.props.change(this.props.id, dateString);
  };
  render() {
    // console.log(this.props.id);
    return (
      <div id={this.props.id} class="date">
        <Row>
          <Col>
            <DatePicker
              size="small"
              style={{
                marginTop: this.props.id === "DateOfBirth" ? "7px" : "11px",
                width: this.props.id === "DateOfBirth" ? "9vw" : "80px",
              }}
              // format={"YYYY-MM-DD"}
              format={"MM/DD/YYYY"}
              id={this.props.id}
              onChange={this.handleChange}
            ></DatePicker>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Date;
