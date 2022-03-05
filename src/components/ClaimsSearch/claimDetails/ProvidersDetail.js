import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Fragment } from "react";

export default class ProvidersDetail extends Component {
  render() {
    let Sno = 1;
    return (
      <Fragment>
        <Card className="pr-2 mr-2 pb-2 mb-2 pl-3">
          <div className="m-2">01. Billing Provider Information</div>
          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Pay-To-Provider ID:{" "}
              <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Pay-To-Provider Name:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={2} className="details-header-row">
              Tax ID/SSN:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={3} className="details-header-row">
              NPI:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"Camdem"}
              </div>
            </Col>
            <Col span={4} push={4} className="details-header-row">
              Vendor ID:{" "}
              <div className="details-header-sub" style={{ marginLeft: "2px" }}>
                {"AR"}
              </div>
            </Col>
          </Row>

          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="details-header-row">
              Vendor Validated{" "}
              <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
            <Col span={4} push={1} className="details-header-row">
              Address 01:{" "}
              <div className="details-header-sub">{"1044 Webster avenue"}</div>
            </Col>
            <Col span={4} push={2} className="details-header-row">
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
              ZIP: <div className="details-header-sub">{"Rajat Bahndari"}</div>
            </Col>
          </Row>
        </Card>

        <Card className="pr-2 mr-2 pb-2 mb-2 pl-3">
          <div className="m-2">02. Rendering Provider Information</div>
          <div style={{ color: "#646464", fontWeight: "lighter" }}>
            <Row>
              <Col span={1} className="ml-5">
                {" "}
                <b>#</b>
              </Col>
              <Col span={3} style={{ fontWeight: "normal !important" }}>
                <b>Effective</b>
              </Col>
              <Col span={2}>
                <b>Term</b>
              </Col>
              <Col span={4} className="ml-1">
                <b>Name</b>
              </Col>
              <Col span={4} pull={1}>
                <b>Address</b>
              </Col>
              <Col span={2} pull={2}>
                <b>NPI</b>
              </Col>
              <Col span={2} pull={1}>
                <b>Speciality</b>
              </Col>
              <Col span={2}>
                <b>Term</b>
              </Col>
              <Col span={2} className="ml-3">
                <b>NPI</b>
              </Col>
            </Row>
          </div>
          <br />

          <div>
            <Row>
              <Col className="gutter-row pointer" span={24} xs={24}>
                {/* {this.state.CostBasedOnEpisodeType.map((item) => ( */}
                <div
                  className="inner-card-background "
                  style={{
                    color: "#646464",
                    fontWeight: "lighter",
                    fontSize: "13px",
                  }}
                >
                  <Row>
                    <Col span={1} className="ml-4">
                      <b>{Sno++}.</b>
                    </Col>
                    <Col span={3} className="ml-2">
                      <div>{"Effective"}</div>
                    </Col>
                    <Col span={2} className="ml-1">
                      <b>{"Term"}</b>
                    </Col>
                    <Col span={4} className="ml-2">
                      <b>{"Name"}</b>
                    </Col>
                    <Col span={4} pull={1}>
                      <b>{"Address"}</b>
                    </Col>
                    <Col span={2} pull={2}>
                      <b>{"NPI"}</b>
                    </Col>
                    <Col span={2} pull={1}>
                      <b>{"Speciality"}</b>
                    </Col>
                    <Col span={2} className="ml-2">
                      <b>{"Term"}</b>
                    </Col>
                    <Col span={2} className="ml-3">
                      <b>{"NPI"}</b>
                    </Col>
                  </Row>
                </div>
                {/* ))} */}
              </Col>
            </Row>
          </div>
        </Card>
      </Fragment>
    );
  }
}
