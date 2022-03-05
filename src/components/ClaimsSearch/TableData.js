import React, { Component } from "react";
import { addTab } from "../../store/broadcaster/BroadcastRegister";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";
import "./TableData.css";

export default class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbody: [],
      criticalColors: {
        background: ["", "#ffffff", "#ffe6e6", "#ff9999", "#ff6666", "#ff0000"],
        text: ["", "black", "black", "black", "white", "white"],
      },
    };
  }

  rowClick = (item) => {
    addTab.next({
      item: item,
      type: "membertype",
    });
  };

  render() {
    var today = new Date();
    // var mm = String(today.getMonth() + 1).padStart(2, "0");
    // var dd = String(today.getDate()).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();
    // today = yyyy + "-" + mm + "-" + dd;
    // today = mm + "/" + dd + "/" + yyyy;
    // today = today.toString();
    // console.log(today);

    return (
      <tbody
        className="tdata"
        // id={this.props.id !== undefined ? this.props.id : ""}
      >
        {this.props.header[0] &&
          this.props.data[0] &&
          this.props.data.map((items, index) => {
            let keys = Object.keys(items);
            let Critical = {};
            return (
              <tr
                onClick={() => {
                  this.rowClick(items);
                }}
                className="tdata"
              >
                {keys.map((item, i) => {
                  let link =
                    (item == "totalPaymentAmount" ||
                      item == "totalNetPaymentAmt") &&
                    items[item] != null &&
                    items[item] != ""
                      ? "$" + parseFloat(items[item]).toFixed(2)
                      : (item == "totalPaymentAmount" ||
                          item == "totalNetPaymentAmt") &&
                        items[item] != null &&
                        items[item] === 0
                      ? "$" + parseFloat(items[item]).toFixed(2)
                      : items[item];
                  return (
                    <td
                      className={
                        item == "SubscriberID" &&
                        (today <= new Date(items.TerminationDate)
                          ? "green-tag"
                          : "red-tag")
                      }
                      style={
                        this.props.header[i].display
                          ? { maxWidth: 102 }
                          : { display: "none" }
                      }
                      key={Math.random()}
                    >
                      <EllipsisWithTooltip>{link}</EllipsisWithTooltip>
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    );
  }
}
