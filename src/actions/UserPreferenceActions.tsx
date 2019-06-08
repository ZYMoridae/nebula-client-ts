import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// ------ Shipping preferences actions ------
export const addUserShippingPreferenceSuccess = (result: any) => {
  return {
    type: ActionType.USER_PREFERENCE.ADD_USER_SHIPPING_PREFERENCE_FULLFILLED,
    isAddingUserShippingPreference: false,
    isAddedUserShippingPreference: true,
    info: result,
    isShowSuccessToast: true
  }
}

export const addingUserShippingPreference = () => {
  return {
    type: ActionType.USER_PREFERENCE.ADD_USER_SHIPPING_PREFERENCE_PENDING,
    isAddingUserShippingPreference: true,
    isAddedUserShippingPreference: false,
    isShowSuccessToast: false
  }
}

export const addingUserShippingPreferenceError = (error: any) => {
  return {
    type: ActionType.USER_PREFERENCE.ADD_USER_SHIPPING_PREFERENCE_REJECTED,
    isAddingUserShippingPreference: false,
    isAddedUserShippingPreference: true,
    isShowSuccessToast: false,
    error: error
  }
}

export const addUserShippingPreference = (shippingInfo: any) => {
  return function (dispatch: any) {
    dispatch(addingUserShippingPreference());

    let options = {
      method: 'post',
      data: shippingInfo
    };

    Zjax.request({
      url: `/api/preferences/shippings`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(addUserShippingPreferenceSuccess(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(addingUserShippingPreferenceError(error));
      }
    });
  }
}