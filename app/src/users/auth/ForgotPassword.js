import React from "react";
import { useState } from "react";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";
import { isEmail, isEmpty } from "../../utils/validation/Validation";
import authApis from "./enum/authentication-apis";

function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
    err: "",
    success: "",
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty(email)) {
      return setData({
        ...data,
        err: "Please enter the full information",
        success: "",
      });
    }

    if (!isEmail(email)) {
      return setData({
        ...data,
        err: "Invalid email",
        success: "",
      });
    }

    var json = {
      email: email,
    };
    try {
      const res = await axios.post(authApis.forgot_password, json);
      if (res) {
        setData({ ...data, success: "Please check your email", err: "" });
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setData({ ...data, err: err.response.data.message, success: "" });
      } else {
        setData({ ...data, err: "Error. Try again", success: "" });
      }
    }
  };

  const { email, err, success } = data;

  return (
    <main className="main__auth">
      <div className="register">
        <h3>Forgot Password</h3>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Input your email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />

          <button type="submit">Gửi</button>
        </form>
      </div>
    </main>
  );
}

export default ForgotPassword;
