import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Login from "./users/auth/Login";
import Register from "./users/auth/Register";
import Layout from "./layouts/UserLayout";
import {useDispatch, useSelector} from "react-redux";
import CookiesService from "./services/CookiesService";
import {dispatchGetUser, dispatchLogin, fetchUser} from "./redux/actions/authAction";
import {useEffect} from "react";

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const { user } = auth
  const cookiesService = CookiesService.getService()

  useEffect(() => {
    const token = cookiesService.getToken()
    if (token) {
      dispatch(dispatchLogin())
      fetchUser(token).then(res => {
        dispatch(dispatchGetUser(res))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLogged, dispatch])

  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
