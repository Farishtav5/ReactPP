import React, { Component } from "react";
import { Input } from "antd";
import "../widget/TextBox.css";
class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changes = (e) => {
    console.log("inside Table Box1");
    return this.props.change(this.props.id, e.target.value);
  };
  render() {
    return (
      <div
        id={this.props.id}
        style={{
          marginTop: this.props.id === "PhoneNumber" ? "0px" : "0px",
          width: this.props.id === "Roles" ? "200px" : "",
        }}
      >
        <Input
          type="text"
          id={this.props.id}
          size="small"
          onChange={this.changes}
          placeholder={"Enter"}
        />
      </div>
    );
  }
}

export default Textbox;
