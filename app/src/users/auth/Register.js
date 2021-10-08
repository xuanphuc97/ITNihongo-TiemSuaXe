import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

function Register() {
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    matchedPassword: "",
    err: "",
    success: "",
  });

  const { username, fullname, email, password, matchedPassword, err, success } =
    user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(matchedPassword) ||
      isEmpty(username) ||
      isEmpty(fullname)
    ) {
      return setUser({
        ...user,
        err: "Hãy điền đầy đủ thông tin",
        success: "",
      });
    }

    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Email không đúng định dạng",
        success: "",
      });
    }

    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Mật khẩu phải lớn hơn 6 ký tự",
        success: "",
      });
    }

    if (!isMatch(matchedPassword, password)) {
      return setUser({
        ...user,
        err: "Mật khẩu không giống nhau",
        success: "",
      });
    }
    try {
      var registerForm = new FormData();
      registerForm.append("username", username);
      registerForm.append("username", fullname);
      registerForm.append("email", email);
      registerForm.append("password", password);
      registerForm.append("matchedPassword", matchedPassword);

      const res = await axios.post("/registration", registerForm);
      if (res.status === 202) {
        setUser({
          ...user,
          err: "",
          success: "Đăng ký thành công",
        });
      }
    } catch (err) {
      if (err.response.status === 409) {
        setUser({ ...user, err: "Email đã tồn tại", success: "" });
      } else if (err.response.status === 400) {
        setUser({ ...user, err: "Thông tin không hợp lệ", success: "" });
      } else {
        setUser({ ...user, err: "Đã có lỗi xảy ra", success: "" });
      }
    }
  };

  return (
    <main className="main__auth">
      <div className="register">
        <h3>Register</h3>
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
            type="text"
            placeholder="Fullname"
            name="fullname"
            value={fullname}
            onChange={handleChangeInput}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="matchedPassword"
            value={matchedPassword}
            onChange={handleChangeInput}
          />

          <button type="submit">REGISTER</button>
        </form>
      </div>
    </main>
  );
}

export default Register;
