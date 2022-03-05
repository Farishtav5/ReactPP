import React, { Component } from "react";
// import { Modal } from "react-bootstrap";
// import { Form, Row, Icon, Input, Button, notification, Col } from "antd";
// import ForgotUserPassword from "./ForgotUserPassword";
import { Redirect } from "react-router-dom";


class TestParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

//   onClose = () => {
//     this.props.onClose && this.props.onClose();
//   };



//   openNotification = (res) => {
//     notification.open({
//       description: res.Message.Message,
//       onClick: () => {
//         // console.log('Notification Clicked!');
//       },
//     });
//   };

  render() {
    // const { getFieldDecorator } = this.props.form;
    // if (this.state.redirect) {
    //   return <Redirect to={"/login"} />;
    // }

    return (
      <div>
        {/* <Modal
          {...this.props}
          title="Enter Your Email Address"
          onCancel={this.handleCancel}
          centered
          close={false}
          footer={null}
        >
          <Row>
            <Col span={12}>
              <p className="modal-heading ml-4 mt-4">Forgot Password</p>
            </Col>

            <Col
              span={4}
              push={9}
              className="mt-3"
              style={{ marginLeft: "28px" }}
            >
              <button className="edit-button" onClick={this.onClose}>
                <i class="fa fa-times"></i>
              </button>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginLeft: "6px" }}>
              <p className="sub-notification ml-4 mt-2">
                To Reset Your Password, Please Provide <br /> Your Registerd
                Email ID
              </p>
            </Col>
          </Row>

          <Row type="flex" style={{ marginTop: 20 }}>
            <Form onSubmit={this.handleSubmit}>
              <Row type="flex" justify="center" className="ml-4">
                <Col span={18} className="mb-5">
                  <div
                    className="form-text-decorator"
                    style={{ fontWeight: "600" }}
                  >
                    {" "}
                    Email-ID
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <Form.Item>
                    {getFieldDecorator("EMail", {
                      rules: [
                        {
                          type: "email",
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ],
                    })(
                      <Input
                        style={{ width: "225px" }}
                        placeholder="Enter your Email"
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={18} hidden>
                  <div
                    className="form-text-decorator"
                    style={{ fontWeight: "600" }}
                  >
                    {" "}
                    Tanent
                  </div>
                  <Form.Item>
                    {getFieldDecorator("URL", {
                      initialValue: "",
                      rules: [
                        {
                          // type: "email",
                          required: false,
                          // message: "Please input your E-mail!",
                        },
                      ],
                    })(
                      <Input
                        style={{ width: "225px" }}
                        // placeholder="Enter your Email"
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={18} hidden>
                  <div
                    className="form-text-decorator"
                    style={{ fontWeight: "600" }}
                  >
                    {" "}
                    Tanent
                  </div>
                  <Form.Item>
                    {getFieldDecorator("TenantID", {
                      initialValue: "",
                      rules: [
                        {
                          // type: "email",
                          required: false,
                          // message: "Please input your E-mail!",
                        },
                      ],
                    })(
                      <Input
                        style={{ width: "225px" }}
                        // placeholder="Enter your Email"
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={4} push={2} className="ml-2 mt-4">
                  <Form.Item>
                    <Button htmlType="submit" className="button-color mt-2">
                      Proceed
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Row>
        </Modal> */}
      </div>
    );
  }
}
export default Form.create({ name: "TestParent" })(TestParent);



// function TestParent() {
//   return (
//     <div>
//       <h1>Hello World</h1>
//     </div>
//   );
// }

// export default TestParent;
