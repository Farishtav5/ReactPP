import React, { Component } from "react";
import { Card, Row, Col, Button, Form, Input } from "antd";
import "./searchMember.css";

export default class cliamsHistory extends Component {
  render() {
    return (
      <div className="p-2 pb-3">
        <Row className="pl-2 member-info-header">
          <Col span={2}>Claim No. </Col>
          <Col push={1} span={3}>
            NPI{" "}
          </Col>
          <Col span={2}>State </Col>
          <Col span={2}>Billing Provider </Col>
          <Col push={1} className="" span={3}>
            D.O.S. From{" "}
          </Col>
          <Col push={1} span={3}>
            D.O.S. To{" "}
          </Col>
          <Col span={2}>Received Date </Col>
          <Col span={2}>Tot. Charges </Col>
          <Col span={3}>Net Pay Amt. </Col>
          <Col span={2} pull={1}>
            Date Paid{" "}
          </Col>
        </Row>
        <hr></hr>
        {/* Calling the Api and binding the data */}

        {this.props.claimsdata.map((item) => {
          return (
            <Row className="p-2 row-details">
              <Col span={2}>{item.claimNumber} </Col>
              <Col push={1} span={3}>
                {item.pcpNPI}{" "}
              </Col>
              <Col span={1}>{item.claimStatus} </Col>
              <Col span={2} push={1}>
                {item.billingProviderName}{" "}
              </Col>
              <Col push={2} span={3}>
                {item.dosFromDate}{" "}
              </Col>
              <Col push={2} span={3}>
                {item.dosToDate}{" "}
              </Col>
              <Col span={2} push={1} style={{ marginLeft: "10px" }}>
                {item.planReceivedDate}{" "}
              </Col>
              <Col className="ml-1" span={2} push={1}>
                {item.totalPaymentAmount}{" "}
              </Col>
              <Col span={3} push={1}>
                {item.totalNetPaymentAmt}{" "}
              </Col>
              <Col span={2}>{item.paidOn} </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
