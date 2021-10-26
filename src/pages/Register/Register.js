import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// HoC
import withHeader from "../../hoc/withHeader";
import withoutAuth from "../../hoc/withoutAuth";

// Components
import Input from "../../components/Input";

// Functions imported
import { registerNewUserFirebase } from "../../services/firebase";
import { registerNewUser } from "../../services/userApi";

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
function validateNames(string) {
  let error = {};
  if (string.length === 1) {
    error = {
      isError: true,
      errorMessage: "Minimum two characters",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function validateUserName(string) {
  let error = {};
  if (string.length === 0) {
    error = {
      isError: true,
      errorMessage: "Username is required",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

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
  } else if (string.length <= 5) {
    error = {
      isError: true,
      errorMessage: "Minimum 6 characters",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function validateConfirmPassword(confirm, pass) {
  let error = {};
  if (confirm.length === 0) {
    error = {
      isError: true,
      errorMessage: "Confirm password is required",
    };
  } else if (confirm !== pass) {
    error = {
      isError: true,
      errorMessage: "Must be the same as password",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function Register() {
  const [firstName, setFirstName] = useState(initialFormStateRegister);
  const [lastName, setLastName] = useState(initialFormStateRegister);
  const [userName, setUserName] = useState(initialFormStateRegister);
  const [email, setEmail] = useState(initialFormStateRegister);
  const [password, setPassword] = useState(initialFormStateRegister);
  const [confirmPassword, setConfirmPassword] = useState(
    initialFormStateRegister
  );

  const history = useHistory();

  function handleFirstNameChange(e) {
    if (firstName.isTouched) {
      const error = validateNames(e.target.value);
      setFirstName({
        ...firstName,
        ...error,
        value: e.target.value,
      });
    } else {
      setFirstName({
        ...firstName,
        value: e.target.value,
      });
    }
  }

  function handleFirstNameBlur(e) {
    const error = validateNames(e.target.value);
    setFirstName({
      ...firstName,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

  function handleLastNameChange(e) {
    if (lastName.isTouched) {
      const error = validateNames(e.target.value);
      setLastName({
        ...lastName,
        ...error,
        value: e.target.value,
      });
    } else {
      setLastName({
        ...lastName,
        value: e.target.value,
      });
    }
  }

  function handleLastNameBlur(e) {
    const error = validateNames(e.target.value);
    setLastName({
      ...lastName,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

  function handleUserNameChange(e) {
    if (userName.isTouched) {
      const error = validateUserName(e.target.value);
      setUserName({
        ...userName,
        ...error,
        value: e.target.value,
      });
    } else {
      setUserName({
        ...userName,
        value: e.target.value,
      });
    }
  }

  function handleUserNameBlur(e) {
    const error = validateUserName(e.target.value);
    setUserName({
      ...userName,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

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

  function handleConfirmPasswordChange(e) {
    if (confirmPassword.isTouched) {
      const error = validateConfirmPassword(e.target.value, password.value);
      setConfirmPassword({
        ...confirmPassword,
        ...error,
        value: e.target.value,
      });
    } else {
      setConfirmPassword({
        ...confirmPassword,
        value: e.target.value,
      });
    }
  }

  function handleConfirmPasswordBlur(e) {
    const error = validateConfirmPassword(e.target.value, password.value);
    setConfirmPassword({
      ...confirmPassword,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

  function resetForm() {
    setFirstName(initialFormStateRegister);
    setLastName(initialFormStateRegister);
    setUserName(initialFormStateRegister);
    setEmail(initialFormStateRegister);
    setPassword(initialFormStateRegister);
    setConfirmPassword(initialFormStateRegister);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const firstNameError = validateNames(firstName.value);
    setFirstName({
      ...firstName,
      ...firstNameError,
      isTouched: true,
    });
    const lastNameError = validateNames(lastName.value);
    setLastName({
      ...lastName,
      ...lastNameError,
      isTouched: true,
    });
    const userNameError = validateUserName(userName.value);
    setUserName({
      ...userName,
      ...userNameError,
      isTouched: true,
    });
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
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword.value,
      password.value
    );
    setConfirmPassword({
      ...confirmPassword,
      ...confirmPasswordError,
      isTouched: true,
    });

    if (
      !firstNameError.isError &
      !lastNameError.isError &
      !userNameError.isError &
      !emailError.isError &
      !passwordError.isError &
      !confirmPasswordError.isError
    ) {
      registerNewUserFirebase(email.value, password.value)
        .then((user) => {
          const data = {
            firebaseId: user.user.uid,
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: email.value,
          };
          registerNewUser(data)
            .then(() => {
              history.push("/");
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function linkToLogin() {
    history.push("/login");
  }

  return (
    <main>
      <div className="center">
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="center">
            <h1 className="title-form">Sign Up</h1>
          </div>
          <Input
            type="text"
            id="firstName"
            placeholder="Enter your first name..."
            value={firstName.value}
            label="First name"
            isTouched={firstName.isTouched}
            isError={firstName.isError}
            errorMessage={firstName.errorMessage}
            handleChange={handleFirstNameChange}
            handleBlur={handleFirstNameBlur}
          />
          <Input
            type="text"
            id="lastName"
            placeholder="Enter your last name..."
            value={lastName.value}
            label="Last name"
            isTouched={lastName.isTouched}
            isError={lastName.isError}
            errorMessage={lastName.errorMessage}
            handleChange={handleLastNameChange}
            handleBlur={handleLastNameBlur}
          />
          <Input
            type="text"
            id="userName"
            placeholder="Enter your username..."
            value={userName.value}
            label="Username *"
            isTouched={userName.isTouched}
            isError={userName.isError}
            errorMessage={userName.errorMessage}
            handleChange={handleUserNameChange}
            handleBlur={handleUserNameBlur}
          />
          <Input
            type="text"
            id="email"
            placeholder="Enter your email..."
            value={email.value}
            label="Email *"
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
            label="Password *"
            isTouched={password.isTouched}
            isError={password.isError}
            errorMessage={password.errorMessage}
            handleChange={handlePasswordChange}
            handleBlur={handlePasswordBlur}
          />
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password..."
            value={confirmPassword.value}
            label="Confirm Password *"
            isTouched={confirmPassword.isTouched}
            isError={confirmPassword.isError}
            errorMessage={confirmPassword.errorMessage}
            handleChange={handleConfirmPasswordChange}
            handleBlur={handleConfirmPasswordBlur}
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
            <div>Already have an account?</div>
            <div className="log-in-register-text" onClick={linkToLogin}>
              Log In!
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default withoutAuth(withHeader(Register));
