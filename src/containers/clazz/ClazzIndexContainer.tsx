import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import ClazzIndex from "../../components/clazz/ClazzIndex";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const clazzIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClazzIndex);

export default clazzIndexContainer;
