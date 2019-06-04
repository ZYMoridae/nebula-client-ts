import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// -------- Shopping cart item actions ----------
export const deletedShoppingCartItem = (results: any, id: number) => {
  return {
    type: ActionType.DELETED_SHOPPING_CART_ITEM,
    isDeletingShoppingCartItem: false,
    isDeletedShoppingCartItem: true,
    info: results,
    shoppingCartItemId: id
  }
}

export const deletingShoppingCartItem = () => {
  return {
    type: ActionType.DELETING_SHOPPING_CART_ITEM_PENDING,
    isDeletingShoppingCartItem: true,
    isDeletedShoppingCartItem: false
  }
}

export const deletingShoppingCartItemError = (error: any) => {
  return {
    type: ActionType.DELETING_SHOPPING_CART_ITEM_REJECTED,
    isDeletingShoppingCartItem: false,
    isDeletedShoppingCartItem: true,
    error: error
  }
}

export const deleteShoppingCartItem = (id: number) => {
  return function (dispatch: any) {
    dispatch(deletingShoppingCartItem());

    let options = {
      method: 'delete'
    };

    Zjax.request({
      url: `/api/cart-items/${id}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(deletedShoppingCartItem(response.data, id));
      },
      failureCallback: (error: any) => {
        dispatch(deletingShoppingCartItemError(error));
      }
    });
  }
}

