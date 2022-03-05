import React, { Component } from "react";
import { Input } from "antd";
import "./TextBox.css";

class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changes = (e) => {
    console.log("inside Table Box");
    return this.props.change(this.props.id, e.target.value);
  };

  render() {
    // console.log(this.props.id);
    return (
      <div
        style={{
          marginTop:
            this.props.id === "claimNumber"
              ? "-8px"
              : this.props.id === "billingProviderName"
              ? "-8px"
              : this.props.id === "taxid"
              ? "-8px"
              : this.props.id === "pcpNPI"
              ? "-8px"
              : this.props.id === "providerName"
              ? "-24px"
              : this.props.id === "subscribeID"
              ? "-8px"
              : this.props.id === "patientName"
              ? "-8px"
              : this.props.id === "planCode"
              ? "8px"
              : this.props.id === "paidOn"
              ? "8px"
              : this.props.id === "totalNetPaymentAmt"
              ? "-24px"
              : this.props.id === "totalPaymentAmount"
              ? "-24px"
              : this.props.id === "claimStatus"
              ? "-9px"
              : this.props.id === "claimType"
              ? "-24px"
              : "0px",
          width:
            this.props.id === "claimNumber"
              ? "95px"
              : this.props.id === "billingProviderName"
              ? "98px"
              : this.props.id === "taxid"
              ? "61px"
              : this.props.id === "pcpNPI"
              ? "72px"
              : this.props.id === "providerName"
              ? "74px"
              : this.props.id === "subscribeID"
              ? "75px"
              : this.props.id === "patientName"
              ? "110px"
              : this.props.id === "planCode"
              ? "80px"
              : this.props.id === "paidOn"
              ? "100px"
              : this.props.id === "totalNetPaymentAmt"
              ? "61px"
              : this.props.id === "totalPaymentAmount"
              ? "61px"
              : this.props.id === "claimStatus"
              ? "81px"
              : this.props.id === "claimType"
              ? "61px"
              : "72px",
        }}
      >
        <Input
          type="text"
          id={this.props.id}
          size="small"
          onChange={this.changes}
          // placeholder={"Enter " + this.props.id}
          placeholder={"Enter"}
        />
        {/* <input type="text" id={this.props.id}   class="form-control" name="searchField" onChange={this.changes} placeholder={'Enter ' + this.props.id}/> */}
      </div>
    );
  }
}

export default Textbox;
