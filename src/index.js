import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "./redux/provider";
import { initializeApp } from "firebase/app";

// App
import App from "./App";

// Components
import { firebaseConfig } from "./services/firebase";

// CSS
import "./index.css";

// Initialize Firebase
initializeApp(firebaseConfig);

// Console Welcome
console.log("Welcome to GIFHome!");

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
