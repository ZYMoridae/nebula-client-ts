import { connect } from "react-redux";
import { fetchUserOrders } from "../actions";
import Index from "../components/Index";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const indexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default indexContainer;
