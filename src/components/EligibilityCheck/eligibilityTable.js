import React, { Component } from "react";
import Header from "../ClaimsSearch/TableHeader";
import TableData from "../ClaimsSearch/TableData";
import { Pagination } from "antd";
import "../ClaimsSearch/ProviderTable.css";

export default class eligibilityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      currentPage: 1,
      rowsPerPage: 10,
      TextValue: "EligibilityTable",
      totalRowCount: 0,
      Dummytable: [],
    };
  }
  getpaginationData = (allRows, currentPage) => {
    console.log(allRows, currentPage);
    const indexOfLastRow = currentPage * this.state.rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - this.state.rowsPerPage;
    const currentPageData = allRows.slice(indexOfFirstRow, indexOfLastRow);
    return currentPageData;
  };

  onPageChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const { tableData } = this.props.tableData;
    let renderRows = this.props.tableData;
    console.log(this.props.headers);
    return (
      <div className=" mt-5">
        <div className="table-responsive">
          <table className="table">
            <Header
              headers={this.props.headers}
              tableSort={this.props.tableSort}
              filtertext={this.state.TextValue}
            />
            <TableData
              data={this.getpaginationData(renderRows, this.state.currentPage)}
              header={this.props.headers}
            />
          </table>
        </div>
        {/* Pagination For table */}
        <div className="mb-5 pb-4">
          {this.props.headers[0] && (
            <Pagination
              size="small"
              hideOnSinglePage={true}
              current={this.state.currentPage}
              total={renderRows.length}
              defaultPageSize={this.state.rowsPerPage}
              showSizeChanger={false}
              onChange={this.onPageChange}
            />
          )}
        </div>
      </div>
    );
  }
}
