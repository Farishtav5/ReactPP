import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, NavLink } from "react-router-dom";
import { Drawer } from "antd";
import MirraLogo from "../images/new_mirra_logo_small.png";
import ElibilityIcon from "../images/Eligible.svg";
import "./Sidebar.css";
import claim from "../images/Claims.svg";
import ProfileIcon from "../images/profileicon.svg";
import MemberIcon from "../images/Member.svg";
// import Ic4 from "../images/Ic4.svg";
import Ic4 from "../images/userlist.svg";
import CloseIcon from "../images/Close.svg";
import Profile from "../images/Profile.svg";
import Notify from "../images/Notify.svg";
import Message from "../images/message.svg";

export default class sidebarDrawer extends Component {
  constructor() {
    super();
    this.state = {
      placement: "left",
      id: 1,
      current: "1",
    };
  }

  getRoterIndex = (key) => {
    this.props.GetIndex(key);
  };

  render() {
    console.log(this.props.Index);
    let userEmail = sessionStorage.getItem("userName");
    return (
      <Drawer
        placement={this.state.placement}
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        key={this.state.placement}
        width="230px"
      >
        <div className="sidebar-expansion" style={{ height: "100%" }}>
          <div className="sidebar-expansion-list">
            <div
              className="sidebar-expansion-logo mb-4"
              style={{ height: "10%" }}
            >
              <img src={MirraLogo} alt="Logo" className="logo-img " />
              <span className="ml-2 mt-1">
                <b style={{ color: "#16345F" }}>Provider Portal</b>
              </span>
            </div>

            <div className="sidebar-expansion-images-list">
              <ul style={{ height: "60%" }}>
                {/* {sessionStorage.getItem("AdminRole") === "ADMIN" && sessionStorage.getItem("ProviderRole") === "PROVIDER" ? "A" : sessionStorage.getItem("ProviderRole") === "PROVIDER" ? "": ""} */}
                {sessionStorage.getItem("AdminRole") === "User Admin" &&
                (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
                  <li className="mb-4">
                    <NavLink
                      to="/EligibilityCheck"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        paddingLeft: "10px",
                        padding: "4px 52px 6px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(1)}
                    >
                      <img src={ElibilityIcon} alt="EligibilityCheck" />
                      <span
                        className={
                          this.props.Index === 1
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        Eligibility Check
                      </span>
                    </NavLink>
                  </li>
                ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin" ? (
                  <li className="mb-4">
                    <NavLink
                      to="/EligibilityCheck"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        paddingLeft: "10px",
                        padding: "4px 52px 6px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(1)}
                    >
                      <img src={ElibilityIcon} alt="EligibilityCheck" />
                      <span
                        className={
                          this.props.Index === 1
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        Eligibility Check
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                {/* <li className="mb-4">
                  <NavLink
                    to="/EligibilityCheck"
                    exact
                    activeStyle={{
                      backgroundColor: "#427BDDEB",
                      paddingLeft: "10px",
                      padding: "4px 52px 6px 4px",
                      borderRadius: "4px",
                    }}
                    onClick={() => this.getRoterIndex(1)}
                  >
                    <img src={ElibilityIcon} alt="EligibilityCheck" />
                    <span
                      className={
                        this.props.Index === 1
                          ? "sidebar-expansion-li sidebar-expansion-li-white"
                          : "sidebar-expansion-li sidebar-expansion-li-gray"
                      }
                    >
                      Eligibility Check
                    </span>
                  </NavLink>
                </li> */}
                {/* <li className="mb-4">
                  <NavLink
                    to="/ClaimsTable"
                    exact
                    activeStyle={{
                      backgroundColor: "#427BDDEB",
                      padding: "4px 56px 6px 4px",
                      borderRadius: "4px",
                    }}
                    onClick={() => this.getRoterIndex(2)}
                  >
                    <img src={claim} alt="ClaimsTable" />
                    <span
                      className={
                        this.props.Index === 2
                          ? "sidebar-expansion-li sidebar-expansion-li-white"
                          : "sidebar-expansion-li sidebar-expansion-li-gray"
                      }
                    >
                      Claim Search
                    </span>
                  </NavLink>
                </li> */}
                {/* <li className="mb-4">
                  <NavLink
                    to="/Search_member"
                    exact
                    activeStyle={{
                      backgroundColor: "#427BDDEB",
                      padding: "4px 54px 6px 2px",
                      borderRadius: "4px",
                    }}
                    onClick={() => this.getRoterIndex(3)}
                  >
                    <img src={MemberIcon} alt="Search_member" />
                    <span
                      className={
                        this.props.Index === 3
                          ? "sidebar-expansion-li sidebar-expansion-li-white"
                          : "sidebar-expansion-li sidebar-expansion-li-gray"
                      }
                    >
                      Member Search
                    </span>
                  </NavLink>
                </li> */}

                {sessionStorage.getItem("AdminRole") === "User Admin" &&
                (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
                  <li className="mb-4">
                    <NavLink
                      to="/ClaimsTable"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        padding: "4px 56px 6px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(2)}
                    >
                      <img src={claim} alt="ClaimsTable" />
                      <span
                        className={
                          this.props.Index === 2
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        Claim Search
                      </span>
                    </NavLink>
                  </li>
                ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin" ? (
                  <li className="mb-4">
                    <NavLink
                      to="/ClaimsTable"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        padding: "4px 56px 6px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(2)}
                    >
                      <img src={claim} alt="ClaimsTable" />
                      <span
                        className={
                          this.props.Index === 2
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        Claim Search
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                {/* {sessionStorage.getItem("AdminRole") === "ADMIN" && sessionStorage.getItem("ProviderRole") === "PROVIDER" ? "A" : sessionStorage.getItem("ProviderRole") === "PROVIDER" ? "": ""} */}
                {sessionStorage.getItem("AdminRole") === "User Admin" &&
                (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
                  <li className="mb-4">
                    <NavLink
                      to="/Search_member"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        padding: "4px 54px 6px 2px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(3)}
                    >
                      <img src={MemberIcon} alt="Search_member" />
                      <span
                        className={
                          this.props.Index === 3
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        Member Search
                      </span>
                    </NavLink>
                  </li>
                ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin" ? (
                  <li className="mb-4">
                    <NavLink
                      to="/Search_member"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        padding: "4px 54px 6px 2px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(3)}
                    >
                      <img src={MemberIcon} alt="Search_member" />
                      <span
                        className={
                          this.props.Index === 3
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        Member Search
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                {/* <li className="mb-4">
                  <NavLink
                    to="/userDetails"
                    exact
                    activeStyle={{
                      backgroundColor: "#427BDDEB",
                      padding: "4px 54px 6px 2px",
                      borderRadius: "4px",
                    }}
                    onClick={() => this.getRoterIndex(5)}
                  >
                    <img src={Ic4} alt="List" />
                    <span
                      className={
                        this.props.Index === 5
                          ? "sidebar-expansion-li sidebar-expansion-li-white"
                          : "sidebar-expansion-li sidebar-expansion-li-gray"
                      }
                    >
                      List User
                    </span>
                  </NavLink>
                </li> */}
                {sessionStorage.getItem("AdminRole") === "User Admin" &&
                (sessionStorage.getItem("ProviderRole") === "PROVIDER" ||
                  sessionStorage.getItem("PlanAdminRole") === "Plan Admin") ? (
                  <li className="mb-4">
                    <NavLink
                      to="/userDetails"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        padding: "4px 54px 6px 2px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(5)}
                    >
                      <img src={Ic4} alt="List" />
                      <span
                        className={
                          this.props.Index === 5
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        List User
                      </span>
                    </NavLink>
                  </li>
                ) : sessionStorage.getItem("AdminRole") === "User Admin" ? (
                  <li className="mb-4">
                    <NavLink
                      to="/userDetails"
                      exact
                      activeStyle={{
                        backgroundColor: "#427BDDEB",
                        padding: "4px 54px 6px 2px",
                        borderRadius: "4px",
                      }}
                      onClick={() => this.getRoterIndex(5)}
                    >
                      <img src={Ic4} alt="List" />
                      <span
                        className={
                          this.props.Index === 5
                            ? "sidebar-expansion-li sidebar-expansion-li-white"
                            : "sidebar-expansion-li sidebar-expansion-li-gray"
                        }
                      >
                        List User
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <hr className="horizontal-devider mb-4" />

            <div
              className="sidebar-expansion-images-list-div"
              style={{ height: "25%" }}
            >
              <div className="mb-4">
                <ul>
                  <li>
                    <img
                      src={Notify}
                      className="notification"
                      alt="Notification"
                    />
                    <span className="ml-4 mr-4 sencon-ul-text">
                      Notifications
                    </span>
                    {/* <span className="notification-value-card ml-2">02</span> */}
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <ul>
                  <li>
                    <img
                      src={Message}
                      className="drawer-message"
                      alt="Messages"
                    />
                    <span className="ml-3 mr-4 sencon-ul-text">Inbox</span>
                    {/* <span className="notification-value-card ml-5">02</span> */}
                  </li>
                </ul>
              </div>

              <div>
                <ul className="mcd-menu">
                  {sessionStorage.getItem("AdminRole") === "ADMIN" &&
                  sessionStorage.getItem("ProviderRole") === "PROVIDER" ? (
                    <li>
                      <NavLink
                        to="/Profile"
                        exact
                        activeStyle={{
                          backgroundColor: "#427BDDEB",
                          padding: "4px 54px 6px 4px",
                          borderRadius: "4px",
                        }}
                        onClick={() => this.getRoterIndex(4)}
                      >
                        <img
                          src={Profile}
                          className="mcd-menu userEffect"
                          alt="User"
                          width="26"
                          height="26"
                        />
                        <span className="ml-4 mr-4 sencon-ul-text">
                          Provider Profile
                        </span>
                      </NavLink>
                    </li>
                  ) : sessionStorage.getItem("ProviderRole") === "PROVIDER" ? (
                    <li>
                      <NavLink
                        to="/Profile"
                        exact
                        activeStyle={{
                          backgroundColor: "#427BDDEB",
                          padding: "4px 54px 6px 4px",
                          borderRadius: "4px",
                        }}
                        onClick={() => this.getRoterIndex(4)}
                      >
                        <img
                          src={Profile}
                          className="mcd-menu userEffect"
                          alt="User"
                          width="26"
                          height="26"
                        />
                        <span className="ml-4 mr-4 sencon-ul-text">
                          Provider Profile
                        </span>
                      </NavLink>
                    </li>
                  ) : (
                    // <li>
                    //   <NavLink
                    //     to="/Profile"
                    //     exact
                    //     activeStyle={{
                    //       backgroundColor: "#427BDDEB",
                    //       padding: "4px 54px 6px 4px",
                    //       borderRadius: "4px",
                    //     }}
                    //     onClick={() => this.getRoterIndex(4)}
                    //   >
                    //     <img
                    //       src={Profile}
                    //       className="mcd-menu userEffect"
                    //       alt="User"
                    //       width="26"
                    //       height="26"
                    //     />
                    //     <span className="ml-4 mr-4 sencon-ul-text">
                    //       Provider Profile
                    //     </span>
                    //   </NavLink>
                    // </li>
                    ""
                  )}
                </ul>
              </div>
            </div>
            {/* Close button */}
            <div style={{ height: "10%", marginLeft: "40%" }}>
              <ul className="mcd-menu mt-3 mb-1 ml-1">
                <li>
                  <img
                    src={CloseIcon}
                    className="mcd-menu userEffect"
                    alt="User"
                    width="50"
                    height="50"
                    onClick={this.props.onClose}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}
