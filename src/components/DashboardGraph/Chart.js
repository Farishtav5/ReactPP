import React, { Component, Fragment } from "react";
import { Row, Col } from "antd";
import Echarts from "echarts-for-react";
import menu from "../images/menu.png";
import Expand from "../images/expand.png";
import closeExpand from "../images/Backtonormal.svg";
import "./charts.css";
// exportingInit(Highcharts);

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  getOption = (value) => {
    return {
      textStyle: {
        top: 80,
      },

      tooltip: {
        trigger: "axis",
        backgroundColor: "#FFF",
        shadow: true,
        textStyle: {
          color: "#000",
        },
      },
      xAxis: {
        type: "category",
        showGrid: true,
        axisLine: {
          symbol: "none",
        },
        boundaryGap: this.props.id != 6 ? false : true,
        axisLabel: {
          interval: 0,
          rotate: 90,
          fontFamily: "Montserrat",
          fontSize: 8,
          color: "#9AA1A9",
        },
        data: [
          { value: 'Jan', label: 'January' },
          { value: 'Feb', label: 'February'},
          { value: 'Mar', label: 'March' },
          { value: 'Apr', label: 'April' },
          { value: 'May', label: 'March' },
          { value: 'Jun', label: 'June' },
          { value: 'Jul', label: 'July' },
          { value: 'Aug', label: 'August' },
          { value: 'Sep', label: 'September'},
          { value: 'Oct', label: 'October' },
          { value: 'Nov', label: 'November' },
          { value: 'Dec', label: 'December' }
      ]
      },
      yAxis: {
        type: "value",
        axisLabel: {
          fontFamily: "Montserrat",
          fontSize: 9,
          color: "#393E43BF",
          formatter: function (val) {
            return value % 2 == 0 ? val : "$ " + val + "M";
          },
        },
      },
      // legend: {
      //   data: ["2020", "2019"],
      // },
      // grid: {},
      grid: {
        showGrid: true,
        top: 16,
        bottom: 8,
        left: 8,
        right: 16,
        containLabel: true,
      },

      // series : new array([{
      //   name: this.props.GraphData[0].Year,
      //   type: this.props.id != 6 ? "line" : "bar",
      //   smooth: 0.6,
      // barWidth: 4,
      //   symbol: "none",
      //   itemStyle: { color: "#2176FF", margin: 12, borderRadius: "4px" },
      //   // data: [120, 132, 101, 134, 450, 230, 210],
      //   data:
      //     this.props.id % 2 != 0
      //       ? this.props.GraphData[0].cost
      //       : this.props.GraphData[0].claim,
      // }]),

      //   series: function () {
      //     var series = [];
      //     for (var key in this.props.GraphData) {
      //         var item = {
      //             name: key,
      //             line: true,
      //             smooth: true,
      //             data: this.props.GraphData[key]
      //         }
      //         series.push(item);
      //     }
      //     return series;
      // },
      series: [
        this.props.GraphData[0] != undefined && {
          name: this.props.GraphData[0].Year,
          type: this.props.id != 6 ? "line" : "bar",
          smooth: 0.6,
          barWidth: this.props.fullgraph == true ? 10 : '',
          linewidth: 10,
          barRadius: 4,
          symbol: "none",
          itemStyle: { color: "#AF7AC5", margin: 12, borderRadius: "4px" },
          lineThickness: 9,
          data:
            this.props.id % 2 != 0
              ? this.props.GraphData[0].cost
              : this.props.id == 6
              ? this.props.GraphData[0].member
              : this.props.GraphData[0].claim,
        },
        this.props.GraphData[1] != undefined && {
          name: this.props.GraphData[1].Year,
          type: this.props.id != 6 ? "line" : "bar",
          smooth: 0.6,
          barWidth: this.props.fullgraph == true ? 10 : '',
          symbol: "none",
          itemStyle: { color: "#FFD371" },
          // data: [220, 90, 124, 234, 12, 330, 310],
          data:
            this.props.id % 2 != 0
              ? this.props.GraphData[1].cost
              : this.props.id == 6
              ? this.props.GraphData[1].member
              : this.props.GraphData[1].claim,
        },
        this.props.GraphData[2] != undefined && {
          name: this.props.GraphData[2].Year,
          type: this.props.id != 6 ? "line" : "bar",
          smooth: 0.6,
          barWidth: this.props.fullgraph == true ? 10 : '',
          symbol: "none",
          itemStyle: { color: "#2176FF", margin: 12, borderRadius: "4px" },
          // data: [120, 132, 101, 134, 450, 230, 210],
          data:
            this.props.id % 2 != 0
              ? this.props.GraphData[2].cost
              : this.props.id == 6
              ? this.props.GraphData[2].member
              : this.props.GraphData[2].claim,
        },
        this.props.GraphData[3] != undefined && {
          name: this.props.GraphData[3].Year,
          type: this.props.id != 6 ? "line" : "bar",
          smooth: 0.6,
          barWidth: this.props.fullgraph == true ? 10 : '',
          symbol: "none",
          itemStyle: { color: "#58D68D", margin: 12, borderRadius: "4px" },
          // data: [120, 132, 101, 134, 450, 230, 210],
          data:
            this.props.id % 2 != 0
              ? this.props.GraphData[3].cost
              : this.props.id == 6
              ? this.props.GraphData[3].member
              : this.props.GraphData[3].claim,
        },
        this.props.GraphData[4] != undefined && {
          name: this.props.GraphData[4].Year,
          type: this.props.id != 6 ? "line" : "bar",
          smooth: 0.6,
          barWidth: this.props.fullgraph == true ? 10 : '',
          symbol: "none",
          itemStyle: { color: "#F44336", margin: 12, borderRadius: "4px" },
          // data: [120, 132, 101, 134, 450, 230, 210],
          data:
            this.props.id % 2 != 0
              ? this.props.GraphData[4].cost
              : this.props.id == 6
              ? this.props.GraphData[4].member
              : this.props.GraphData[4].claim,
        },
        this.props.GraphData[5] != undefined && {
          name: this.props.GraphData[5].Year,
          type: this.props.id != 6 ? "line" : "bar",
          smooth: 0.6,
          barWidth: this.props.fullgraph == true ? 10 : '',
          symbol: "none",
          itemStyle: { color: "#00FF00", margin: 12, borderRadius: "4px" },
          // data: [120, 132, 101, 134, 450, 230, 210],
          data:
            this.props.id % 2 != 0
              ? this.props.GraphData[5].cost
              : this.props.id == 6
              ? this.props.GraphData[5].member
              : this.props.GraphData[5].claim,
        },
      ],
    };
  };

  // This function is responsible for full screen view of graph
  getfullscreenGraph = (value) => {
    // This function is will call changeScreen function from Dashboard Graph Component
    this.props.changeScreen(value);
  };

  render() {
    
    return (
      <div>
        <Row>
          <Col className={this.props.fullgraph == true ? "mt-4" : "pb-2"}>
            <div
              className={
                this.props.id % 2 != 0
                  ? "mt-1 shadow pb-2"
                  : this.props.fullgraph == true
                  ? "mt-2 shadow pb-2"
                  : "mt-1 shadow ml-3 pb-2"
              }
              style={{ borderRadius: "4px" }}
            >
              <div className={this.props.fullgraph == false ? "pt-1" : "pt-4"}>
                {/* Full screen view image with function call */}
                {this.props.fullgraph != true ? <button className="full-screen-icon" style={{height:'18px', width:'18px'}}>
                  <img
                    src={Expand}
                    style={{
                      marginTop:'-12px',
                      marginLeft:'-4px',
                      cursor: "pointer",
                    }}
                    onClick={() => this.getfullscreenGraph(this.props.id)}
                  ></img>
                </button> : 
                <img
                src={closeExpand}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => this.getfullscreenGraph(this.props.id)}
              ></img>
              }

                <span
                  className={
                    this.props.fullgraph == true
                      ? "graph-title full-graph-title ml-2"
                      : "graph-title ml-2"
                  }
                >
                  {this.props.id == 1
                    ? "PART A COST"
                    : this.props.id == 2
                    ? "No. of PART A CLAIMS"
                    : this.props.id == 3
                    ? "PART B COST"
                    : this.props.id == 4
                    ? "No. of PART B CLAIMS"
                    : this.props.id == 5
                    ? "PART D COST"
                    : "MEMBERSHIP"}
                </span>

                {/* Styling Componet when Graph is in full Screen View */}

                {this.props.fullgraph == true && (
                  <Fragment>
                    {/* Frist span is used for Min value in full screen graph */}
                    <span
                      className="full-graph-sub-title mr-5"
                      style={{ float: "right", marginTop: "-8px" }}
                    >
                      $ {this.props.value != undefined && this.props.value.MinValue}
                      <div className="full-screen-subtext2">
                        {/* Cercle css for min value */}
                        <div className="full-screen-cercle cercle-color2 mr-1"></div>
                        <span>Min Value in Jan</span>
                      </div>
                    </span>

                    {/* Second span we used for Max value in full graph */}

                    <span
                      className="full-graph-sub-title mr-5"
                      style={{ float: "right", marginTop: "-8px" }}
                    >
                      $ {this.props.value != undefined && this.props.value.Maxvalue}
                      <div className="full-screen-subtext2">
                        {/* Cercle css for max value */}
                        <div className="full-screen-cercle cercle-color1 mr-1"></div>
                        <span>Max Value in Mar</span>
                      </div>
                    </span>
                  </Fragment>
                )}
                {/* Adding Line in full screen graph after Tilte */}
                {this.props.fullgraph == true && (
                  <div className="full-screen-graph-line mt-4"></div>
                )}
              </div>

              {/* Calling Echart with Api data */}
              <Echarts
                option={this.getOption(this.props.id)}
                style={{
                  height: this.props.fullgraph == false ? "25vh" : "70vh",
                  width: this.props.fullgraph == false ? "37vw" : "95vw",
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
