import React, { Component } from "react";
import FilterCard from "./FilterCard";
import { Card, Row, Col } from "antd";
import Config from "../../config";
import DateFilter from "./DateFilter";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Filterchart } from "../../store/broadcaster/BroadcastRegister";
// var GpName

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Plan: false,
      Group: false,
      provider: false,
      radiostatuscard1: true,
      radiostatuscard2: true,
      radiostatuscard3: true,
      filterGroup: [],
      filterPlan: [],
      filterProvider: [],
      cardarray: [1, 2, 3]
    };
  }

  // Calling Default api's on page load...
  componentDidMount() {
    // Api call fro Filter Group data display...
    fetch(
      Config.api +
        "/GetGroupsAssociatedForProvider?ProviderName=" +
        "Chris Coppola"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          filterGroup: res.GroupDetails,
        });
      });

    // Api call for Filter Plan data display....

    fetch(
      Config.api +
        "/GetPlansAssociatedForProvider?ProviderName=" +
        "Chris Coppola"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          filterPlan: res.PlansDetails,
        });
      });

    // Api call for Filter Provider data display.....

    fetch(Config.api + "/GetTop5ProvidersCost?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          filterProvider: res.Top5CostDetails,
        });
      });
  }

  // Calling this function will change the state of the arrow icon
  // And based on this function call we will change the card data
  // as well as chage the size of card ..........................
  changeiconstate = (value) => {
    if (value === 0) {
      this.setState({
        Group: !this.state.Group,
        // radiostatuscard1: !this.state.radiostatuscard1
      });
    } else if (value === 1) {
      this.setState({
        Plan: !this.state.Plan,
        // radiostatuscard2: !this.state.radiostatuscard2
      });
    } else if (value == 2) {
      this.setState({
        provider: !this.state.provider,
        // radiostatuscard3: !this.state.radiostatuscard3
      });
    }
    // this.setState({
    //   radiostatus: !this.state.radiostatus
    // })
  };

  getfiltervalue = (data, type, status) => {
    console.log(data, type, status);
    if(type == 'Group'){
      if(status === true){
        this.Group.add(data);
        console.log(this.Group); 
      }else{
        this.Group.delete(data);
        console.log(this.Group);
      }
    }else if(type == 'Plan'){
      if(status === true){
        this.Plan.add(data);
        console.log(this.Plan);
      }else{
        this.Plan.delete(data);
        console.log(this.Plan);
      }
    }else if(type == 'Provider'){
      if(status === true){
        this.Provider.add(data);
        console.log(this.Provider);
      }else{
        this.Provider.delete(data);
        console.log(this.Provider);
      }
    }
  }

  ApplyGraphFiters = () => {
    const data = [this.Group, this.Plan]
    Filterchart.next(data);
  }

  render() {
    this.Group = new Set();
    {this.state.filterGroup.length > 0 && 
      this.state.filterGroup.forEach(element => {
        this.Group.add(element.GroupName)
      });
    }
    console.log(this.Group);
    this.Plan = new Set();
    {this.state.filterPlan.length > 0 && 
      this.state.filterPlan.forEach(element => {
        this.Plan.add(element.PlanName)
      });
    }
    this.Provider = new Set();
    // {this.state.filterProvider.length > 0 && 
    //   this.state.filterProvider.forEach(element => {
    //     this.Plan.add(element.PlanName)
    //   });
    // }
    return (
      <div>
        <div className="p-2 pr-2">
          {/* Design For Date filter in Filter Component  */}
          <Card style={{ borderRadius: "4px" }} className="mb-2">
            <div className="user-card-header p-1 pl-2">Select Date Range</div>
            <div className="p-2">
              <DateFilter />
            </div>
          </Card>

          {/* Other Card For filter in Filter Component */}

          {/* {this.state.cardarray.map((item) => {
            return ( */}
          <Card style={{ borderRadius: "4px" }} className="mb-2">
            <div className="user-card-header p-1 pl-2">
              Select Group
              <span className="ml-1">
                {this.state.Group === true ? (
                  <UpOutlined
                    style={{ float: "right" }}
                    className="mt-1 pr-1"
                    onClick={() => this.changeiconstate(0)}
                  />
                ) : (
                  <DownOutlined
                    style={{ float: "right" }}
                    className="mt-1 pr-1"
                    onClick={() => this.changeiconstate(0)}
                  />
                )}
              </span>
            </div>
            <div className="pt-2">
              {this.state.filterGroup.map((obj, item) => {
                if (this.state.Group === false) {
                  if (item <= 4) {
                    return (
                      <FilterCard
                        RowValue={obj.GroupName}
                        Rowid={obj.ID}
                        radiovalue={this.state.radiostatuscard1}
                        type='Group'
                        checkvalue={this.getfiltervalue}
                      />
                    );
                  }
                } else {
                  return (
                    <FilterCard
                      RowValue={obj.GroupName}
                      Rowid={obj.ID}
                      radiovalue={this.state.radiostatuscard1}
                      type='Group'
                      checkvalue={this.getfiltervalue}
                    />
                  );
                }
              })}
            </div>
          </Card>
          {/* );
          })} */}

          <Card style={{ borderRadius: "4px" }} className="mb-2">
            <div className="user-card-header p-1 pl-2">
              Select Plan
              <span className="ml-1">
                {this.state.Plan === true ? (
                  <UpOutlined
                    style={{ float: "right" }}
                    className="mt-1 pr-1"
                    onClick={() => this.changeiconstate(1)}
                  />
                ) : (
                  <DownOutlined
                    style={{ float: "right" }}
                    className="mt-1 pr-1"
                    onClick={() => this.changeiconstate(1)}
                  />
                )}
              </span>
            </div>
            <div className="pt-2">
              {this.state.filterPlan.map((obj, item) => {
                if (this.state.Plan === false) {
                  if (item <= 4) {
                    return (
                      <FilterCard
                        RowValue={obj.PlanName}
                        Rowid={obj.ID}
                        radiovalue={this.state.radiostatuscard2}
                        type='Plan'
                        checkvalue={this.getfiltervalue}
                      />
                    );
                  }
                } else {
                  return (
                    <FilterCard
                      RowValue={obj.PlanName}
                      Rowid={obj.ID}
                      radiovalue={this.state.radiostatuscard2}
                      type='Plan'
                      checkvalue={this.getfiltervalue}
                    />
                  );
                }
              })}
            </div>
          </Card>

          {/* <Card style={{ borderRadius: "4px" }} className="mb-2">
            <div className="user-card-header p-1 pl-2">
              Select Provider
              <span className="ml-1">
                {this.state.provider === true ? (
                  <UpOutlined
                    style={{ float: "right" }}
                    className="mt-1 pr-1"
                    onClick={() => this.changeiconstate(2)}
                  />
                ) : (
                  <DownOutlined
                    style={{ float: "right" }}
                    className="mt-1 pr-1"
                    onClick={() => this.changeiconstate(2)}
                  />
                )}
              </span>
            </div>
            <div className="pt-2">
              {this.state.filterProvider.map((obj, item) => {
                if (this.state.provider === false) {
                  if (item <= 4) {
                    return (
                      <FilterCard
                        RowValue={obj.ProviderName}
                        radiovalue={this.state.radiostatuscard3}
                        type='Provider'
                        checkvalue={this.getfiltervalue}
                      />
                    );
                  }
                } else {
                  return (
                    <FilterCard
                      RowValue={obj.ProviderName}
                      radiovalue={this.state.radiostatuscard3}
                      type='Provider'
                      checkvalue={this.getfiltervalue}
                    />
                  );
                }
              })}
            </div>
          </Card> */}
        </div>

        <Row className="p-2" style={{display: 'flex', justifyContent:'space-between'}}>
            <div >
            <button onClick={this.ApplyGraphFiters}>Apply</button>
          </div>
            <div >
            <button>Cancle</button>
          </div>
        </Row>
      </div>
    );
  }
}
