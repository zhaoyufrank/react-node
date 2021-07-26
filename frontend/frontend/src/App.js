import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Content from "./Content";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

const verifyURL =
  "https://kt9ttxng09.execute-api.us-east-1.amazonaws.com/prod/verify";

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "GAp3HuZGIc1HzsEroxkVa5Oh3gYAea9F9qKmCnZx",
      },
    };

    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenticating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" to="/content">
            Content
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/content" component={Content} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
