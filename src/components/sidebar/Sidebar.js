import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, NavLink } from "react-router-dom";
import { addTab } from "./../../store/broadcaster/BroadcastRegister";
import SidebarDrawer from "./sidebarDrawer";
import { Popover } from "antd";
import "./Sidebar.css";
import MirraLogo from "../images/new_mirra_logo_small.png";
import ElibilityIcon from "../images/Eligible.svg";
import claim from "../images/Claims.svg";
import ProfileIcon from "../images/profileicon.svg";
import MemberIcon from "../images/Member.svg";
import Ic4 from "../images/userlist.svg";
import Ic5 from "../images/Ic4.svg";
import menu1 from "../images/menu.svg";
import Profile from "../images/Profile.svg";
import Notify from "../images/Notify.svg";
import Message from "../images/message.svg";
import Config from "../../config";

var id = 1;

export default class Sidebar extends Component {
  constructor(props) {
    super();
    this.state = {
      id: "",
      current: "0",
      redirect: false,
      visible: false,
    };
  }

  // Changing the menu icon from default to active.

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  getRoterIndex = (key) => {
    id = key;
  };

  logout = () => {
    // console.log("Anshul");

    const data = {
      User: sessionStorage.getItem("userName"),
      UserName: sessionStorage.getItem("userEmail"),
      // IpAddress: "patient.locationInfo",
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

    console.log(data);

    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  };

  render() {
    // console.log(this.state.id, index);
    addTab.next(null);
    let userName = sessionStorage.getItem("userName");
    if (this.state.redirect) {
      return <Redirect to={(window.location.pathname = "/login")} />;
    }
    return (
      // <Router>
      <div className="side-bar-parent card-view">
        <ul className="sidebar-ul" style={{ height: "19%" }}>
          <li>
            <div className="side-bar-title">P.P.</div>
          </li>

          <li>
            <div className="div-pmLogo ml-2">
              <img
                src={MirraLogo}
                // style={{ width: "55px" }}
                alt="Logo"
                className="pmLogo"
              />
            </div>
          </li>
        </ul>

        <ul className="sidebar-ul sidebar-ul-active" style={{ height: "45%" }}>
          {/* {sessionStorage.getItem("AdminRole") === "ADMIN" && sessionStorage.getItem("ProviderRole") === "PROVIDER" ? "A" : sessionStorage.getItem("ProviderRole") === "PROVIDER" ? "": ""} */}
          {sessionStorage.getItem("AdminRole") === "User Admin" &&
          (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
            <li className="bar-li">
              <NavLink
                to="/EligibilityCheck"
                exact
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="Eligibility Check">
                  <img
                    src={ElibilityIcon}
                    alt="EligibilityCheck"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(1)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin" ? (
            <li className="bar-li">
              <NavLink
                to="/EligibilityCheck"
                exact
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="Eligibility Check">
                  <img
                    src={ElibilityIcon}
                    alt="EligibilityCheck"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(1)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {sessionStorage.getItem("AdminRole") === "User Admin" &&
          (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
            <li>
              <NavLink
                to="/ClaimsTable"
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="Claim Search">
                  <img
                    src={claim}
                    alt="ClaimsTable"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(2)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin" ? (
            <li>
              <NavLink
                to="/ClaimsTable"
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="Claim Search">
                  <img
                    src={claim}
                    alt="ClaimsTable"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(2)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {/* <li>
            <NavLink
              to="/ClaimsTable"
              activeStyle={{
                backgroundColor: "#427BDDEB",
                padding: "11px",
                borderRadius: "0px 4px 4px 0px",
              }}
            >
              <abbr title="Claims Table">
                <img
                  src={claim}
                  alt="ClaimsTable"
                  style={{
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={() => this.getRoterIndex(2)}
                />
              </abbr>
            </NavLink>
          </li> */}
          {sessionStorage.getItem("AdminRole") === "User Admin" &&
          (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
            <li className="ic2-li">
              <NavLink
                to="/Search_member"
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="Member Search">
                  <img
                    src={MemberIcon}
                    alt="Search_member"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(3)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin" ? (
            <li className="ic2-li">
              <NavLink
                to="/Search_member"
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="Member Search">
                  <img
                    src={MemberIcon}
                    alt="Search_member"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(3)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : (
            ""
          )}

          {sessionStorage.getItem("AdminRole") === "User Admin" &&
          (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
            sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
            <li className="ic4-li">
              <NavLink
                to="/userDetails"
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="List User">
                  <img
                    src={Ic4}
                    alt="List"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(5)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : sessionStorage.getItem("AdminRole") === "User Admin" ? (
            <li className="ic4-li">
              <NavLink
                to="/userDetails"
                activeStyle={{
                  backgroundColor: "#427BDDEB",
                  padding: "11px",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                <abbr title="List User">
                  <img
                    src={Ic4}
                    alt="List"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                    onClick={() => this.getRoterIndex(5)}
                  />
                </abbr>
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>

        <hr className="devider"></hr>

        <ul className="sidebar-ul mcd-menu" style={{ height: "22%" }}>
          <li className="notification-li">
            {/* <Link to="/"> */}
            <img src={Notify} className="notification" alt="Notification" />
            {/* </Link> */}
          </li>
          <li className="message-li">
            {/* <Link to="/"> */}
            <img src={Message} className="message" alt="Messages" />
            {/* </Link> */}
          </li>
          <li className="user-li ">
            <Popover
              placement="rightTop"
              content={
                <div>
                  <div className="popup-text-header">
                    Hello,{userName != null ? userName : ""}
                  </div>
                  <div className="popup-text-subtext mt-2"></div>
                  <a onClick={this.logout}>
                    <b>Logout</b>
                  </a>
                  {/* <div className="popup-logout mt-4"></div> */}
                </div>
              }
              trigger="hover"
            >
              {sessionStorage.getItem("AdminRole") === "User Admin" &&
              sessionStorage.getItem("ProviderRole") === "PROVIDER" ? (
                <NavLink
                  to="/Profile"
                  activeStyle={{
                    backgroundColor: "#427BDDEB",
                    padding: "11px",
                    borderRadius: "0px 4px 4px 0px",
                  }}
                >
                  <img
                    id="h"
                    style={{
                      cursor: "pointer",
                      width: 26,
                      height: 26,
                    }}
                    src={Profile}
                    alt=""
                  />
                </NavLink>
              ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ? (
                <NavLink
                  to="/Profile"
                  activeStyle={{
                    backgroundColor: "#427BDDEB",
                    padding: "11px",
                    borderRadius: "0px 4px 4px 0px",
                  }}
                >
                  <img
                    id="h"
                    style={{
                      cursor: "pointer",
                      width: 26,
                      height: 26,
                    }}
                    src={Profile}
                    alt=""
                  />
                </NavLink>
              ) : (
                <img
                  id="h"
                  style={{
                    cursor: "pointer",
                    width: 26,
                    height: 26,
                  }}
                  src={Profile}
                  alt=""
                />
              )}
            </Popover>
          </li>
        </ul>

        <div className="devider"></div>

        <ul
          className="sidebar-ul"
          style={{
            marginTop: "20px",
            height: "5%",
            background: "#4583EF",
            borderRadius: "0px 4px 4px 0px",
          }}
        >
          <li className="menulist-li">
            {/* <Link to="/" > */}
            <img
              src={menu1}
              alt="Menu list"
              onClick={this.showDrawer}
              style={{ width: "24px", height: "24px" }}
            />
            {this.state.visible && (
              <SidebarDrawer
                visible={this.state.visible}
                onClose={this.onClose}
                Index={id}
                GetIndex={this.getRoterIndex}
              />
            )}
            {/* </Link> */}
          </li>
        </ul>
      </div>
      // </Router>
    );
  }
}
