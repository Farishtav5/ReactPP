import React, { Component } from "react";
import TextBox from "../widget/TextBox";
import Datepicker from "../widget/DatePicker/DatePicker";
import "./FilterSearchtext.css";

class FilterSearchText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // textstate = false
  }

  handleInputChange = (obj1, obj2) => {
    this.props.filterTextchange(obj1, obj2);
  };

  // Filter input Text
  selectFilter = (ftype, id) => {
    switch (ftype) {
      case "text":
        return <TextBox id={id} change={this.handleInputChange} />;
      case "date":
        return <Datepicker id={id} change={this.handleInputChange} />;
      default:
        return <TextBox id={id} change={this.handleInputChange} />;
    }
  };

  render() {
    // console.log(this.props.filterstate, this.props.headerstate);
    return <div>{this.selectFilter(this.props.ftype, this.props.id)}</div>;
  }
}

export default FilterSearchText;
