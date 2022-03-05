import React, { Component } from "react";
import { Row, Col } from "antd";
import "./searchMember.css";

export default class membershipinfo extends Component {
  render() {
    return (
      <div className="p-2 pb-3">
        <Row className="pl-2 member-info-header">
          <Col span={4}>Subscribe ID </Col>
          <Col span={5}>Effective Date </Col>
          <Col span={5}>Term Date </Col>
          <Col span={6}>Address </Col>
          <Col span={4}>Plan Name </Col>
        </Row>
        <hr></hr>
        {/* Calling the Api and binding the data */}
        {this.props.memberinfo.map((item) => {
          return (
            <Row className="p-2 row-details mb-2">
              <Col span={4}>{item.SubscriberID} </Col>
              <Col span={5}>{item.PlanEffectiveDate} </Col>
              <Col span={5}>{item.PlanTerminationDate} </Col>
              <Col span={6}>{item.Address.AddressLine1} </Col>
              <Col span={4}>{item.PlanName} </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
