import * as React from "react";
import {
  Form,
  Layout,
  Table,
  Divider,
  Tag,
  Breadcrumb,
  Button,
  Icon,
  Card,
  Radio,
  Typography
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
const { Header, Content, Sider } = Layout;


const { Title } = Typography;

interface PaymentOptionManagementProps extends FormComponentProps {
  dispatch: any;
}

class PaymentOptionManagement extends React.Component<
  PaymentOptionManagementProps
> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <a href="/preference">Preferences</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Payment Options</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Title level={4}>Default payment option</Title>
            <Form.Item>
              {getFieldDecorator("paymentOption", {
                initialValue: "card"
              })(
                <Radio.Group size="large">
                  <Radio style={radioStyle} value="card">
                    <Icon type="credit-card" style={{ marginRight: "8px" }} />
                    Card Payment
                  </Radio>
                  <Radio style={radioStyle} value="wechat">
                    <Icon
                      type="wechat"
                      style={{ marginRight: "8px", color: "#2F8819" }}
                    />
                    Wechat
                  </Radio>
                  <Radio style={radioStyle} value="alipay">
                    <Icon
                      type="alipay-circle"
                      style={{ marginRight: "8px", color: "#0b73c1" }}
                    />
                    Alipay
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }
}

const WrappedPaymentOptionManagementForm = Form.create({
  name: "normal_payment_option_management"
})(PaymentOptionManagement);
export default WrappedPaymentOptionManagementForm;
