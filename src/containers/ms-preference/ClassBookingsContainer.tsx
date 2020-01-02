import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import ClassBookings from "../../components/ms-preference/ClassBookings";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const classBookingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassBookings);

export default classBookingsContainer;
