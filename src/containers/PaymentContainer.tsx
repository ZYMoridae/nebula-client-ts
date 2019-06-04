import { connect } from 'react-redux';
import {
  doPayment,
  fetchProductsByIds,
  fetchActivateOrder,
  createShippingInfo,
  shippingInfoFormInputChanged
} from '../actions';
import Payment from '../components/Payment';

const mapStateToProps = (state: any) => {
  return {
    info: state.PaymentReducer.info,
    isPaymentProcessing: state.PaymentReducer.isPaymentProcessing,
    isPaid: state.PaymentReducer.isPaid,
    cartItems: state.ShoppingCartReducer.cartItems,
    isFetchingActivateOrder: state.PaymentReducer.isFetchingActivateOrder,
    isFetchedActivateOrder: state.PaymentReducer.isFetchedActivateOrder,
    activateOrder: state.PaymentReducer.activateOrder,
    fetchingActivateOrderError: state.PaymentReducer.fetchingActivateOrderError,
    shippingInfo: state.PaymentReducer.shippingInfo,
    isCreatingShippingInfo: state.PaymentReducer.isCreatingShippingInfo,
    isCreatedShippingInfo: state.PaymentReducer.isCreatedShippingInfo,
    shippingInfoFormData: state.PaymentReducer.shippingInfoFormData,
    creditCardInfo: state.PaymentReducer.creditCardInfo
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    // doPayment: () => {
    //   dispatch(doPayment());
    // },
    fetchActivateOrder: (orderId: number) => {
      dispatch(fetchActivateOrder(orderId));
    },
    createShippingInfo: (orderId: number, shippingInfo: any, creditCardInfo: any) => {
      console.log(shippingInfo);
      dispatch(createShippingInfo(orderId, shippingInfo, creditCardInfo));
    },
    shippingInfoFormInputChanged: (shippingInfoFormData: any) => {
      dispatch(shippingInfoFormInputChanged(shippingInfoFormData));
    }
  }
}

const PaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);

export default PaymentContainer;