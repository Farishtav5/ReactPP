import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, NavLink } from "react-router-dom";
import Config from "../../config";
import { Row, Col } from "antd";
import UserTable from "./userListTable";
import filter from "../images/filter.png";
import close from "../images/listusers.png";
import "./ListUser.css";
import { updateUserList } from "../../store/broadcaster/BroadcastRegister";
import AddUserRegistration from "../UserRegistration/AddUser";
import EditUserInformation from "../UserRegistration/EditUser";
import AdduserLogo from "../images/Adduserroute.svg";

class ListUser extends Component {
  dispStatus = "none";
  constructor() {
    super();
    this.state = {
      headers: [],
      ListUser: [],
      DisplayType: "List",
      EditUserData: [],
    };

    updateUserList.subscribe((message) => {
      // console.log("EditEncounter --- ", message);
      if (message === "update") {
        this.getListUser();
      }
    });
  }

  getListUser = () => {
    const headers = { Authorization: sessionStorage.getItem("access_token") };
    console.log("inside");
    fetch(
      Config.api +
        "/GetAllUserInfo?PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      //  Config.api + "/GetAllUserInfoPlanName=" + sessionStorage.getItem("planName"),
      //   { headers }
      // )

      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.UsersList.length > 0) {
          this.setState({
            headers: Object.keys(res.UsersList[0]).map((key) => {
              return {
                title: key,
                displayName: Config.userDetails[key].displayName,
                display:
                  Config.userDetails &&
                  Config.userDetails[key] &&
                  Config.userDetails[key].display
                    ? true
                    : false,
                filterType: Config.userDetails[key].filterType || "text",
              };
            }),
            ListUser: res.UsersList,
          });
        }
      });
  };
  componentDidMount() {
    console.log("hello");
    this.getListUser();
  }

  tooglefilter = () => {
    console.log("Anshul");
    this.dispStatus = this.dispStatus === "block" ? "none" : "block";
    let a = document.getElementsByClassName("filter");
    // let b = document.getElementsByClassName("filter");
    for (let i = 0; i < a.length; i++) {
      a[i].style.display = this.dispStatus;
    }
    // for (let i = 0; i < b.length; i++) {
    //   b[i].style.display = this.dispStatus;
    // }
  };

  // Getting the type of display to change the view

  GetDisplayTye = (value, Data) => {
    this.setState({
      DisplayType: value,
      EditUserData: Data,
    });
  };
  render() {
    // console.log(
    //   "Inside the render",
    //   this.state.DisplayType,
    //   this.state.ListUser
    // );
    return (
      <div>
        {this.state.DisplayType === "Form" ? (
          <AddUserRegistration getType={this.GetDisplayTye} />
        ) : this.state.DisplayType === "edit" ? (
          <EditUserInformation
            getType={this.GetDisplayTye}
            userData={this.state.EditUserData}
          />
        ) : (
          <div>
            <div class="square-blue-profile-listuser">
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
                    List of Users
                  </div>
                  {/* <div style={{color:'white'}}>Enter Details to check the Eligibility of Members</div>      */}
                </Col>
                <Col push={18} className="ml-4">
                  {/* <NavLink to="/AddUser">
            
          </NavLink> */}
                  <button
                    className="button-decorator-listuser button-text-color1 button-text-common"
                    onClick={() => this.GetDisplayTye("Form")}
                  >
                    <img src={AdduserLogo} /> Add User
                  </button>
                </Col>
              </Row>
            </div>
            <div className="square-white-profile-listuser ml-4">
              <Row
                className="ml-5"
                type="flex"
                justify-content="space-start"
                align="middle"
                style={{ padding: "10px" }}
              >
                <Col push={2}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                      // width: "170px",
                    }}
                  >
                    List of Users
                  </div>
                  {/* <div style={{color:'white'}}>Enter Details to check the Eligibility of Members</div>      */}
                </Col>
                <Col pull={4}>
                  {this.state.ListUser.length > 0 && (
                    <div
                      // style={{ float: "left" }}
                      className="mt-2 mr-5 pt-2 total-lenth"
                    >
                      {this.state.ListUser.length}{" "}
                      {this.state.ListUser.length <= 1
                        ? "User Found"
                        : "Users Found"}
                    </div>
                  )}
                </Col>
                {/* <Col push={17}>
                  <button
                    style={{
                      background: "#628fdf",
                      borderRadius: "5px",
                      border: "10px",
                    }}
                    onClick={this.tooglefilter}
                  >
                    <img src={filter} />
                  </button>
                </Col> */}
                <Col push={17}>
                  {this.dispStatus === "none" ? (
                    <button
                      style={{
                        background: "#628fdf",
                        borderRadius: "5px",
                        border: "10px",
                      }}
                      onClick={this.tooglefilter}
                    >
                      <img src={filter} />
                    </button>
                  ) : (
                    <button
                      style={{
                        background: "#D14A4AF0",
                        borderRadius: "5px",
                        border: "10px",
                      }}
                      onClick={this.tooglefilter}
                    >
                      <img
                        src={close}
                        style={{ height: "20px", cursor: "pointer" }}
                      />
                    </button>
                  )}
                </Col>
              </Row>
              {this.state.headers.length > 0 && (
                <div>
                  <UserTable
                    tableData={this.state.ListUser}
                    headers={this.state.headers}
                    getType={this.GetDisplayTye}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ListUser;
