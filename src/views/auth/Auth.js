import React from "react";
import { Redirect } from "react-router";

const Auth = (props) => {
  localStorage.setItem("bundly-token", props.location.search.slice(7));
  return <Redirect to="/" />;
};

export default Auth;
