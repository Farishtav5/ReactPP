import React, { Component } from "react";
import Header from "./TableHeader";
import TableData from "./TableData";
import { Pagination, Row, Col, Spin } from "antd";
import { connect } from "react-redux";
import { fetchLoadData, unsubscribe } from "../../store/actions/webService";
import "./ProviderTable.css";
import Config from "../../config";
import download from "../images/download.png";

class ClaimsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      allRows: [],
      curRows: [],
      currentPage: 1,
      rowsPerPage: 12,
      totalRowCount: 0,
      Dummytable: [],
      SortTable: [],
      filterdata: [],
      updatetable: false,
      tablestate: false,
      sortedData: [],
      TextValue: "ClaimsTable",
      newpagevalue: false,
      changepagesize: false,
      loader: true,
      filter: {
        Claims: "",
        BillingProviderName: "",
        Tax: "",
        PCPNPI: "",
        ProviderName: "",
        SubID: "",
        SubName: "",
        PatientName: "",
        DOSFrom: "",
        DOSTo: "",
        PlanCode: "",
        PaidOn: "",
        NetPayAmt: "",
        PayAmt: "",
        ClaimStatus: "",
        Age: "",
        PlanName: "",
        ClaimType: "",
        PlanRecievedDate: "",
      },
      sort: {
        column: null,
        direction: "asc",
      },
    };
  }

  componentDidMount() {
    // get headers here so it doent update the selected columns every time
    let data = {
      url:
        Config.api +
        "/GetClaimDeatils?PlanName=" +
        sessionStorage.getItem("planName") +
        "&NPI=" +
        sessionStorage.getItem("npivalue") +
        "&TaxID=" +
        sessionStorage.getItem("taxid"),
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("access_token"),
      },
      key: "episodeSummary",
    };
    // get headers here so it doent update the selected columns every time
    const options = {
      headers: {
        Authorization: sessionStorage.getItem("access_token"),
      },
    };
    fetch(data.url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.ClaimsDetails.length > 0) {
          this.setState({
            headers: Object.keys(res.ClaimsDetails[0]).map((key) => {
              return {
                title: key,
                displayName: Config.tableColumns[key].displayName,
                display:
                  Config.tableColumns &&
                  Config.tableColumns[key] &&
                  Config.tableColumns[key].display
                    ? true
                    : false,
                filterType: Config.tableColumns[key].filterType || "text",
              };
            }),
            Dummytable: res.ClaimsDetails,
            SortTable: res.ClaimsDetails,
            loader: false,
          });
        } else {
          this.setState({
            loader: false,
          });
        }
      });

    this.props.loadData(data);
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
    });
  };

  //.............................Changing data based on page change load.......................
  getpaginationData = (allRows, currentPage) => {
    const indexOfLastRow = currentPage * this.state.rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - this.state.rowsPerPage;
    const currentPageData = allRows.slice(indexOfFirstRow, indexOfLastRow);
    return currentPageData;
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  // sorting table data for each column................
  tableSortresult = (column) => {
    // console.log("insidetable sort function", this.state.Dummytable);
    const direction = this.state.sort.direction === "desc" ? "asc" : "desc";
    const sortedData = this.state.SortTable.sort((a, b) => {
      if (
        column === "claimNumber" ||
        column === "patientName" ||
        column === "subscribeID" ||
        column === "dosFromDate" ||
        column === "dosToDate" ||
        column === "claimStatus" ||
        column === "billingProviderName" ||
        column === "providerName" ||
        column === "pcpNPI" ||
        column === "totalPaymentAmount" ||
        column === "totalNetPaymentAmt" ||
        column === "claimType"
      ) {
        const nameA =
          // column === "SubscriberID"? a.SubscriberID.toUpperCase()
          column === "claimNumber"
            ? a.claimNumber === null
              ? ""
              : a.claimNumber.toUpperCase()
            : column === "patientName"
            ? a.patientName === null
              ? ""
              : a.patientName.toUpperCase()
            : column === "subscribeID"
            ? a.subscribeID === null
              ? ""
              : a.subscribeID.toUpperCase()
            : column === "dosFromDate"
            ? a.dosFromDate === null
              ? ""
              : new Date(a.dosFromDate)
            : column === "dosToDate"
            ? a.dosToDate === null
              ? ""
              : new Date(a.dosToDate)
            : column === "claimStatus"
            ? a.claimStatus === null
              ? ""
              : a.claimStatus.toUpperCase()
            : column === "billingProviderName"
            ? a.billingProviderName === null
              ? ""
              : a.billingProviderName.toUpperCase()
            : column === "providerName"
            ? a.providerName === null
              ? ""
              : a.providerName.toUpperCase()
            : column === "pcpNPI"
            ? a.pcpNPI === null
              ? ""
              : a.pcpNPI.toUpperCase()
            : column === "totalPaymentAmount"
            ? a.totalPaymentAmount === null || a.totalPaymentAmount === ""
              ? -99999999
              : parseInt(a.totalPaymentAmount)
            : column === "totalNetPaymentAmt"
            ? a.totalNetPaymentAmt === null || a.totalNetPaymentAmt === ""
              ? -99999999
              : parseInt(a.totalNetPaymentAmt)
            : a.claimType === null
            ? ""
            : a.claimType.toUpperCase();
        const nameB =
          column === "claimNumber"
            ? b.claimNumber === null
              ? ""
              : b.claimNumber.toUpperCase()
            : column === "patientName"
            ? b.patientName === null
              ? ""
              : b.patientName.toUpperCase()
            : column === "subscribeID"
            ? b.subscribeID === null
              ? ""
              : b.subscribeID.toUpperCase()
            : column === "dosFromDate"
            ? b.dosFromDate === null
              ? ""
              : new Date(b.dosFromDate)
            : column === "dosToDate"
            ? b.dosToDate === null
              ? ""
              : new Date(b.dosToDate)
            : column === "claimStatus"
            ? b.claimStatus === null
              ? ""
              : b.claimStatus.toUpperCase()
            : column === "billingProviderName"
            ? b.billingProviderName === null
              ? ""
              : b.billingProviderName.toUpperCase()
            : column === "providerName"
            ? b.providerName === null
              ? ""
              : b.providerName.toUpperCase()
            : column === "pcpNPI"
            ? b.pcpNPI === null
              ? ""
              : b.pcpNPI.toUpperCase()
            : column === "totalPaymentAmount"
            ? b.totalPaymentAmount === null || b.totalPaymentAmount === ""
              ? -99999999
              : parseInt(b.totalPaymentAmount)
            : column === "totalNetPaymentAmt"
            ? b.totalNetPaymentAmt === null || b.totalNetPaymentAmt === ""
              ? -99999999
              : parseInt(b.totalNetPaymentAmt)
            : b.claimType === null
            ? ""
            : b.claimType.toUpperCase();

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

    if (direction === "asc") {
      sortedData.reverse();
    }

    this.setState({
      filterdata: sortedData,
      tablestate: true,
      sort: {
        column,
        direction,
      },
    });
  };

  // filtering table value based on textbox value
  filters = (fname, value) => {
    if (fname === "claimNumber") {
      this.state.filter.Claims = value;
    } else if (fname === "billingProviderName") {
      this.state.filter.BillingProviderName = value;
    } else if (fname === "taxid") {
      this.state.filter.Tax = value;
    } else if (fname === "pcpNPI") {
      this.state.filter.PCPNPI = value;
    } else if (fname === "providerName") {
      this.state.filter.ProviderName = value;
    } else if (fname === "subscribeID") {
      this.state.filter.SubID = value;
    } else if (fname === "subscriberName") {
      this.state.filter.SubName = value;
    } else if (fname === "patientName") {
      this.state.filter.PatientName = value;
    } else if (fname === "dosFromDate") {
      this.state.filter.DOSFrom = value;
    } else if (fname === "dosToDate") {
      this.state.filter.DOSTo = value;
    } else if (fname === "planCode") {
      this.state.filter.PlanCode = value;
    } else if (fname === "paidOn") {
      this.state.filter.PaidOn = value;
    } else if (fname === "totalNetPaymentAmt") {
      this.state.filter.NetPayAmt = value;
    } else if (fname === "totalPaymentAmount") {
      this.state.filter.PayAmt = value;
    } else if (fname === "claimStatus") {
      this.state.filter.ClaimStatus = value;
    } else if (fname === "age") {
      this.state.filter.Age = value;
    } else if (fname === "planName") {
      this.state.filter.PlanName = value;
    } else if (fname === "claimType") {
      this.state.filter.ClaimType = value;
    } else if (fname === "planReceivedDate") {
      this.state.filter.PlanRecievedDate = value;
    }

    // Filtering table based on input data.......................

    this.state.filterdata = this.state.Dummytable.filter((e) => {
      // e.totalNetPaymentAmt =
      //   e.totalNetPaymentAmt === null ? "" : e.totalNetPaymentAmt.toString();
      //  totalNetPaymentAmt;
      e.totalNetPaymentAmt =
        e.totalNetPaymentAmt === null
          ? ""
          : e.totalNetPaymentAmt === ""
          ? ""
          : parseFloat(e.totalNetPaymentAmt).toFixed(2);
      // e.totalNetPaymentAmt.toString();

      e.totalPaymentAmount =
        e.totalPaymentAmount === null
          ? ""
          : e.totalPaymentAmount === ""
          ? ""
          : parseFloat(e.totalPaymentAmount).toFixed(2);
      // e.totalPaymentAmount.toString();
      // e.paidOn = e.paidOn === null ? "" : e.paidOn;
      e.billingProviderName =
        e.billingProviderName === null ? "" : e.billingProviderName;
      e.claimStatus = e.claimStatus === null ? "" : e.claimStatus;
      e.taxid = e.taxid === null ? "" : e.taxid;
      e.pcpNPI = e.pcpNPI === null ? "" : e.pcpNPI;
      e.providerName = e.providerName === null ? "" : e.providerName;
      e.subscribeID = e.subscribeID === null ? "" : e.subscribeID;
      // e.subscriberName = e.subscriberName === null ? "" : e.subscriberName;
      e.claimNumber = e.claimNumber === null ? "" : e.claimNumber;
      e.patientName = e.patientName === null ? "" : e.patientName;
      e.dosFromDate = e.dosFromDate === null ? "" : e.dosFromDate;
      e.dosToDate = e.dosToDate === null ? "" : e.dosToDate;
      // e.planCode = e.planCode === null ? "" : e.planCode;
      e.claimType = e.claimType === null ? "" : e.claimType;

      return (
        e.claimNumber
          .toLowerCase()
          .includes(this.state.filter.Claims.toLowerCase()) &&
        e.billingProviderName
          .toLowerCase()
          .includes(this.state.filter.BillingProviderName.toLowerCase()) &&
        e.taxid.toLowerCase().includes(this.state.filter.Tax.toLowerCase()) &&
        e.pcpNPI
          .toLowerCase()
          .includes(this.state.filter.PCPNPI.toLowerCase()) &&
        e.providerName
          .toLowerCase()
          .includes(this.state.filter.ProviderName.toLowerCase()) &&
        e.subscribeID
          .toLowerCase()
          .includes(this.state.filter.SubID.toLowerCase()) &&
        // e.subscriberName
        //   .toLowerCase()
        //   .includes(this.state.filter.SubName.toLowerCase()) &&
        e.patientName
          .toLowerCase()
          .includes(this.state.filter.PatientName.toLowerCase()) &&
        e.dosFromDate
          .toLowerCase()
          .includes(this.state.filter.DOSFrom.toLowerCase()) &&
        e.dosToDate.toLowerCase().includes(this.state.filter.DOSTo) &&
        // e.planCode
        //   .toLowerCase()
        //   .includes(this.state.filter.PlanCode.toLowerCase()) &&
        // e.paidOn.toLowerCase().includes(this.state.filter.PaidOn) &&
        e.totalNetPaymentAmt.includes(this.state.filter.NetPayAmt) &&
        e.totalPaymentAmount.includes(this.state.filter.PayAmt) &&
        e.claimStatus
          .toLowerCase()
          .includes(this.state.filter.ClaimStatus.toLowerCase()) &&
        // e.age.toLowerCase().includes(this.state.filter.Age.toLowerCase()) &&
        // e.planName
        //   .toLowerCase()
        //   .includes(this.state.filter.PlanName.toLowerCase()) &&
        e.claimType
          .toLowerCase()
          .includes(this.state.filter.ClaimType.toLowerCase())
        // &&
        // e.planReceivedDate
        //   .toLowerCase()
        //   .includes(this.state.filter.PlanRecievedDate.toLowerCase())
      );
    });
    this.setState({
      tablestate: true,
      SortTable: this.state.filterdata,
    });
  };

  // Changing Default pagination value
  getPaginationValue = (pageSize) => {
    this.setState({
      rowsPerPage:
        pageSize == true
          ? this.state.rowsPerPage + 10
          : this.state.rowsPerPage - 10,
      newpagevalue: true,
      changepagesize: !this.state.changepagesize,
    });
  };

  render() {
    // this.state.Dummytable = this.state.filter;
    const { tableData } = this.props;

    let renderRows = [];
    if (this.state.tablestate == false && this.state.newpagevalue == false) {
      if (tableData && tableData[0]) {
        renderRows = tableData.map((rows, index) => {
          return rows;
        });
      }
    } else if (this.props.filterstate == false) {
      if (tableData && tableData[0]) {
        renderRows = tableData.map((rows, index) => {
          return rows;
        });
      }
    } else {
      if (tableData && tableData[0]) {
        renderRows = this.state.filterdata.map((rows, index) => {
          return rows;
        });
      }
    }

    return (
      <div>
        {/* ************************************ */}
        <div className="table-responsive">
          <table className="table">
            {this.props.tableData !== undefined && (
              <div className="table-responsive">
                <table className="table">
                  {/* Creating Table Header And Loading Header */}

                  {this.state.headers[0] && (
                    <Header
                      headers={this.state.headers}
                      filters={this.filters}
                      // tableData={this.state.Dummytable}
                      filtertext={this.state.TextValue}
                      tableSort={this.tableSortresult}
                    />
                  )}

                  {/* Loading Table data Component */}

                  {this.props.tableData.length > 0 &&
                    this.props.isTableData && (
                      <TableData
                        data={this.getpaginationData(
                          renderRows,
                          this.state.currentPage
                        )}
                        header={this.state.headers}
                      />
                    )}
                </table>
              </div>
            )}
          </table>

          {/* if no data is present for first time */}
          {this.props.isTableData === false &&
            this.props.tableData === undefined && (
              <div
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  marginTop: "38vh",
                }}
              >
                Oops no data found please check the server and try reloading !
              </div>
            )}

          {this.state.tablestate == true && this.state.filterdata.length == 0 && (
            <div
              style={{
                fontSize: "20px",
                textAlign: "center",
                // marginTop: "38vh",
              }}
            >
              Oops no data found please check the server and try reloading !
            </div>
          )}
          {this.state.loader === true && (
            <div style={{ marginTop: "36vh", marginLeft: "46vw" }}>
              <Spin size="large" />
              <div style={{ marginLeft: "-6vw" }} className="search-sreen-text">
                Loading Table data...
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {this.state.changepagesize == true && (
              // This pagination will called if you are adding or removing default page size
              <div className="">
                {this.state.headers[0] && (
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
            )}

            {this.state.changepagesize == false && this.state.rowsPerPage > 0 && (
              // This pagination will called by default
              <div
              // className=""
              // style={{ display: "inline-block", float: "left" }}
              >
                {this.state.headers[0] && (
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

{
  /* Adding Redux and calling webservices Component */
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (data) =>
      dispatch(
        fetchLoadData(data.url, data.method, data.key, data.headers, data.data)
      ),
    destroy: () => dispatch(unsubscribe()),
  };
};

const mapStateToProps = (state, props) => {
  const Data = state.ClaimsDetails;
  if (Data && Data[0]) {
    return {
      headers: Object.keys(Data[0]).map((key) => {
        return {
          title: key,
          displayName: Config.tableColumns[key].displayName,
          display:
            Config.tableColumns &&
            Config.tableColumns[key] &&
            Config.tableColumns[key].display
              ? true
              : false,
          filterType: Config.tableColumns[key].filterType || "text",
        };
      }),
      tableData: Data,
      loader: false,
      isTableData: state.isTableData,
    };
  } else if (state.ClaimsDetails === undefined && state.isTableData === false) {
    return {
      loader: false,
      isTableData: state.isTableData,
    };
  } else {
    return {
      // loader: true,
    };
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClaimsTable);
