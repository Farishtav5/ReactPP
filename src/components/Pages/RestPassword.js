import React, { Component } from "react";
import { Form, Input, Col, notification, Icon, Card, Row, Button } from "antd";
import "antd/dist/antd.css";
import { Redirect } from "react-router-dom";
import SetPasswordApi from "./setPasswordApi";

// const pathName = this.props.location.pathname;

// console.log(pathName);
class RestPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
    };
  }
  componentDidMount() {
    const pathName = this.props.location.pathname;
    console.log(pathName);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.TenantID = sessionStorage.getItem("Tanent");
        const newpathName = this.props.location.pathname;
        const ApiName =
          newpathName === "/changeforgotpassword"
            ? "ResetPassword"
            : "SetPassword";
        console.log(newpathName);
        SetPasswordApi(values, ApiName).then((Result) => {
          let responseJSON = Result;
          console.log(responseJSON, responseJSON.Message.Message);
          if (
            responseJSON.Message.Message === "Your password has been reset. "
          ) {
            // localStorage.setItem('userDetails', responseJSON);
            console.log(responseJSON, responseJSON.Message.Message);
            this.openNotification(responseJSON);
            this.setState({ redirect: true });
          } else {
            if (responseJSON.Message) this.openNotification(responseJSON);
            else
              this.openNotification(
                (responseJSON.Message = "Something went wrong in server !")
              );
          }
        });
      }
    });
  };
  // helps getting the notification of Change_forgot_password page
  openNotification = (res) => {
    notification.open({
      message: "Notification",
      description:
        this.pathName === "/setpassword"
          ? "Your password has been Set. "
          : res.Message.Message,
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("Password")) {
      callback("Both Password Must be Same !");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(["ConfirmPassword"], { force: true });
    }
    callback();
  };

  render() {
    const query = new URLSearchParams(this.props.location.search);
    const userId = query.get("userId");
    const pathName = this.props.location.pathname;
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ paddingTop: "16vh" }}>
        <Row type="flex" justify="center">
          <div style={{ padding: "15px", borderRadius: 25 }}>
            <Card
              title={
                pathName === "/changeforgotpassword"
                  ? "Reset Password"
                  : "Set Password"
              }
              hoverable
              bordered={false}
              style={{ width: "50vh", height: "100%", borderRadius: 15 }}
              className="card shadow p-3 mb-4 bg-white"
            >
              <Form
                onSubmit={this.handleSubmit}
                className="changePassword-form"
              >
                <Col className="mt-4  ml-3  mr-3 mb-2">
                  <Form.Item>
                    {getFieldDecorator("Password", {
                      rules: [
                        {
                          required: true,
                          message: "   ",
                        },
                        {
                          pattern: new RegExp(
                            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                          ),
                          message:
                            "Your password must be alpha neumeric between 8-30 characters having atleast one capital Letter and specila charecter",
                        },
                        { validator: this.validateToNextPassword },
                      ],
                    })(
                      <Input.Password
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Password"
                        onChange={this.onChange}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col className="mt-2 mr-3">
                  <Form.Item>
                    {getFieldDecorator("ConfirmPassword", {
                      // rules: [{ required: true, message: 'Confirm password!'},{
                      //   validator: this.compareToFirstPassword,
                      // }],
                      rules: [
                        {
                          required: true,
                          message: "   ",
                        },
                        {
                          pattern: new RegExp(
                            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                          ),
                          message:
                            "Your password must be alpha neumeric between 8-30 characters having atleast one capital Letter and specila charecter",
                        },
                        { validator: this.compareToFirstPassword },
                      ],
                    })(
                      <Input.Password
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Confirm Password"
                        onChange={this.onChange}
                        onBlur={this.handleConfirmBlur}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col className="mt-2 mr-3">
                  <Form.Item>
                    {getFieldDecorator("Code", {
                      // initialValue: this.state.email,
                      rules: [{ required: true, message: "Input Secret code" }],
                    })(<Input placeholder="Enter Code" />)}
                  </Form.Item>
                </Col>

                {/* passing  extra parameter*/}

                <Col hidden>
                  <Form.Item>
                    {getFieldDecorator("User", {
                      initialValue: userId !== "" ? userId : "",
                      rules: [{ required: false }],
                    })(<Input hidden />)}
                  </Form.Item>
                </Col>

                <Col hidden>
                  <Form.Item>
                    {getFieldDecorator("UserName", {
                      initialValue: userId !== "" ? userId : "",
                      rules: [{ required: false }],
                    })(<Input hidden />)}
                  </Form.Item>
                </Col>

                <Col hidden>
                  <Form.Item>
                    {getFieldDecorator("TenantID", {
                      initialValue: sessionStorage.getItem("Tanent"),
                      rules: [{ required: false }],
                    })(<Input hidden />)}
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item true>
                    {getFieldDecorator("userId", {
                      initialValue: userId !== "" ? userId : "",
                      rules: [{ required: false }],
                    })(<Input hidden />)}
                  </Form.Item>
                </Col>

                <Row type="flex" justify="center">
                  <Col className="mt-4">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ borderRadius: 9 }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </Row>
      </div>
    );
  }
}
export default Form.create({ name: "Reset_password" })(RestPassword);
