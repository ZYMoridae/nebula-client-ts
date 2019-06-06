import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ProductsReducer from './ProductsReducer';
import ProductInfoReducer from './ProductInfoReducer';
import ProductCategorySideBarReducer from './ProductCategorySideBarReducer';
import ShoppingCartReducer from './ShoppingCartReducer';
import PaymentReducer from './PaymentReducer';
import PaymentSuccessReducer from './PaymentSuccessReducer';
import HomeReducer from './HomeReducer';

const counterApp = combineReducers({
  LoginReducer,
  ProductsReducer,
  ProductInfoReducer,
  ProductCategorySideBarReducer,
  ShoppingCartReducer,
  PaymentReducer,
  PaymentSuccessReducer,
  HomeReducer
})

export default counterApp;