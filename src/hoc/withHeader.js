import React from "react";

// Components
import Header from "../components/Header/Header";

function withHeader(WrappedComponent) {
  function WrapperComponent() {
    return (
      <>
        <Header />
        <WrappedComponent />
      </>
    );
  }
  return WrapperComponent;
}

export default withHeader;
