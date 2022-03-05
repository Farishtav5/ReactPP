import React, { Component } from "react";
import { DatePicker, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./Datepicker.css";

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (date, dateString) => {
    this.props.change(this.props.id, dateString);
  };
  render() {
    return (
      <div id={this.props.id} class="date">
        <Row>
          <Col>
            <DatePicker
              size="small"
              style={{
                width: this.props.id === "dosFromDate" ? "80px" : "80px",
                // marginTop: this.props.id === "dosFromDate" ? "0px" : "4px",
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
