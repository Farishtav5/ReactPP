import React, { Component } from "react";
import { Row, Col, Dropdown, Menu, Icon, notification } from "antd";
import "./ListUser.css";
import Config from "../../config";
import { updateUserList } from "../../store/broadcaster/BroadcastRegister";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

export default class userTableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getValue: [],
    };
  }

  onClickofmenu = () => {
    this.props.getType("edit", this.state.getValue);
  };

  Getvalue = (data) => {
    this.setState({
      getValue: data,
    });
  };

  DeleteUser = async () => {
    let data = await fetch(Config.api + "/DeleteUser", {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("access_token"),
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        UserName: this.state.getValue.Email,
        TenantID: sessionStorage.getItem("Tanent"),
        ID: this.state.getValue.ID,
      }),
    });
    data = await data.json();
    if (data.Message === "User Deleted Successfully") {
      updateUserList.next("update");
      this.openNotification(data);
    } else {
      this.openNotification(data);
    }
  };

  openNotification = (res) => {
    notification.open({
      description: res.Message,
      // onClick: () => {
      // },
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onClickofmenu}>
          <b>Edit Information</b>
        </Menu.Item>
        <Menu.Item key="2" style={{ color: "red" }} onClick={this.DeleteUser}>
          Deactivate User
        </Menu.Item>
      </Menu>
    );
    return (
      <tbody
        className="tdata"
        // id={this.props.id !== undefined ? this.props.id : ""}
      >
        {this.props.header[0] &&
          this.props.data[0] &&
          this.props.data.map((items, index) => {
            let keys = Object.keys(items);
            // let Critical = {};
            return (
              <tr className="table-data-card">
                {keys.map((item, i) => {
                  let link = items[item];
                  return (
                    <td
                      style={
                        this.props.header[i].display
                          ? { maxWidth: 102 }
                          : { display: "none" }
                      }
                      className={
                        this.props.header[i].displayName === "Mob" ||
                        this.props.header[i].displayName === "D.O.B"
                          ? "contact-no"
                          : ""
                      }
                    >
                      <EllipsisWithTooltip>{link}</EllipsisWithTooltip>
                    </td>
                  );
                })}
                <Col style={{ width: "21px" }} className="menu3-dot-icon mt-2">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <span style={{ userSelect: "none" }}>
                      <Icon
                        type="more"
                        className="ml-1"
                        style={{ marginTop: "8px" }}
                        onClick={() => this.Getvalue(items)}
                      />
                    </span>
                  </Dropdown>
                </Col>
              </tr>
            );
          })}
      </tbody>
    );
  }
}

// render() {
//   const menu = (
//     <Menu onClick={this.onClickofmenu}>
//       <Menu.Item key="1">Edit</Menu.Item>
//       <Menu.Item key="2">Delete</Menu.Item>
//     </Menu>
//   );
//   return (
//     <Row className="table-data-card p-2 pb-2">
//       <Col span={3}>{this.props.data.Sno}</Col>
//       <Col span={3}>{this.props.data.UserName}</Col>
//       <Col span={5}>{this.props.data.Email}</Col>
//       <Col span={3}>{this.props.data.PhoneNumber}</Col>
//       <Col span={3}>{this.props.data.Address}</Col>
//       <Col span={3}>{this.props.data.DateOfBirth}</Col>
//       <Col span={3}>{this.props.data.Roles}</Col>
//       <Col span={1} className="menu3-dot-icon mt-2">
//         <Dropdown overlay={menu} trigger={["click"]}>
//           <span style={{ userSelect: "none" }}>
//             <Icon type="more" />
//           </span>
//         </Dropdown>
//       </Col>
//     </Row>
//   );
// }
