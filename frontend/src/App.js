import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import AdminRoute from "./Admin";
import { Redirect } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/login" exact></Redirect>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
      <AdminRoute />
    </Router>
  );
}
