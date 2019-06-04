import Zjax from '../utils/zjax';
import ActionType from './ActionType';

// ------ Auth Actions ------
export const receieveAuth = (json: any) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: false,
    info: json
  }
}

export const fetchingAuth = () => {
  return {
    type: ActionType.AUTH_PENDING,
    isFetchingAuth: true,
    isFetchedAuth: false,
    isShowLoginError: false
  }
}

export const fetchingAuthError = () => {
  return {
    type: ActionType.AUTH_FAIL,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: true
  }
}

export const hideLoginError = () => {
  return {
    type: ActionType.HIDE_ERROR,
    isShowLoginError: false
  }
}

export const fetchAuthInfo = (data: any) => {
  return function (dispatch: any) {
    dispatch(fetchingAuth());
    var headers = {};
    if (data.headers) {
      headers = data.headers;
    }
    delete data.headers;
    Zjax.request({
      url: '/api/auth/signin',
      option: {
        method: 'post',
        data: data,
        headers: headers
      },
      successCallback: (response: any) => {
        // Set auth token
        sessionStorage.setItem('user', response.data);
        localStorage.setItem('token', response.data.token);
        dispatch(receieveAuth(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingAuthError());
      }
    });
  }
}