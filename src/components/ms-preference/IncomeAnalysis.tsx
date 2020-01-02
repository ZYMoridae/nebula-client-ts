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
  Typography,
  Timeline,
  Statistic
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
const { Header, Content, Sider } = Layout;

import { Row, Col } from "antd";

const { Title } = Typography;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: any, record: any) => (
      <a href={`/products/categories/${record.id}`}>{text}</a>
    )
  },
  {
    title: "Teacher",
    dataIndex: "teacher",
    key: "teacher"
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location"
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration"
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt"
  }
];

type IncomeAnalysisState = {
  offset: number;
  pagination: any;
};

// FIXME: Remove optional decorator
interface IncomeAnalysisProps {
  totalElements?: number;
  page?: number;
  perPage?: number;
  orderBy?: string;
  fetchIncomeAnalysis?: any;
  info?: any;
  totalPages?: number;
  isFetchingIncomeAnalysis?: any;
}

class IncomeAnalysis extends React.Component<
  IncomeAnalysisProps,
  IncomeAnalysisState
> {
  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { fetchIncomeAnalysis } = this.props;
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    // fetchUserOrders(pagination.current, pagination.pageSize, "id");
  };

  render() {
    const {
      info,
      perPage,
      totalPages,
      isFetchingIncomeAnalysis,
      totalElements
    } = this.props;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <a href="/preference">Preferences</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Income Analysis</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Title level={4}>
                Your recent 3 bookings
                <a
                  href="#all_bookings"
                  style={{
                    marginLeft: "8px",
                    textDecoration: "underline",
                    fontSize: "12px"
                  }}
                >
                  view all
                </a>
              </Title>
              <div style={{ marginTop: "32px" }}>
                <Timeline pending="To be contined...">
                  <Timeline.Item>
                    <Card
                      style={{
                        width: 250,
                        borderRadius: "10px"
                      }}
                    >
                      <div>Teacher: Mike</div>
                      <div>Location: Melbourne CBD</div>
                      <div>Time: 15/01/2020 13:00</div>
                      <div>Duration: 2 Hours</div>
                      <div>Status: <Tag color="green">Finish</Tag></div>
                    </Card>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Card
                      style={{
                        width: 250,
                        borderRadius: "10px"
                      }}
                    >
                      <div>Teacher: Nichole</div>
                      <div>Location: Werrabie</div>
                      <div>Time: 16/01/2020 13:00</div>
                      <div>Duration: 4 Hours</div>
                      <div>Status: <Tag color="green">Finish</Tag></div>
                    </Card>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Card
                      style={{
                        width: 250,
                        borderRadius: "10px"
                      }}
                    >
                      <div>Teacher: Richard</div>
                      <div>Location: Melbourne CBD</div>
                      <div>Time: 23/01/2020 18:00</div>
                      <div>Duration: 1.5 Hours</div>
                      <div>Status: <Tag color="green">Finish</Tag></div>
                    </Card>
                  </Timeline.Item>
                </Timeline>
              </div>
            </Col>
            <Col span={12}>
              <Title level={4}>Income Statistics</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Total icome"
                    value={2234}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<Icon type="transaction" />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Today's income"
                    value={67}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<Icon type="transaction" />}
                  />
                </Col>
              </Row>

              <Title level={4} style={{marginTop: '32px'}}>Bookings Statistics</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Total bookings" value={112893} />
                </Col>
                <Col span={12}>
                  <Statistic title="Rating" value={6781} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />
          <Title id="all_bookings" level={4}>
            All bookings
          </Title>
          <Table
            columns={columns}
            dataSource={[]}
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              total: totalElements
            }}
            onChange={this.handleTableChange}
            loading={isFetchingIncomeAnalysis}
          />
        </Content>
      </Layout>
    );
  }
}

export default IncomeAnalysis;
