import OrdersReducer from './OrdersReducer';
import ActionType from '../../actions/ActionType';

const getInitState = () => {
  let initState: any = {
    isFetchingUserOrders: false,
    isFetchedUserOrders: false,
    totalPages: 1,
    info: [],
    error: null
  }
  return initState;
};


test('test action ORDER.FETCHING_USER_ORDERS_REJECTED', () => {
  let initState = getInitState();

  let orderAction = {
    type: ActionType.ORDER.FETCHING_USER_ORDERS_REJECTED,
    isFetchedUserOrders: true,
    isFetchingUserOrders: false,
    error: 'error'
  };

  let expectedResult: any = {
    isFetchingUserOrders: false,
    isFetchedUserOrders: true,
    totalPages: 1,
    info: [],
    error: 'error'
  } 

  let result = OrdersReducer(initState, orderAction);

  expect(result).toStrictEqual(expectedResult);
});




test('test action ORDER.FETCHING_USER_ORDERS_PENDING', () => {
  let initState = getInitState();

  let orderAction = {
    type: ActionType.ORDER.FETCHING_USER_ORDERS_PENDING,
    isFetchedUserOrders: false,
    isFetchingUserOrders: true
  };

  let expectedResult: any = {
    isFetchingUserOrders: true,
    isFetchedUserOrders: false,
    totalPages: 1,
    info: [],
    error: null
  } 

  let result = OrdersReducer(initState, orderAction);

  expect(result).toStrictEqual(expectedResult);
});


test('test action ORDER.RECEIEVE_USER_ORDERS', () => {
  let initState = getInitState();

  let orderAction = {
    type: ActionType.ORDER.RECEIEVE_USER_ORDERS,
    isFetchedUserOrders: true,
    isFetchingUserOrders: false,
    info: {
      page: {
        totalPages: 10
      },
      content: ['test']
    },
    totalElements: 10,
    totalPages: 10
  };

  let expectedResult: any = {
    isFetchedUserOrders: true,
    isFetchingUserOrders: false,
    totalPages: 10,
    info: {
      page: {
        totalPages: 10
      },
      content: ['test']
    },
    error: null,
    totalElements: 10
  } 

  let result = OrdersReducer(initState, orderAction);

  expect(result).toStrictEqual(expectedResult);
});


test ('test unknown action', () => {
  let initState = getInitState();

  let orderAction = {
    type: 'test'
  };

  let expectedResult: any = {
    isFetchingUserOrders: false,
    isFetchedUserOrders: false,
    totalPages: 1,
    info: [],
    error: null
  } 

  let result = OrdersReducer(initState, orderAction);

  expect(result).toStrictEqual(expectedResult);
});