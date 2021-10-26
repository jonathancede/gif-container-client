import React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

function withAuth(WrappedComponent) {
  function WrapperComponent() {
    const { isAuthorized } = useSelector((state) => state.isAuthorized);

    return (
      <>{isAuthorized ? <WrappedComponent /> : <Redirect to="/login" />}</>
    );
  }

  return WrapperComponent;
}

export default withAuth;
