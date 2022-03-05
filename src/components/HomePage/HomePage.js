import React, { Component } from "react";
import "./home.css";
import TopUserDetails from "../DashboardRightSection/TopUserDetails";
import DashboardGraph from "../DashboardGraph/DashboardGraph";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hide: false,
    };
  }

  HidetopuserDetails = () => {
    this.setState({
      Hide: !this.state.Hide,
    });
  };
  render() {
    return (
      <div>
        <div className="home-parent">
          <div
            className={
              this.state.Hide == false
                ? "dashboard-container padding pr-2"
                : "full-scren-dashboard-container padding pr-2"
            }
          >
            <div>
              <DashboardGraph RightSectionDisplay={this.HidetopuserDetails} />
            </div>
          </div>
          {this.state.Hide == false ? (
            <div className="Right-side-container">
              <div className="scroll">
                <TopUserDetails />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
