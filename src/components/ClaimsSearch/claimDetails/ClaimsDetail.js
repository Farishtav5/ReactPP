import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Fragment } from "react";

export default class ClaimsDetail extends Component {
  render() {
    return (
      <Fragment>
        <Card className="pr-2 mr-2 pb-2 mb-2 pl-3">
          <div className="m-2">01. Member Information</div>
          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Name: <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Address 01:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Address 02:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={3} className="details-header-row">
              City:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"Camdem"}
              </div>
            </Col>
            <Col span={4} push={4} className="details-header-row">
              State:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"AR"}
              </div>
            </Col>
          </Row>

          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Country{" "}
              <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Zip Code:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Gender:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={3} className="details-header-row">
              DOB:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"Camdem"}
              </div>
            </Col>
            <Col span={4} push={4} className="details-header-row">
              Insured Name:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"AR"}
              </div>
            </Col>
          </Row>
          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Relationships to Insured:{" "}
              <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Insured's Unique Identifier:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Insured's Group Name:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={3} className="details-header-row">
              Insured's Group No.:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"Camdem"}
              </div>
            </Col>
          </Row>
        </Card>

        {/* Second Div in payment tab */}

        <Card className="pr-2 mr-2 pb-2 mb-2 pl-3">
          <div className="m-2">02. Payer Information</div>
          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Payer Name:{" "}
              <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Payer ID:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Address 01:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={3} className="details-header-row">
              Address 02:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"Camdem"}
              </div>
            </Col>
            <Col span={4} push={4} className="details-header-row">
              City:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"AR"}
              </div>
            </Col>
          </Row>

          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              State <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Zip Code:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
          </Row>
        </Card>

        {/* Third Div in payment tab */}
        <Card className="pr-2 mr-2 pb-2 mb-2 pl-3">
          <div className="m-2">03. Is Patient Condition Related to</div>
          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Employment:{" "}
              <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Auto Accident:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Other Accident:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={3} className="details-header-row">
              Accident Date:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"Camdem"}
              </div>
            </Col>
            <Col span={4} push={4} className="details-header-row">
              Onset Date/Curr. Illness:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"AR"}
              </div>
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}
