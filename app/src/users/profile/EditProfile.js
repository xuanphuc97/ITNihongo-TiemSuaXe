import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./EditProfile.scss";
import { useSelector, useDispatch } from "react-redux";
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
import authApis from "../auth/enum/authentication-apis";
function Profile(props) {
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
  const auth = useSelector((state) => state.auth);
  const userInfo = auth.user;
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
    <div className="profile-edit main-flex">
      <div className="profile-changeinfo">
        <h4 className="profile-edit__title">Your profile</h4>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit}>
          <div>
            <span className="label">Username:</span> {userInfo.username}
          </div>
          <div className="edit-field flex-row">
            <span className="label">Name: </span>
            <input
              type="text"
              placeholder={userInfo.fullName}
              name="fullname"
              value={fullname}
              onChange={handleChangeInput}
            />
          </div>
          <div className="edit-field flex-row">
            <span className="label">Email: </span>
            <input
              type="email"
              placeholder={userInfo.email}
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="btn-container">
            <button className="profile__editbtn" type="submit">Save</button>
          </div>

        </form>
      </div>
      <div className="profile-changepwd">
        <h4 className="profile-edit__title">Change password</h4>
        <br />

        <form onSubmit={handleSubmit}>
          <div className="edit-field flex-row">
            <span className="label">Old password: </span>
            <input
              type="password"
              placeholder="Old Password"
              name="old_password"
              // value={password}
              onChange={handleChangeInput}
            />
          </div>
          <div className="edit-field flex-row">
            <span className="label">New password: </span>
            <input
              type="password"
              placeholder="New Password"
              name="new_password"
              value={password}
              onChange={handleChangeInput}
            />
          </div>
          <div className="edit-field flex-row">
            <span className="label">Comfirm password: </span>
            <input
              type="password"
              placeholder="Confirm Password"
              name="matchedPassword"
              value={matchedPassword}
              onChange={handleChangeInput}
            />
          </div>
          <div className="btn-container">
            <button className="profile__editbtn" type="submit">Save</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Profile;
