import ActionType from '../../actions/ActionType';

let initState: any = {
  isFetchingUserOrders: false,
  isFetchedUserOrders: false,
  totalPages: 1,
  info: [],
  error: null
}
const ordersReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.ORDER.FETCHING_USER_ORDERS_REJECTED:
      return {
        ...state,
        isFetchedUserOrders: action.isFetchedUserOrders,
        isFetchingUserOrders: action.isFetchingUserOrders,
        error: action.error
      }
    case ActionType.ORDER.FETCHING_USER_ORDERS_PENDING:
      return {
        ...state,
        isFetchedUserOrders: action.isFetchedUserOrders,
        isFetchingUserOrders: action.isFetchingUserOrders
      }
    case ActionType.ORDER.RECEIEVE_USER_ORDERS:
      return {
        ...state,
        isFetchedUserOrders: action.isFetchedUserOrders,
        isFetchingUserOrders: action.isFetchingUserOrders,
        info: action.info.content,
        totalPages: action.info.page.totalPages
      }
    default:
      return state
  }
}

export default ordersReducer;