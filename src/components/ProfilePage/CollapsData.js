import React, { Component } from "react";
import { Row, Col } from "antd";
import "./ProfilePage.css";
import ContractDataInfo from "./ContractDataInfo";

export default class CollapsData extends Component {
  render() {
    return (
      <div>
        {this.props.tabname === "Demographic" ? (
          <div>
            <Row className="mt-3 ml-3 ptc-header-head">
              <Col span={4} className="pl-1">
                County
              </Col>
              <Col span={4}>Country</Col>
              <Col span={4}>Zip</Col>
              <Col span={4}>Fax No.</Col>
              <Col span={4}>Contact No.</Col>
              <Col span={4}>Email</Col>
            </Row>

            {/* Data of header's Data */}
            <Row className="mt-1 ml-3 ptc-data">
              <Col span={4} className="pl-1 pb-2">
                {this.props.data.County == null
                  ? "---"
                  : this.props.data.County}
              </Col>
              <Col span={4}>
                {this.props.data.Country == null
                  ? "---"
                  : this.props.data.Country}
              </Col>
              <Col span={4}>
                {this.props.data.Zip == null ? "---" : this.props.data.Zip}
              </Col>
              <Col span={4}>
                {this.props.data.FaxNo == null ? "---" : this.props.data.FaxNo}
              </Col>
              <Col span={4}>
                {this.props.data.ContactNo == null
                  ? "---"
                  : this.props.data.ContactNo}
              </Col>
              <Col span={4}>
                {this.props.data.Email == null ? "---" : this.props.data.Email}
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <ContractDataInfo data={this.props.data} />
          </div>
        )}
      </div>
    );
  }
}
