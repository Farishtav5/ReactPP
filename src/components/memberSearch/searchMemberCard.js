import React, { Component } from "react";
import { Row, Col, Spin, Form, Input, notification, DatePicker } from "antd";
// import TextBox from "../widget/TextBox";
// import DatePicker from '../widget/DatePicker/DatePicker'
import "./searchMember.css";
import MemberTable from "./memberTable";
import search from "../images/Search.svg";
import clear from "../images/clear.svg";
import blackscreen from "../images/emptysearchscreen.svg";
import nodata from "../images/NoData.svg";
import Config from "../../config";

class searchMemberCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      search: {},
      headers: [],
      cardstate: true,
      currState: false,
      Geticon: false,
      clicked: false,
      loader: false,
      Dummytable: [],
      sortedData: [],
      SearchParameter: {},
      sort: {
        column: null,
        direction: "asc",
      },
    };
  }

  // Searching Member based on search result.
  SearchEpisode = (event) => {
    event.preventDefault();
    console.log("hello iside form");
    this.props.form.validateFields(async (err, values) => {
      values.subscriberid =
        values.subscriberid == "" ? null : values.subscriberid;
      values.firstname = values.firstname == "" ? null : values.firstname;
      values.lastname = values.lastname == "" ? null : values.lastname;
      values.mbi = values.mbi == "" ? null : values.mbi;
      // values.medicare = values.medicare == "" ? null : values.medicare;
      values.phone = values.phone == "" ? null : values.phone;
      values.DateOfBirth =
        values.DateOfBirth == null
          ? values.DateOfBirth
          : values.DateOfBirth.format("MM/DD/YYYY");
      if (
        values.subscriberid == null &&
        values.firstname == null &&
        values.lastname == null &&
        values.mbi == null &&
        // values.medicare == null &&
        values.phone == null &&
        values.DateOfBirth == null
      ) {
        this.openNotification();
      } else {
        this.setState({
          loader: true,
          Dummytable: "",
        });
        if (!err) {
          // this.state.SearchParameter = values;
          console.log(this.state.SearchParameter);
          let data = await fetch(Config.api + "/SearchMemberBySubscriberIDs", {
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
            Dummytable: data.MemberDetails,
          });
          if (data.MemberDetails.length > 0) {
            this.setState({
              headers: Object.keys(data.MemberDetails[0]).map((key) => {
                return {
                  title: key,
                  displayName: Config.membertable[key].displayName,
                  display:
                    Config.membertable &&
                    Config.membertable[key] &&
                    Config.membertable[key].display
                      ? true
                      : false,
                  filterType: Config.membertable[key].filterType || "text",
                };
              }),
              Dummytable: data.MemberDetails,
              loader: false,
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
      description: "Please Inter atleast one parameter !",
      onClick: () => {
        // console.log('Notification Clicked!');
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="" style={{ position: "fixed", width: "96vw" }}>
        {this.state.currState != this.state.cardstate && (
          <div className="mr-2 pb-2 search-card">
            {/* Form for searching table data */}
            <Form onSubmit={this.SearchEpisode}>
              <Row className="pl-2 pt-2 pb-3">
                <Col className="search-card-text">Enter Details to search</Col>
              </Row>
              <Row className="pl-2">
                <Col span={4}>
                  <Form.Item>
                    {getFieldDecorator("subscriberid", {
                      initialValue: null,
                      // rules: [
                      //   {
                      //     pattern: new RegExp("^[a-zA-Z' ']*$"),
                      //     message: "Enter Alphabets Only!"
                      //   }
                      // ],
                    })(
                      <Input
                        size="medium"
                        placeholder="Enter Subscriber ID"
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={5} className="pl-2">
                  <Form.Item>
                    {getFieldDecorator("firstname", {
                      initialValue: null,
                    })(
                      <Input
                        size="medium"
                        placeholder="Enter First Name"
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={5} className="pl-2">
                  <Form.Item>
                    {getFieldDecorator("lastname", {
                      initialValue: null,
                    })(
                      <Input
                        size="medium"
                        placeholder="Enter Last Name"
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={5} className="pl-2">
                  <Form.Item>
                    {getFieldDecorator("mbi", {
                      initialValue: null,
                    })(
                      <Input
                        size="medium"
                        placeholder="Enter MBI"
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col>

                {/* <Col span={4}>
                  <Form.Item>
                    {getFieldDecorator("medicare", {
                      initialValue: null,
                    })(
                      <Input
                        size="medium"
                        placeholder="Enter Medicare"
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col> */}

                <Col span={4} className="mb-2 pb-1 pl-2 pt-1">
                  <Form.Item>
                    {getFieldDecorator("DateOfBirth", {
                      initialValue: null,
                    })(
                      <DatePicker
                        size="medium"
                        placeholder="Select D.O.B."
                        format={"MM/DD/YYYY"}
                        style={{ width: "246px" }}
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={0} className="pl-2" hidden>
                  <Form.Item>
                    {getFieldDecorator("phone", {
                      initialValue: null,
                    })(
                      <Input
                        size="medium"
                        placeholder="Enter Contact No."
                        onChange={this.getValue}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Button Search and clear Both */}

              <div>
                {this.state.Dummytable.length > 0 && (
                  <div
                    style={{ marginLeft: "-90vw", marginTop: "22px" }}
                    className="pt-3 total-lenth"
                  >
                    <span>
                      {this.state.Dummytable.length + " "}
                      {this.state.Dummytable.length <= 1
                        ? "Member found"
                        : "Members found"}{" "}
                    </span>
                  </div>
                )}
                {this.state.Geticon == true && (
                  <div
                    style={{ float: "right", marginRight: "1vw" }}
                    className="pt-3"
                  >
                    <button
                      className="ml-3 mb-2 search-button search-button-color"
                      htmlType="submit"
                    >
                      <img src={search} style={{ marginTop: "-2px" }} />
                    </button>
                    {/* Clear form field Button */}
                    <button
                      className="ml-1 search-button clear-button-color"
                      onClick={this.ClearTextFiled}
                    >
                      <img src={clear} style={{ marginTop: "-2px" }} />
                    </button>
                  </div>
                )}
              </div>
            </Form>
          </div>
        )}

        {/* loader */}

        {this.state.loader == true ? (
          <div style={{ marginTop: "36vh", marginLeft: "46vw" }}>
            <Spin size="large" />
            <div style={{ marginLeft: "-6vw" }} className="search-sreen-text">
              Loading Table data...
            </div>
          </div>
        ) : (
          <div>
            <div className="pt-2">
              {this.state.headers && this.state.Dummytable.length > 0 && (
                <MemberTable
                  tableData={this.state.Dummytable}
                  headers={this.state.headers}
                  tableSort={this.tableSortresult}
                />
              )}

              {this.state.Dummytable.length > 0 && (
                <div
                  style={{ marginLeft: "-79vw", marginTop: "22px" }}
                  className="pt-3 total-lenth"
                >
                  <span>
                    {this.state.Dummytable.length + " "}
                    {this.state.Dummytable.length <= 1
                      ? "Member found"
                      : "Members found"}{" "}
                  </span>
                </div>
              )}
              <div className="no-data-found">
                {this.state.Dummytable.length == 0 &&
                  this.state.clicked == true && (
                    <div>
                      <img src={nodata} />
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
                <div>
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

export default Form.create({ name: "searchMember" })(searchMemberCard);
