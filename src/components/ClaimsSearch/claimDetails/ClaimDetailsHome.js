import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import Config from "../../../config";
import PaymemntDetails from "./PaymentDetails";
import ClaimsDetail from "./ClaimsDetail";
import ProviderDetails from "./ProvidersDetail";
import "./ClaimsDetail.css";

export default class ClaimDetailsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberinfo: true,
      claimhistory: false,
      loader: false,
      activetab: 0,
      id: 0,
      memberDetails: [],
      memberInfo: [],
      claimHistory: [],
      Message: "",
    };
  }
  getmemberShipInfo = (value) => {
    console.log(value);
    this.setState({
      memberinfo: true,
      activetab: value,
    });
  };

  // componentDidMount() {
  //   const headers = { Authorization: sessionStorage.getItem("access_token") };
  //   // Api for member details card section. loading the responce in memberDetails array....
  //   const uniqueMemberID =
  //     this.props.fromPage === "Claims Search"
  //       ? this.props.data.uniqueMemberID
  //       : this.props.data.UniqueMemberID;
  //   const planCode =
  //     this.props.fromPage === "Claims Search"
  //       ? this.props.data.planCode
  //       : this.props.data.PlanCode;
  //   fetch(
  //     Config.api +
  //       "/GetMemberHeaderDetailsByUniqueID?uniqueMemberID=" +
  //       uniqueMemberID +
  //       "&planCode=" +
  //       planCode +
  //       "&PlanName=" +
  //       sessionStorage.getItem("planName"),
  //     { headers }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       this.setState({
  //         memberDetails: res.MemberHeader,
  //         loader: true,
  //       });
  //     });
  // }

  render() {
    return (
      <div
      // style={{ position: "fixed", width: "99vw" }}
      >
        <div className="details-header-sub ml-2 mb-1">Claim Summary</div>
        <Card className="pr-2 mr-2 pb-2 mb-2 detail-header">
          <Row>
            <Col span={20}>
              <Row
                className="pb-1"
                style={{
                  borderLeft: "3px solid #4683ED",
                  borderRadius: "4px",
                  height: "7vh",
                }}
              >
                <Col span={20} className="member-name p-2">
                  {"FFS Professional"}{" "}
                  <span className="small-font">( Clean Claim )</span>
                </Col>
                <Col span={4} className="mt-1 mb-2">
                  <Col className="details-mbi details-header-sub">
                    Patient ID{" "}
                    <div className="text-size-data">{"536726463"}</div>
                  </Col>
                </Col>
              </Row>
              <div className="pt-1">
                <div className="border-horizental ml-1 mt-2"></div>
              </div>
              <Row className="mt-3 ml-2">
                <Col span={6} className="details-header-row">
                  Billing Provider:{" "}
                  <div className="small-font">{"GAMMA HEALTHCARE INC PB"}</div>
                </Col>
                <Col span={6} className="details-header-row">
                  Age: <div className="small-font">{"240 Days"}</div>
                </Col>
                <Col span={6} className="details-header-row">
                  PCP Name:{" "}
                  <div className="small-font">{"Dr. Rajat Bhandari"}</div>
                </Col>
                <Col span={6} className="details-header-row">
                  D.O.S. From - D.O.S.{" "}
                  <div className="small-font">
                    {"To Jan 04, 2020 - Jan 04, 2020"}
                  </div>
                </Col>
              </Row>

              {/* Second Row */}

              <Row className="mt-4 ml-2">
                <Col span={6} className="details-header-row">
                  PBP:{" "}
                  <div className="small-font">{"TRIBUTE (HMO-POS SNP)"}</div>
                </Col>
                <Col span={6} className="details-header-row">
                  P.O.S: <div className="small-font">{"81"}</div>
                </Col>
                <Col span={6} className="details-header-row">
                  Tax ID: <div className="small-font">{"435272939323"}</div>
                </Col>
                <Col span={6} className="details-header-row">
                  Patient Control No:{" "}
                  <div className="small-font" style={{ marginLeft: "2px" }}>
                    {"1-7456234"}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <Row className="pl-1 pt-2">
                <div className="border-vertical pl-2">
                  <Col span={24} className="mb-2 member-details-address">
                    Received Date:
                    <span className="small-font ml-1">{"Dec 15, 2020"}</span>
                  </Col>
                  <Col span={24} className="mb-2 member-details-address">
                    Billed Amount:
                    <span className="small-font ml-1">{"$ 1000.00"}</span>
                  </Col>
                  <Col span={24} className="mb-2 member-details-address">
                    State:
                    <span className="small-font ml-1">{"Pending"}</span>
                  </Col>
                  <Col span={24} className="mb-2 member-details-address">
                    Status:
                    <span className="small-font ml-1">{"Pending"}</span>
                  </Col>

                  <Col span={24} className="mb-2 member-details-address">
                    Form Type:
                    <span className="small-font ml-1">{"CMS-1500"}</span>
                  </Col>

                  <Col span={24} className="member-details-address">
                    Claim Type:
                    <span className="small-font ml-1">
                      {"FFS - (Paper Claim)"}
                    </span>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* Body Of member Details Page */}

        <Card className="button-area pr-2 mr-2 mb-2">
          <Row justify="space-between">
            <Col span={5}>
              <button
                onClick={() => this.getmemberShipInfo(0)}
                className={
                  this.state.activetab == 0
                    ? "details-tab p-1 pl-2 pr-2"
                    : "simple-button"
                }
              >
                Service & Payment Details
              </button>
            </Col>
            {/* Clicla */}
            <Col span={3}>
              <button
                onClick={() => this.getmemberShipInfo(1)}
                className={
                  this.state.activetab == 1
                    ? "details-tab p-1 pl-2 pr-2"
                    : "simple-button"
                }
              >
                Claims Details
              </button>
            </Col>

            <Col span={4}>
              <button
                style={{ width: "10vw" }}
                onClick={() => this.getmemberShipInfo(2)}
                className={
                  this.state.activetab == 2
                    ? "details-tab p-1 pl-2 pr-2"
                    : "simple-button"
                }
              >
                Provider Details
              </button>
            </Col>
          </Row>
        </Card>

        {/* Leading Components based on Button clicked */}
        <div>
          {this.state.activetab === 0 ? (
            <PaymemntDetails />
          ) : this.state.activetab === 1 ? (
            <ClaimsDetail />
          ) : (
            <ProviderDetails />
          )}
        </div>
      </div>
    );
  }
}
