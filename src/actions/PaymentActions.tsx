import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// ------ Payment Actions ------
export const paymentSucess = (results: any) => {
  return {
    type: ActionType.PAYMENT_SUCESS,
    isPaymentProcessing: false,
    isPaid: true,
    info: results
  }
}

export const paymentPending = () => {
  return {
    type: ActionType.PAYMENT_PENDING,
    isPaymentProcessing: true,
    isPaid: false
  }
}

export const paymentError = (error: any) => {
  return {
    type: ActionType.PAYMENT_REJECTED,
    isPaymentProcessing: false,
    isPaid: true,
    error: error
  }
}
/**
 * 
 * @param creditCardInfo 
 */
export const doPayment = (id: number, creditCardInfo: any) => {
  return function (dispatch: any) {
    dispatch(paymentPending());

    let options = {
      method: 'post',
      data: creditCardInfo
    };

    Zjax.request({
      url: `/api/payments/${id}/finalise`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(redirectToSuccessPaymentPage(response.data.order.id));
        // dispatch(paymentSucess(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(paymentError(error));
      }
    });
  }
}

/**
 * 
 * @param orderId 
 */
export const redirectToSuccessPaymentPage = (orderId: number) => {
  // location.href = `/payment/${orderId}/success`;
  return {
    type: ActionType.REDIRECT_TO_PAYMENT_SUCCESS,
    redirectOrderId: orderId,
    redirectToPaymentPage: true
  }
}