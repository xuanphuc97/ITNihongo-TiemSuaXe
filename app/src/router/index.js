import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Login from "../users/auth/Login";
import Register from "../users/auth/Register";
import Home from "../users/home/Home";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default () => {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <Switch>
      <AppRoute exact path="/" layout={UserLayout} component={Home} />
      <AppRoute path="/" component={Home} exact />
      <AppRoute path="/register" component={Register} exact />
      {/* <AppRoute path="/login" component={Login} /> */}
      <AppRoute path="/login" component={!isLogged ? Login : Home} exact />
    </Switch>
  );
};
