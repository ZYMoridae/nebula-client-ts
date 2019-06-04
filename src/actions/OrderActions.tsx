import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// -------- Shopping Cart Actions ----------
export const receieveOrder = (results: any) => {
  return {
    type: ActionType.RECEIVE_ORDER,
    isCreatingOrder: false,
    isCreatedOrder: true,
    info: results
  }
}

export const creatingOrder = () => {
  return {
    type: ActionType.CREATING_ORDERS_PENDING,
    isCreatingOrder: true,
    isCreatedOrder: false
  }
}

export const creatingOrderError = (err: any) => {
  return {
    type: ActionType.CREATING_ORDERS_REJECTED,
    isCreatingOrder: false,
    isCreatedOrder: true
  }
}

export const createOrder = (data: any) => {
  return function (dispatch: any) {
    dispatch(creatingOrder());

    let options = {
      method: 'post',
      data: data
    };

    Zjax.request({
      url: `/api/orders`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveOrder(response.data));
        dispatch(redirectToPaymentPage(response.data.id));
      },
      failureCallback: (error: any) => {
        dispatch(creatingOrderError(error));
      }
    });
  }
}

// Get activate order

// ------ Fetch product by ids ------

export const receieveActivateOrder = (results: any) => {
  return {
    type: ActionType.RECEIEVE_ACTIVATE_ORDER,
    isFetchingActivateOrder: false,
    isFetchedActivateOrder: true,
    info: results
  }
}

export const fetchingActivateOrder = () => {
  return {
    type: ActionType.FETCHING_ACTIVATE_ORDER_PENDING,
    isFetchingActivateOrder: true,
    isFetchedActivateOrder: false
  }
}

export const fetchingActivateOrderError = (error: any) => {
  return {
    type: ActionType.FETCHING_ACTIVATE_ORDER_REJECTED,
    isFetchingActivateOrder: false,
    isFetchedActivateOrder: true,
    error: error
  }
}

export const fetchActivateOrder = (orderId: number) => {
  return function (dispatch: any) {
    dispatch(fetchingActivateOrder());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/orders/${orderId}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveActivateOrder(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingActivateOrderError(error));
      }
    });
  }
}

export const redirectToPaymentPage = (orderId: number) => {
  location.href = `/payment/${orderId}`;
}

