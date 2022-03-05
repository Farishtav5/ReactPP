import React, { Component } from "react";
import CollapseContent from "./CollapseContent";
import PesonalInformation from "./PesonalInformation";
import { Row } from "antd";

export default class DemographicsTabData extends Component {
  constructor(props) {
    super();
    this.state = {
      tabname: "Demographic",
    };
  }
  render() {
    return (
      <Row>
        <div className='mb-2'>
          <PesonalInformation />
        </div>
        {/* <br></br> */}
        <div>
          <CollapseContent TabName={this.state.tabname} />
        </div>
      </Row>
    );
  }
}
