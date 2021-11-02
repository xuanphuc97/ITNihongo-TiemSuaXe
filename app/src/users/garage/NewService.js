import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./GarageEditProfile.scss";
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
import garageApis from "./enum/garage-apis";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
const NewService = () => {
  const initialState = {
    name: "",
    price: "",
    err: "",
    success: "",
  };
  const auth = useSelector((state) => state.auth);
  const userInfo = auth.user;
  const id = useParams();
  const [newInforService, setNewInforService] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNewInforService({
      ...newInforService,
      [name]: value,
      err: "",
      success: "",
    });
  };
  const handleSubmitGarageInfo = async (e) => {
    e.preventDefault();
    if (isEmpty(newInforService.name) || isEmpty(newInforService.price)) {
      return setNewInforService({
        ...newInforService,
        err: "Please enter the full information",
        success: "",
      });
    }
    try {
      var CreateForm = new FormData();
      CreateForm.append("serviceName", newInforService.name);
      CreateForm.append("price", newInforService.price);
      const res = await axios.post(garageApis.createService(id.id), CreateForm);
      console.log(res);
      if (res) {
        setNewInforService({
          ...initialState,
          success: "Create service successful",
          err: "",
        });
      }
    } catch (error) {
      console.log(error);
      setNewInforService({
        ...newInforService,
        err: error.response.data.message,
        success: "",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitGarageInfo}>
        <div className="garage-profile-edit main-flex">
          <div className="garage-profile-changeinfo">
            {newInforService.err && showErrMsg(newInforService.err)}
            {newInforService.success && showSuccessMsg(newInforService.success)}
            <div className="flex-row">
              <div className="edit-field flex-row">
                <span className="label">Name: </span>
                <input
                  type="text"
                  name="name"
                  value={newInforService.name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="edit-field flex-row">
                <span className="label">Price: </span>
                <input
                  type="number"
                  name="price"
                  value={newInforService.price}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="allbtn-container">
                <div className="cancel-col"></div>
                <div className="cancel-col">
                  <button className="profile__savebtn" type="submit">
                    Save
                  </button>
                  <Link to={`/garages/${id.id}`}>
                    <button className="profile__cancelbtn">Cancel</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewService;
