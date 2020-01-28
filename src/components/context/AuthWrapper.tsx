import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import _ from "lodash";

import Utils from "../../utils/Utils";

const AuthContext = React.createContext(null);

const AuthProvider = (props: any) => {
  // code for pre-loading the user's information if we have their token in
  // localStorage goes here
  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  // if (weAreStillWaitingToGetTheUserData) {
  //   return <FullPageSpinner />
  // }

  let userInfo = getUserInfo();

  const login = () => {}; // make a login request
  const register = () => {}; // register the user
  const logout = () => {}; // clear the token in localStorage and the user data
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return (
    <AuthContext.Provider
      value={{ userInfo, login, logout, register }}
      {...props}
    />
  );
};

async function getUserInfo() {
  let token = Cookies.get("token");
  let userInfo;
  if (!_.isNil(token)) {
    let options = {
      method: "GET"
    };
    options = Utils.addToken(options);
    const response = await fetch("/api/users/me", options);
    userInfo = await response.json();
  }

  return userInfo;
}

// const AuthConsumer = () => {
//   return (
//     <AuthContext.Consumer />
//   )
// }


const AuthWrapper = {
  AuthProvider: AuthProvider,
  AuthContext: AuthContext
}

export default AuthWrapper;