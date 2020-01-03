import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import NewClazz from "../../components/clazz/NewClazz";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const newClazzContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewClazz);

export default newClazzContainer;
