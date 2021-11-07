import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  Redirect,
} from "react-router-dom";
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
import {
  errorNotification,
  successNotification,
} from "../../utils/notification/ToastNotification";
import profileApis from "../profile/enum/profile-apis";
import garageApis from "./enum/garage-apis";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";

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
  const auth = useSelector((state) => state.auth);

  const userInfo = auth.user;
  //   const [garage, setGarage] = useState(initialState);
  const id = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [services, setService] = useState([]);
  const [isDel, setIsDel] = useState(false);
  const [delId, setDelId] = useState(null);

  useEffect(() => {
    const getGarage = async () => {
      console.log("x");
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
    const getService = async () => {
      console.log("y");
      try {
        const res = await axios.get(garageApis.getService(id.id));
        var resInfo = res.data;
        setService([...services, ...res.data]);
        setLoading(true);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    };
    getGarage();
    getService();
  }, []);
  const [avatar, setAvatar] = useState();
  const handleClickDel = (value) => {
    setIsDel(value);
  };
  const handleDelGarage = async () => {
    try {
      const res = await axios.put(
        garageApis.deleteGarage(newInforGarage.garageId)
      );
      if (res) {
        alert("Delete success ✔");
        // <ToastContainer
        //   position="bottom-left"
        //   autoClose={5000}
        //   hideProgressBar={false}
        //   newestOnTop={false}
        //   closeOnClick
        //   rtl={false}
        //   pauseOnFocusLoss
        //   draggable
        //   pauseOnHover
        // />;
        history.push("/");
      }
    } catch (error) {
      alert("Have an error 😢");
    }
  };
  //   const handleDelService = (id) => {
  //     setDelId(id)
  // }

  const handleDelService = async (id) => {
    if (id !== null) {
      try {
        const res = await axios.delete(garageApis.deleteService(id));
        if (res) {
          var newArr = services.filter((cate) => cate.id !== id);
          setService(newArr);
          alert("Delete success ✔");
        }
      } catch (error) {
        alert("Have an error 😢");
      }
    }
  };

  const showDelAlert = () => {
    return (
      <div className="garage-profile-edit delete">
        <h5>Warning</h5>
        <p>Delete Garage</p>
        <div>
          <button onClick={() => handleClickDel(false)}>Cancel</button>
          <button className="button button-red" onClick={handleDelGarage}>
            Delete
          </button>
        </div>
      </div>
    );
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
      const res = await axios.put(garageApis.updateGarage(id.id), CreateForm);
      console.log(res);
      if (res) {
        setNewInforGarage({
          ...newInforGarage,
          success: "Update successful",
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
  };
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const [address, setAddress] = useState(newInforGarage.address);
  const [location, setLocation] = useState(newInforGarage.location);

  return (
    <>
      {!loading ? (
        <div className="loader">
          <Loader type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          {isDel ? showDelAlert() : null}

          <form onSubmit={handleSubmitGarageInfo}>
            <div className="garage-profile-edit main-flex">
              <div className="garage-profile-changeinfo">
                {newInforGarage.err && showErrMsg(newInforGarage.err)}
                {newInforGarage.success &&
                  showSuccessMsg(newInforGarage.success)}
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
                {/* <div className="edit-field flex-row">
                  <span className="label">Address: </span>
                  <input
                    type="text"
                    name="address"
                    value={newInforGarage.address}
                    onChange={handleChangeInput}
                  />
                </div> */}
                <div className="edit-field flex-row">
                  <span className="label">Address: </span>
                  <div className="address-input">
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyCh84-bMIz1xJIbDPQDrFJ2zECSMs3L168"
                      apiOptions={{ language: "vi", region: "vi" }}
                      selectProps={{
                        isClearable: true,
                        value: address,
                        onChange: (val) => {
                          try {
                            console.log(val);
                            geocodeByPlaceId(val.value.place_id)
                              .then((results) => getLatLng(results[0]))
                              .then(({ lat, lng }) => {
                                setNewInforGarage({
                                  ...newInforGarage,
                                  location:
                                    val === null
                                      ? newInforGarage.address
                                      : `${lat} ${lng}`,
                                  address:
                                    val === null
                                      ? newInforGarage.address
                                      : val.label,
                                  err: "",
                                  success: "",
                                });
                                setLocation(
                                  val === null
                                    ? newInforGarage.address
                                    : `${lat} ${lng}`
                                );
                                setAddress(val);
                              })
                              .catch((error) => console.error(error));
                          } catch (e) {}
                        },
                      }}
                    />
                  </div>
                </div>{" "}
                <div className="edit-field flex-row">
                  <span className="label">Location: </span>
                  <input
                    disabled
                    type="text"
                    name="location"
                    value={location}
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
                {services.map((service, idx) => {
                  return (
                    <div className="flex-row">
                      <input
                        className="service-name"
                        type="text"
                        placeholder="Service name"
                        value={service.serviceName}
                        onChange={handleChangeInput}
                      />
                      <input
                        className="cost"
                        type="text"
                        placeholder="Cost"
                        value={service.servicePrice}
                        onChange={handleChangeInput}
                      />
                      <button
                        className="delete-service"
                        type="button"
                        onClick={() => handleDelService(service.id)}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
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
                <button
                  className="profile__deletebtn"
                  type="button"
                  onClick={() => handleClickDel(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default GarageEditProfile;
