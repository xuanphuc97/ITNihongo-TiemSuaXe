import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./EditProfile.scss";
import Cookies from "js-cookie";
import { fetchUser, dispatchGetUser } from "../../redux/actions/authAction";
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

const EditProfile = () => {
  const initialState = {
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
    try {
      var infoForm = new FormData();
      infoForm.append("fullname", newInfor.fullName);
      infoForm.append("email", newInfor.email);
      const res = await axios.put(profileApis.updateInfor, infoForm);
      console.log(res);
      if (res) {
        setNewInfor({ ...newInfor, success: "Update successful", err: "" });
        const token = Cookies.get("token");
        fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      }
    } catch (error) {
      console.log(error);
      setNewInfor({
        ...newInfor,
        err: error.response.data.message,
        success: "",
      });
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const { oldPassword, password, matchedPassword } = data;
    console.log(data);

    if (isEmpty(oldPassword) || isEmpty(password) || isEmpty(matchedPassword)) {
      return setData({
        ...data,
        err: "Please enter the full information",
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
        err: "Password must be more than 6 characters",
        success: "",
      });
    }

    if (!isMatch(matchedPassword, password)) {
      return setData({
        ...data,
        err: "Passwords are not the same",
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
        setData({ ...data, err: "", success: "Change password successful" });
      }
    } catch (error) {
      if (error.response.status) {
        setData({ ...data, err: error.response.data.message, success: "" });
      } else {
        setData({ ...data, err: "Have an error. Try again", success: "" });
      }
    }
  };

  return (
    <div className="profile-edit main-flex">
      <div className="profile-changeinfo">
        <h4 className="title">Your profile</h4>
        <br />

        {newInfor.err && showErrMsg(newInfor.err)}
        {newInfor.success && showSuccessMsg(newInfor.success)}
        <form onSubmit={handleSubmitInfo}>
          <div className="edit-field flex-row">
            <span className="label">Username:</span>
            <input type="text" value={userInfor.username} disabled />
            <div></div>
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
        <h4 className="title">Change password</h4>
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
        <div></div>
      </div>
      <div className="btn-container">
        <Link to={`/profile/${userInfor.username}`}>
          <button className="profile__cancelbtn">Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default EditProfile;
