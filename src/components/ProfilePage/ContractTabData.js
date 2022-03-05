import React, { Component } from "react";
// import EllipsisWithTooltip from "react-ellipsis-with-tooltip";
import CollapseContent from "./CollapseContent";
import "./ContractTabData.css";
import {
  Form
} from "antd";

class ContractTabData extends Component {
  constructor(props) {
    super();
    this.state = {
      tabname: "Contarct",
    };
  }

  render() {
    return (
      <div>
        <CollapseContent TabName={this.state.tabname} />
      </div>
    );
  }
}
export default Form.create({ name: "ContractTabData" })(ContractTabData);
