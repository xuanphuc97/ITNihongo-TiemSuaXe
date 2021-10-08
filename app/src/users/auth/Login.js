import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isEmpty, isLength } from "../../utils/validation/Validation";
import CookiesService from "../../services/CookiesService";
import authApis from './enum/authentication-apis'

const initialState = {
  username: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const location = useLocation()
  const search = location.search;
  const params = new URLSearchParams(search);
  const redirectTo = params.get('redirectTo');

  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, password, err, success } = user;
  const cookiesService = CookiesService.getService();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    console.log("Call submit function");
    e.preventDefault();
    if (isEmpty(username) || isEmpty(password)) {
      return setUser({
        ...user,
        err: "Hãy điền đầy đủ thông tin",
        success: "",
      });
    }

    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Mật khẩu không đủ 6 ký tự",
        success: "",
      });
    }

    var loginForm = new FormData();
    loginForm.append("username", username);
    loginForm.append("password", password);

    try {
      const res = await axios.post(authApis.login, loginForm);
      if (res) {
        setUser({ ...user, err: "", success: res.data.msg });

        //Da Dang Nhap
        dispatch(dispatchLogin());
        cookiesService.setToken(res.data.token);
        if(redirectTo) {
          history.push(redirectTo)
        }
        else {
          history.push("/")
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        setUser({ ...user, err: "Sai username hoặc password", success: "" });
      } else if (err.response.status === 400) {
        setUser({
          ...user,
          err: "Username hoặc password không hợp lệ",
          success: "",
        });
      } else {
        setUser({ ...user, err: "Đã có lỗi xảy ra", success: "" });
      }
    }
  };

  return (
    <main className="main__auth">
      <div className="register">
        <h3>LOGIN</h3>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <button type="submit">LOGIN</button>
        </form>
        <Link to="/register">
          <p className="register__link">Sign up</p>
        </Link>
        <Link to="/forgot_password">
          <p className="forgotpass__link">Forgot password?</p>
        </Link>
      </div>
    </main>
  );
}

export default Login;
