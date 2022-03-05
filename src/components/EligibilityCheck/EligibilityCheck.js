import React, { Component } from "react";
import "./EligibilityCheck.css";
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
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
// import Config from '../../config';
// import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import search from "../images/Search.svg";
import clear from "../images/clear.svg";
import blackscreen from "../images/emptysearchscreen.svg";
import nodata from "../images/NoData.svg";
import skills from "../images/skills.png";
import Config from "../../config";
import moment from "moment";
import MemberTable from "./eligibilityTable";

class EligibilityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filters: {},
      search: {},
      headers: [],
      cardstate: true,
      currState: false,
      Geticon: false,
      clicked: false,
      loader: false,
      Dummytable: [],
      sort: {
        column: null,
        direction: "asc",
      },
    };
  }

  // Searching Member based on search result.
  SearchEpisode = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      // console.log(values);
      values.DateOfBirth =
        values.DateOfBirth == null
          ? values.DateOfBirth
          : values.DateOfBirth.format("MM/DD/YYYY");
      values.MBI = values.MBI == "" ? null : values.MBI;
      values.SubscriberID =
        values.SubscriberID == "" ? null : values.SubscriberID;
      values.FirstName = values.FirstName == "" ? null : values.FirstName;
      values.LastName = values.LastName == "" ? null : values.LastName;

      if (
        values.SubscriberID == "" &&
        values.LastName == "" &&
        values.FirstName == "" &&
        values.MBI == "" &&
        values.DateOfBirth == "" &&
        values.DOS == ""
      ) {
        this.openNotification();
      } else {
        if (!err) {
          this.setState({
            loader: true,
            Dummytable: "",
          });
          values.DOS = values.DOS.format("MM/DD/YYYY");
          let data = await fetch(Config.api + "/GetMemberEligibilityCheck", {
            method: "POST",
            headers: {
              Authorization: sessionStorage.getItem("access_token"),
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              SearchParameter: values,
              PlanName: sessionStorage.getItem("planName"),
            }),
            // body: JSON.stringify(values),
          });
          data = await data.json();
          this.setState({
            clicked: true,
            Dummytable: data.MemberEligibilityDetails,
          });
          if (data.MemberEligibilityDetails.length > 0) {
            this.setState({
              headers: Object.keys(data.MemberEligibilityDetails[0]).map(
                (key) => {
                  return {
                    title: key,
                    displayName: Config.eligibilitytable[key].displayName,
                    display:
                      Config.eligibilitytable &&
                      Config.eligibilitytable[key] &&
                      Config.eligibilitytable[key].display
                        ? true
                        : false,
                    filterType:
                      Config.eligibilitytable[key].filterType || "text",
                  };
                }
              ),
              Dummytable: data.MemberEligibilityDetails,
              loader: false,
              // MemberDetails: data.MemberDetails,
            });
          } else {
            this.setState({
              loader: false,
            });
          }
        }
      }
    });
  };

  // sorting table data for each column................
  tableSortresult = (column) => {
    const direction = this.state.sort.direction === "desc" ? "asc" : "desc";
    const sortedData = this.state.Dummytable.sort((a, b) => {
      if (
        column === "SubscriberID" ||
        column === "FirstName" ||
        column === "LastName" ||
        column === "MBI" ||
        column === "Gender" ||
        column === "DateOfBirth" ||
        column === "PCPName" ||
        column === "EffectiveDate" ||
        column === "TerminationDate"
      ) {
        const nameA =
          column === "SubscriberID"
            ? a.SubscriberID.toUpperCase()
            : column === "FirstName"
            ? a.FirstName === null
              ? ""
              : a.FirstName.toUpperCase()
            : column === "LastName"
            ? a.LastName === null
              ? ""
              : a.LastName.toUpperCase()
            : column === "MBI"
            ? a.MBI === null
              ? ""
              : a.MBI.toUpperCase()
            : column === "Gender"
            ? a.Gender === null
              ? ""
              : a.Gender.toUpperCase()
            : column === "DateOfBirth"
            ? a.DateOfBirth === null
              ? ""
              : a.DateOfBirth
            : column === "PCPName"
            ? a.PCPName === null
              ? ""
              : a.PCPName.toUpperCase()
            : column === "EffectiveDate"
            ? a.EffectiveDate === null
              ? ""
              : a.EffectiveDate
            : a.TerminationDate === null
            ? ""
            : a.TerminationDate;
        const nameB =
          column === "SubscriberID"
            ? b.SubscriberID.toUpperCase()
            : column === "FirstName"
            ? b.FirstName === null
              ? ""
              : b.FirstName.toUpperCase()
            : column === "LastName"
            ? b.LastName === null
              ? ""
              : b.LastName.toUpperCase()
            : column === "MBI"
            ? b.MBI === null
              ? ""
              : b.MBI.toUpperCase()
            : column === "Gender"
            ? b.Gender === null
              ? ""
              : b.Gender.toUpperCase()
            : column === "DateOfBirth"
            ? b.DateOfBirth === null
              ? ""
              : b.DateOfBirth
            : column === "PCPName"
            ? b.PCPName === null
              ? ""
              : b.PCPName.toUpperCase()
            : column === "EffectiveDate"
            ? b.EffectiveDate === null
              ? ""
              : b.EffectiveDate
            : b.TerminationDate === null
            ? ""
            : b.TerminationDate;

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else {
        return a.column - b.column;
      }
    });

    if (direction === "asc") {
      sortedData.reverse();
    }

    this.setState({
      Dummytable: sortedData,
      sort: {
        column,
        direction,
      },
    });
  };

  ClearTextFiled = () => {
    this.props.form.resetFields();
    this.setState({
      Dummytable: "",
      Geticon: false,
      clicked: false,
      loader: false,
    });
  };

  getValue = () => {
    this.setState({
      Geticon: true,
    });
  };

  openNotification = () => {
    notification.open({
      message: "Notification Title",
      description: "Please Enter atleast one parameter !",
      // onClick: () => {
      //   // console.log('Notification Clicked!');
      // },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let userName = sessionStorage.getItem("userName");
    return (
      <div>
        <div class="square-blue">
          <Row
            className="ml-4"
            type="flex"
            justify-content="space-start"
            align="middle"
            style={{ padding: "10px" }}
          >
            <Col>
              <div
                style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}
              >
                <img src={skills} /> Eligibility Check
              </div>
              <div style={{ color: "white" }}>
                Enter Details to check the Eligibility of Members
              </div>
            </Col>
            <Col push={13}>
              <div
                style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}
              >
                User : {userName != null ? userName : ""}
              </div>
              {/* <div style={{ color: "white" }}>
                Total Members : {this.state.Dummytable.length}
              </div> */}
            </Col>
          </Row>
        </div>
        {/* <br/> */}

        <div className="square-white ml-4">
          <Row className="mt-3">
            {this.state.currState != this.state.cardstate && (
              <div>
                <Form onSubmit={this.SearchEpisode} className="searchMember">
                  <Row>
                    <Col span={4} className="pl-2">
                      <Col
                        className="ml-1"
                        style={{ color: "#464F5D", fontWeight: "600" }}
                      >
                        Subscriber ID
                      </Col>
                      <Form.Item>
                        {getFieldDecorator("SubscriberID", {
                          initialValue: null,
                        })(
                          <Input
                            onChange={this.getValue}
                            size="medium"
                            placeholder="Enter Subscriber ID"
                            style={{
                              borderTop: "none",
                              borderRight: "None",
                              borderLeft: "none",
                            }}
                          />
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={4} className="pl-4">
                      <Col
                        className="ml-1"
                        style={{ color: "#464F5D", fontWeight: "600" }}
                      >
                        MBI
                      </Col>
                      <Form.Item>
                        {getFieldDecorator("MBI", {
                          initialValue: null,
                        })(
                          <Input
                            onChange={this.getValue}
                            size="medium"
                            placeholder="Enter MBI"
                            style={{
                              borderTop: "none",
                              borderRight: "None",
                              borderLeft: "none",
                            }}
                          />
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={4} className="pl-4">
                      <Col style={{ color: "#464F5D", fontWeight: "600" }}>
                        Last Name
                      </Col>
                      <Form.Item>
                        {getFieldDecorator("LastName", {
                          initialValue: null,
                        })(
                          <Input
                            size="medium"
                            onChange={this.getValue}
                            placeholder="Enter Last Name "
                            style={{
                              borderTop: "none",
                              borderRight: "None",
                              borderLeft: "none",
                            }}
                          />
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={4} className="pl-4">
                      <Col
                        className="ml-1"
                        style={{ color: "#464F5D", fontWeight: "600" }}
                      >
                        First Name
                      </Col>
                      <Form.Item>
                        {getFieldDecorator("FirstName", {
                          initialValue: null,
                        })(
                          <Input
                            size="medium"
                            onChange={this.getValue}
                            placeholder="Enter First Name"
                            style={{
                              borderTop: "none",
                              borderRight: "None",
                              borderLeft: "none",
                            }}
                          />
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={4} className="pl-4 mt-1">
                      <Col
                        className="ml-1"
                        style={{ color: "#464F5D", fontWeight: "600" }}
                      >
                        Date of Birth
                      </Col>
                      <Form.Item>
                        {getFieldDecorator("DateOfBirth", {
                          initialValue: null,
                        })(
                          <DatePicker
                            size="medium"
                            onChange={this.getValue}
                            format={"MM-DD-YYYY"}
                            placeholder="Select DOB"
                            className="ant-calendar-picker-input "
                          />
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={4} className="pl-3 mt-1">
                      <Col
                        className="ml-1"
                        style={{ color: "#464F5D", fontWeight: "600" }}
                      >
                        Date of Service
                        <span style={{ color: "red" }}>*</span>
                      </Col>
                      <Form.Item>
                        {getFieldDecorator("DOS", {
                          rules: [
                            {
                              required: true,
                              message: "Field is Required !",
                            },
                          ],
                          initialValue: "",
                        })(
                          <DatePicker
                            size="medium"
                            format={"MM-DD-YYYY"}
                            onChange={this.getValue}
                            placeholder="Select DOS"
                            className="ant-calendar-picker-input"
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <div>
                    {this.state.Geticon == true && (
                      <div
                        style={{ float: "right" }}
                        className="mt-4 mr-3 pt-2"
                      >
                        <button
                          className="ml-1 search-button clear-button-color"
                          onClick={this.ClearTextFiled}
                        >
                          <img src={clear} style={{ marginTop: "-3px" }} />
                        </button>
                        <button
                          className="ml-3 mb-2 search-button search-button-color"
                          htmlType="submit"
                          value="submit"
                        >
                          <img src={search} style={{ marginTop: "-2px" }} />
                        </button>
                      </div>
                    )}
                  </div>
                </Form>
              </div>
            )}
          </Row>
        </div>

        <Row>
          <Col span={12} className="ml-4">
            <div style={{ marginTop: "-4vh" }}>
              {this.state.Dummytable.length > 0 && (
                <div
                  style={{ float: "left" }}
                  className="mt-2 pt-2 total-lenth"
                >
                  {this.state.Dummytable.length}{" "}
                  {this.state.Dummytable.length <= 1
                    ? "Member Found"
                    : "Members Found"}
                </div>
              )}
            </div>
            {/* <div style={{ marginTop: "-4vh" }}>Jaiswal</div> */}
          </Col>
        </Row>

        {this.state.loader == true ? (
          <div style={{ marginTop: "36vh", marginLeft: "46vw" }}>
            <Spin size="large" />
            <div style={{ marginLeft: "-6vw" }} className="search-sreen-text">
              Loading Table data...
            </div>
          </div>
        ) : (
          <div>
            <div className="pt-2 mb-1" style={{ marginTop: "-13vh" }}>
              {this.state.headers && this.state.Dummytable.length > 0 && (
                <MemberTable
                  tableData={this.state.Dummytable}
                  tableSort={this.tableSortresult}
                  headers={this.state.headers}
                />
              )}

              <div className="no-data-found" style={{ marginTop: "13vh" }}>
                {this.state.Dummytable.length == 0 &&
                  this.state.clicked == true && (
                    <div style={{ marginTop: "-110px" }}>
                      <img style={{ marginRight: "100px" }} src={nodata} />
                      <div className="npdata-text ml-4">
                        Please check the parameters again <br></br>
                        <span className="or">or</span> <br></br>Search with
                        different parameters
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="blank-screen-image">
              {this.state.Dummytable == "" && this.state.clicked == false > 0 && (
                <div style={{ marginTop: "-110px" }}>
                  <img src={blackscreen} />
                  <div className="search-sreen-text ml-5">
                    Enter Details and search to see the Results
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Form.create({ name: "EligibilityCheck" })(EligibilityCheck);
