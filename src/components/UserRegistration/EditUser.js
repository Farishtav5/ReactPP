import React, { Component } from "react";
import "./AddUser.css";
import {
  Card,
  Row,
  Col,
  Spin,
  Button,
  Form,
  Select,
  Input,
  Table,
  DatePicker,
  notification,
} from "antd";
import moment from "moment";
import Config from "../../config";
import { updateUserList } from "../../store/broadcaster/BroadcastRegister";
import { CloseCircleFilled } from "@ant-design/icons";

class editUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectValue: " ",
      Geticon: false,
      Taxclicked: false,
      Npiclicked: false,
      disabledaccordingtoinput: true,
      disabledaccordingtoinputTax: true,
      disabledNPI: this.props.userData.NPI.length > 0 ? true : false,
      disabled: false,
      clicked: false,
      ProviderNPIs:
        this.props.userData.NPI.length > 0
          ? this.props.userData.NPI.split("|")
          : [],
      TaxID:
        this.props.userData.TaxID.length > 0
          ? this.props.userData.TaxID.split("|")
          : [],
      AddRole: [],
      DeleteRole: [],
      DeleteNPI: [],
      DeleteTaxID: [],
      NewRole: [],
      message: "",
      disabled: false,
      disableRole: "",
    };
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  handleChangeNPI = (e) => {
    // console.log(e.target.value.length);
    let regex = new RegExp(/^[0-9]*$/);
    if (e.target.value.length == 10 && regex.test(e.target.value)) {
      this.setState({
        disabledaccordingtoinput: false,
        Npiclicked: true,
      });
    } else if (e.target.value.length === 0) {
      this.setState({
        disabledaccordingtoinput: false,
        Npiclicked: true,
      });
    } else {
      this.setState({
        disabledaccordingtoinput: true,
        Npiclicked: true,
      });
    }
  };

  handleChangeTax = (e) => {
    // console.log(e.target.value.length);
    let regex = new RegExp(/^[0-9]*$/);
    if (e.target.value.length == 9 && regex.test(e.target.value)) {
      this.setState({
        disabledaccordingtoinputTax: false,
        Taxclicked: true,
      });
    } else if (e.target.value.length === 0) {
      this.setState({
        disabledaccordingtoinputTax: false,
        Taxclicked: true,
      });
    } else {
      this.setState({
        disabledaccordingtoinputTax: true,
        Taxclicked: true,
      });
    }
  };

  // componentDidMount() {
  //   let Roles = this.props.userData.Roles.split("|");
  //   this.state.AddRole = Roles;
  //   let hasprovider = Roles.includes("Provider");
  //   let hasPlanAdmin = Roles.includes("Plan Admin");
  //   this.state.disableRole = hasprovider === true && "Plan Admin";
  //   this.state.disableRole = hasprovider === true && "Provider";
  //   this.state.SelectValue = hasprovider === true ? "Provider" : "admin";
  // }

  componentDidMount() {
    let Roles = this.props.userData.Roles.split("|");
    this.state.AddRole = Roles;
    let hasprovider = Roles.includes("Provider");
    console.log(hasprovider);
    let hasPlanAdmin = Roles.includes("Plan Admin");
    this.state.disableRole =
      hasprovider === true
        ? "Provider"
        : hasPlanAdmin === true
        ? "Plan Admin"
        : "";
    this.state.SelectValue = hasprovider === true ? "Provider" : "User Admin";
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let TenantID = sessionStorage.getItem("Tanent");
    TenantID = parseInt(TenantID, 10);
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // (values.Id = sessionStorage.getItem("UserID")),
        // values.CreatedBy = sessionStorage.getItem("userEmail");
        // values.Name =
        //   values.FirstName + " " + values.MiddleName + " " + values.LastName;
        if (values.MiddleName === "") {
          values.Name = values.FirstName + " " + values.LastName;
        } else {
          values.Name =
            values.FirstName + " " + values.MiddleName + " " + values.LastName;
        }

      values.AddNPI =
          this.state.ProviderNPIs &&
          this.state.ProviderNPIs.map((item) => {
            return { NPINumber: item };
          });

         values.DeleteNPI =
          this.state.DeleteNPI &&
          this.state.DeleteNPI.map((item) => {
            return { NPINumber: item };
          });

       values.AddTax =
          this.state.TaxID &&
          this.state.TaxID.map((item) => {
            return { TaxNumber: item };
          });

         values.DeleteTax =
          this.state.DeleteTaxID &&
          this.state.DeleteTaxID.map((item) => {
            return { TaxNumber: item };
          });

        values.AddRoleName = this.state.AddRole.map((item) => {
          return { Name: item };
        });
        values.DeleteRoleName = this.state.DeleteRole.map((item) => {
          return { Name: item };
        });

        // if (this.state.ProviderNPIs.length > 0) {
        //   this.state.ProviderNPIs.map((item) => {
        //     return { NPINumber: item };
        //   });
        // }
        // values.Tax = [{ TaxNumber: values.Tax01 }];
        // values.RoleName = [{ Name: values.RoleName }];
        values.Tenantid = TenantID;

        let data = await fetch(Config.api + "/EditUser", {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("access_token"),
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        data = await data.json();

        if (data.Message.toUpperCase() === "USER UPDATED SUCCESSFULLY") {
          this.openNotification(data);
          this.props.form.resetFields();
          this.setState({
            ProviderNPIs: [],
            TaxID: [],
            // AddRole: [],
          });
          updateUserList.next("update");
          this.props.getType("List");
        } else {
          this.openNotification(data);
        }
      }
      // this.props.form.resetFields();
    });
  };
  openNotification = (res) => {
    notification.open({
      description:
        res.Message === "" ? "Email ID already Exist !" : res.Message,
      // onClick: () => {
      // },
    });
  };
  handleChange = (value) => {
    if (value != null) {
      var today = new Date();
      var todaysmonth = String(today.getMonth() + 1).padStart(2, "0");
      var agemonth = value.format("MM/DD/YYYY").split("/")[0];
      var thisYear = 0;
      if (todaysmonth < agemonth) {
        thisYear = 1;
      } else if (todaysmonth == agemonth && todaysmonth < agemonth) {
        thisYear = 1;
      }
      var age =
        today.getFullYear() -
        value.format("MM/DD/YYYY").split("/")[2] -
        thisYear;
      this.setState({
        CurrentAge: age,
      });
    }
  };

  addItem(e) {
    e.preventDefault();
    console.log(e);
    const delet = this.state.DeleteNPI.indexOf(this.newItem.value);
    if (delet > -1) {
      this.state.DeleteNPI.pop(delet);
    }
    const { ProviderNPIs } = this.state;
    const newItem = this.newItem.value;
    const isONTheList = ProviderNPIs.includes(newItem);

    if (isONTheList) {
      this.setState({
        message: "This NPI is already added",
      });
    } else {
      newItem !== "" &&
        this.setState({
          ProviderNPIs: [...this.state.ProviderNPIs, newItem],
        });
      if (ProviderNPIs.length === 0) {
        this.setState({
          disabledNPI: true,
        });
      }
    }
    this.addForm1.reset();
  }

  addItemTax(e) {
    e.preventDefault();
    const delet = this.state.DeleteTaxID.indexOf(this.newItemTax.value);
    if (delet > -1) {
      this.state.DeleteTaxID.pop(delet);
    }
    const { TaxID } = this.state;
    const newItemTax = this.newItemTax.value;
    const isONTheListTax = TaxID.includes(newItemTax);

    if (isONTheListTax) {
      this.setState({
        message: "This NPI is already added",
      });
    } else {
      newItemTax !== "" &&
        this.setState({
          TaxID: [...this.state.TaxID, newItemTax],
        });
      if (TaxID.length === 0) {
        this.setState({
          disabled: true,
        });
      }
    }
    this.addForm.reset();
  }

  removeItem(item) {
    this.setState({
      disabledaccordingtoinput: true,
      Npiclicked: false,
    });
    this.state.DeleteNPI.push(item);
    console.log(this.state.DeleteNPI);
    const newProviderNPIs = this.state.ProviderNPIs.filter((ProviderNPIs) => {
      return ProviderNPIs !== item;
    });
    this.setState({
      ProviderNPIs: [...newProviderNPIs],
      disabledNPI: false,
    });
  }

  removeItemTax(item) {
    this.setState({
      disabledaccordingtoinputTax: true,
      Taxclicked: false,
    });
    this.state.DeleteTaxID.push(item);
    const newTaxID = this.state.TaxID.filter((TaxID) => {
      return TaxID !== item;
    });
    this.setState({
      TaxID: [...newTaxID],
      disabled: false,
    });
  }
  // removeRoleItem(item) {
  //   this.state.DeleteRole.push(item);
  //   const newRole = this.state.AddRole.filter((RoleID) => {
  //     return RoleID !== item;
  //   });
  //   this.setState({
  //     AddRole: [...newRole],
  //     SelectValue: item === "",
  //     DeleteNPI: this.state.ProviderNPIs,
  //     DeleteTaxID: this.state.TaxID,
  //     ProviderNPIs: [],
  //     TaxID: [],
  //     disableRole:
  //       item === this.state.disableRole ? "User Admin" : this.state.disableRole,
  //   });
  // }
  removeRoleItem(item) {
    this.state.DeleteRole.push(item);
    const newRole = this.state.AddRole.filter((RoleID) => {
      return RoleID !== item;
    });
    this.setState({
      AddRole: [...newRole],
      SelectValue: item === "",
      DeleteNPI:
        item === "Provider"
          ? this.state.ProviderNPIs
          : "User Admin" && this.state.DeleteNPI
          ? this.state.DeleteNPI
          : "",
      DeleteTaxID:
        item === "Provider"
          ? this.state.TaxID
          : "User Admin" && this.state.DeleteTaxID
          ? this.state.DeleteTaxID
          : "",
 
      ProviderNPIs: item === "User Admin" ? this.state.ProviderNPIs : [],
      TaxID: item === "User Admin" ? this.state.TaxID : [],
      disableRole:
        item === this.state.disableRole ? "User Admin" : this.state.disableRole,
    });
  }
  changeDropdown = (Dropdown) => {
    const delet = this.state.DeleteRole.indexOf(Dropdown);
    // if (delet > -1) {
    //   this.state.DeleteRole.pop(delet);
    // }
    const isONRoleList = this.state.AddRole.includes(Dropdown);
    if (isONRoleList) {
      this.setState({
        message: "This Role is already added",
        SelectValue: Dropdown === "Provider" ? Dropdown : "",
        disableRole:
          Dropdown != "User Admin" ? Dropdown : this.state.disableRole,
      });
    } else {
      this.setState({
        SelectValue: Dropdown === "Provider" ? Dropdown : "",
        AddRole: [...this.state.AddRole, Dropdown],
        disableRole:
          Dropdown != "User Admin" ? Dropdown : this.state.disableRole,
      });
    }
  };

  getEmailId = (email) => {
    this.props.userData.Email = email.target.value;
  };

  handleReset = () => {
    this.props.getType("List");
    this.setState({
      SelectValue: "",
      CurrentAge: "",
      AddRole: [],
      Geticon: false,
      clicked: false,
    });
  };

  render() {
    let Rolecount = 0;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const { ProviderNPIs, TaxID } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div>
        <div class="square-blue-profile">
          <Row
            className="ml-4"
            type="flex"
            justify-content="space-start"
            align="middle"
            style={{ padding: "10px" }}
          >
            <Col>
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Edit User Information
              </div>
            </Col>
            <Col push={18} className="ml-4"></Col>
          </Row>
        </div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="flex-container">
            {/* Personal Information */}
            <div className="flex-child">
              <div className="square-white-adduser-personalInformation ml-4 mb-5">
                <div className="PersonalInformation">
                  Enter Personal Information
                </div>
                <br />
                <Row>
                  <Col span={6} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      First Name
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("FirstName", {
                        initialValue: this.props.userData.UserName.split(
                          " "
                        )[0],
                        rules: [
                          {
                            required: true,
                            message: "   ",
                          },
                          {
                            pattern: new RegExp("^[a-zA-Z' ']*$"),
                            message: "Enter Alphabets Only!",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Id
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("Id", {
                        initialValue: this.props.userData.ID,

                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Tanent ID
                    </div>
                    <Form.Item>
                      {getFieldDecorator("Tenantid", {
                        initialValue: "",
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Tanent ID
                    </div>
                    <Form.Item>
                      {getFieldDecorator("URL", {
                        initialValue: sessionStorage.getItem("url"),
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Middle Name
                    </div>
                    <Form.Item>
                      {getFieldDecorator("MiddleName", {
                        initialValue:
                          this.props.userData.UserName.split(" ")[2] ===
                          undefined
                            ? ""
                            : this.props.userData.UserName.split(" ")[1],
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                          {
                            pattern: new RegExp("^[a-zA-Z' ']*$"),
                            message: "Enter Alphabets Only!",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Last Name
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("LastName", {
                        initialValue:
                          this.props.userData.UserName.split(" ")[2] ===
                          undefined
                            ? this.props.userData.UserName.split(" ")[1]
                            : this.props.userData.UserName.split(" ")[2],
                        rules: [
                          {
                            required: true,
                            message: "   ",
                          },
                          {
                            pattern: new RegExp("^[a-zA-Z' ']*$"),
                            message: "Enter Alphabets Only!",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Name
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("Name", {
                        initialValue: "",
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Tax
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("AddTax", {
                        initialValue: "",
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      NPI
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("AddNPI", {
                        initialValue: "",
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={6} push={1} hidden>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      IsAdmin
                    </div>
                    <Form.Item>
                      {getFieldDecorator("IsAdmin", {
                        initialValue: sessionStorage.getItem("AdminRole"),
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input size="lg" placeholder="Enter" maxLength="24" />
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={6} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Gender
                    </div>
                    <Form.Item>
                      {getFieldDecorator("Gender", {
                        initialValue: this.props.userData.gender,
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Select placeholder="Select" size="lg">
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  {/* <Col span={6} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      DOB
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("dob", {
                        initialValue: moment(
                          this.props.userData.DateOfBirth,
                          "MM-DD-YYYY"
                        ),
                        rules: [
                          {
                            required: true,
                            message: "   ",
                          },
                        ],
                      })(<DatePicker size="lg" format={"MM-DD-YYYY"} />)}
                    </Form.Item>
                  </Col> */}
                  {/* <Col span={6} push={1}>
                    <div
                      className="form-text-decorator ml-1"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Age
                    </div>
                    <Form.Item>
                      {getFieldDecorator("Age", {
                        initialValue: this.props.userData.Age,
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input
                          disabled
                          size="lg"
                          placeholder="Enter"
                          maxLength="24"
                        />
                      )}
                    </Form.Item>
                  </Col> */}
                </Row>
                <br />
              </div>
            </div>
            {/* Contact Information */}
            <div className="flex-child">
              <div className="square-white-adduser-EnterContactInformation mr-5 mb-5">
                <div className="ContactInformation ">
                  Enter Contact information
                </div>
                <br />
                <Row>
                  <Col span={12} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Contact No.
                    </div>
                    <Form.Item>
                      {getFieldDecorator("PhoneNumber", {
                        initialValue: this.props.userData.PhoneNumber,
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                          {
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Enter Numbers Only!",
                          },
                        ],
                      })(
                        <Input
                          size="lg"
                          placeholder="Enter"
                          maxLength="24"
                          style={{ width: "130px" }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Fax No.
                    </div>
                    <Form.Item>
                      {getFieldDecorator("fax", {
                        initialValue: this.props.userData.FaxID,
                        rules: [
                          {
                            required: false,
                            message: "   ",
                          },
                          {
                            pattern: new RegExp("^[0-9+-]*$"),
                            message: "Enter Numbers Only!",
                          },
                        ],
                      })(
                        <Input
                          size="lg"
                          placeholder="Enter"
                          maxLength="24"
                          style={{ width: "130px" }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col span={24} push={1}>
                    <div
                      className="form-text-decorator ml-1 mt-2"
                      style={{ fontWeight: "600", fontSize: "12px" }}
                    >
                      Email ID
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <Form.Item>
                      {getFieldDecorator("username", {
                        initialValue: this.props.userData.Email,
                        rules: [
                          {
                            required: true,
                            message: "   ",
                          },
                        ],
                      })(
                        <Input
                          size="lg"
                          placeholder="Enter"
                          style={{ width: "312px" }}
                          onChange={this.getEmailId}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <div className="ml-4">
                    Username: {this.props.userData.Email}
                  </div>
                </Row>
                <br />
              </div>
            </div>
          </div>
          {/*Location Information*/}
          <div className="square-white-adduser-LocationInformation ml-4 mb-5">
            <div className="LocationInformation">
              Enter Location Information
            </div>
            <br />
            <Row className="mr-5">
              <Col span={3} className="ml-4">
                <div
                  className="form-text-decorator ml-1 mt-2"
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  Address 01
                  <span style={{ color: "red" }}>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("Address", {
                    initialValue: this.props.userData.Address,
                    rules: [
                      {
                        required: true,
                        message: "   ",
                      },
                    ],
                  })(
                    <Input
                      placeholder="Select"
                      style={{ width: "160px" }}
                      size="lg"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={3} push={1}>
                <div
                  className="form-text-decorator ml-1 mt-2"
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  Address 02
                </div>
                <Form.Item>
                  {getFieldDecorator("address2", {
                    initialValue: "",
                    rules: [
                      {
                        required: false,
                        message: "   ",
                      },
                    ],
                  })(
                    <Input
                      placeholder="Select"
                      style={{ width: "160px" }}
                      size="lg"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={3} push={2}>
                <div
                  className="form-text-decorator ml-1 mt-2"
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  City
                </div>
                <Form.Item>
                  {getFieldDecorator("city", {
                    initialValue: this.props.userData.City,
                    rules: [
                      {
                        required: false,
                        message: "   ",
                      },
                      {
                        pattern: new RegExp("^[a-zA-Z' ']*$"),
                        message: "Enter Alphabets Only!",
                      },
                    ],
                  })(
                    <Input
                      placeholder="Select"
                      style={{ width: "160px" }}
                      size="lg"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={3} push={3}>
                <div
                  className="form-text-decorator ml-1 mt-2"
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  State
                </div>
                <Form.Item>
                  {getFieldDecorator("state", {
                    initialValue: this.props.userData.State,
                    rules: [
                      {
                        required: false,
                        message: "   ",
                      },
                      {
                        pattern: new RegExp("^[a-zA-Z' ']*$"),
                        message: "Enter Alphabets Only!",
                      },
                    ],
                  })(
                    <Input
                      size="lg"
                      placeholder="Enter"
                      style={{ width: "160px" }}
                      maxLength="24"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={3} push={4}>
                <div
                  className="form-text-decorator ml-1 mt-2"
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  Zipcode
                  <span style={{ color: "red" }}>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("zip", {
                    initialValue: this.props.userData.ZipCode,
                    rules: [
                      {
                        required: true,
                        message: "   ",
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Enter Numbers Only!",
                      },
                    ],
                  })(
                    <Input
                      size="lg"
                      placeholder="Enter"
                      style={{ width: "160px" }}
                      maxLength="24"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={3} push={5}>
                <div
                  className="form-text-decorator ml-1 mt-2"
                  style={{ fontWeight: "600", fontSize: "12px" }}
                >
                  Country
                </div>
                <Form.Item>
                  {getFieldDecorator("country", {
                    initialValue: this.props.userData.Country,
                    rules: [
                      {
                        required: false,
                        message: "   ",
                      },
                      {
                        pattern: new RegExp("^[a-zA-Z' ']*$"),
                        message: "Enter Alphabets Only!",
                      },
                    ],
                  })(
                    <Input
                      size="lg"
                      placeholder="Enter"
                      style={{ width: "160px" }}
                      maxLength="24"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <br />
            <br />
          </div>

          {/*Select Role*/}
          <div className="square-white-adduser-Role  ml-4">
            {/* <div className="LocationInformation">Select Role</div> */}
            <Row type="flex" justify-content="space-between" align="middle">
              <Col
                span={4}
                className="LocationInformation mb-2"
                style={{ marginTop: "-16px" }}
              >
                <Form.Item>
                  {/* <span style={{ color: "red" }}>*</span> */}
                  {getFieldDecorator("AddRoleName", {
                    initialValue: this.state.AddRole[
                      this.state.AddRole.length - 1
                    ],
                    rules: [
                      {
                        required: true,
                        message: "   ",
                      },
                    ],
                  })(
                    <Select
                      onSelect={this.changeDropdown}
                      placeholder="Add Role"
                      // defaultValue="anshul"
                      showSearch
                      style={{ width: 150 }}
                      size="lg"
                    >
                      <Option value="User Admin">User Admin</Option>
                      <Option
                        value="Provider"
                        disabled={
                          this.state.disableRole === "Plan Admin" ? true : false
                        }
                      >
                        Provider
                      </Option>
                      <Option
                        value="Plan Admin"
                        disabled={
                          this.state.disableRole === "Provider" ? true : false
                        }
                      >
                        Plan Admin
                      </Option>
                      {/* <Option value="Group Admin">Group Admin</Option> */}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              {/* {this.state.clicked == true && ( */}
              <Row>
                <Col style={{ marginTop: "12px" }}>
                  {this.state.AddRole.map((item) => {
                    Rolecount++;
                    return (
                      <div
                        className="button"
                        style={{
                          marginRight: "10px",
                        }}
                        key={item}
                      >
                        {"0" + Rolecount + ". " + item}
                        <CloseCircleFilled
                          className="pb-2"
                          onClick={(e) => this.removeRoleItem(item)}
                        />
                        <br />
                      </div>
                    );
                  })}
                </Col>
              </Row>
              {/* )} */}
            </Row>
            <hr></hr>
            {this.state.SelectValue === "Provider" ? (
              <div>
                {/* <div className="pleaseselect ml-4 mb-2">
                  Please select & add only one form the following:
                </div> */}
                <Row>
                  <Col span={12} className="ProviderNPI ml-4">
                    Provider NPI <span style={{ color: "red" }}>*</span>
                  </Col>
                  <Col span={5} className="ProviderNPI">
                    Provider Tax ID
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={11} className="ml-4">
                    <form
                      ref={(input) => (this.addForm1 = input)}
                      className="form-inline"
                    >
                      <div className="form-group">
                        <input
                          ref={(input) => (this.newItem = input)}
                          type="text"
                          maxLength="10"
                          onKeyUp={this.handleChangeNPI}
                          placeholder="Enter"
                          className="form-control"
                          id="newItemInput"
                          style={{
                            width: "420px",
                            marginRight: "10px",
                            backgroundColor: "#F8FBFF",
                          }}
                          // onkeypress={(input) => {
                          //   this.isNumber(e);
                          // }}
                        ></input>
                      </div>
                      <button
                        disabled={
                          this.state.disabledNPI ||
                          this.state.disabledaccordingtoinput
                        }
                        onClick={(e) => {
                          this.addItem(e);
                        }}
                        type="submit"
                        className="btn btn-primaryy"
                        style={{ background: "#427bdd" }}
                      >
                        Add
                      </button>
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {this.state.disabledaccordingtoinput &&
                        this.state.Npiclicked === true
                          ? "*Please enter only 10 digit nuemric value"
                          : ""}
                      </span>
                    </form>
                  </Col>
                  {/*TaxID*/}
                  <Col span={11} push={1}>
                    <form
                      ref={(input) => (this.addForm = input)}
                      className="form-inline"
                    >
                      <div className="form-group">
                        <input
                          ref={(input) => (this.newItemTax = input)}
                          type="text"
                          maxLength="9"
                          onKeyUp={this.handleChangeTax}
                          placeholder="Enter"
                          className="form-control"
                          id="newItemInput"
                          style={{
                            width: "420px",
                            marginRight: "10px",
                            backgroundColor: "#F8FBFF",
                          }}
                        ></input>
                      </div>
                      <button
                        disabled={
                          this.state.disabled ||
                          this.state.disabledaccordingtoinputTax
                        }
                        onClick={(e) => {
                          this.addItemTax(e);
                        }}
                        type="submit"
                        className="btn btn-primaryy"
                        style={{ background: "#427bdd" }}
                      >
                        Add
                      </button>
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {this.state.disabledaccordingtoinputTax &&
                        this.state.Taxclicked === true
                          ? "*Please enter only 9 digit nuemric value"
                          : ""}
                      </span>
                    </form>
                  </Col>
                </Row>

                <Row>
                  <Col span={11} push={1}>
                    {ProviderNPIs.map((item) => {
                      return (
                        <div
                          className="button"
                          style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                          key={item}
                        >
                          {item}
                          <CloseCircleFilled
                            className="pb-2"
                            onClick={(e) => this.removeItem(item)}
                          />

                          <br />
                        </div>
                      );
                    })}
                  </Col>

                  <Col span={11} push={2}>
                    {TaxID.map((item) => {
                      return (
                        <div
                          className="button"
                          style={{ marginRight: "10px", marginBottom: "10px" }}
                          key={item}
                          // class="btn btn-primary"
                        >
                          {item}
                          <CloseCircleFilled
                            onClick={(e) => this.removeItemTax(item)}
                          />

                          <br />
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </div>
            ) : (
              ""
            )}
            <br />
          </div>
          <div>
            {/* {this.state.Geticon == true && ( */}
            <Row
              type="flex"
              justify-content="flex-end"
              align="middle"
              //   className="mb-2"
            >
              <Col span={2} push={19}>
                <Button
                  htmlType="submit"
                  className="save-button"
                  onClick={this.handleReset}
                >
                  <b>Cancel</b>
                </Button>
              </Col>
              <Col span={1} push={19}>
                <Button htmlType="submit" className="save-button">
                  <b>Update User</b>
                </Button>
              </Col>
            </Row>
            {/* )} */}
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create({ name: "editUser" })(editUser);
