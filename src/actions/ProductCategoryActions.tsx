import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// ------ ProductCategory Action ------
export const receieveProductCategory = (results: any, totalPages: number) => {
  return {
    type: ActionType.RECEIVE_PRODUCTCATEGORY,
    isFetchingProductCategory: false,
    isFetchedProductCategory: true,
    info: results,
    totalPages: totalPages,
    receivedAt: Date.now()
  }
}

export const fetchingProductCategory = () => {
  return {
    type: ActionType.FETCHING_PRODUCTCATEGORY_PENDING,
    isFetchingProductCategory: true,
    isFetchedProductCategory: false
  }
}

export const fetchingProductCategoryError = (error: any) => {
  return {
    type: ActionType.FETCHING_PRODUCTCATEGORY_REJECTED,
    isFetchingProductCategory: false,
    isFetchedProductCategory: true,
    error: error
  }
}


export const fetchProductCategoryInfo = (page: number, perPage: number, orderBy: string) => {
  return function (dispatch: any) {
    dispatch(fetchingProductCategory());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/product-categories?page=${page - 1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveProductCategory(response.data.content, response.data.page.totalPages));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingProductCategoryError(error));
      }
    });
  }
}