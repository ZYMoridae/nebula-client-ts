import * as React from "react";
import { fetchAuthInfo } from "../actions";
// import PropTypes from 'prop-types';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./MySnackbarContent";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import HeaderBarContainer from "../containers/HeaderBarContainer";

// import Footer from "./Footer";
import { isMobile } from "react-device-detect";

import { Theme, createStyles } from "@material-ui/core";

// Ant design
import { Layout, Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { Row, Col } from "antd";

import './Login.css';

import Cookies from 'js-cookie'

const { Title } = Typography;

const { Footer } = Layout;

interface LoginProps extends FormComponentProps {
  dispatch: any;
  isFetchedAuth: boolean;
  classes: any;
  info: any;
  hideLoginError: any;
  isShowLoginError: boolean;
  isFetchingAuth: boolean;
}

class Login extends React.Component<LoginProps> {
  handleSubmit = (e: any) => {
    event.preventDefault();

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(
          fetchAuthInfo({
            headers: {
              Authorization: `Basic ${btoa(
                `${values.username}:${values.password}`
              )}`
            }
          })
        );
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {
      isFetchedAuth,
      classes,
      info,
      hideLoginError,
      isShowLoginError,
      isFetchingAuth
    } = this.props;

    if (
      Cookies.get("token") != null &&
      Cookies.get("token") != "undefined"
    ) {
      location.href = "/";
    }

    if (isFetchedAuth && this.props.info.token != undefined) {
      Cookies.set("token", this.props.info.token);
      location.href = "/";
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-container">
        {/* <img className={classes.backgroundImage} src="https://cdn.hipwallpaper.com/i/61/90/e6dpSJ.jpg" /> */}

        <div style={{ position: "absolute", top: "0", width: "100%" }}>
          <HeaderBarContainer />
        </div>

        <Row
          id="form-container"
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <Col span={7}>
            <Form onSubmit={this.handleSubmit} className="login-form-container">
              <Title className="login-title" level={4}>
                Login
              </Title>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isFetchingAuth}
                >
                  Log in
                </Button>
              </Form.Item>

              <Form.Item style={{ marginBottom: "0px" }}>
                Don't have an account?
                <a href="/user/register"> Sign Up</a>
              </Form.Item>

              <Form.Item style={{ marginBottom: "0px" }}>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>

                {/* Or <a href="">register now!</a> */}
                {/* <Footer style={{ textAlign: "center" }}>
                  Plato Tech ©{new Date().getFullYear()}
                </Footer> */}
              </Form.Item>
            </Form>
          </Col>
          <Col
            span={24}
            style={{
              position: "absolute",
              bottom: "0"
            }}
          >
            <Footer
              style={{
                textAlign: "center",
                backgroundColor: "#232F3E",
                color: "white"
              }}
            >
              iEuclid Tech ©{new Date().getFullYear()}
            </Footer>
          </Col>
        </Row>

        {/* <div>
          <Footer />
        </div> */}
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedLoginForm;
