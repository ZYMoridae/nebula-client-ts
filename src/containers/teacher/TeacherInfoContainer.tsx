import { connect } from "react-redux";
import { fetchTeacherInfo } from "../../actions";
import TeacherInfo from "../../components/teacher/TeacherInfo";

const mapStateToProps = (state: any) => {
  return {
    teacher: state.TeacherReducer.teacher,
    fetchTeacherPending: state.TeacherReducer.fetchTeacherPending,
    fetchTeacherFulfilled: state.TeacherReducer.fetchTeacherFulfilled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchTeacherInfo: (id: number) => {
      dispatch(fetchTeacherInfo(id));
    }
  };
};

const teacherInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherInfo);

export default teacherInfoContainer;
