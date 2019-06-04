import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';
import {fetchProductsInfo} from './ProductsActions';

// ------ HomeBanner Action ------
export const receieveHomeBanner = (results: any) => {
  return {
    type: ActionType.RECEIVE_HOMEBANNER,
    isFetchingHomeBanner: false,
    isFetchedHomeBanner: true,
    info: results
  }
}

export const fetchingHomeBanner = () => {
  return {
    type: ActionType.FETCHING_HOMEBANNER_PENDING,
    isFetchingHomeBanner: true,
    isFetchedHomeBanner: false
  }
}

export const fetchingHomeBannerError = (error: any) => {
  return {
    type: ActionType.FETCHING_HOMEBANNER_REJECTED,
    isFetchingHomeBanner: false,
    isFetchedHomeBanner: true,
    error: error
  }
}

export const fetchHomeBannerInfo = () => {
  return function (dispatch: any) {
    dispatch(fetchingHomeBanner());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/home-banners/active`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveHomeBanner(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingHomeBannerError(error));
      }
    });
  }
}