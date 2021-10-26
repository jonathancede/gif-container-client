import React from "react";

// HoC
import withHeader from "../../hoc/withHeader";

// CSS
import "./style.css";

function Login() {
  return (
    <main>
      <div className="">
        <h1>Login</h1>
      </div>
    </main>
  );
}

export default withHeader(Login);
