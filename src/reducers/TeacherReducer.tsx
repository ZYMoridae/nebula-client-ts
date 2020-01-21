import ActionType from "../actions/ActionType";

import { Layout, Table, Divider, Tag, Breadcrumb, Button, Icon } from "antd";

let initState: any = {
  fetchAllTeacherPending: false,
  fetchAllTeacherFulfilled: false,
  totalPages: 1,
  totalElements: 0,
  teachers: [],
  teacher: null,
  fetchTeacherPending: false,
  fetchTeacherFulfilled: false
};

const TeacherReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.TEACHER.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllTeacherFulfilled: action.fetchAllTeacherFulfilled,
        fetchAllTeacherPending: action.fetchAllTeacherPending
      });
    case ActionType.TEACHER.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllTeacherFulfilled: action.fetchAllTeacherFulfilled,
        fetchAllTeacherPending: action.fetchAllTeacherPending
      });
    case ActionType.TEACHER.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllTeacherFulfilled: action.fetchAllTeacherFulfilled,
        fetchAllTeacherPending: action.fetchAllTeacherPending,
        teachers: action.teachers,
        totalPages: action.totalPages,
        totalElements: action.totalElements
      });
    // GET user action
    case ActionType.TEACHER.GET.PENDING:
      return Object.assign({}, state, {
        fetchTeacherFulfilled: action.fetchTeacherFulfilled,
        fetchTeacherPending: action.fetchTeacherPending
      });
    case ActionType.TEACHER.GET.ERROR:
      return Object.assign({}, state, {
        fetchTeacherFulfilled: action.fetchTeacherFulfilled,
        fetchTeacherPending: action.fetchTeacherPending
      });
    case ActionType.TEACHER.GET.FULFILLED:
      return Object.assign({}, state, {
        fetchTeacherFulfilled: action.fetchTeacherFulfilled,
        fetchTeacherPending: action.fetchTeacherPending,
        teacher: action.teacher
      });
    default:
      return state;
  }
};

export default TeacherReducer;
