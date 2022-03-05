import React, { Component } from "react";
import "./ProfilePage.css";
import { Redirect, Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Spin,
  Button,
  Form,
  Input,
  Table,
  DatePicker,
  notification,
} from "antd";
import ContractTabData from "./ContractTabData";
import Config from "../../config";
import Logout from "../images/Logoutprofile.png";
import DemographicsTabData from "./DemographicsTabData";

class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redirect: false,
      activetab: true,
      // memberDetails: [],
      memberInfo: [],
      ProfileInfo: [],
      loader: false,
    };
  }

  getmemberShipInfo = (value) => {
    this.setState({
      memberinfo: true,
      activetab: value == 0 ? true : false,
    });
  };

  logout = () => {
    console.log("Anshul");
    const data = {
      User: sessionStorage.getItem("userName"),
      UserName: sessionStorage.getItem("userEmail"),
      Activity: "Logoff",
      TenantID: sessionStorage.getItem("Tanent"),
    };

    fetch(Config.api + "/UserTrackingDetails", {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("access_token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    console.log(sessionStorage);
    this.setState({ redirect: true });
  };
  componentDidMount() {
    this.setState({
      loader: true,
    });
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
          loader: false,
        });
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={(window.location.pathname = "/login")} />;
    }
    return (
      <div>
        <div class="square-blue-profile">
          <Row
            className="ml-4"
            type="flex"
            justify-content="space-start"
            align="middle"
            style={{ padding: "10px" }}
          >
            <Col>
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  // width: "170px",
                }}
              >
                Provider Profile
              </div>
              {/* <div style={{color:'white'}}>Enter Details to check the Eligibility of Members</div>      */}
            </Col>
            <Col push={18} className="ml-4">
              <button
                className="button-decorator button-text-color1 button-text-common"
                onClick={this.logout}
              >
                Logout <img src={Logout} />
              </button>
            </Col>
          </Row>
        </div>
        {this.state.loader === true ? (
          <div style={{ marginTop: "36vh", marginLeft: "46vw" }}>
            <Spin size="large" />
            <div
              style={{ marginLeft: "-6vw" }}
              className="search-sreen-text"
            ></div>
          </div>
        ) : (
          <>
            <div className="square-white-profile ml-4">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  //   padding: "0px 30px",
                  // marginRight: "100px",
                }}
              >
                <h3 className="profile-font mr-2">
                  {/* {this.state.ProfileInfo.FirstName +
                    " " +
                    this.state.ProfileInfo.MiddleName +
                    " " +
                    this.state.ProfileInfo.LastName} */}
                  {this.state.ProfileInfo.FirstName != null
                    ? this.state.ProfileInfo.FirstName
                    : ""}{" "}
                  {this.state.ProfileInfo.MiddleName != null
                    ? this.state.ProfileInfo.MiddleName
                    : ""}{" "}
                  {this.state.ProfileInfo.LastName != null
                    ? this.state.ProfileInfo.LastName
                    : ""}
                </h3>
                <button
                  style={{ fontWeight: "600" }}
                  className="button-decorator-profile button-text-color-profile"
                >
                  Status:
                  {this.state.ProfileInfo.Status != null
                    ? this.state.ProfileInfo.Status
                    : "---"}
                </button>
              </div>
              <hr style={{ marginTop: "3px" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 25px",
                }}
              >
                <div>
                  <p className="Areasintheheader">NPI</p>
                  <span className="Textareainheader">
                    {this.state.ProfileInfo.NPI != null
                      ? this.state.ProfileInfo.NPI
                      : "---"}
                  </span>
                </div>
                <div>
                  <p className="Areasintheheader">Age</p>
                  <span className="Textareainheader">
                    {this.state.ProfileInfo.Age != null
                      ? this.state.ProfileInfo.Age
                      : "---"}
                  </span>
                </div>
                <div>
                  <p className="Areasintheheader">Gender</p>
                  <span className="Textareainheader" style={{ top: "100px" }}>
                    {this.state.ProfileInfo.Gender != null
                      ? this.state.ProfileInfo.Gender
                      : "---"}
                  </span>
                </div>
                <div>
                  <p className="Areasintheheader">D.O.B</p>
                  <span className="Textareainheader">
                    {this.state.ProfileInfo.DOB != null
                      ? this.state.ProfileInfo.DOB
                      : "---"}
                  </span>
                </div>
                <div>
                  <p className="Areasintheheader">Email</p>
                  <span className="Textareainheader">
                    {this.state.ProfileInfo.Email != null
                      ? this.state.ProfileInfo.Email
                      : "---"}
                  </span>
                </div>
              </div>
            </div>

            <div className=" ml-4 pr-2">
              <div className="">
                <Row className="details-body">
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
                      Demographics
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
                      Contracts
                    </button>
                  </Col>
                </Row>
              </div>
              <br />
              <div>
                {this.state.activetab == true ? (
                  <DemographicsTabData />
                ) : (
                  <ContractTabData />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Form.create({ name: "ProfilePage" })(ProfilePage);
