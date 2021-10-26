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
        console.log(user);
        // getUserByFirebaseId()
      } else {
        dispatch(resetDataIsAuthorized());
      }
    });
  }, []);

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
