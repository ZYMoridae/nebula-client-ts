import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import PaymentOptionManagement from "../../components/ms-preference/PaymentOptionManagement";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const paymentOptionManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptionManagement);

export default paymentOptionManagementContainer;
