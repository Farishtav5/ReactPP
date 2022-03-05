import React, { Component } from "react";
import { Row, Col, DatePicker } from "antd";

export default class DateFilter extends Component {
  render() {
    return (
      <div>
        <Row >
        <Col span={6}>
            <button className="filter-button">Yearly</button>
          </Col>
          <Col span={9}>
            <button className="filter-button">Half Yearly</button>
          </Col>
          <Col span={4}>
            <button className="filter-button">Quarterly</button>
          </Col>
          <Col span={12} className='mt-2'>
            <DatePicker picker="month" bordered={false} placeholder="From" />
          </Col>
          <Col span={12}>
            <DatePicker picker="month" bordered={false} placeholder="To" />
          </Col>
        </Row>
      </div>
    );
  }
}
