import * as React from "react";

// Ant Design
import Footer from "../Footer";
import _ from "lodash";

import {
  Layout,
  Table,
  Breadcrumb,
  Button,
  Icon,
  Pagination,
  Skeleton,
  Empty,
  Avatar,
  Badge,
  Typography
} from "antd";

import { Row, Col } from "antd";

import "./TeacherIndex.css";

const { Content } = Layout;

const { Title, Text } = Typography;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: any, record: any) => (
      <a href={`/teachers/${record.id}`}>{text}</a>
    )
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "Email"
  },
  {
    title: "Action",
    key: "action",
    render: (text: any, record: any) => (
      <span>
        {/* <a>Invite {record.name}</a>
        <Divider type="vertical" /> */}
        <a>Delete</a>
      </span>
    )
  }
];

type IndexState = {
  offset: number;
  pagination: any;
  selectedRowKeys: Array<any>;
};

type IndexProps = {
  page: number;
  perPage: number;
  totalElements: number;
  orderBy?: string;
  fetchAllTeacher: any;
  teachers: Array<any>;
  totalPages: number;
  fetchAllTeacherPending: any;
};

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      offset: 0,
      pagination: {
        page: 1
      },
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    const { page, perPage, orderBy } = this.props;
    let currentOffset = (page - 1) * perPage;
    this.handleClick(currentOffset);
  }

  updateUrlParmas(page: number, perPage: number, orderBy: string) {
    if (history.pushState) {
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${page}&perPage=${perPage}&orderBy=${orderBy}`;
      window.history.pushState(
        {
          path: url
        },
        "",
        url
      );
    }
  }

  /**
   * Handle pagination click
   *
   * @param {*} offset
   */
  handleClick(offset: number) {
    const { perPage, orderBy, fetchAllTeacher } = this.props;
    let page = offset / this.props.perPage + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchAllTeacher(page, perPage, orderBy);
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { fetchAllTeacher } = this.props;
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    fetchAllTeacher(pagination.current, pagination.pageSize, "id");
  };

  onChange = (page: number, pageSize: number) => {
    const { fetchAllTeacher } = this.props;
    let pagination = {
      page: page,
      pageSize: pageSize
    };
    fetchAllTeacher(page, pageSize, "id");
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      teachers,
      perPage,
      totalPages,
      fetchAllTeacherPending,
      totalElements
    } = this.props;

    const onDeleteClick = (user: any) => {
      window.location.href = "/teachers/" + user.id;
    };

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Teacher</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {/* <Row gutter={8} style={{ marginBottom: "8px" }}>
            <Col style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={() => {
                  window.location.href = "/teachers/new";
                }}
              >
                <Icon type="plus" />
                Add
              </Button>
            </Col>
          </Row> */}

          {/* <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={teachers}
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              total: totalElements
            }}
            onChange={this.handleTableChange}
            loading={fetchAllTeacherPending}
          /> */}

          <Row>
            <Col span={6}></Col>
            <Col span={12}>
              <Text>Results show all teachers near your area</Text>
              {fetchAllTeacherPending ? (
                <Skeleton active />
              ) : teachers.length > 0 ? (
                <div>
                  {teachers.map((teacher, index) => (
                    <div className="teacher-card" key={index}>
                      <Row>
                        <Col span={6}>
                          <Avatar size={80} icon="user" />
                        </Col>
                        <Col span={18}>
                          <Row>
                            <Col span={24}>
                              <Title level={3}>
                                {_.capitalize(teacher.firstname)}{" "}
                                {_.capitalize(teacher.lastname)}
                              </Title>
                            </Col>
                            <Col span={24}>
                              <Text strong>
                                <Icon
                                  type="compass"
                                  style={{
                                    color: "#1890ff",
                                    marginRight: "3px"
                                  }}
                                />
                                Teaching locations: Melbourne
                              </Text>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24} className="description">
                          {teacher.teacherMeta.intro}
                        </Col>

                        <Col span={24}>
                          <Row>
                            <Col span={16} style={{ height: "100px" }}>
                              <Row>
                                <Col span={24} className="meta first">
                                  <Badge color="blue" />
                                  {teacher.teacherMeta.speakingLanguage}
                                </Col>

                                <Col span={24} className="meta">
                                  <Badge color="blue" />
                                  {teacher.teacherMeta.certificates}
                                </Col>

                                <Col span={24} className="meta">
                                  <Badge color="blue" />
                                  Teaches students {teacher.teacherMeta.studentMinRequirements} and up
                                </Col>
                              </Row>
                            </Col>

                            <Col span={8} style={{ height: "100px" }}>
                              <Row>
                                <Col
                                  span={24}
                                  className="meta first"
                                  style={{ marginTop: "32px" }}
                                >
                                  <Button type="primary" shape="round" onClick={()=>{location.href=`/teachers/${teacher.id}`}}>
                                    See Full Profile
                                    <Icon type="right" />
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </Col>
            <Col span={6}></Col>
          </Row>

          <Row
            justify="center"
            type="flex"
            style={{ textAlign: "center", margin: "32px" }}
          >
            <Col span={24}>
              <Pagination
                defaultPageSize={10}
                showSizeChanger={true}
                current={this.state.pagination.page}
                onChange={this.onChange}
                total={totalElements}
                pageSizeOptions={["10", "20", "30"]}
              />
            </Col>
          </Row>
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    );
  }
}

export default Index;
