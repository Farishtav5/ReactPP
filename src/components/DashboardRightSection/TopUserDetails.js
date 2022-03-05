import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import "./Topuser.css";
import UserCards from "./UserCards";
import Config from "../../config";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import FilterComponent from "../FilterComponent/FilterComponent";
import Applyfilter from "../images/number.png";
import filter from "../images/filter.png";
// import "antd/dist/antd.css";

export default class TopUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: false,
      providerCost: false,
      memberCost: false,
      getfilter: false,
      firstcard: 1,
      secondcard: 2,
      thirdcard: 3,
      usermembership: [],
      usercost: [],
      usermemberCost: [],
      // plan: ['Amb', 'Raju', 'Ansh'],
      // group: ['welcare', 'humana', 'taxes']
      // nuserdata: [],
    };
  }

  //Calling Api's to get the data on page load.....
  componentDidMount() {
    // Api call for Provider membership data
    fetch(
      Config.api + "/GetMembershipsPerProvider?ProviderName=" + "Chris Coppola"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          usermembership: res.Top5CostDetails,
        });
      });

    // Api call for provider cost data
    fetch(Config.api + "/GetTop5ProvidersCost?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          usercost: res.Top5CostDetails,
        });
      });

    //Api call for provider member's cost data

    fetch(Config.api + "/GetMembershipsCost?ProviderName=" + "Chris Coppola")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          usermemberCost: res.Top5CostDetails,
        });
      });
  }

  // Calling this function to change the state so that we can
  // We can get the filter modal on click on click of button..

  getfilterModal = () => {
    this.setState({
      getfilter: !this.state.getfilter,
    });
  };

  // Calling this function will change the state of the arrow icon
  // And based on this function call we will change the card data
  // as well as chage the size of card ..........................

  changeiconstate = (value) => {
    if (value === 0) {
      this.setState({
        provider: !this.state.provider,
      });
    } else if (value === 1) {
      this.setState({
        providerCost: !this.state.providerCost,
      });
    } else if (value == 2) {
      this.setState({
        memberCost: !this.state.memberCost,
      });
    }
  };

  // getNewApivalue = () => {
  //   fetch(Config.api + "/GetMembershipsCost?plan=" + this.state.plan + '&group=' + this.state.group)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         usermemberCost: res.Top5CostDetails,
  //       });
  //     });
  // }

  render() {
    return (
      <div className="shadow" style={{height:'100vh'}}>
        {this.state.getfilter === false ? (
          <div>
            <Row className="p-2">
              <Col span={12} className="right-side-header">
                Top 5
              </Col>
              <Col span={12} pull={1}>
                <button
                  className="border-0 user-filter-icon"
                  style={{ float: "right" }}
                  onClick={this.getfilterModal}
                >
                  {/* <i class="fas fa-filter"></i> */}
                  <img src={filter} style={{ height: "15px", width: "15px" }} />
                </button>
              </Col>
            </Row>
            {/* Design of top 5 details of each type */}
            {/* Design of top 5 Provider's / Members */}
            <div className="right-side-header-scroll">
              <div className="p-2 pr-2 pt-3 pb-3">
                <Card style={{ borderRadius: "4px" }}>
                  <div className="user-card-header p-1 pl-2">
                    Provider’s / Memberships{" "}
                    <span className="ml-1">
                      {this.state.provider == true ? (
                        <UpOutlined onClick={() => this.changeiconstate(0)} />
                      ) : (
                        <DownOutlined onClick={() => this.changeiconstate(0)} />
                      )}
                    </span>
                  </div>
                  <div className="pl-2 pt-2">
                    <UserCards
                      Newuserdata={this.state.usermembership}
                      cardstate={this.state.provider}
                      NewIndex={this.state.firstcard}
                    />
                  </div>
                </Card>
              </div>

              {/* Design of top 5 Provider's cost */}

              <div className="p-2 pr-2">
                <Card style={{ borderRadius: "4px" }}>
                  <div className="user-card-header p-1 pl-2">
                    Provider’s Cost{" "}
                    <span style={{ float: "right" }} className="pr-2">
                      {this.state.providerCost == true ? (
                        <UpOutlined onClick={() => this.changeiconstate(1)} />
                      ) : (
                        <DownOutlined onClick={() => this.changeiconstate(1)} />
                      )}
                    </span>
                  </div>
                  <div className="pl-2 pt-2">
                    <UserCards
                      Newuserdata={this.state.usercost}
                      cardstate={this.state.providerCost}
                      NewIndex={this.state.secondcard}
                    />
                  </div>
                </Card>
              </div>

              {/* Design of top 5 Member's cost */}

              <div className="p-2 pr-2">
                <Card style={{ borderRadius: "4px" }}>
                  <div className="user-card-header p-1 pl-2">
                    Member’s Cost{" "}
                    <span style={{ float: "right" }} className="pr-2">
                      {this.state.memberCost == true ? (
                        <UpOutlined onClick={() => this.changeiconstate(2)} />
                      ) : (
                        <DownOutlined onClick={() => this.changeiconstate(2)} />
                      )}
                    </span>
                  </div>
                  <div className="pl-2 pt-2">
                    <UserCards
                      Newuserdata={this.state.usermemberCost}
                      cardstate={this.state.memberCost}
                      NewIndex={this.state.thirdcard}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div style={{height: '96vh'}}>
            <Row className="p-2 pt-2 pb-3">
              <Col span={12} className="right-side-header">
                FILTERS
              </Col>
              <Col span={12} pull={1}>
                <button
                  className="border-0 user-filter-icon"
                  style={{ float: "right" }}
                  onClick={this.getfilterModal}
                >
                  {/* <i class="fas fa-filter" onClick={this.getfilterModal}></i> */}
                  <img src={Applyfilter} style={{ height: "12px", width: "15px" }} />
                </button>
              </Col>
            </Row>
            <Row className='right-side-header-scroll'>
              <FilterComponent
                Newuserdata={this.state.userdata}
                cardstate={this.state.provider}
              />
            </Row>
          </div>
        )}
        {/* <button onClick={this.getNewApivalue}>Save</button> */}
        
      </div>
    );
  }
}
