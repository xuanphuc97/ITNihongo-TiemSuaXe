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
const NewGarage = () => {
  const initialState = {
    name: "",
    address: "",
    location: "",
    phone: "",
    openAt: "",
    closeAt: "",
    err: "",
    success: "",
  };
  const auth = useSelector((state) => state.auth);
  const userInfo = auth.user;
  const [newInforGarage, setNewInforGarage] = useState(initialState);

  const [avatar, setAvatar] = useState();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNewInforGarage({
      ...newInforGarage,
      [name]: value,
      err: "",
      success: "",
    });
  };
  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    console.log(typeof avatar);
  };
  const handleSubmitGarageInfo = async (e) => {
    e.preventDefault();
    if (
      isEmpty(newInforGarage.name) ||
      isEmpty(newInforGarage.address) ||
      isEmpty(newInforGarage.location) ||
      isEmpty(newInforGarage.phone) ||
      isEmpty(newInforGarage.openAt) ||
      isEmpty(newInforGarage.closeAt)
    ) {
      return setNewInforGarage({
        ...newInforGarage,
        err: "Please enter the full information",
        success: "",
      });
    }
    try {
      var CreateForm = new FormData();
      CreateForm.append("garageName", newInforGarage.name);
      CreateForm.append("phoneNumber", newInforGarage.phone);
      CreateForm.append("address", newInforGarage.address);
      CreateForm.append("location", newInforGarage.location);
      CreateForm.append("image", "anh.jpg");
      CreateForm.append("startAt", newInforGarage.openAt);
      CreateForm.append("endAt", newInforGarage.closeAt);
      const res = await axios.post(garageApis.createGarage, CreateForm);
      console.log(res);
      if (res) {
        setNewInforGarage({
          ...initialState,
          success: "Create garage successful",
          err: "",
        });
      }
    } catch (error) {
      console.log(error);
      setNewInforGarage({
        ...newInforGarage,
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
            {newInforGarage.err && showErrMsg(newInforGarage.err)}
            {newInforGarage.success && showSuccessMsg(newInforGarage.success)}
            <div className="flex-row">
              <h3 className="title">Create Garage</h3>
              <div className="upload-img">
                <div className="img-container">
                  <div className="avatar-upload">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          handleUploadFile(e);
                        }}
                      />
                      <label htmlFor="imageUpload">
                        <FaCloudUploadAlt />
                      </label>
                    </div>
                    <div className="avatar-preview">
                      <img
                        src={
                          avatar
                            ? avatar.preview
                            : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                        }
                        className="profile_img"
                        style={{ style: "background-image" }}
                        alt="error"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit-field flex-row">
              <span className="label">Name: </span>
              <input
                type="text"
                name="name"
                value={newInforGarage.name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit-field flex-row">
              <span className="label">Address: </span>
              <input
                type="text"
                name="address"
                value={newInforGarage.address}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit-field flex-row">
              <span className="label">Location: </span>
              <input
                type="text"
                name="location"
                value={newInforGarage.location}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit-field flex-row">
              <span className="label">Phone: </span>
              <input
                type="text"
                name="phone"
                value={newInforGarage.phone}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit-field flex-row">
              <span className="label">Open at: </span>
              <input
                type="time"
                name="openAt"
                value={newInforGarage.openAt}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit-field flex-row">
              <span className="label">Close at: </span>
              <input
                type="time"
                name="closeAt"
                value={newInforGarage.closeAt}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="allbtn-container">
            <div className="cancel-col"></div>
            <div className="cancel-col">
              <button className="profile__savebtn" type="submit">
                Save
              </button>
              <Link to={`/profile/${userInfo.username}`}>
                <button className="profile__cancelbtn">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewGarage;
