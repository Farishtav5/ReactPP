import React, { Component } from "react";
import { Row, Col, Collapse } from "antd";
import "./ProfilePage.css";
import Config from "../../config";
import CollapsHeader from "./CollapsHeader";
import CollapsData from "./CollapsData";

const { Panel } = Collapse;

export default class CollapseContent extends Component {
  constructor(props) {
    super();
    this.state = {
      id: -1,
      PracticeLocation: [],
      ContractData: [],
    };
  }

  handleClick = (id) => {
    console.log(id);
    if (this.state.id === id) this.setState({ id: -1 });
    else this.setState({ id });
  };

  componentDidMount() {
    const headers = { Authorization: sessionStorage.getItem("access_token") };
    fetch(
      Config.Providerapi +
        "/GetPracticeLocation?npi=" +
        sessionStorage.getItem("npivalue") +
        "&PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          PracticeLocation: res.PracticeLocation,
        });
      });

    // Contract list Api.....
    fetch(
      Config.Providerapi +
        "/GetContractInformation?npi=" +
        sessionStorage.getItem("npivalue") +
        "&PlanName=" +
        sessionStorage.getItem("planName"),
      { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          ContractData: res.Contract,
        });
      });
  }

  render() {
    let count = 0;
    var today = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();
    // today = yyyy + "-" + mm + "-" + dd;

    return (
      <div className="mt-2 mb-2">
        <div className="collaps-card pt-2 pb-3 pl-3 pr-3">
          {this.props.TabName === "Demographic" ? (
            <span className="ptc-text">
              Practice Locations: {this.state.PracticeLocation.length}
            </span>
          ) : (
            <span className="ptc-text">
              Contracts Found: {this.state.ContractData.length}
            </span>
          )}
          {this.props.TabName === "Demographic" && (
            <Row className="mt-3 ml-3 ptc-header-head">
              <Col span={1} className="pl-1 pb-1">
                #
              </Col>
              <Col span={3}>Effective</Col>
              <Col span={3}>Term</Col>
              <Col span={3}>Provider ID</Col>
              <Col span={5}>Practice Name</Col>
              <Col span={4}>Location</Col>
              <Col span={2}>City</Col>
              <Col span={1}>State</Col>
            </Row>
          )}
          {this.props.TabName === "Contarct" && (
            <Row className="mt-3 ml-3 ptc-header-head">
              <Col span={1} className="pl-1 pb-1">
                #
              </Col>
              <Col span={3}>Effective</Col>
              <Col span={3}>Term</Col>
              <Col span={2}>Tax ID</Col>
              <Col span={3}>Plan</Col>
              <Col span={2}>Network ID</Col>
              <Col span={2}>Contract</Col>
              <Col span={2}>Allocation</Col>
              <Col span={2}>Prov type</Col>
              <Col span={2}>Timely Filing (D)</Col>
            </Row>
          )}
          {/* Collaps started from here */}
          {this.props.TabName === "Demographic" &&
            this.state.PracticeLocation.map((item) => {
              const id = item.SLNo;
              count += 1;
              return (
                <Row className="mt-1 pb-2">
                  <Collapse
                    activeKey={this.state.id}
                    className={
                      new Date(item.Term) >= today ? "" : "ipf-border-color"
                    }
                  >
                    <Panel
                      showArrow={false}
                      key={id}
                      style={{
                        background: this.state.id != id ? "#FFF" : "#548BE6",
                      }}
                      header={
                        <div>
                          <CollapsHeader
                            id={this.state.id}
                            count={count}
                            itemId={id}
                            handleClick={() => this.handleClick(id)}
                            header={item}
                            tabname={this.props.TabName}
                          />
                        </div>
                      }
                    >
                      <div>
                        <CollapsData data={item} tabname={this.props.TabName} />
                      </div>
                    </Panel>
                  </Collapse>
                </Row>
              );
            })}

          {/* Contarct Tab data Listing... */}
          {this.props.TabName === "Contarct" &&
            this.state.ContractData.map((item) => {
              const id = item.SLNo;
              count += 1;
              return (
                <Row className="mt-1 pb-2">
                  <Collapse
                    activeKey={this.state.id}
                    className={
                      new Date(item.Term) >= today ? "" : "ipf-border-color"
                    }
                  >
                    <Panel
                      showArrow={false}
                      key={id}
                      style={{
                        background: this.state.id != id ? "#FFF" : "#548BE6",
                      }}
                      header={
                        <div>
                          <CollapsHeader
                            id={this.state.id}
                            count={count}
                            itemId={id}
                            handleClick={() => this.handleClick(id)}
                            header={item}
                            tabname={this.props.TabName}
                          />
                        </div>
                      }
                      className=""
                    >
                      <div>
                        <CollapsData data={item} tabname={this.props.TabName} />
                      </div>
                    </Panel>
                  </Collapse>
                </Row>
              );
            })}
        </div>
      </div>
    );
  }
}
