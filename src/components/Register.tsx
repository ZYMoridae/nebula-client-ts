import * as React from "react";
import _ from "lodash";
import HeaderBarContainer from "../containers/HeaderBarContainer";

import "./Register.css";

// Start of AntDesign
import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  Checkbox,
  Icon,
  Typography,
  Collapse,
  Badge,
  List,
  Avatar
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";

import { Row, Col } from "antd";

const { Title } = Typography;

const { Option } = Select;

interface FormProps extends FormComponentProps {
  dispatch: any;
  isCreatinguser: boolean;
  info: any;
  createUser: (data: any) => void;
}

class Register extends React.Component<FormProps> {
  handleSubmit = (e: any) => {
    event.preventDefault();

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let _user: any = _.cloneDeep(values);

        this.props.createUser(_user);

        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { isCreatinguser } = this.props;

    const { getFieldDecorator, getFieldError } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 0
        }
      }
    };

    return (
      <div id="register-container">
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Row
              type="flex"
              justify="space-around"
              align="top"
              style={{ height: "100vh" }}
              gutter={32}
            >
              <Col span={12} className="description-container">
                <Title className="title" level={4} style={{ color: "#DCAE96" }}>
                  iEuclid
                </Title>
                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#DCAE96" }}
                          icon="check"
                          size="small"
                        />
                      }
                      title={"Quick and free sign‑up"}
                      description="Enter your email address to create an account."
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#DCAE96" }}
                          icon="check"
                          size="small"
                        />
                      }
                      title={"Easy to find tutor"}
                      description="Find your music tutor within few seconds."
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#DCAE96" }}
                          icon="check"
                          size="small"
                        />
                      }
                      title={"Professional service"}
                      description="All the tutors registered are professional in different music area."
                    />
                  </List.Item>
                </List>
              </Col>
              <Col span={12}>
                <Form
                  // {...formItemLayout}
                  onSubmit={this.handleSubmit}
                  layout={null}
                  className="form-container"
                >
                  <Form.Item>
                    <Title className="login-title" level={4}>
                      Create your account
                    </Title>
                  </Form.Item>

                  <Form.Item label="Username">
                    {getFieldDecorator("username", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "Please input your username!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Password">
                    {getFieldDecorator("password", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label="Confirm password">
                    {getFieldDecorator("confirmPassword", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label="Email">
                    {getFieldDecorator("email", {
                      initialValue: "",
                      rules: [
                        { required: true, message: "Please input your email!" }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", marginTop: "15px" }}
                      loading={isCreatinguser}
                    >
                      Create your account
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    Already have an account?
                    <a href="/user/login"> Sign In</a>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={24} className="footer">
            © {new Date().getFullYear()}, iEuclid Tech · Privacy & terms
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedUserRegisterForm = Form.create<FormProps>({
  name: "Register_form"
})(Register);

export default WrappedUserRegisterForm;
