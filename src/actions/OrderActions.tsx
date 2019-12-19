import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";
import { redirectToSuccessPaymentPage } from "./PaymentActions";

import PaginationInterface from "../interfaces/PaginationInterface";
import OrderInterface from "../interfaces/OrderInterface";

// -------- Shopping Cart Actions ----------
export const receieveOrder = (results: any) => {
  return {
    type: ActionType.RECEIVE_ORDER,
    isCreatingOrder: false,
    isCreatedOrder: true,
    info: results
  };
};

export const creatingOrder = () => {
  return {
    type: ActionType.CREATING_ORDERS_PENDING,
    isCreatingOrder: true,
    isCreatedOrder: false
  };
};

export const creatingOrderError = (err: any) => {
  return {
    type: ActionType.CREATING_ORDERS_REJECTED,
    isCreatingOrder: false,
    isCreatedOrder: true
  };
};

export const createOrder = (data: any) => {
  return function(dispatch: any) {
    dispatch(creatingOrder());

    let options = {
      method: "post",
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
  };
};

// Get activate order

// ------ Fetch activate order ------

export const receieveActivateOrder = (results: any) => {
  return {
    type: ActionType.RECEIEVE_ACTIVATE_ORDER,
    isFetchingActivateOrder: false,
    isFetchedActivateOrder: true,
    info: results
  };
};

export const fetchingActivateOrder = () => {
  return {
    type: ActionType.FETCHING_ACTIVATE_ORDER_PENDING,
    isFetchingActivateOrder: true,
    isFetchedActivateOrder: false
  };
};

export const fetchingActivateOrderError = (error: any) => {
  return {
    type: ActionType.FETCHING_ACTIVATE_ORDER_REJECTED,
    isFetchingActivateOrder: false,
    isFetchedActivateOrder: true,
    error: error
  };
};

export const fetchActivateOrder = (orderId: number) => {
  return function(dispatch: any) {
    dispatch(fetchingActivateOrder());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/orders/${orderId}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        // TODO: Change back end api when return the payment status (make it as a boolean value)
        if (response.data.orderStatus.name == "paid") {
          dispatch(redirectToSuccessPaymentPage(response.data.id));
        } else {
          dispatch(receieveActivateOrder(response.data));
        }
      },
      failureCallback: (error: any) => {
        dispatch(fetchingActivateOrderError(error));
      }
    });
  };
};

export const redirectToPaymentPage = (orderId: number) => {
  location.href = `/payment/${orderId}`;
};

// ------ Fetch order by id ------

export const fetchedOrder = (results: any) => {
  return {
    type: ActionType.RECEIEVE_ORDER,
    isFetchingOrder: false,
    isFetchedOrder: true,
    info: results
  };
};

export const fetchingOrder = () => {
  return {
    type: ActionType.FETCHING_ORDER_PENDING,
    isFetchingOrder: true,
    isFetchedOrder: false
  };
};

export const fetchingOrderError = (error: any) => {
  return {
    type: ActionType.FETCHING_ORDER_REJECTED,
    isFetchingOrder: false,
    isFetchedOrder: true,
    error: error
  };
};

export const fetchOrder = (orderId: number) => {
  return function(dispatch: any) {
    dispatch(fetchingOrder());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/orders/${orderId}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(fetchedOrder(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingOrderError(error));
      }
    });
  };
};

// ------ Get orders by user id ------

export const fetchedUserOrders = (
  results: any,
  totalPages: number,
  totalElements: number
) => {
  return {
    type: ActionType.ORDER.RECEIEVE_USER_ORDERS,
    isFetchingUserOrders: false,
    isFetchedUserOrders: true,
    info: results,
    totalPages: totalPages,
    totalElements: totalElements
  };
};

export const fetchingUserOrders = () => {
  return {
    type: ActionType.ORDER.FETCHING_USER_ORDERS_PENDING,
    isFetchingUserOrders: true,
    isFetchedUserOrders: false
  };
};

export const fetchingUserOrdersError = (error: any) => {
  return {
    type: ActionType.ORDER.FETCHING_USER_ORDERS_REJECTED,
    isFetchingUserOrders: false,
    isFetchedUserOrders: true,
    error: error
  };
};

export const fetchUserOrders = (
  page: number,
  perPage: number,
  orderBy: string
) => {
  return function(dispatch: any) {
    dispatch(fetchingUserOrders());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/orders?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        // const { data }: { data: OrdersPagination } = response;
        dispatch(
          fetchedUserOrders(
            response.data._embedded.orderList,
            response.data.page.totalPages,
            response.data.page.totalElements
          )
        );
      },
      failureCallback: (error: any) => {
        dispatch(fetchingUserOrdersError(error));
      }
    });
  };
};

interface OrdersPagination extends PaginationInterface {
  content: Array<OrderInterface>;
}
