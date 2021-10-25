import React, { useEffect, useState } from "react";
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
import profileApis from "../profile/enum/profile-apis";

import authApis from "../auth/enum/authentication-apis";
const EditProfile = () => {
  const initialState = {
    username: "",
    fullName: "",
    email: "",
    err: "",
    success: "",
  };
  const [data, setData] = useState({
    oldPassword: "",
    password: "",
    matchedPassword: "",
    err: "",
    success: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userInfor = auth.user;
  const [newInfor, setNewInfor] = useState(initialState);
  useEffect(() => {
    setNewInfor({
      ...newInfor,
      fullName: userInfor.fullName,
      email: userInfor.email,
    });
  }, [userInfor]);
  useEffect(() => {
    setNewInfor({
      ...newInfor,
      fullName: userInfor.fullName,
      email: userInfor.email,
    });
  }, [userInfor]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNewInfor({ ...newInfor, [name]: value, err: "", success: "" });
  };
  const handleChangeInputPassword = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, success: "", err: "" });
  };

  // const { username, fullname, email, password, matchedPassword, err, success } =
  //   user;
  // const auth = useSelector((state) => state.auth);
  // const userInfo = auth.user;
  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value, err: "", success: "" });
  // };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();

    if (isEmpty(newInfor.email) || isEmpty(newInfor.fullName)) {
      return setNewInfor({
        ...newInfor,
        err: "Please enter the full information",
        success: "",
      });
    }

    if (!isEmail(newInfor.email)) {
      return setNewInfor({
        ...newInfor,
        err: "Invalid email",
        success: "",
      });
    }

    // if (isLength(password)) {
    //   return setUser({
    //     ...user,
    //     err: "Password must be more than 6 characters",
    //     success: "",
    //   });
    // }

    // if (!isMatch(matchedPassword, password)) {
    //   return setUser({
    //     ...user,
    //     err: "Passwords are not the same",
    //     success: "",
    //   });
    // }
    try {
      var json = {
        // username: username,
        // email: email,
        // fullName: fullname,
      };
      console.log(json);

      const res = await axios.post(authApis.updateUser, json);
      if (res.status === 200) {
        setNewInfor({
          ...newInfor,
          err: "",
          success: "Sign up success. Please confirm your email",
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        setNewInfor({
          ...newInfor,
          err: err.response.data.message,
          success: "",
        });
      } else {
        setNewInfor({ ...newInfor, err: "An error has occurred", success: "" });
      }
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const { oldPassword, password, matchedPassword } = data;
    console.log(data);

    if (isEmpty(oldPassword) || isEmpty(password) || isEmpty(matchedPassword)) {
      return setData({
        ...data,
        err: "Hãy điền đầy đủ thông tin",
        success: "",
      });
    }
    if (
      isLength(oldPassword) ||
      isLength(password) ||
      isLength(matchedPassword)
    ) {
      return setData({
        ...data,
        err: "Mật khẩu không đủ 6 ký tự",
        success: "",
      });
    }

    if (!isMatch(matchedPassword, password)) {
      return setData({
        ...data,
        err: "Mật khẩu mới không giống nhau",
        success: "",
      });
    }

    try {
      var passForm = new FormData();
      passForm.append("oldPassword", oldPassword);
      passForm.append("password", password);
      passForm.append("matchedPassword", matchedPassword);

      const res = await axios.put(profileApis.updatePassword, passForm);

      if (res) {
        setData({ ...data, err: "", success: "Đổi mật khẩu thành công" });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setData({ ...data, err: error.response.data.message, success: "" });
      } else {
        setData({ ...data, err: "Đã có lỗi xảy ra", success: "" });
      }
    }
  };

  return (
    <div className="profile-edit main-flex">
      <div className="profile-changeinfo">
        <h4 className="profile-edit__title">Your profile</h4>
        {newInfor.err && showErrMsg(newInfor.err)}
        {newInfor.success && showSuccessMsg(newInfor.success)}
        <form onSubmit={handleSubmitInfo}>
          <div className="edit-field flex-row">
            <span className="label">Username:</span> {userInfor.username}
          </div>
          <div className="edit-field flex-row">
            <span className="label">Full Name: </span>
            <input
              type="text"
              name="fullName"
              value={newInfor.fullName}
              onChange={handleChangeInput}
            />
          </div>
          <div className="edit-field flex-row">
            <span className="label">Email: </span>
            <input
              type="email"
              name="email"
              value={newInfor.email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="btn-container">
            <button className="profile__editbtn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-changepwd">
        <h4 className="profile-edit__title">Change password</h4>
        <br />

        <form onSubmit={handleSubmitPassword}>
          {data.err && showErrMsg(data.err)}
          {data.success && showSuccessMsg(data.success)}
          <div className="edit-field flex-row">
            <span className="label">Old password: </span>
            <input
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              onChange={handleChangeInputPassword}
            />
          </div>
          <div className="edit-field flex-row">
            <span className="label">New password: </span>
            <input
              type="password"
              placeholder="New Password"
              name="password"
              onChange={handleChangeInputPassword}
            />
          </div>
          <div className="edit-field flex-row">
            <span className="label">Comfirm password: </span>
            <input
              type="password"
              placeholder="Confirm Password"
              name="matchedPassword"
              onChange={handleChangeInputPassword}
            />
          </div>
          <div className="btn-container">
            <button className="profile__editbtn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
