import React, { Component } from "react";
import { Form, Input, Row, Col, notification } from "antd";
import "./login.css";
import userIcon from "../images/UsernameIcon.png";
import lockIcon from "../images/lockIcon.png";
import ArrowIcon from "../images/loginarrow.png";
import MirraLogo from "../images/new_mirra_logo.png";
import dotLogo from "../images/Dots.png";
import PersonsLogo from "../images/Doctor_Login.png";
import PageBackground from "../images/PageBackground.png";
import "antd/dist/antd.css";
import Config from "../../config";
import { Redirect } from "react-router-dom";
import Forgotmodal from "./Forgetpassword";
// import "antd/dist/antd.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Postdata from "./Postdata";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { RestFilled } from "@ant-design/icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      addModalShow: false,
      name: ["Kalos", "Dignity", "Valor", "Arkansas", "Liberty"],
      loader: false,
      show: false,
      TanentIDs: 0,
    };
  }
  componentDidMount() {
    document.title = "Mirra HealthCare";
    const pathName = window.location.href;
    const url = "https://" + window.location.hostname;
    console.log(url);
    sessionStorage.setItem("url", url);
    let planName = pathName.includes("kalos")
      ? "kalos"
      : pathName.includes("arkss")
      ? "arkss"
      : pathName.includes("valor")
      ? "valor"
      : pathName.includes("liberty")
      ? "liberty"
      : pathName.includes("demo")
      ? "demo"
      : "dignity";
    sessionStorage.setItem("planName", planName);

    fetch(
      Config.api +
        "/GetTenantIDByName?TenantName=" +
        sessionStorage.getItem("planName")
      // { headers }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          TanentIDs: res.TenantID,
        });
        sessionStorage.setItem("Tanent", this.state.TanentIDs);
        console.log(this.state.TanentIDs);
      });
  }

  showModel = () => {
    this.setState({
      ...this.state,
      show: !this.state.show,
    });
  };

  logout = () => {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
    Swal.fire({
      text: "Your session has been expired !",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "OK",
      confirmButtonColor: "#2a3ba4",
    }).then(() => {
      window.location.pathname = "/login";
    });
  };

  refreshtoken = () => {
    let formDatarefresh = {
      refresh_token: sessionStorage.getItem("refresh_token"),
      grant_type: "refresh_token",
    };
    const encodeFormData = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    };
    fetch(Config.api + "/getToken", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: encodeFormData(formDatarefresh),
    })
      .then((res) => res.json())
      .then((responsejson) => {
        console.log(responsejson);
        sessionStorage.setItem("access_token", responsejson.access_token);
        sessionStorage.setItem("token_type", responsejson.token_type);
        sessionStorage.setItem("expires_in", responsejson.expires_in);
        sessionStorage.setItem("refresh_token", responsejson.refresh_token);
      });
  };

  handleSubmit = (e) => {
    let Tanentid = sessionStorage.getItem("Tanent");
    Tanentid = parseInt(Tanentid, 10);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      ["Email", "Password"],
      (err, values) => {
        values.TanentID = Tanentid;
        if (values.Email === null || values.Password === null) {
          this.setState({
            loader: false,
          });
        }
        if (!err) {
          this.setState({
            loader: true,
          });

          let formData = {
            username: values.Email + "_" + Tanentid,
            password: values.Password,
            grant_type: "password",
            User: values.Email,
          };
          const encodeFormData = (data) => {
            return Object.keys(data)
              .map(
                (key) =>
                  encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
              )
              .join("&");
          };
          fetch(Config.api + "/getToken", {
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
            body: encodeFormData(formData),
          })
            .then((response) => response.json())
            .then((responsejson) => {
              console.log(responsejson);
              sessionStorage.setItem("access_token", responsejson.access_token);
              sessionStorage.setItem("token_type", responsejson.token_type);
              sessionStorage.setItem("expires_in", responsejson.expires_in);
              sessionStorage.setItem(
                "refresh_token",
                responsejson.refresh_token
              );

              setInterval(() => {
                this.refreshtoken();
              }, 1500000);

              console.log(sessionStorage.getItem("access_token"));
              if (responsejson.error === "invalid_grant") {
                this.setState({
                  loader: false,
                });
                this.openNotification(responsejson.error_description);
              } else {
                if (sessionStorage.getItem("access_token") != undefined) {
                  Postdata(values.Email).then((Result) => {
                    let responseJSON = Result;
                    if (responseJSON.LoginInfo.Message === "Login Successful") {
                      // if(responseJSON){
                      sessionStorage.setItem("userData", responseJSON);
                      sessionStorage.setItem("userEmail", values.Email);
                      sessionStorage.setItem(
                        "userName",
                        responseJSON.LoginInfo.UserName
                      );
                      sessionStorage.setItem(
                        "UserID",
                        responseJSON.LoginInfo.UserID
                      );

                      // var Role = sessionStorage.setItem("rolename",responseJSON.LoginInfo.RoleName)
                      var Role = responseJSON.LoginInfo.RoleName;
                      sessionStorage.setItem("rolename", Role);
                      var isadmin = Role.includes("User Admin");
                      var isProvider = Role.includes("Provider");
                      var isPlanAdmin = Role.includes("Plan Admin");
                      if (isadmin && isProvider) {
                        sessionStorage.setItem("ProviderRole", "PROVIDER");
                        sessionStorage.setItem("AdminRole", "User Admin");
                      } else if (isadmin && isPlanAdmin) {
                        sessionStorage.setItem("AdminRole", "User Admin");
                        sessionStorage.setItem("PlanAdminRole", "Plan Admin");
                      } else if (isadmin) {
                        sessionStorage.setItem("AdminRole", "User Admin");
                      } else if (isProvider) {
                        sessionStorage.setItem("ProviderRole", "PROVIDER");
                      } else {
                        sessionStorage.setItem("PlanAdminRole", "Plan Admin");
                      }
                      // For Claims Table
                      var planname = sessionStorage.setItem(
                        "Plan",
                        this.state.name
                      );
                      sessionStorage.setItem("pname", planname);

                      var npi = responseJSON.NpiDetails;
                      sessionStorage.setItem("npivalue", npi);

                      var tax = responseJSON.TaxDeatils;
                      sessionStorage.setItem("taxid", tax);

                      // setTimeout(() => {
                      //   this.logout();
                      // }, 1799000);

                      this.openNotification(responseJSON.LoginInfo.Message);
                      this.setState({ redirect: true });
                    } else {
                      if (
                        responseJSON.ErrorMessage ===
                        "Access Denied for getLoginInformation API"
                      ) {
                        this.setState({
                          loader: false,
                        });
                        this.openNotification(
                          "The user name or password is incorrect."
                        );
                      } else
                        this.openNotification(
                          responseJSON.ErrorMessage ===
                            "Access Denied for getLoginInformation API"
                        );
                    }
                  });
                } else {
                  this.openNotification(
                    "The user name or password is incorrect."
                  );
                }
              }
            });
        }
      }
    );
  };

  openNotification = (res) => {
    notification.open({
      description: res,
    });
  };

  render() {
    // console.log(this.state.TanentIDs, sessionStorage.getItem("ProviderRole"));
    // if (this.state.redirect) {
    //   if (
    //     sessionStorage.getItem("AdminRole") &&
    //     sessionStorage.getItem("ProviderRole")
    //   ) {
    //     return <Redirect to={"/EligibilityCheck"} />;
    //   } else if (sessionStorage.getItem("ProviderRole")) {
    //     return <Redirect to={"/EligibilityCheck"} />;
    //   } else {
    //     return <Redirect to={"/userDetails"} />;
    //   }
    // }
    if (this.state.redirect) {
      if (
        sessionStorage.getItem("AdminRole") &&
        sessionStorage.getItem("ProviderRole") === null &&
        sessionStorage.getItem("PlanAdminRole") === null
      ) {
        return <Redirect to={"/userDetails"} />;
      } else if (
        sessionStorage.getItem("AdminRole") &&
        (sessionStorage.getItem("ProviderRole") === null ||
          sessionStorage.getItem("PlanAdminRole") === null)
      ) {
        return <Redirect to={"/EligibilityCheck"} />;
      } else {
        return <Redirect to={"/EligibilityCheck"} />;
      }
    }

    // if (sessionStorage.getItem("userData")) {
    //   return <Redirect to={"/EligibilityCheck"} />;
    // }
    if (sessionStorage.getItem("")) {
      return <Redirect to={"/login"} />;
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        xl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        xl: { span: 24 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="body">
        <img
          src={PageBackground}
          alt="Background Logo"
          className="background-image"
        />
        <Row>
          <Col span={24}>
            <div className="mirralogo">
              <img
                src={MirraLogo}
                alt="Mirra Logo"
                width="90"
                height="97"
                className="mirralogo-img"
              />
            </div>
          </Col>
        </Row>

        <div className="container">
          <div className="container-left">
            <div className="welcomeText">Welcome to</div>
            <div>
              <span className="censusText">Provider Portal</span>
              {/* <img
                src={dotLogo}
                alt="Dots Logo"
                width="42"
                height="44"
                className="dotslogo"
              /> */}
            </div>
            <div>
              <img
                src={PersonsLogo}
                alt="Persons Logo"
                width="400"
                height="280"
              />
            </div>
          </div>
          <div className="formStyle">
            <div className="container-right">
              <Row>
                <Col span={24}>
                  <div className="userLoginText">User Login</div>
                </Col>
              </Row>
              <div>
                <Form
                  onSubmit={this.handleSubmit}
                  {...formItemLayout}
                  // initialValues={{ remember: true }}
                >
                  <Row>
                    <Col span={24}>
                      <div className="mb-2">
                        <span className="userIcon">
                          <img
                            src={userIcon}
                            width="14"
                            height="18"
                            alt="User Icon"
                          />
                        </span>
                        <span className="usernameText ml-2">Username</span>
                      </div>

                      <Form.Item>
                        {getFieldDecorator("Email", {
                          // initialValue: this.state.EMail,
                          rules: [
                            {
                              required: true,
                              type: "email",
                              message: (
                                <span style={{ fontSize: "10px" }}>
                                  Please enter valid Email
                                </span>
                              ),
                            },
                          ],
                        })(
                          <Input
                            placeholder="Enter Email"
                            onChange={this.emailChange}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div className="mb-2">
                        <span className="lockIcon">
                          <img
                            src={lockIcon}
                            alt="Lock Icon"
                            width="12"
                            height="18"
                          />
                        </span>
                        <span className="passwordText ml-2">Password</span>
                      </div>
                      <Form.Item>
                        {getFieldDecorator("Password", {
                          // initialValue: this.state.Password,
                          rules: [
                            {
                              required: true,
                              message: (
                                <span style={{ fontSize: "10px" }}>
                                  Please enter valid password
                                </span>
                              ),
                            },
                          ],
                        })(
                          <Input.Password
                            type="password"
                            placeholder="Enter Password"
                            onChange={this.passwordChange}
                          />
                        )}
                      </Form.Item>
                      <a
                        className="login-form-forgot"
                        onClick={this.showModel}
                        href="#"
                      >
                        Forgot password?
                      </a>
                    </Col>

                    <Col span={24} hidden>
                      <div className="mb-2">
                        <span className="lockIcon">
                          <img
                            src={lockIcon}
                            alt="Lock Icon"
                            width="12"
                            height="18"
                          />
                        </span>
                        <span className="passwordText ml-2">Tanent</span>
                      </div>
                      <Form.Item>
                        {getFieldDecorator("TenantID", {
                          initialValue: sessionStorage.getItem("Tanent"),
                          // initialValue: this.state.TenantID,
                          rules: [
                            {
                              required: false,
                            },
                          ],
                        })(
                          <Input.Password
                            type="password"
                            placeholder="Enter Password"
                            // onChange={this.passwordChange}
                          />
                        )}
                      </Form.Item>
                      <a
                        className="login-form-forgot"
                        onClick={this.showModel}
                        href="#"
                      >
                        Forgot password?
                      </a>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item>
                        <button
                          onClick={this.loginClick}
                          className="loginButton"
                        >
                          <span className="loginButtonText">LOGIN</span>
                          <span>
                            <img
                              src={ArrowIcon}
                              width="20"
                              height="16"
                              alt="Arrow Icon"
                            />
                          </span>
                        </button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
              <br />
              {this.state.loader === true && this.state.redirect === false && (
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "100%" }}
                  >
                    <b>Processing...</b>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Forgotmodal onClose={this.showModel} show={this.state.show} />
      </div>
    );
  }
}

export default Form.create({ name: "Login" })(Login);
