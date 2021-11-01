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
const GarageEditProfile = () => {
  const initialState = {
    garageId: 0,
    name: "",
    address: "",
    location: "",
    phone: "",
    openAt: "",
    closeAt: "",
    err: "",
    success: "",
  };
  const [newInforGarage, setNewInforGarage] = useState(initialState);
  //   const [garage, setGarage] = useState(initialState);
  const id = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  // const [service, setService] = useState(initialState);
  useEffect(() => {
    const getGarage = async () => {
      try {
        const res = await axios.get(garageApis.getGarageInfo(id.id));
        var resInfo = res.data;
        setNewInforGarage({
          ...newInforGarage,
          garageId: resInfo.garageId,
          name: resInfo.garageName,
          address: resInfo.address,
          location: resInfo.location,
          phone: resInfo.phoneNumber,
          openAt: resInfo.startAt,
          closeAt: resInfo.endAt,
        });
        setLoading(true);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    };
    getGarage();
  }, [id]);
  const [avatar, setAvatar] = useState();

  const handleSubmitGarageInfo = (e) => {};
  const handleChangeInput = (e) => {};
  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  return (
    <>
      {!loading ? (
        <div className="loader">
          <Loader type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <form onSubmit={handleSubmitGarageInfo}>
          <div className="garage-profile-edit main-flex">
            <div className="garage-profile-changeinfo">
              <div className="flex-row">
                <h3 className="title">Garage Profile</h3>

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
            <div className="service-edit">
              <h4 className="title">Services</h4>
              <div className="edit-field flex-row">
                <input
                  className="service-name"
                  type="text"
                  placeholder="Service name"
                  value={""}
                  onChange={handleChangeInput}
                />
                <input
                  className="cost"
                  type="text"
                  placeholder="Cost"
                  value={""}
                  onChange={handleChangeInput}
                />
                <button className="delete-service">x</button>
              </div>
              <div className="edit-field flex-row">
                <input
                  className="service-name"
                  type="text"
                  placeholder="Service name"
                  value={""}
                  onChange={handleChangeInput}
                />
                <input
                  className="cost"
                  type="text"
                  placeholder="Cost"
                  value={""}
                  onChange={handleChangeInput}
                />
                <button className="delete-service">x</button>
              </div>
              <div className="edit-field flex-row">
                <input
                  className="service-name"
                  type="text"
                  placeholder="Service name"
                  value={""}
                  onChange={handleChangeInput}
                />
                <input
                  className="cost"
                  type="text"
                  placeholder="Cost"
                  value={""}
                  onChange={handleChangeInput}
                />
                <button className="delete-service">x</button>
              </div>
              <div className="edit-field flex-row">
                <input
                  className="service-name"
                  type="text"
                  placeholder="Service name"
                  value={""}
                  onChange={handleChangeInput}
                />
                <input
                  className="cost"
                  type="text"
                  placeholder="Cost"
                  value={""}
                  onChange={handleChangeInput}
                />
                <button className="delete-service">x</button>
              </div>
              <div className="edit-field flex-row">
                <input
                  className="service-name"
                  type="text"
                  placeholder="Service name"
                  value={""}
                  onChange={handleChangeInput}
                />
                <input
                  className="cost"
                  type="text"
                  placeholder="Cost"
                  value={""}
                  onChange={handleChangeInput}
                />
                <button className="delete-service">x</button>
              </div>
              <div className="edit-field flex-row">
                <input
                  className="service-name"
                  type="text"
                  placeholder="Service name"
                  value={""}
                  onChange={handleChangeInput}
                />
                <input
                  className="cost"
                  type="text"
                  placeholder="Cost"
                  value={""}
                  onChange={handleChangeInput}
                />
                <button className="delete-service">x</button>
              </div>
            </div>
            <div className="allbtn-container">
              <div className="cancel-col"></div>
              <div className="cancel-col">
                <Link to={`/profile/`}>
                  <button className="profile__savebtn">Save</button>
                </Link>
                <Link to={`/profile/`}>
                  <button className="profile__cancelbtn">Cancel</button>
                </Link>

                <Link to={`/profile/`}>
                  <button className="profile__deletebtn">Delete</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default GarageEditProfile;
