import { connect } from 'react-redux';
import {
  fetchOrder
} from '../actions';
import PaymentSuccess from '../components/PaymentSuccess';

const mapStateToProps = (state: any) => {
  return {
    isFetchingOrder: state.PaymentSuccessReducer.isFetchingOrder,
    isFetchedOrder: state.PaymentSuccessReducer.isFetchedOrder,
    order: state.PaymentSuccessReducer.order
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchOrder: (orderId: number) => {
      dispatch(fetchOrder(orderId));
    }
  }
}

const PaymentSuccessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSuccess);

export default PaymentSuccessContainer;