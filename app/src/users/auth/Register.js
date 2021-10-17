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
import authApis from "./enum/authentication-apis";


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
        err: "Please enter the full information",
        success: "",
      });
    }

    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Invalid email",
        success: "",
      });
    }

    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Password must be more than 6 characters",
        success: "",
      });
    }

    if (!isMatch(matchedPassword, password)) {
      return setUser({
        ...user,
        err: "Passwords are not the same",
        success: "",
      });
    }
    try {
      var json = {
        username: username,
        email: email,
        fullName: fullname,
        password: password,
      };
      console.log(json);

      const res = await axios.post(authApis.register, json);
      if (res.status === 200) {
        setUser({
          ...user,
          err: "",
          success: "Sign up success. Please confirm your email",
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        setUser({ ...user, err: err.response.data.message, success: "" });
      } else {
        setUser({ ...user, err: "An error has occurred", success: "" });
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
