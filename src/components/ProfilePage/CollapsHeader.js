import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import "./ProfilePage.css";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

export default class CollapsHeader extends Component {
  render() {
    console.log(this.props.id, this.props.itemId);
    return (
      <div style={{marginTop:'-4px'}}>
        {/* Header For Demographics Tabs */}
        {this.props.tabname === "Demographic" && (
          <Row
            className={
              this.props.itemId == this.props.id ? "color" : "ptc-sub-header"
            }
          >
            <Col span={1}>
              <div>
                <EllipsisWithTooltip>{'0' + this.props.count + '.'}</EllipsisWithTooltip>
              </div>
            </Col>
            <Col span={3}>
              <div>{this.props.header.Effective}</div>
            </Col>
            <Col span={3}>
              <div>{this.props.header.Term}</div>
            </Col>
            <Col span={3} className="ml-1">
              <div>{this.props.header.ProviderID}</div>
            </Col>
            <Col span={5} className="ml-1">
              <div>
                <EllipsisWithTooltip>
                  {this.props.header.PracticeName}
                </EllipsisWithTooltip>
              </div>
            </Col>
            <Col span={4} className="ml-1">
              <div>
                <EllipsisWithTooltip>
                  {this.props.header.Location}
                </EllipsisWithTooltip>
              </div>
            </Col>
            <Col span={2}>
              <div>{this.props.header.City}</div>
            </Col>
            <Col span={1}>
              <div>{this.props.header.State}</div>
            </Col>

            <Col span={1} push={1}>
              <div onClick={() => this.props.handleClick(this.props.id)}>
                {this.props.id != this.props.itemId ? (
                  <Icon type="caret-down" />
                ) : (
                  <Icon type="caret-up" />
                )}
              </div>
            </Col>
          </Row>
        )}

        {/* Header For Contract Tab... */}
        {this.props.tabname === "Contarct" && (
          <Row
            className={
              this.props.itemId == this.props.id ? "color" : "ptc-sub-header"
            }
          >
            <Col span={1}>
              <div>{'0' + this.props.count + '.'}</div>
            </Col>
            <Col span={3}>
              <div>{this.props.header.Effective}</div>
            </Col>
            <Col span={3}>
              <div>
                {this.props.header.Term === null
                  ? "---"
                  : this.props.header.Term}
              </div>
            </Col>
            <Col span={2} className="ml-1">
              <div>{this.props.header.TaxID}</div>
            </Col>
            <Col span={3} className="ml-1">
              <div>
                <EllipsisWithTooltip>
                  {this.props.header.Plan}
                </EllipsisWithTooltip>
              </div>
            </Col>
            <Col span={2} className="ml-1">
              <div>
                <EllipsisWithTooltip>
                  {this.props.header.NetworkID === null
                    ? "---"
                    : this.props.header.NetworkID}
                </EllipsisWithTooltip>
              </div>
            </Col>
            <Col span={2}>
              <div>
                {this.props.header.Contract === null
                  ? "---"
                  : this.props.header.Contract}
              </div>
            </Col>
            <Col span={2}>
              <div>
                {this.props.header.Allocation === null
                  ? "---"
                  : this.props.header.Allocation}
              </div>
            </Col>

            <Col span={2}>
              <div>
                {this.props.header.ProvType === null
                  ? "---"
                  : this.props.header.ProvType}
              </div>
            </Col>

            <Col span={2}>
              <div>
                {this.props.header.TimelyFilling === null
                  ? "---"
                  : this.props.header.TimelyFilling}
              </div>
            </Col>

            <Col span={1} push={1}>
              <div onClick={() => this.props.handleClick(this.props.id)}>
                {this.props.id != this.props.itemId ? (
                  <Icon type="caret-down" />
                ) : (
                  <Icon type="caret-up" />
                )}
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
