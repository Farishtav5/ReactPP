import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import PaymentTable from "./PaymentDetailsTable";
import PaymentTableData from "./PaymentTableData";
import { Fragment } from "react";

export default class PaymentDetails extends Component {
  render() {
    return (
      <Fragment>
        <Card className="pr-2 mr-2 pb-2 mb-2 pl-3">
          <div
            className="details-header-sub m-2"
            style={{ display: "inline-block" }}
          >
            01. Payment information
          </div>
          <div
            className="details-header-row m-2"
            style={{ display: "inline-block m-2", float: "right" }}
          >
            PAYABLE AMT. :<span className="details-header-sub">$ 0.00</span>
          </div>
          <Row className="mt-3 ml-2" justify="space-between">
            <Col span={4} className="ml-2 details-header-row">
              Adjustment: <div className="small-font">{"$900.00"}</div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              Deductible: <div className="small-font">{"0.00"}</div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              Coinsurance: <div className="small-font">{"0.00"}</div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              Copay:{" "}
              <div className="small-font" style={{ marginLeft: "2px" }}>
                {"0.00"}
              </div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              total Payment Amt.: <div className="small-font">{"0.00"}</div>
            </Col>
          </Row>

          <Row className="mt-4 ml-2" justify="space-between">
            <Col span={4} className="ml-2 details-header-row">
              Net Payment Amt.: <div className="small-font">{"$100.00"}</div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              Recovery Amt.: <div className="small-font">{"0.00"}</div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              INTEREST PAYABLE: <div className="small-font">{"0.00"}</div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              IS A/R AMT. eligible:{" "}
              <div className="small-font" style={{ marginLeft: "2px" }}>
                {"0.00"}
              </div>
            </Col>
            <Col span={4} className="ml-5 details-header-row">
              A/R Balance: <div className="small-font">{"0.00"}</div>
            </Col>
          </Row>
        </Card>

        {/* Second Div in payment tab */}
        <Card className="pr-2 mr-2 pb-2 pl-3 mb-2">
          <Row>
            <Col span={6} className="details-header-row">
              <Col>
                Primary ICD 10:
                <div
                  style={{
                    display: "inline-block",
                    height: "7px",
                    width: "7px",
                  }}
                  className="ml-1 cercle cercle-green"
                ></div>
              </Col>
              <Col>
                MOOP Amt:
                <span className="small-font">$ 1200.00</span>
              </Col>
            </Col>
            <Col span={18} className="pt-2">
              <Row justify="space-between">
                <Col span={1} className="mr-2 details-header-row">
                  <div className="pl-1 pr-1 color-left-radius">1245</div>
                </Col>
                <Col span={1} className="mr-2 details-header-row">
                  <div className="pl-1 pr-1 gray-border">1245</div>
                </Col>
                <Col span={1} className="mr-2 details-header-row">
                  <div className="pl-1 pr-1 gray-border">1245</div>
                </Col>
                <Col span={1} className="mr-2 details-header-row">
                  <div className="pl-1 pr-1 gray-border">1245</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* Third Row In payment section */}

        <Card className="pr-2 mr-2 pb-2">
          <Row className="table-header-background">
            <PaymentTable />
          </Row>
          <PaymentTableData />
        </Card>
      </Fragment>
    );
  }
}
