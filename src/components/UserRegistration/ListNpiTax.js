import React, { Component } from "react";
import { Row, Col, Drawer, Input } from "antd";
// import addIcon from "../images/GroupAdminAddicon.svg";
// import close from "../images/GroupAdmincloseIcon.svg";
// import addAllPlus from "../images/Addallplusbutton.svg";

export default class ListNpiTax extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSearch = () => {
    console.log("HEllo");
  };
  render() {
    const { Search } = Input;
    return (
      <div>
        <Row>
          <Col span={14} className="dic-card p-3">
            <Row>
              <Col span={9}>
                <button className="butto-alluser pt-1 pb-1 pl-2 pr-2">
                  Add All (10)
                  <span className="ml-3">
                    {/* <img src={addAllPlus}></img> */}
                  </span>
                </button>
              </Col>
              <Col span={15}>
                <Search
                  placeholder="Search by provider name or NPI"
                  onSearch={this.onSearch}
                />
              </Col>
            </Row>

            <Row className="margin-chip">
              <Col span={7} className="npi-chip mr-4 mb-2">
                <Col className="npi-chip-text pl-2 pr-2">
                  COPPOLA CHRISTOPHER{" "}
                  <span style={{ float: "right" }}>
                    {/* <img src={addIcon}></img> */}
                  </span>
                </Col>
              </Col>
              <Col span={7} className="npi-chip mr-4 mb-2">
                <Col className="npi-chip-text pl-2 pr-2">
                  COPPOLA CHRISTOPHER{" "}
                  <span style={{ float: "right" }}>
                    {/* <img src={addIcon}></img> */}
                  </span>
                </Col>
              </Col>
              <Col span={7} className="npi-chip mr-4 mb-2">
                <Col className="npi-chip-text pl-2 pr-2">
                  COPPOLA CHRISTOPHER{" "}
                  <span style={{ float: "right" }}>
                    {/* <img src={addIcon}></img> */}
                  </span>
                </Col>
              </Col>
              <Col span={7} className="npi-chip mr-4">
                <Col className="npi-chip-text pl-2 pr-2">
                  COPPOLA CHRISTOPHER{" "}
                  <span style={{ float: "right" }}>
                    {/* <img src={addIcon}></img> */}
                  </span>
                </Col>
              </Col>
              <Col span={7} className="npi-chip mr-4">
                <Col className="npi-chip-text pl-2 pr-2">
                  COPPOLA CHRISTOPHER{" "}
                  <span style={{ float: "right" }}>
                    {/* <img src={addIcon}></img> */}
                  </span>
                </Col>
              </Col>
              <Col span={7} className="npi-chip mr-4">
                <Col className="npi-chip-text pl-2 pr-2">
                  COPPOLA CHRISTOPHER{" "}
                  <span style={{ float: "right" }}>
                    {/* <img src={addIcon}></img> */}
                  </span>
                </Col>
              </Col>
            </Row>
          </Col>
          <Col span={9} className="ml-4 dic-card">
            <Row className="ml-1">
              <Col className="p-3">
                <Row>
                  <Col className="header-text">00 NPIs Added</Col>
                </Row>
                <Row>
                  {/* <Col className="sub-text-npi" style={{ marginTop: "30vh" }}>
                    “Added NPIs will Appear Here”
                  </Col> */}

                  <Row className="margin-npi-chip">
                    <Col span={8} className="npi-chip mr-4">
                      <Col className="npi-chip-text pl-2 pr-1">
                        James Anderson{" "}
                        <span style={{ float: "right" }}>
                          {/* <img src={close}></img> */}
                        </span>
                      </Col>
                    </Col>
                    <Col span={8} className="npi-chip mr-4">
                      <Col className="npi-chip-text pl-2 pr-1">
                        James Anderson{" "}
                        <span style={{ float: "right" }}>
                          {/* <img src={close}></img> */}
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
