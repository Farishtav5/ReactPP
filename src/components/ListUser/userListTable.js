import React, { Component } from "react";
import Header from "./userTableHeader";
import TableData from "./userTableData";

export default class userListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      currentPage: 1,
      rowsPerPage: 200,
      totalRowCount: 0,
      filterdata: [],
      tabledata: this.props.tableData,
      SortTable: this.props.tableData,
      tablestate: false,
      filter: {
        UserName: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        DateOfBirth: "",
        Roles: "",
      },
      sort: {
        column: null,
        direction: "asc",
      },
    };
  }
  componentDidMount() {
    this.setState({
      tabledata: this.props.tableData,
    });
  }

  getpaginationData = (allRows, currentPage) => {
    // console.log(allRows, currentPage);
    const indexOfLastRow = currentPage * this.state.rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - this.state.rowsPerPage;
    const currentPageData = allRows.slice(indexOfFirstRow, indexOfLastRow);
    return currentPageData;
  };

  filters = (fname, value) => {
    if (fname === "UserName") {
      this.state.filter.UserName = value;
    } else if (fname === "Email") {
      this.state.filter.Email = value;
    } else if (fname === "PhoneNumber") {
      this.state.filter.PhoneNumber = value;
    } else if (fname === "Address") {
      this.state.filter.Address = value;
    } else if (fname === "DateOfBirth") {
      this.state.filter.DateOfBirth = value;
    } else if (fname === "Roles") {
      this.state.filter.Roles = value;
    }
    // Filtering table based on input data.......................
    this.state.filterdata = this.state.tabledata.filter((e) => {
      e.UserName = e.providerName === null ? "" : e.UserName;
      e.Email = e.providerName === null ? "" : e.Email;
      e.PhoneNumber = e.PhoneNumber === null ? "" : e.PhoneNumber;
      e.Address = e.Address === null ? "" : e.Address;
      e.DateOfBirth = e.DateOfBirth === null ? "" : e.DateOfBirth;
      e.Roles = e.Roles === null ? "" : e.Roles;

      return (
        e.UserName.toLowerCase().includes(
          this.state.filter.UserName.toLowerCase()
        ) &&
        e.Email.toLowerCase().includes(this.state.filter.Email.toLowerCase()) &&
        e.PhoneNumber.toLowerCase().includes(
          this.state.filter.PhoneNumber.toLowerCase()
        ) &&
        e.Address.toLowerCase().includes(
          this.state.filter.Address.toLowerCase()
        ) &&
        e.DateOfBirth.includes(this.state.filter.DateOfBirth) &&
        e.Roles.toLowerCase().includes(this.state.filter.Roles.toLowerCase())
      );
    });
    this.setState({
      tablestate: true,
      SortTable: this.state.filterdata,
    });
  };
  tableSortresult = (column) => {
    // console.log(this.state.sort.direction);
    const direction = this.state.sort.direction === "desc" ? "asc" : "desc";
    const sortedData = this.state.SortTable.sort((a, b) => {
      if (
        column === "UserName" ||
        column === "Email" ||
        column === "PhoneNumber" ||
        column === "Address" ||
        column === "DateOfBirth" ||
        column === "Roles"
      ) {
        const nameA =
          column === "UserName"
            ? a.UserName === null
              ? ""
              : a.UserName.toUpperCase()
            : column === "Email"
            ? a.Email === null
              ? ""
              : a.Email.toUpperCase()
            : column === "PhoneNumber"
            ? a.PhoneNumber === null
              ? ""
              : a.PhoneNumber.toUpperCase()
            : column === "Address"
            ? a.Address === null
              ? ""
              : a.Address.toUpperCase()
            : column === "DateOfBirth"
            ? a.DateOfBirth === null
              ? ""
              : new Date(a.DateOfBirth)
            : a.Roles.toUpperCase();

        // Column B starts from here..............
        const nameB =
          column === "UserName"
            ? b.UserName === null
              ? ""
              : b.UserName.toUpperCase()
            : column === "Email"
            ? b.Email === null
              ? ""
              : b.Email.toUpperCase()
            : column === "PhoneNumber"
            ? b.PhoneNumber === null
              ? ""
              : b.PhoneNumber.toUpperCase()
            : column === "Address"
            ? b.Address === null
              ? ""
              : b.Address.toUpperCase()
            : column === "DateOfBirth"
            ? b.DateOfBirth === null
              ? ""
              : new Date(b.DateOfBirth)
            : b.Roles.toUpperCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      } else {
        return a.column - b.column;
      }
    });
    // console.log(sortedData);
    if (direction === "asc") {
      sortedData.reverse();
    }
    this.setState({
      sort: {
        column,
        direction,
      },
    });
  };
  render() {
    this.state.tabledata = this.props.tableData;
    // console.log(this.state.tabledata, this.props.tableData);
    let renderRows;
    if (this.state.tablestate === false) {
      renderRows = this.state.tabledata;
    } else {
      renderRows = this.state.filterdata;
    }

    return (
      <div>
        <table className="table">
          <Header
            headers={this.props.headers}
            filters={this.filters}
            tableSort={this.tableSortresult}
            // filtertext={this.state.TextValue}
          />

          <TableData
            data={this.getpaginationData(renderRows, this.state.currentPage)}
            header={this.props.headers}
            getType={this.props.getType}
          />
        </table>
      </div>
    );
  }
}

// Ite was Working Earliaer.....

// return (
//     <div>
//       {this.props.tableData && <Header />}
//       <div className="mt-3">
//         {this.props.tableData.map((item) => {
//           return (
//             <div>
//               <TableData data={item} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
