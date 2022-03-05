import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Fragment } from "react";

export default class PaymentTableData extends Component {
  render() {
    return (
      <Fragment>
        <Row className="pl-2 pt-1 table-font">
          <Col span={1} className="pt-2">
            1
          </Col>
          <Col span={1} className="pt-2">
            8956
          </Col>
          <Col span={2} className="pt-2">
            Jan 04, 2020
          </Col>
          <Col span={2} className="pt-2">
            Jan 04, 2020
          </Col>
          <Col span={2} className="pt-2">
            12
          </Col>
          <Col span={3} className="pt-2">
            {/* <span className="ml-3">Modifire</span> */}
            <Row>
              <Col span={1} className="mr-3">
                1
              </Col>
              <Col span={1} className="mr-3">
                3
              </Col>
              <Col span={1} className="mr-3">
                -
              </Col>
              <Col span={1}>-</Col>
            </Row>
          </Col>

          <Col span={3} className="pt-2">
            {/* <span>Diagnosis Points</span> */}
            <Row className="ml-2">
              <Col span={1} className="mr-3">
                2
              </Col>
              <Col span={1} className="mr-3">
                -
              </Col>
              <Col span={1} className="mr-3">
                4
              </Col>
              <Col span={1}>-</Col>
            </Row>
          </Col>
          <Col span={2} className="pt-2">
            UN
          </Col>
          <Col span={2} className="pt-2">
            01
          </Col>
          <Col span={2} className="pt-2">
            $200
          </Col>
          <Col span={2} className="pt-2">
            Adjudicated
          </Col>
          <Col span={2} className="pt-2">
            PEND
          </Col>
        </Row>
      </Fragment>
    );
  }
}
