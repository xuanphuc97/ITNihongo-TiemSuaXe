import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dispatchLogout } from "../../redux/actions/authAction";
import CookiesService from "../../services/CookiesService";

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const cookiesService = CookiesService.getService();
  // var userInfo = auth.user;
  // console.log(userInfo);
  // console.log(userInfo.username);
  // const [keyword, setKeyword] = useState('')
  // const {isAdmin} = auth

  const handleLogout = () => {
    try {
      cookiesService.clearToken();
      dispatch(dispatchLogout());
      // Disconnect()

      // dispatch(dispatchClearRealtime())

      history.push("/");
    } catch (err) {
      history.push("/");
    }
  };

  return (
    <>
      <header>
        <div className="menu container">
          <div className="menu__left">
            <Link to="/">
              <div>Home</div>
            </Link>
          </div>
          {auth.isLogged ? (
            <Link to="/profile">
              <div>Profile</div>
            </Link>
          ) : (
            ""
          )}
          {auth.isLogged ? (
            <Link to="/" onClick={handleLogout}>
              <div className="menu__right menu__right__login">Logout</div>
            </Link>
          ) : (
            <Link to="/login">
              <div className="menu__right menu__right__login">Login</div>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
