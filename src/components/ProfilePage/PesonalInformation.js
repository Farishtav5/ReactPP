import React, { Component } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  AutoComplete,
  Row,
  Col,
  notification,
  Divider,
} from "antd";
import "./ProfilePage.css";
import Config from "../../config";

export default class PesonalInformation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ProfileInfo: {},
    };
  }
  componentDidMount() {
    document.title = "Mirra HealthCare | Claims Dashboard";
    const headers = { Authorization: sessionStorage.getItem("access_token") };
    fetch(
      Config.Providerapi +
        "/GetProfileHeaderInfo?npi=" +
        sessionStorage.getItem("npivalue") +
        "&PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          ProfileInfo: res.ProviderHeader,
        });
      });
  }
  render() {
    return (
      <div className="Personal-Information mt-2 shadow">
        <Row>
          <Col span={6}>
            <div style={{ color: "#16345F", fontWeight: "700" }}>
              Personal Information
            </div>
          </Col>
        </Row>
        <br />
        {/* <Row className="shadow p-3" style={{ borderRadius: 10, padding: 10 }}> */}
        <Row>
          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px" }}
            >
              First Name
            </div>
            <div
              style={{
                color: "#464E58",
                fontSize: "14px",
                marginLeft: "15px",
              }}
            >
              {this.state.ProfileInfo.FirstName != null
                ? this.state.ProfileInfo.FirstName
                : "---"}
            </div>
          </Col>

          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px" }}
            >
              Middle Name
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.MiddleName != null
                ? this.state.ProfileInfo.MiddleName
                : "---"}
            </div>
          </Col>
          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              Last Name
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.LastName != null
                ? this.state.ProfileInfo.LastName
                : "---"}
            </div>
          </Col>

          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              Suffix
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.Suffix != null
                ? this.state.ProfileInfo.Suffix
                : "---"}
            </div>
          </Col>

          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              Degree
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.Degree != null
                ? this.state.ProfileInfo.Degree
                : "---"}
            </div>
          </Col>
          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              Practice Organization
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.PracticeOrganization != null
                ? this.state.ProfileInfo.PracticeOrganization
                : "---"}
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              Speciality
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.Speciality != null
                ? this.state.ProfileInfo.Speciality
                : "---"}
            </div>
          </Col>

          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              PCP/Specialist
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.PCP_Speciality != null
                ? this.state.ProfileInfo.PCP_Speciality
                : "---"}
            </div>
          </Col>
          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              License No.
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.LicenseNo != null
                ? this.state.ProfileInfo.LicenseNo
                : "---"}
            </div>
          </Col>

          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              DEA
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.DEA != null
                ? this.state.ProfileInfo.DEA
                : "---"}
            </div>
          </Col>

          <Col span={4}>
            <div
              className=" mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              CLIA
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.CLIA != null
                ? this.state.ProfileInfo.CLIA
                : "---"}
            </div>
          </Col>
          <Col span={4}>
            <div
              className="mt-2"
              style={{ color: "#939AA5", fontSize: "14px", marginLeft: "15px" }}
            >
              Medicare
            </div>
            <div
              style={{ color: "#464E58", fontSize: "14px", marginLeft: "15px" }}
            >
              {this.state.ProfileInfo.Medicare != null
                ? this.state.ProfileInfo.Medicare
                : "---"}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
