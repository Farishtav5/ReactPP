import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import "./Topuser.css";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

export default class UserCards extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Row className="global-family">
          {/* Based on Condition binding the card date this code will
              exicute after clicking on arrow down Icon.....
          */}

          {this.props.Newuserdata.map((obj, item) => {
            if (this.props.cardstate === true) {
              return (
                <Row>
                  <Col span={1}>
                    {item + 1 < 10 ? "0" + (item + 1) : item + 1}
                  </Col>
                  <Col span={20} push={1}>
                    {this.props.NewIndex != 3
                      ? obj.ProviderName
                      : obj.MemberName}
                  </Col>
                  <Col span={3} pull={1} style={{ float: "right" }}>
                    <EllipsisWithTooltip>
                      <b>
                        {this.props.NewIndex == 1
                          ? obj.MemberShipCount
                          : obj.Cost}
                      </b>
                    </EllipsisWithTooltip>
                  </Col>
                  <hr className="card-content-sepertor mt-2" />
                </Row>
              );
            } else {
              // by default it will display top 5 and afetr
              // on click of arrow up it will change the data

              if (item <= 4) {
                return (
                  <Row>
                    <Col span={1}>
                      {item + 1 < 10 ? "0" + (item + 1) : item + 1}
                    </Col>
                    <Col span={20} push={1}>
                      {this.props.NewIndex != 3
                        ? obj.ProviderName
                        : obj.MemberName}
                    </Col>
                    <Col span={3}>
                      <EllipsisWithTooltip>
                        <b>
                          {this.props.NewIndex == 1
                            ? obj.MemberShipCount
                            : obj.Cost}
                        </b>
                      </EllipsisWithTooltip>
                    </Col>
                    <hr className="card-content-sepertor mt-2" />
                  </Row>
                );
              }
            }
          })}
        </Row>
      </div>
    );
  }
}
