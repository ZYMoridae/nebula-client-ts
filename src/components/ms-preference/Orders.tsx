import * as React from "react";

import Footer from "../Footer";
import { Layout, Table, Divider, Tag, Breadcrumb, Button, Icon } from "antd";

import { Row, Col } from "antd";

const { Header, Content, Sider } = Layout;

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
    title: "Amount",
    key: "amount",
    render: (text: any, record: any) => {
      let totalAmount = 0;

      if (Array.isArray(record.orderItems)) {
        record.orderItems.forEach((orderItem: any) => {
          totalAmount += orderItem.amount;
        });
      }

      return <span>${totalAmount}</span>;
    }
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt"
  }
];

type IndexState = {
  offset: number;
  pagination: any;
};

type IndexProps = {
  totalElements: number;
  page: number;
  perPage: number;
  orderBy?: string;
  fetchUserOrders: any;
  info: any;
  totalPages: number;
  isFetchingUserOrders: any;
};

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = { offset: 0, pagination: {} };
  }

  componentDidMount() {
    const { page, perPage } = this.props;
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
    const { perPage, orderBy, fetchUserOrders } = this.props;
    let page = offset / this.props.perPage + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchUserOrders(page, perPage, "id");
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { fetchUserOrders } = this.props;
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    fetchUserOrders(pagination.current, pagination.pageSize, "id");
  };

  render() {
    const {
      info,
      perPage,
      totalPages,
      isFetchingUserOrders,
      totalElements
    } = this.props;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <a href="/preference">Preferences</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
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
                  window.location.href = "/products/categories/new";
                }}
              >
                <Icon type="plus" />
                Add
              </Button>
            </Col>
          </Row> */}

          <Table
            columns={columns}
            dataSource={info}
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              total: totalElements
            }}
            onChange={this.handleTableChange}
            loading={isFetchingUserOrders}
          />
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    );
  }
}

export default Index;
