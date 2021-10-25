import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dispatchLogout } from "../../redux/actions/authAction";
import CookiesService from "../../services/CookiesService";
import logo from "./logo.png"

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const cookiesService = CookiesService.getService();
  const userInfo = auth.user;
  if (typeof userInfo !== "undefined") {
    console.log(userInfo);
  }

  // console.log(userInfo.username);
  // const [keyword, setKeyword] = useState('')
  const { isAdmin } = auth;

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
            <Link className="logo-container" to="/">
              <img className="logo" src={logo} alt="logo" />
              <span>Home</span>
            </Link>
          </div>
          {auth.isLogged ? (
            <Link to={`/profile/${userInfo.username}`}>
              <div>Profile</div>
            </Link>
          ) : (
            ""
          )}
          {auth.isLogged ? (
            <div className="menu__right--dropdown" id="dropDown">
              {isAdmin ? (
                <Link to="/admin/dashboard">
                  <i className="fal fa-users-cog"></i>
                  <p>Trang admin</p>
                </Link>
              ) : null}
              <Link to={`/profile/${userInfo.username}`}>
                <i className="far fa-user"></i>
                <p>Trang cá nhân</p>
              </Link>
              <Link to="/myprofile/edit">
                <i className="far fa-user-edit"></i>
                <p className="p-edit">Chỉnh sửa</p>
              </Link>
            </div>
          ) : (
            ""
          )}
          {auth.isLogged ? (
            <Link to="/" onClick={handleLogout}>
              <div className="menu__right menu__right__login div">Logout</div>
            </Link>
          ) : (
            <div className="menu__right menu__right__login">
              <Link to="/login">
                <div>Login</div>
              </Link>

              <Link to="/register">
                <div>Sign up</div>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
