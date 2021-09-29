import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import ViewMeetings from "./Pages/ViewMeetings";
import Grid from "@mui/material/Grid";
import AddMeetings from "./Pages/AddMeetings";

const AdminRoute = () => {
  return (
    <>
      <Switch>
        <Route path="/admin/view-meetings">
          <ViewMeetings />
        </Route>
        <Route path="/admin/add-meetings">
          <AddMeetings />
        </Route>
      </Switch>
    </>
  );
};

export default AdminRoute;
