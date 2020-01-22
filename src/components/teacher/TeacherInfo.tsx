import * as React from "react";

// Ant Design
// import Footer from "../Footer";
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
  Typography,
  Collapse,
  Divider
} from "antd";

import { Row, Col } from "antd";

import "./TeacherInfo.css";

const { Content } = Layout;

const { Title, Text } = Typography;

const { Panel } = Collapse;

type TeacherInfoProps = {
  fetchTeacherInfo: any;
  id: any;
  teacher: any;
  fetchTeacherPending: boolean;
  fetchTeacherFulfilled: boolean;
};

const TeacherMetaBlock = (props: any) => {
  const { teacher } = props;

  return (
    <div>
      {_.isNil(teacher) ? (
        <Empty description={"Teacher can't be found!"} />
      ) : (
        <div className="teacher-info">
          <Row>
            <Col xs={12} sm={10} md={10} lg={10} xl={6}>
              <Avatar size={100} icon="user" />
            </Col>
            <Col xs={12} sm={14} md={14} lg={14} xl={18}>
              <Title level={3}>
                {_.capitalize(teacher.firstname)}{" "}
                {_.capitalize(teacher.lastname)}
              </Title>
              <Text>Teachers Online</Text>
              <div style={{ marginTop: "24px" }}>
                <Button>Ask {teacher.firstname} a Question</Button>
              </div>
            </Col>
            <Col span={24} className="meta-block">
              <Title level={4}>
                About {_.capitalize(teacher.firstname)}{" "}
                {_.capitalize(teacher.lastname[0]) + "."}
              </Title>
              <Text>
                {teacher.teacherMeta.intro}
                My name is Erika and I have been studying French since I was 4
                years old. I studied French in my hometown where I got a degree
                in French (C1 level). When I was 16, I got a scholarship to
                study French in Normandie, France. Ten years later, I got a
                second scholarship to study in Lyon, France. Back in Argentina,
                I have been teaching at the Alliance Francaise since then.
                Currently, I am the Headteacher. Also, I have been working at
                university for 16 years. As regards my interests, I am keen on
                photography, arts, cooking and languages. my english is not very
                good, im not teaching beginners.
                <Row className="meta-block">
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
                    Teaches students{" "}
                    {teacher.teacherMeta.studentMinRequirements} and up
                  </Col>
                </Row>
              </Text>
            </Col>
            <Col span={24} className="meta-block">
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Reviews(11)" key="1">
                  This is test
                </Panel>
                <Panel header="Experience" key="2">
                  This is test
                </Panel>
                <Panel header="Education" key="3">
                  This is test
                </Panel>
                <Panel header="Languages" key="4">
                  This is test
                </Panel>
                <Panel header="Certifications" key="5">
                  This is test
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

class TeacherInfo extends React.Component<TeacherInfoProps> {
  componentDidMount() {
    const { fetchTeacherInfo, id } = this.props;
    fetchTeacherInfo(id);
  }

  render() {
    const { fetchTeacherPending, teacher } = this.props;

    return (
      <Layout style={{ padding: "24px 24px" }}>
        <Content
          style={{
            // background: "#fff",
            paddingTop: 24,
            paddingBottom: 24,
            margin: 0
            // minHeight: 280
          }}
        >
          <Row>
            <Col xs={1} sm={3} md={4} lg={5} xl={5}></Col>
            <Col
              xs={18}
              sm={14}
              md={12}
              lg={9}
              xl={9}
              style={{
                background: "#fff",
                padding: "24px 48px",
                borderRadius: "5px"
              }}
            >
              <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Teacher</Breadcrumb.Item>
                <Breadcrumb.Item>Info</Breadcrumb.Item>
              </Breadcrumb>
              <Divider />
              {fetchTeacherPending ? (
                <Skeleton active />
              ) : (
                <TeacherMetaBlock {...this.props} />
              )}
            </Col>
            <Col
              xs={4}
              sm={4}
              md={4}
              lg={5}
              xl={5}
              style={{
                background: "#fff",
                borderRadius: "5px",
                marginLeft: "24px"
              }}
            >
              {fetchTeacherPending ? (
                <Skeleton active />
              ) : _.isNil(teacher) ? (
                ""
              ) : (
                <div>
                  <div
                    style={{
                      background: "#fff",
                      padding: "12px 24px",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      backgroundColor: "#404040",
                      color: "white"
                    }}
                  >
                    <Text strong style={{ color: "white" }}>
                      Reserve your spot with {_.capitalize(teacher.firstname)}
                    </Text>
                  </div>
                  <div
                    style={{
                      background: "#fff",
                      padding: "12px 24px",
                      borderBottomLeftRadius: "5px",
                      borderBottomRightRadius: "5px"
                    }}
                  >
                    Select your subject...
                  </div>
                </div>
              )}
            </Col>
            <Col xs={1} sm={3} md={4} lg={5} xl={5}></Col>
          </Row>
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    );
  }
}

export default TeacherInfo;
