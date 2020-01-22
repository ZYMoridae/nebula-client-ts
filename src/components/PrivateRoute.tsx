import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import _ from "lodash";
import Utils from "../utils/Utils";
import Role from "../utils/Role";

/**
 * Checks token
 * @param role
 * @returns
 */
async function checkToken(roles: any) {
  let token = Cookies.get("token");
  if (token == null && token == undefined) {
    Cookies.remove("user");
  }

  let isValidAccess = true;

  // Do the authorization based on API
  // FIXME: D
  if (!_.isNil(token)) {
    let options = {
      method: "GET"
    };
    options = Utils.addToken(options);
    const response = await fetch("/api/users/me", options);
    const userInfo = await response.json();

	// Check Role
    if (Array.isArray(userInfo.roles) && Array.isArray(roles)) {
      let difference = _.difference(roles, userInfo.roles);
      if (difference.length > 0) {
        isValidAccess = false;
      }
    }
  }

  return isValidAccess;
}

const PrivateRoute = ({
  exact,
  path,
  component: Component,
  roles,
  ...rest
}: {
  exact?: boolean;
  path: string;
  component?: any;
  roles?: any;
  rest?: any;
}) => {
  checkToken(roles);
  return (
    <Route
      {...rest}
      render={props =>
        Cookies.get("token") != undefined &&
        Cookies.get("token") != "null" &&
        Cookies.get("token") != "undefined" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
