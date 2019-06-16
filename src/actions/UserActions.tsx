import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// -------- User Actions ----------
export const receieveuser = (results: any) => {
  return {
    type: ActionType.RECEIVE_USER,
    isCreatinguser: false,
    isCreateduser: true,
    info: results
  }
}

export const creatinguser = () => {
  return {
    type: ActionType.CREATING_USERS_PENDING,
    isCreatinguser: true,
    isCreateduser: false
  }
}

export const creatinguserError = (err: any) => {
  return {
    type: ActionType.CREATING_USERS_REJECTED,
    isCreatinguser: false,
    isCreateduser: true
  }
}

export const createUser = (data: any) => {
  return function (dispatch: any) {
    dispatch(creatinguser());

    let options = {
      method: 'post',
      data: data
    };

    Zjax.request({
      url: `/api/users`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveuser(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(creatinguserError(error));
      }
    });
  }
}