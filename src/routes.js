import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Login.js";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/">
      <AssignmentList />
    </Route>
    <Route exact path="/assignments/:id">
      <AssignmentDetail />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>
    <Route path="/profiles/:id">
      <Profile />
    </Route>
  </Switch>
);

export default BaseRouter;
