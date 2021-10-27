import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// HoC
import withHeader from "../../hoc/withHeader";
import withoutAuth from "../../hoc/withoutAuth";

// Components
import Input from "../../components/Input";

// Functions imported
import { loginFirebase } from "../../services/firebase";

// CSS
import "./style.css";

// Initial State
const initialFormStateRegister = {
  value: "",
  isTouched: false,
  isError: false,
  errorMessage: "",
};

// Functions to validate strings
function validateEmail(string) {
  let error = {};
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (string.length === 0) {
    error = {
      isError: true,
      errorMessage: "Email is required",
    };
  } else if (!pattern.test(String(string).toLowerCase())) {
    error = {
      isError: true,
      errorMessage: "Must be an email type as email@email.com",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function validatePassword(string) {
  let error = {};
  if (string.length === 0) {
    error = {
      isError: true,
      errorMessage: "Password is required",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function Login() {
  const [email, setEmail] = useState(initialFormStateRegister);
  const [password, setPassword] = useState(initialFormStateRegister);

  const [isUploading, setIsUploading] = useState(false);

  const history = useHistory();

  function handleEmailChange(e) {
    if (email.isTouched) {
      const error = validateEmail(e.target.value);
      setEmail({
        ...email,
        ...error,
        value: e.target.value,
      });
    } else {
      setEmail({
        ...email,
        value: e.target.value,
      });
    }
  }

  function handleEmailBlur(e) {
    const error = validateEmail(e.target.value);
    setEmail({
      ...email,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

  function handlePasswordChange(e) {
    if (password.isTouched) {
      const error = validatePassword(e.target.value);
      setPassword({
        ...password,
        ...error,
        value: e.target.value,
      });
    } else {
      setPassword({
        ...password,
        value: e.target.value,
      });
    }
  }

  function handlePasswordBlur(e) {
    const error = validatePassword(e.target.value);
    setPassword({
      ...password,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

  function resetForm() {
    setEmail(initialFormStateRegister);
    setPassword(initialFormStateRegister);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const emailError = validateEmail(email.value);
    setEmail({
      ...email,
      ...emailError,
      isTouched: true,
    });
    const passwordError = validatePassword(password.value);
    setPassword({
      ...password,
      ...passwordError,
      isTouched: true,
    });

    if (!emailError.isError & !passwordError.isError) {
      setIsUploading(true);
      loginFirebase(email.value, password.value)
        .then(() => {
          setIsUploading(false);
          history.push("/");
        })
        .catch((error) => {
          setIsUploading(false);
          alert(error);
        });
    }
  }

  function linkToRegister() {
    history.push("/register");
  }

  return (
    <main>
      <div className="center">
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="center">
            <h1 className="title-form-login">Log In</h1>
          </div>
          <Input
            type="text"
            id="email"
            placeholder="Enter your email..."
            value={email.value}
            label="Email"
            isTouched={email.isTouched}
            isError={email.isError}
            errorMessage={email.errorMessage}
            handleChange={handleEmailChange}
            handleBlur={handleEmailBlur}
          />
          <Input
            type="password"
            id="password"
            placeholder="Enter your password..."
            value={password.value}
            label="Password"
            isTouched={password.isTouched}
            isError={password.isError}
            errorMessage={password.errorMessage}
            handleChange={handlePasswordChange}
            handleBlur={handlePasswordBlur}
          />
          <div className="buttons-wrapper">
            <button className="form-button" type="button" onClick={resetForm}>
              Clear
            </button>
            <button className="form-button color-yellowgreen" type="submit">
              Confirm
            </button>
          </div>
          <div className="join-now-wrapper">
            <div>New in GIFHome?</div>
            <div className="join-now-text" onClick={linkToRegister}>
              Join Now!
            </div>
          </div>
          {isUploading && (
            <div className="spinner-upload">
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

export default withoutAuth(withHeader(Login));
