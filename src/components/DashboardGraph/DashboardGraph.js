import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import Chart from "./Chart";
import "./DashboardGraph.css";
import Config from "../../config";
import { Filterchart } from "../../store/broadcaster/BroadcastRegister";

export default class DashboardGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [1, 2, 3, 4, 5, 6],
      PartAcost: [],
      PartBcost: [],
      PartAclaim: [],
      PartBclaim: [],
      PartDcost: [],
      MemberDetails: [],
      fullscreen: false,
      singleGraph: 0,
      graphstate: false,
      MaxMinValue: []
    };


    Filterchart.subscribe((data) => {
      this.getAllGraph(data)
    });
  }

  // Getting the values of graphs on page load

  getAllGraph = (value) => {
    // Api call for part A cost data

    const group = (value[0] == undefined) ? '' : Array.from(value[0])
    const plan = (value[1] == undefined) ? '' : Array.from(value[1])
  
    fetch(
      Config.api + "/GetPartACostForProvider?ProviderName=" + "Chris Coppola" + 
      "&group=" + group + "&plan=" + plan
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          PartAcost: res.PartACostDetails,
        });
      });

    // Api call for Part A claim

    fetch(
      Config.api + "/GetPartAClaimsForProvider?ProviderName=" + "Chris Coppola" + 
      "&group=" + group + "&plan=" + plan
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          PartAclaim: res.PartAClaimDetails,
        });
      });

    // Api call for part B cost data

    fetch(
      Config.api + "/GetPartBCostForProvider?ProviderName=" + "Chris Coppola" + 
      "&group=" + group + "&plan=" + plan
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          PartBcost: res.PartBCostDetails,
        });
      });

    // Api call for part B claim

    fetch(
      Config.api + "/GetPartBClaimsForProvider?ProviderName=" + "Chris Coppola" + 
      "&group=" + group + "&plan=" + plan
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          PartBclaim: res.PartBClaimDetails,
        });
      });

    // Api call for part D cost

    fetch(
      Config.api + "/GetPartDCostForProvider?ProviderName=" + "Chris Coppola" + 
      "&group=" + group + "&plan=" + plan
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          PartDcost: res.PartDCostDetails,
        });
      });

    // Api call for Membership Graph....

    fetch(Config.api + "/GetMembershipGraph?ProviderName=" + "Chris Coppola" + 
    "&group=" + group + "&plan=" + plan)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.MembershipGraphDetails);
        this.setState({
          MemberDetails: res.MembershipGraphDetails,
        });
      });
  }

  // Maximum and Minimum value for the current year

  getMinMaxValue = () => {
    fetch(Config.api + "/GetMinAndMaxPartACostForProvider?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ MaxMinValue: [...this.state.MaxMinValue, res] })
      });

      fetch(Config.api + "/GetMinAndMaxPartBCostForProvider?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ MaxMinValue: [...this.state.MaxMinValue, res] })
      });

      fetch(Config.api + "/GetMinAndMaxPartDCostForProvider?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ MaxMinValue: [...this.state.MaxMinValue, res] })
      });

      fetch(Config.api + "/GetMinAndMaxPartAClaimsForProvider?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ MaxMinValue: [...this.state.MaxMinValue, res] })
      });

      fetch(Config.api + "/GetMinAndMaxPartBClaimsForProvider?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ MaxMinValue: [...this.state.MaxMinValue, res] })
      });
  }

  componentDidMount() {
    this.getAllGraph(1)
    this.getMinMaxValue()
    this.setState({
      graphstate: true
    })
  }

  GhaphbasedonCondition = (value) => {
    this.props.RightSectionDisplay();
    this.setState({
      fullscreen: !this.state.fullscreen,
      singleGraph: value,
    });
  };

  render() {
    // console.log(this.state.MaxMinValue);
    return (
      <div>
        <Row>
          <Col span={4} className="header-text common-text-css">
            Dashboard
          </Col>
          {this.state.fullscreen === false ? (
            <Col span={20}>
              <Row
                style={{ float: "right" }}
                className="common-text-css year-text-size"
              >
                <Row>
                  <div className="year-squire squire-color-first"></div>
                  <span className="year-value mr-4 ml-2">2020</span>
                  <div className="year-squire squire-color-second"></div>
                  <span className="year-value mr-4 ml-2">2019</span>
                  <div className="year-squire squire-color-third"></div>
                  <span className="year-value mr-2 ml-2">2018</span>
                </Row>
              </Row>
            </Col>
          ) : (
            <Col span={20}>
              <Row
                style={{ float: "right" }}
                className="common-text-css year-text-size"
              >
                <Row>
                  <div className="year-squire squire-color-first"></div>
                  <span className="year-value mr-4 ml-2">2020</span>
                  <div className="year-squire squire-color-second"></div>
                  <span className="year-value mr-4 ml-2">2019</span>
                  <div className="year-squire squire-color-third"></div>
                  <span className="year-value mr-2 ml-2">2018</span>
                </Row>
              </Row>
            </Col>
          )}
          <div>
            {this.state.fullscreen === false ? (
              <Row>
                {this.state.graphstate == false ? (
                  <div className="ghraph-spinner">
                    <Spin tip="Loading Chart..."></Spin>
                  </div>
                ) : (
                  this.state.graphstate && this.state.Data.map((item) => {
                    return (
                      this.state.PartAcost.length > 0 &&
                      this.state.PartBcost.length > 0 &&
                      this.state.PartAclaim.length > 0 &&
                      this.state.PartBclaim.length > 0 &&
                      this.state.PartDcost.length > 0 &&
                      this.state.MemberDetails.length > 0 && (
                        <Chart
                          id={item}
                          GraphData={
                            item == 1
                              ? this.state.PartAcost
                              : item == 2
                              ? this.state.PartAclaim
                              : item == 3
                              ? this.state.PartBcost
                              : item == 4
                              ? this.state.PartBclaim
                              : item == 5
                              ? this.state.PartDcost
                              : this.state.MemberDetails
                          }
                          fullgraph={this.state.fullscreen}
                          changeScreen={this.GhaphbasedonCondition}
                        />
                      )
                    );
                  })
                )}
              </Row>
            ) : (
              <Row>
                <Chart
                  id={this.state.singleGraph}
                  GraphData={
                    this.state.singleGraph == 1
                      ? this.state.PartAcost
                      : this.state.singleGraph == 2
                      ? this.state.PartAclaim
                      : this.state.singleGraph == 3
                      ? this.state.PartBcost
                      : this.state.singleGraph == 4
                      ? this.state.PartBclaim
                      : this.state.singleGraph == 5
                      ? this.state.PartDcost
                      : this.state.MemberDetails
                  }
                  fullgraph={this.state.fullscreen}
                  changeScreen={this.GhaphbasedonCondition}
                  value={this.state.MaxMinValue[this.state.singleGraph-1]}
                />
              </Row>
            )}
          </div>
        </Row>
      </div>
    );
  }
}
