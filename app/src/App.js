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
import Profile from "./users/profile/Profile";
import EditProfile from "./users/profile/EditProfile";
import GarageProfile from "./users/garage/GarageProfile";
import GarageEditProfile from "./users/garage/GarageEditProfile";
import NewGarage from "./users/garage/NewGarage";
import NewService from "./users/garage/NewService";
import '@goongmaps/goong-js/dist/goong-js.css';
import Admin from "./admin/admin/Admin";
import Dashboard from "./admin/dashboard/Dashboard";
import UserTable from "./admin/users/UserTable";
import GarageTable from "./admin/garages/GarageTable"

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
            <Route path="/login" exact>
              {!isLogged ? <Login /> : <Home />}
            </Route>
            <Route path="/register" exact>
              {!isLogged ? <Register /> : <Home />}
            </Route>
            <Route path="/forgot_password" exact>
              {!isLogged ? <ForgotPassword /> : <Home />}
            </Route>
            <Route path={`/profile/${user.username}`} exact>
              {!isLogged ? <Login /> : <Profile />}
            </Route>
            <Route path={`/profile/${user.username}/edit`} exact>
              {!isLogged ? <Login /> : <EditProfile />}
            </Route>
            <Route path={`/garages/:id`} exact>
              {!isLogged ? <Login /> : <GarageProfile />}
            </Route>
            <Route path={`/garages/:id/edit`} exact>
              {!isLogged ? <Login /> : <GarageEditProfile />}
            </Route>
            <Route path={`/garage/new`} exact>
              {!isLogged ? <Login /> : <NewGarage />}
            </Route>
            <Route path={`/garages/:id/service/new`} exact>
              {!isLogged ? <Login /> : <NewService />}
            </Route>

            <Route path='/admin' exact>
              <Admin></Admin>
            </Route>

            <Route path='/admin/dashboard' exact>
              <Dashboard></Dashboard>
            </Route>

            <Route path='/admin/users' exact>
              <UserTable></UserTable>
            </Route>

            <Route path='/admin/garages' exact>
              <GarageTable></GarageTable>
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
