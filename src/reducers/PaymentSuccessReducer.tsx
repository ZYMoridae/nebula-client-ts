import ActionType from '../actions/ActionType';

let initState: any = {
  isFetchingOrder: false,
  isFetchedOrder: false,
  order: null
}

const paymentSucessReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.FETCHING_ORDER_PENDING:
      return Object.assign({}, state, {
        isFetchingOrder: action.isFetchingOrder,
        isFetchedOrder: action.isFetchedOrder
      })
    case ActionType.FETCHING_ORDER_REJECTED:
      return Object.assign({}, state, {
        isFetchingOrder: action.isFetchingOrder,
        isFetchedOrder: action.isFetchedOrder,
        fetchingActivateOrderError: action.error
      })
    case ActionType.RECEIEVE_ORDER:
      return Object.assign({}, state, {
        isFetchingOrder: action.isFetchingOrder,
        isFetchedOrder: action.isFetchedOrder,
        order: action.info
      })
    default:
      return state
  }
}
export default paymentSucessReducer;