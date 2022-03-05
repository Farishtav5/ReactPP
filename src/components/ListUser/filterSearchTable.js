import React, { Component } from "react";
import Textbox from "./textBox";
import Date from "./datepicker";
// import "./FilterSearchtext.css";

class filterSearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // textstate = false
  }
  handleInputChange = (obj1, obj2) => {
    // console.log(obj1, obj2);
    // console.log("inside Search text1");
    this.props.filterTextchange(obj1, obj2);
  };

  // Filter input Text
  selectFilter = (ftype, id) => {
    // console.log(ftype);
    switch (ftype) {
      case "text":
        return <Textbox id={id} change={this.handleInputChange} />;
      case "date":
        return <Date id={id} change={this.handleInputChange} />;
      default:
        return <Textbox id={id} change={this.handleInputChange} />;
    }
  };
  render() {
    // console.log(this.props.ftype);
    return (
      <div className="filter">
        {this.selectFilter(this.props.ftype, this.props.id)}
        {/* <Textbox id={this.props.id} change={this.handleInputChange} /> */}
      </div>
    );
  }
}
export default filterSearchTable;
