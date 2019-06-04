import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';
import _ from 'lodash';

// -------- Shopping cart actions ----------
export const receieveShoppingCart = (results: any) => {
  return {
    type: ActionType.RECEIVE_SHOPPINGCART,
    isFetchingShoppingCart: false,
    isFetchedShoppingCart: true,
    info: results
  }
}

export const fetchingShoppingCart = () => {
  return {
    type: ActionType.FETCHING_SHOPPINGCART_PENDING,
    isFetchingShoppingCart: true,
    isFetchedShoppingCart: false
  }
}

export const fetchingShoppingCartError = (error: any) => {
  return {
    type: ActionType.FETCHING_SHOPPINGCART_REJECTED,
    isFetchingShoppingCart: false,
    isFetchedShoppingCart: true,
    error: error
  }
}

export const fetchShoppingCartInfo = () => {
  return function (dispatch: any) {
    dispatch(fetchingShoppingCart());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/carts/my`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        let orderedCartItems = _.orderBy(response.data.cartItems, ['id'], ['asc']);
        dispatch(receieveShoppingCart(orderedCartItems));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingShoppingCartError(error));
      }
    });
  }
}

// ------ Processing shopping cart ------

export const proceedShoppingCart = (cartItems: any) => {
  return {
    type: ActionType.PROCEEED_SHOPPING_CART,
    cartItems: cartItems
  }
}
