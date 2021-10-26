import React from "react";

// HoC
import withHeader from "../../hoc/withHeader";

// CSS
import "./style.css";

function Register() {
  return (
    <main>
      <div className="">
        <h1>Register</h1>
      </div>
    </main>
  );
}

export default withHeader(Register);
