import React, { Component } from "react";
import { Row, Col } from "antd";
import "./ProfilePage.css";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

export default class ContractDataInfo extends Component {
  render() {
    return (
      <div className="mt-4">
        <Row className="mt-3 ml-3 ptc-header-head">
          <Col span={6} className="pl-1">
            Contract ID
          </Col>
          <Col span={6}>IPA</Col>
          <Col span={8}>Auto-PCP assignment?</Col>
          <Col span={4}>Vendor</Col>
        </Row>

        {/* Data of header's Data */}
        <Row className="mt-1 ml-3 ptc-data">
          <Col span={6} className="pl-1 pb-2">
            {this.props.data.ContractID == null
              ? "---"
              : this.props.data.ContractID}
          </Col>
          <Col span={6}>
            {this.props.data.IPA == null ? "---" : this.props.data.IPA}
          </Col>
          <Col span={8}>
            {this.props.data.IsAutoPCPAssignment == null
              ? "---"
              : this.props.data.IsAutoPCPAssignment}
          </Col>
          <Col span={4}>
            {this.props.data.Vendor == null ? "---" : this.props.data.Vendor}
          </Col>
        </Row>

        <Row className="mt-3 ml-3 ptc-header-head">
          <Col span={6} className="pl-1">
            Network
          </Col>
          <Col span={6}>Medicare</Col>
          <Col span={8}>Are Mid Levels Subjected To CMS Discount</Col>
        </Row>

        {/* Data of header's Data */}
        <Row className="mt-1 ml-3 ptc-data">
          <Col span={6} className="pl-1 pb-2">
            {this.props.data.Network == null ? "---" : this.props.data.Network}
          </Col>
          <Col span={6}>
            {this.props.data.Medicare == null
              ? "---"
              : this.props.data.Medicare}
          </Col>
          <Col span={8}>
            {this.props.data.AreMidLevelsSubjectedToCMSDiscount == null
              ? "---"
              : this.props.data.AreMidLevelsSubjectedToCMSDiscount}
          </Col>
        </Row>

        <Row>
          <Col span={11} className="pl-2">
            <div className="collaps-card p-2">
              <span className="ptc-text">Practice Location</span>
              <div>
                <div className="ptc-header-head pt-2">
                  {this.props.data.practiceLocations.map((item) => {
                    return (
                      <EllipsisWithTooltip>
                        {item.PracticeLocation}
                      </EllipsisWithTooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </Col>
          <Col span={11} push={1} className="ml-2">
            <div className="collaps-card p-2">
              <span className="ptc-text">Pay to</span>
              <div>
                {this.props.data.PayTo.map((item) => {
                  return (
                    <div className="ptc-header-head pt-2">
                      <EllipsisWithTooltip>
                        {item.IsDefault != "false" ? (
                          <b>{item.PayToAddress}</b>
                        ) : (
                          item.PayToAddress
                        )}
                      </EllipsisWithTooltip>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
