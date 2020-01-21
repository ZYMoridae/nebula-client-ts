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
  Typography
} from "antd";

import { Row, Col } from "antd";


type TeacherInfoProps = {
  fetchTeacherInfo: any;
  id: number;
  teacher: any;
  fetchTeacherInfoPending: boolean;
  fetchTeacherInfoFulfilled: boolean;
};

class TeacherInfo extends React.Component<TeacherInfoProps> {
  // componentDidMount() {
  //   const { fetchTeacherInfo, id } = this.props;
  //   fetchTeacherInfo(id);
  // }

  render() {
    return (
      <div>
        HelloWorld!
      </div>
    );
  }
}

export default TeacherInfo;
