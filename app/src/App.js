import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Login from "./users/auth/Login";
import Register from "./users/auth/Register";
import Layout from "./layouts/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import CookiesService from "./services/CookiesService";
import {
  dispatchGetUser,
  dispatchLogin,
  fetchUser,
} from "./redux/actions/authAction";
import { useEffect } from "react";
import Home from "./users/home/Home";
import Routes from "./router";
import ForgotPassword from "./users/auth/ForgotPassword";


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const { isLogged, isAdmin } = auth;
  const cookiesService = CookiesService.getService();

  useEffect(() => {
    const token = cookiesService.getToken();
    if (token) {
      dispatch(dispatchLogin());
      fetchUser(token).then((res) => {
        dispatch(dispatchGetUser(res));
      });
    }
  }, [auth.isLogged, dispatch]);

  return (
    <>
      
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">{!isLogged ? <Login /> : <Home />}</Route>
            <Route path="/register">
              {!isLogged ? <Register /> : <Home />}
            </Route>
            <Route path="/forgot_password">
              {!isLogged ? <ForgotPassword /> : <Home />}
            </Route>
          </Switch>
        </Layout>
        {/* <div>
          <Routes />
        </div> */}
      </Router>
    </>
  );
}

export default App;
