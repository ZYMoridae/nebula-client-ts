import { connect } from "react-redux";
import { fetchAllTeacher } from "../../actions";
import TeacherIndex from "../../components/teacher/TeacherIndex";

const mapStateToProps = (state: any) => {
  return {
    teachers: state.TeacherReducer.teachers,
    fetchAllTeacherPending: state.TeacherReducer.fetchAllTeacherPending,
    fetchAllTeacherFulfilled: state.TeacherReducer.fetchAllTeacherFulfilled,
    totalPages: state.TeacherReducer.totalPages,
    totalElements: state.TeacherReducer.totalElements
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchAllTeacher: (page: number, perPage: number, orderBy: string) => {
      dispatch(fetchAllTeacher(page, perPage, orderBy));
    }
  };
};

const teacherIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherIndex);

export default teacherIndexContainer;
