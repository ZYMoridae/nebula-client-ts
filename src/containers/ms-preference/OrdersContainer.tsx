import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import Orders from "../../components/ms-preference/Orders";

const mapStateToProps = (state: any) => {
  return {
    info: state.OrdersReducer.info,
    isFetchingUserOrders: state.OrdersReducer.isFetchingUserOrders,
    isFetchedUserOrders: state.OrdersReducer.isFetchedUserOrders,
    totalPages: state.OrdersReducer.totalPages,
    totalElements: state.OrdersReducer.totalElements
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchUserOrders: (page: number, perPage: number, orderBy: string) => {
      dispatch(fetchUserOrders(page, perPage, orderBy));
    }
  };
};

const ordersContainer = connect(mapStateToProps, mapDispatchToProps)(Orders);

export default ordersContainer;
