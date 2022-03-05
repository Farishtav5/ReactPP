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
  Radio,
  DatePicker,
  notification,
} from "antd";
import Config from "../../config";
import { updateUserList } from "../../store/broadcaster/BroadcastRegister";
import { CloseCircleFilled } from "@ant-design/icons";
import GroupAdmin from "./GroupAdmin";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectValue: " ",
      Geticon: false,
      clicked: false,
      Taxclicked: false,
      Npiclicked: false,
      ProviderNPIs: [],
      TaxID: [],
      AddRole: [],
      message: "",
      disabledaccordingtoinput: true,
      disabledaccordingtoinputTax: true,
      disabledNPI: false,
      disabled: false,
      inputvalue: "",
      disableRole: "",
      UserType: "",
      RoleWiththreeOption: "",
      RoleWithFourOption: "",
    };
  }

  handleChangeNPI = (e) => {
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

  handleSubmit = (e) => {
    e.preventDefault();
    let TenantID = sessionStorage.getItem("Tanent");
    TenantID = parseInt(TenantID, 10);
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (values.MiddleName === "") {
          values.Name = values.FirstName + " " + values.LastName;
        } else {
          values.Name =
            values.FirstName + " " + values.MiddleName + " " + values.LastName;
        }

        values.NPI = this.state.ProviderNPIs.map((item) => {
          return { NPINumber: item };
        });
        values.Tax = this.state.TaxID.map((item) => {
          return { TaxNumber: item };
        });

        values.RoleName = this.state.AddRole.map((item) => {
          return { Name: item };
        });

        values.TenantID = TenantID;

        let data = await fetch(Config.api + "/RegisterUser", {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("access_token"),
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        data = await data.json();

        if (data.Message === "User Registered Successfully") {
          updateUserList.next("update");
          this.openNotification(data);
          this.props.form.resetFields();
          this.setState({
            ProviderNPIs: [],
            TaxID: [],
            // AddRole: [],
          });
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

    // console.log(ProviderNPIs);
    this.addForm1.reset();
  }

  addItemGroupAdmin(e) {
    e.preventDefault();
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
      // if (ProviderNPIs.length === 0) {
      //   this.setState({
      //     disabledNPI: true,
      //   });
      // }
    }

    // console.log(ProviderNPIs);
    this.addForm1.reset();
  }

  addItemTaxGroupAdmin(e) {
    e.preventDefault();
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
      // if (TaxID.length === 0) {
      //   this.setState({
      //     disabled: true,
      //   });
      // }
    }

    console.log(TaxID);
    this.addForm.reset();
  }

  addItemTax(e) {
    e.preventDefault();
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

    console.log(TaxID);
    this.addForm.reset();
  }

  removeItem(item) {
    this.setState({
      disabledaccordingtoinput: true,
      Npiclicked: false,
    });
    const newProviderNPIs = this.state.ProviderNPIs.filter((ProviderNPIs) => {
      return ProviderNPIs !== item;
    });
    // console.log("remove" + item);
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
    const newTaxID = this.state.TaxID.filter((TaxID) => {
      return TaxID !== item;
    });
    // console.log("remove" + item);
    this.setState({
      TaxID: [...newTaxID],
      disabled: false,
    });
  }

  removeRoleItem(item) {
    const newRole = this.state.AddRole.filter((RoleID) => {
      return RoleID !== item;
    });
    // console.log("remove" + item);
    this.setState({
      AddRole: [...newRole],
      SelectValue: item === "",
      disableRole:
        item === this.state.disableRole ? "User Admin" : this.state.disableRole,
    });
  }

  // changeDropdown = (Dropdown) => {
  //   const isONRoleList = this.state.AddRole.includes(Dropdown);
  //   if (isONRoleList) {
  //     this.setState({
  //       message: "This Role is already added",
  //       SelectValue: Dropdown === "Provider" ? Dropdown : "",
  //       disableRole:
  //         Dropdown != "User Admin" ? Dropdown : this.state.disableRole,
  //     });
  //   } else {
  //     this.setState({
  //       SelectValue: Dropdown === "Provider" ? Dropdown : "",
  //       AddRole: [...this.state.AddRole, Dropdown],
  //       disableRole:
  //         Dropdown != "User Admin" ? Dropdown : this.state.disableRole,
  //     });
  //   }
  // };

  handleReset = () => {
    // this.props.form.resetFields();
    this.props.getType("List");
    this.setState({
      SelectValue: "",
      CurrentAge: "",
      AddRole: [],
      Geticon: false,
      clicked: false,
    });
  };
  getValue = () => {
    this.setState({
      Geticon: true,
    });
  };

  onChange = (e) => {
    this.setState({
      UserType: e.target.value,
      SelectValue: "",
      RoleWithFourOption: "",
      RoleWiththreeOption: "",
    });
  };

  ChangewithNotrequire = (e) => {
    this.setState({
      RoleWithFourOption: e.target.value,
      SelectValue:
        e.target.value == "PR1"
          ? "Provider"
          : e.target.value === "GA1"
          ? "Group Admin"
          : "",
    });
  };

  ChangewiththreeOption = (e) => {
    this.setState({
      RoleWiththreeOption: e.target.value,
      SelectValue:
        e.target.value === "PR2"
          ? "Provider"
          : e.target.value === "GA2"
          ? "Group Admin"
          : "",
    });
  };

  render() {
    var today = new Date();
    let Rolecount = 0;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const { ProviderNPIs, TaxID } = this.state;
    // console.log(ProviderNPIs);
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
                Add User
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
                        initialValue: "",
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
                        initialValue: sessionStorage.getItem("UserID"),

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
                      {getFieldDecorator("TenantID", {
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
                        initialValue: "",
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
                        initialValue: "",
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
                      {getFieldDecorator("Tax", {
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
                      {getFieldDecorator("NPI", {
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
                        // initialValue: "",
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
                <Row></Row>
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
                      {getFieldDecorator("FaxID", {
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
                      {getFieldDecorator("EMail", {
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
                          // maxLength="24"
                          style={{ width: "312px" }}
                        />
                      )}
                    </Form.Item>
                  </Col>
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
                  {getFieldDecorator("Address2", {
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
                  {getFieldDecorator("City", {
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
                  {getFieldDecorator("State", {
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
                  {getFieldDecorator("ZipCode", {
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
                  {getFieldDecorator("Country", {
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
          <div className="square-white-adduser-Role  ml-4 mb-5">
            {/* <div className="LocationInformation">Select Role</div> */}
            <Row>
              <div className="p-2 PersonalInformation mb-4"> Assign Role</div>

              <div className="p-2">
                <Card className="card-css pl-2 pr-2 pt-1 pb-1 mb-2">
                  <Row>
                    <Col span={20} className="question-css">
                      01. Do you want to assign User-Admin privileges to the
                      user ?<span>*</span>
                    </Col>
                    <Col span={4}>
                      <Radio.Group
                        onChange={this.onChange}
                        value={this.state.UserType}
                      >
                        <Radio value={1} className="question-css">
                          Yes
                        </Radio>
                        <Radio value={2} className="select-ques-css">
                          No
                        </Radio>
                      </Radio.Group>
                    </Col>
                  </Row>
                </Card>

                {/* Diplay After Selection */}
                {this.state.UserType === 1 && (
                  <Card className="card-css pl-2 pr-2 pt-1 pb-1 mb-2">
                    <Row>
                      <Col span={14} className="question-css">
                        02. Please select one role for the user, if required{" "}
                        <span>*</span>
                      </Col>
                      <Col span={10}>
                        <Radio.Group
                          onChange={this.ChangewithNotrequire}
                          value={this.state.RoleWithFourOption}
                        >
                          <Radio value={"PA1"} className="question-css">
                            Plan Admin
                          </Radio>
                          <Radio value={"GA1"} className="select-ques-css">
                            Group Admin
                          </Radio>
                          <Radio value={"PR1"} className="question-css">
                            Provider
                          </Radio>
                          <Radio value={"NR1"} className="question-css">
                            Not Required
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Card>
                )}

                {this.state.UserType === 2 && (
                  <Card className="card-css pl-2 pr-2 pt-1 pb-1 mb-2">
                    <Row>
                      <Col span={16} className="question-css">
                        01. Please select one role for the user. <spna>*</spna>
                      </Col>
                      <Col span={8}>
                        <Radio.Group
                          onChange={this.ChangewiththreeOption}
                          value={this.state.RoleWiththreeOption}
                        >
                          <Radio value={"PA2"} className="question-css">
                            Plan Admin
                          </Radio>
                          <Radio value={"GA2"} className="select-ques-css">
                            Group Admin
                          </Radio>
                          <Radio value={"PR2"} className="question-css">
                            Provider
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Card>
                )}
              </div>
            </Row>
            {/* <hr></hr> */}
            {this.state.SelectValue === "Provider" ? (
              <div>
                <Row>
                  <Col span={12} className="ProviderNPI ml-4">
                    Provider NPI <span style={{ color: "red" }}>*</span>
                  </Col>
                  <Col span={5} className="ProviderNPI ml-4">
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
                          required
                          ref={(input) => (this.newItem = input)}
                          // onkeypress={this.isNumber}
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
            ) : this.state.SelectValue === "Group Admin" ? (
              <GroupAdmin />
            ) : (
              ""
            )}
            <br />
          </div>
          <div>
            <Row
              type="flex"
              justify-content="flex-end"
              align="middle"
              className="mb-2"
            >
              <Col span={2} push={19}>
                <Button htmlType="submit" className="save-button">
                  <b>Add User</b>
                </Button>
              </Col>
              <Col span={2} push={19}>
                <Button
                  htmlType="submit"
                  className="save-button"
                  onClick={this.handleReset}
                >
                  <b>Cancel</b>
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create({ name: "AddUser" })(AddUser);
