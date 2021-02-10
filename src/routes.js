import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Login.js";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";

const BaseRouter = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <HomepageLayout />
    </Route>
  </Switch>
);

export default BaseRouter;
