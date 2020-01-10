import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import ProductsReducer from "./ProductsReducer";
import ProductInfoReducer from "./ProductInfoReducer";
import ProductCategorySideBarReducer from "./ProductCategorySideBarReducer";
import ShoppingCartReducer from "./ShoppingCartReducer";
import PaymentReducer from "./PaymentReducer";
import PaymentSuccessReducer from "./PaymentSuccessReducer";
import HomeReducer from "./HomeReducer";
import OrdersReducer from "./ms-preference/OrdersReducer";
import UserReducer from "./UserReducer";
import TokenReducer from "./TokenReducer";
import UserPreferencesReducer from "./ms-preference/UserPreferencesReducer";
import ClassBookingsReducer from "./ms-preference/ClassBookingsReducer";
import ClazzReducer from "./ClazzReducer";
import IndexReducer from "./IndexReducer";
import TeacherReducer from "./TeacherReducer";

const appReducer = combineReducers({
  LoginReducer,
  ProductsReducer,
  ProductInfoReducer,
  ProductCategorySideBarReducer,
  ShoppingCartReducer,
  PaymentReducer,
  PaymentSuccessReducer,
  HomeReducer,
  OrdersReducer,
  UserReducer,
  TokenReducer,
  UserPreferencesReducer,
  ClassBookingsReducer,
  ClazzReducer,
  IndexReducer,
  TeacherReducer
});

export default appReducer;
