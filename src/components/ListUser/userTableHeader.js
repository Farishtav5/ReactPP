import React, { Component } from "react";
import { Row, Col } from "antd";
import tableSort from "../images/tablesort.svg";
import FilterSearchText from "./filterSearchTable";

export default class userTableHeader extends Component {
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
    // console.log(this.props.headers);
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

            <div className="mt-1">
              <FilterSearchText
                id={item.title}
                filterTextchange={this.filter}
                filters={this.state.filters}
                ftype={item.filterType}
              />
            </div>
          </th>
        );
      }),
    });
  }
  render() {
    return (
      // <Card className='border-1'>

      <thead className="">
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
              {item.displayName != "#" && (
                <img
                  src={tableSort}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.tableSort(item.title)}
                />
              )}
              <div className="mt-1">
                {item.displayName != "#" && (
                  <FilterSearchText
                    id={item.title}
                    filterTextchange={this.filter}
                    filters={this.state.filters}
                    ftype={item.filterType}
                  />
                )}
              </div>
            </th>
          );
        })}
      </thead>

      // </Card>
    );
  }
}

// return (
//   <Row style={{ marginTop: "-40px" }}>
//     <Col span={3} className="ml-1">
//       #
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//     <Col span={3}>
//       Name
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//     <Col span={5}>
//       Email
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//     <Col span={3}>
//       Contact No.
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//     <Col span={3}>
//       Address
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//     <Col span={3}>
//       D.O.B.
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//     <Col span={3}>
//       Role
//       <img
//         src={tableSort}
//         style={{ cursor: "pointer" }}
//         // onClick={() => this.tableSort(item.title)}
//       />
//     </Col>
//   </Row>
// );
