import React, { Component } from "react";
import { Row, Col, Drawer, Input } from "antd";
import ListTaxNpi from "./ListNpiTax";
import AddNpiGroup from "./AddNpiGroup";
import Config from "../../config";
import "./AddUser.css";

export default class GroupAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      placement: "bottom",
      NPIstate: "",
      TaxIdNPIList: [],
    };
  }

  componentDidMount() {
    fetch(Config.api + "/GetAllNpiList")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          NPIList: res.NpiList,
        });
      });
  }

  OpenDrawer = (value) => {
    this.setState({
      showDrawer: !this.state.showDrawer,
      NPIstate: value == "TaxId" ? "TaxId" : "Npi",
    });
  };

  onSearch = () => {
    fetch(Config.api + "/ListNPIBasedOnTaxID")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          TaxIdNPIList: res.Details,
        });
      });
  };

  render() {
    const { Search } = Input;
    return (
      <div className="p-2">
        <div className="pl-2">
          <Row>
            <Col span={20} className="question-css">
              <b>
                Please create your combination of Tax ID & NPIs by clicking
                “Add”
              </b>
            </Col>
            <Col span={2}>
              <button
                type="text"
                className="butto-alluser"
                onClick={() => this.OpenDrawer("TaxId")}
              >
                Add TaxId
              </button>
            </Col>
            <Col span={2}>
              <button
                className="butto-alluser"
                onClick={() => this.OpenDrawer("Npi")}
              >
                Add Npi
              </button>
            </Col>

            {/* <Row>
              <Col>List of Combinations</Col>
            </Row> */}
          </Row>
        </div>

        {/* Drawer Starts from here */}

        <Drawer
          placement={this.state.placement}
          closable={false}
          //   onClose={this.props.onClose}
          visible={this.state.showDrawer}
          key={this.state.placement}
          height="90%"
          style={{ borderRadius: "6px" }}
        >
          <Row className="p-4 mb-2" style={{ marginTop: "-18px" }}>
            <Col>
              <Search
                placeholder={
                  this.state.NPIstate === "TaxId"
                    ? "Enter Tax ID to search NPIs"
                    : "Enter and select NPI to add"
                }
                allowClear
                enterButton="Search"
                size="large"
                onSearch={this.onSearch}
              />
            </Col>
          </Row>
          {/* Calling list Tax Npi component */}
          {this.state.NPIstate === "TaxId" ? (
            <Row className="pl-4 pt-2 mt-4">
              <ListTaxNpi taxidlistNpi={this.state.TaxIdNPIList} />
            </Row>
          ) : (
            <Row className="pl-4 pt-2 pr-4 pb-3">
              <AddNpiGroup />
            </Row>
          )}

          {/* Done and cancle Button for TaxId and NPI */}

          <Row style={{ float: "right" }} className="mt-4">
            <Col span={11} pull={4}>
              <button className="cancle-button pl-4 pr-4">Cancle</button>
            </Col>
            <Col span={12} pull={7}>
              <button className="butto-alluser pl-4 pr-4">Done</button>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}
