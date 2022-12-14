import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Search from "../search/Search";
import Table from "../newtable/Table";
import Reservation from "../newreservation/Reservations";
import Seat from "../seat/Seat";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Edit from "../editreservation/Edit";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/search">
        <Search/>
      </Route>
      <Route path="/tables/new">
        <Table/>
      </Route>
      <Route path="/reservations/new">
        <Reservation/>
      </Route>
      <Route path="/reservations/:id/seat">
        <Seat/>
      </Route>
      <Route path="/reservations/:id/edit">
        <Edit/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
