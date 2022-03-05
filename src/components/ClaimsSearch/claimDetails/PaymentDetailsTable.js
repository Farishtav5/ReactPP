import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Fragment } from "react";
import "./ClaimsDetail.css";

export default class PaymentDetailsTable extends Component {
  render() {
    return (
      <Fragment>
        <Row className="pl-2 pt-1 details-header-sub">
          <Col span={1} className="pt-2">
            #
          </Col>
          <Col span={1} className="pt-2">
            Code
          </Col>
          <Col span={2} className="pt-2">
            Dos From
          </Col>
          <Col span={2} className="pt-2">
            Dos To
          </Col>
          <Col span={2} className="pt-2">
            P.O.S.
          </Col>
          <Col span={3}>
            <span className="ml-3">Modifire</span>
            <Row>
              <Col span={1} className="mr-3">
                A
              </Col>
              <Col span={1} className="mr-3">
                B
              </Col>
              <Col span={1} className="mr-3">
                C
              </Col>
              <Col span={1}>D</Col>
            </Row>
          </Col>

          <Col span={3}>
            <span>Diagnosis Points</span>
            <Row className="ml-2">
              <Col span={1} className="mr-3">
                A
              </Col>
              <Col span={1} className="mr-3">
                B
              </Col>
              <Col span={1} className="mr-3">
                C
              </Col>
              <Col span={1}>D</Col>
            </Row>
          </Col>
          <Col span={2} className="pt-2">
            Unit
          </Col>
          <Col span={2} className="pt-2">
            Unit Count
          </Col>
          <Col span={2} className="pt-2">
            Total Charges
          </Col>
          <Col span={2}>Adjudication Status</Col>
          <Col span={2} className="pt-2">
            Status
          </Col>
        </Row>
      </Fragment>
    );
  }
}
