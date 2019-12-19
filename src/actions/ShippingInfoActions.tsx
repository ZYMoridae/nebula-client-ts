import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';
import { doPayment } from './PaymentActions';
import { notification, Icon } from "antd";
import * as React from "react";

// -------- Shipping Info Actions ----------
export const receieveShippingInfo = (results: any) => {
  return {
    type: ActionType.RECEIVE_SHIPPINGINFO,
    isCreatingShippingInfo: false,
    isCreatedShippingInfo: true,
    info: results
  }
}

export const creatingShippingInfo = () => {
  return {
    type: ActionType.CREATING_SHIPPINGINFO_PENDING,
    isCreatingShippingInfo: true,
    isCreatedShippingInfo: false
  }
}

export const creatingShippingInfoError = (error: any) => {
  return {
    type: ActionType.CREATING_SHIPPINGINFO_REJECTED,
    isCreatingShippingInfo: false,
    isCreatedShippingInfo: true,
    error: error
  }
}

/**
 * TODO: Logic need to be amended
 * 
 * @param orderId 
 * @param data 
 * @param creditCardInfo 
 */
export const createShippingInfo = (orderId: number, data: any, creditCardInfo: any, paymentToken: string) => {
  
  return function (dispatch: any) {
    dispatch(creatingShippingInfo());

    let options = {
      method: 'post',
      data: data
    };

    Zjax.request({
      url: `/api/orders/${orderId}/logistics`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveShippingInfo(response.data));
        dispatch(doPayment(orderId, creditCardInfo, paymentToken));
        // dispatch(redirectToPaymentPage(response.data.id));
      },
      failureCallback: (error: any) => {
        notification.open({
          message: "Payment Failed",
          description: "Please try again later!",
          icon: <Icon type="exclamation-circle" style={{ color: "#ff4d4f" }} />
        });
        dispatch(creatingShippingInfoError(error));
      }
    });
  }
}

export const shippingInfoFormInputChanged = (shippingInfoFormData: any) => {
  return {
    type: ActionType.SHIPPING_INFO_FORM_INPUT_CHANGED,
    info: shippingInfoFormData
  }
}