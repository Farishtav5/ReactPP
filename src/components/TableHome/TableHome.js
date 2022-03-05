import React, { Component } from "react";
import { Row, Col } from "antd";
import calender from "../images/calendar.png";
import filter from "../images/filter.png";
import plusicon from "../images/plusIcon.svg";
import closefilter from "../images/closefilter.svg";
import "./TableHome.css";
import ClaimsTable from "../ClaimsSearch/ClaimsTable";

export default class TableHome extends Component {
  // dispStatus = "none";
  constructor(props) {
    super(props);
    this.state = {
      buttonDisp: false,
      filterclose: false,
      prevstate: false,
      newstate: true,
      filterstate: false
    };
  }

  // Displaying the Filters in table header
  tooglefilter = () => {
    // this.dispStatus = this.dispStatus === 'block' ? 'none' : 'block'
    let a = document.getElementsByClassName('filter');
    for (let i = 0; i < a.length; i++) {
      a[i].style.display = this.dispStatus
    }
    this.setState({
      buttonDisp: !this.state.buttonDisp,
      filterclose: !this.state.filterclose,
      prevstate: !this.state.prevstate,
      newstate: !this.state.newstate,
      filterstate: !this.state.filterstate
    });
  };

  render() {
    return (
      <div style={{height:'91vh'}}>
        <div>
          <Row>
            {/* <Col span={18} className="ml-1 mb-4">
              <button className="border-0 user-filter-icon mr-1">
                <img
                  src={calender}
                  style={{ height: "12px", width: "12px", marginTop: "-4px" }}
                />
              </button>
              <span className="date-table-header-text">
                March - April, 2020
              </span>
            </Col> */}
            {/* <Col span={4} push={4} className="mb-1">
              {this.state.buttonDisp == false ? (
                <div>
                  <button className="border-0 table-filter-icon ml-4">
                    <img
                      src={plusicon}
                      style={{ height: "15px", width: "15px" }}
                    />
                  </button>
                  <button className="border-0 table-filter-icon ml-3">
                    <img
                      src={filter}
                      onClick={this.tooglefilter}
                      style={{ height: "15px", width: "15px" }}
                    />
                  </button>
                </div>
              ) : (
                <Col span={4} push={4} className='pl-3' style={{cursor:'pointer'}}>
                  <img
                      src={closefilter}
                      onClick={this.tooglefilter}
                      style={{marginTop:'-10px', marginBottom:'-4px'}}
                    />
                </Col>
              )}
            </Col> */}
          </Row>
        </div>
        <div>
            <ClaimsTable/>
          </div>
      </div>
    );
  }
}
