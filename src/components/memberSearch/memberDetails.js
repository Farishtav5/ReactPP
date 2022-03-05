import React, { Component } from "react";
import { Card, Row, Col, Button, Form, Input, Spin } from "antd";
import Membershipinfo from "./membershipInfo";
import CliamsHistory from "./cliamsHistory";
import "./searchMember.css";
import Config from "../../config";

export default class memberDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberinfo: true,
      claimhistory: false,
      loader: false,
      activetab: this.props.fromPage === "Claims Search" ? false : true,
      memberDetails: [],
      memberInfo: [],
      claimHistory: [],
      Message: "",
    };
  }
  getmemberShipInfo = (value) => {
    this.setState({
      memberinfo: true,
      activetab: value == 0 ? true : false,
    });
  };

  componentDidMount() {
    const headers = { Authorization: sessionStorage.getItem("access_token") };
    // Api for member details card section. loading the responce in memberDetails array....
    const uniqueMemberID =
      this.props.fromPage === "Claims Search"
        ? this.props.data.uniqueMemberID
        : this.props.data.UniqueMemberID;
    const planCode =
      this.props.fromPage === "Claims Search"
        ? this.props.data.planCode
        : this.props.data.PlanCode;
    fetch(
      Config.api +
        "/GetMemberHeaderDetailsByUniqueID?uniqueMemberID=" +
        uniqueMemberID +
        "&planCode=" +
        planCode +
        "&PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          memberDetails: res.MemberHeader,
          loader: true,
        });
      });

    // Api for member info tab. loading the responce in the member info array
    fetch(
      Config.api +
        "/GetMemberShipInfo?uniqueMemberID=" +
        uniqueMemberID +
        "&PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          memberInfo: res.MemberShipInfo,
          loader: true,
        });
      });

    // Api for Claims History tab. loading the responce in the Claim History array
    const SubscriberID =
      this.props.fromPage === "Claims Search"
        ? this.props.data.subscribeID
        : this.props.data.SubscriberID;
    // fetch(Config.api + "/episodecount", { headers })
    fetch(
      Config.api +
        "/GetClaimDeatils?PlanName=" +
        sessionStorage.getItem("planName") +
        "&SubscriberID=" +
        SubscriberID +
        "&NPI=" +
        sessionStorage.getItem("npivalue") +
        "&TaxID=" +
        sessionStorage.getItem("taxid") +
        "&PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          claimHistory: res.ClaimsDetails,
          loader: true,
        });
      });
  }

  render() {
    var today = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();
    // today = yyyy + "-" + mm + "-" + dd;
    // today = mm + "/" + dd + "/" + yyyy;
    // today = today.toString();

    return (
      <div>
        <div className="member-text">Member Details</div>
        {this.state.loader === false ? (
          <div style={{ marginTop: "36vh", marginLeft: "46vw" }}>
            <Spin size="large" />
            <div
              style={{ marginLeft: "-6vw" }}
              className="search-sreen-text"
            ></div>
          </div>
        ) : (
          ""
        )}

        {this.state.memberDetails != "" && (
          <Card className="pr-2 mr-2 pb-2 details-header">
            <Row>
              <Col span={20}>
                <Row className="pb-2">
                  <Col span={20} className="member-name p-2">
                    {this.state.memberDetails.FirstName +
                      " " +
                      (this.state.memberDetails.MiddleName == null
                        ? ""
                        : this.state.memberDetails.MiddleName + " ") +
                      this.state.memberDetails.LastName}{" "}
                    <span className="member-age">
                      ( {this.state.memberDetails.Gender},{" "}
                      {this.state.memberDetails.Age} )
                    </span>
                  </Col>
                  <Col span={4} className="mt-1 mb-2">
                    <Col className="details-mbi text-size-header">
                      MBI{" "}
                      <div className="text-size-data">
                        {this.state.memberDetails.MBI}
                      </div>
                    </Col>
                  </Col>
                </Row>

                <div className="border-horizental ml-1"></div>

                <Row className="mt-3 ml-2">
                  <Col span={6} className="details-header-row">
                    Plan:{" "}
                    <div className="details-header-sub">
                      {this.state.memberDetails.PlanName}
                    </div>
                  </Col>
                  <Col span={6} className="details-header-row">
                    PCP Name:{" "}
                    <div className="details-header-sub">
                      {this.state.memberDetails.PcpName}
                    </div>
                  </Col>
                  <Col span={6} className="details-header-row">
                    PCP ID:{" "}
                    <div className="details-header-sub">
                      {this.state.memberDetails.CenterID}
                    </div>
                  </Col>
                  <Col span={6} className="details-header-row">
                    Effective:
                    <Col
                      className={
                        // this.state.memberDetails.PlanTerminationDate >= today
                        today <=
                        new Date(this.state.memberDetails.PlanTerminationDate)
                          ? "cercle cercle-green mt-1"
                          : "cercle cercle-red mt-1"
                      }
                      span={1}
                      push={6}
                      style={{ marginLeft: "-9px" }}
                    ></Col>
                    <div className="details-header-sub">
                      {this.state.memberDetails.PlanEffectiveDate} -
                      {this.state.memberDetails.PlanTerminationDate}
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4 ml-2">
                  <Col span={6} className="details-header-row">
                    Contact:{" "}
                    <div className="details-header-sub">
                      {this.state.memberDetails.PhoneNumber}
                    </div>
                  </Col>
                  <Col span={6} className="details-header-row">
                    PCP Contact:{" "}
                    <div className="details-header-sub">
                      {this.state.memberDetails.PcpPhone}
                    </div>
                  </Col>
                  <Col span={6} className="details-header-row">
                    D.O.B:{" "}
                    <div className="details-header-sub">
                      {this.state.memberDetails.DateOfBirth}
                    </div>
                  </Col>
                  <Col span={6} className="details-header-row">
                    Email:{" "}
                    <div
                      className="details-header-sub"
                      style={{ marginLeft: "2px" }}
                    >
                      {"- - -"}
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col span={4}>
                {/* <Row>
                  <Col span={24}></Col>
                </Row> */}
                <Row className="pl-1 pt-2">
                  <div className="border-vertical pl-2 pt-2">
                    <Col span={4} className="mb-2 member-details-address">
                      Address:
                    </Col>
                    <Col
                      span={20}
                      push={3}
                      // className="member-details-address-text mb-2 pt-1"
                      className="member-details-address-text mb-2"
                    >
                      {this.state.memberDetails.AddressLine1}
                      {/* 46-A Street, LincolnBlvd, Suite 046 */}
                    </Col>
                    <Col span={24} className="mb-2 member-details-address">
                      City:
                      <span className="member-details-address-text ml-4">
                        {" "}
                        {this.state.memberDetails.City}
                      </span>
                    </Col>
                    <Col span={24} className="mb-2 member-details-address">
                      State:
                      <span className="member-details-address-text ml-3">
                        {" "}
                        {this.state.memberDetails.State}
                      </span>
                    </Col>
                    <Col span={24} className="member-details-address">
                      Zipcode:
                      <span className="member-details-address-text">
                        {" "}
                        {this.state.memberDetails.ZipCode}
                      </span>
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </Card>
        )}

        {/* Calling membership Info component */}
        {(this.state.memberInfo.length > 0 ||
          this.state.claimHistory.length > 0) && (
          <div className="mt-4 pr-2">
            <div className="pb-2">
              {this.props.fromPage === "Cliams Search" ? (
                <Row
                  style={{ background: "#FFF" }}
                  className="details-body p-1"
                >
                  <Col span={12}>
                    <button
                      style={{ width: "10vw" }}
                      onClick={() => this.getmemberShipInfo(0)}
                      className={
                        this.state.activetab == false
                          ? "details-tab p-1 pl-2 pr-2"
                          : "simple-button"
                      }
                    >
                      Membership Info
                    </button>
                  </Col>
                  <Col span={11} className="ml-2">
                    <button
                      style={{ width: "10vw" }}
                      onClick={() => this.getmemberShipInfo(1)}
                      className={
                        this.state.activetab == true
                          ? "details-tab p-1 pl-2 pr-2"
                          : "simple-button"
                      }
                    >
                      Claim History
                    </button>
                  </Col>
                </Row>
              ) : (
                <Row
                  style={{ background: "#FFF" }}
                  className="details-body p-1"
                >
                  <Col span={12}>
                    <button
                      style={{ width: "10vw" }}
                      onClick={() => this.getmemberShipInfo(0)}
                      className={
                        this.state.activetab == true
                          ? "details-tab p-1 pl-2 pr-2"
                          : "simple-button"
                      }
                    >
                      Membership Info
                    </button>
                  </Col>
                  <Col span={11} className="ml-2">
                    <button
                      style={{ width: "10vw" }}
                      onClick={() => this.getmemberShipInfo(1)}
                      className={
                        this.state.activetab == false
                          ? "details-tab p-1 pl-2 pr-2"
                          : "simple-button"
                      }
                    >
                      Claim History
                    </button>
                  </Col>
                </Row>
              )}
            </div>
            <div className="tab-details-card">
              {this.state.activetab == true &&
              this.state.memberInfo.length > 0 ? (
                <Membershipinfo memberinfo={this.state.memberInfo} />
              ) : this.state.activetab == true &&
                this.state.memberInfo.length === 0 ? (
                <div
                  style={{
                    marginTop: "10%",
                    marginLeft: "90vh",
                    marginBottom: "10%",
                  }}
                >
                  No Record Found !
                </div>
              ) : this.state.claimHistory.length > 0 ? (
                <CliamsHistory claimsdata={this.state.claimHistory} />
              ) : (
                <div
                  style={{
                    marginTop: "10%",
                    marginLeft: "90vh",
                    marginBottom: "10%",
                  }}
                >
                  No Record Found !
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
