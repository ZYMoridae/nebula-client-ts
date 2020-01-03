import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import EditClazz from "../../components/clazz/EditClazz";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const editClazzContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClazz);

export default editClazzContainer;
