import React, { Component } from "react";
import FilterSearchText from "./FilterSearchText";
import "./TableHeader.css";
import tableSort from "../images/tablesort.svg";

export default class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      filters: {},
    };
  }

  filter = (fObj1, fObj2) => {
    this.props.filters(fObj1, fObj2);
  };
  tableSort = (name) => {
    this.props.tableSort(name);
  };

  componentDidMount() {
    this.setState({
      headers: this.props.headers.map((item) => {
        return (
          <th
            className="headerTextColor"
            key={item.title}
            style={item.display ? { background: "#FFF" } : { display: "none" }}
          >
            {item.displayName}
            <img
              src={tableSort}
              style={{ cursor: "pointer" }}
              onClick={() => this.tableSort(item.title)}
            />
            {this.props.filtertext === "ClaimsTable" && (
              <div className="mt-1">
                <FilterSearchText
                  id={item.title}
                  filterTextchange={this.filter}
                  filters={this.state.filters}
                  ftype={item.filterType}
                />
              </div>
            )}
          </th>
        );
      }),
    });
  }

  render() {
    return (
      // <Card className='border-1'>

      <thead className="shadow p-2 bg-white table-border">
        {this.props.headers.map((item) => {
          return (
            <th
              className="headerTextColor"
              key={item.title}
              style={
                item.display ? { background: "#FFF" } : { display: "none" }
              }
            >
              {item.displayName}
              <div>
                <img
                  src={tableSort}
                  style={{
                    cursor: "pointer",
                    marginTop:
                      item.displayName === "Rendering Provider"
                        ? "-12px"
                        : item.displayName === "Net Pay Amt ($)"
                        ? "-12px"
                        : item.displayName === "Total Charges($)"
                        ? "-12px"
                        : item.displayName === "Claim Type"
                        ? "-12px"
                        : item.displayName === "Claim Status"
                        ? "-12px"
                        : "0px",
                    marginBottom:
                      item.displayName === "Rendering Provider"
                        ? "0px"
                        : item.displayName === "Net Pay Amt ($)"
                        ? "0px"
                        : item.displayName === "Total Charges($)"
                        ? "0px"
                        : item.displayName === "Claim Type"
                        ? "0px"
                        : item.displayName === "Claim Status"
                        ? "0px"
                        : "-12px",
                  }}
                  onClick={() => this.tableSort(item.title)}
                />
              </div>
              {this.props.filtertext === "ClaimsTable" && (
                <div className="mt-1">
                  <FilterSearchText
                    id={item.title}
                    filterTextchange={this.filter}
                    filters={this.state.filters}
                    ftype={item.filterType}
                  />
                </div>
              )}
            </th>
          );
        })}
      </thead>
      // </Card>
    );
  }
}
