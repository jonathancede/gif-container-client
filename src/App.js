import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Functions
import { getUserByFirebaseId } from "./services/userApi";
import { authenticationObserver } from "./services/firebase";
import {
  setDataIsAuthorized,
  resetDataIsAuthorized,
} from "./redux/isAuthorized/actions";

function App() {
  const [isReadyToInit, setIsReadyToInit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authenticationObserver((user) => {
      if (user) {
        getUserByFirebaseId(user.uid)
          .then((resp) => {
            dispatch(
              setDataIsAuthorized({
                firstName: resp.data.currentUser.firstName,
                lastName: resp.data.currentUser.lastName,
                userName: resp.data.currentUser.userName,
                email: resp.data.currentUser.email,
                country: resp.data.currentUser.country,
                birthday: resp.data.currentUser.birthday,
                profileImage: resp.data.currentUser.profileImage,
              })
            );
            setIsReadyToInit(true);
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        dispatch(resetDataIsAuthorized());
      }
    });
    // eslint-disable-next-line
  }, []);

  if (!isReadyToInit) {
    // Loading Spinner
    return (
      <main className="container-centered">
        <div className="lds-roller container-centered">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
