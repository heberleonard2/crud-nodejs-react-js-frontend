import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import FormUpdate from "./pages/formupdate";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/products/:id" component={FormUpdate} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
