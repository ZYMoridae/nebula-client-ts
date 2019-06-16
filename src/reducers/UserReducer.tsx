import ActionType from '../actions/ActionType';

let initState = {
  isCreatinguser: false,
  isCreateduser: false,
  info: 'null'
}

const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.CREATING_USERS_REJECTED:
      return {
        ...state,
        isCreateduser: action.isCreateduser,
        isCreatinguser: action.isCreatinguser
      }
    case ActionType.CREATING_USERS_PENDING:
      return {
        ...state,
        isCreateduser: action.isCreateduser,
        isCreatinguser: action.isCreatinguser
      }
    case ActionType.RECEIVE_USER:
      return {
        ...state,
        isCreateduser: action.isCreateduser,
        isCreatinguser: action.isCreatinguser,
        info: action.info
      }
    default:
      return state
  }
}

export default userReducer;