import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  Link,
  useHistory,
  useParams,

} from "react-router-dom";
import { Button} from "react-bootstrap";
import "./GarageEditProfile.scss";
import Cookies from "js-cookie";
import { fetchUser, dispatchGetUser } from "../../redux/actions/authAction";
import { useSelector} from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isImgFormat,
  isImgSize,
} from "../../utils/validation/Validation";
import profileApis from "../profile/enum/profile-apis";
import garageApis from "./enum/garage-apis";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
// import * as React from "react";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const GarageEditProfile = () => {
  const initialState = {
    garageId: 0,
    name: "",
    address: "",
    image: "",
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
  const [serviceUpdate, setServiceUpdate] = useState();
  const [isDel, setIsDel] = useState(false);
  const [delId, setDelId] = useState(null);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const getGarage = async () => {
      try {
        const res = await axios.get(garageApis.getGarageInfo(id.id));
        var resInfo = res.data;
        setNewInforGarage({
          ...newInforGarage,
          garageId: resInfo.garageId,
          name: resInfo.garageName,
          image: resInfo.imageLink,
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
        setService([...res.data]);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    };
    getGarage();
    getService();
  }, []);
  const handleClickOpen = (service) => {
    setOpen(true);
    setServiceUpdate(service);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Service</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            name="serviceName"
            label="Name"
            type="text"
            required
            value={serviceUpdate.serviceName}
            onChange={handleChangeUpdate}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="servicePrice"
            label="Cost"
            type="number"
            required
            value={serviceUpdate.servicePrice}
            onChange={handleChangeUpdate}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateService}>Update</Button>
        </DialogActions>
      </Dialog>
    );
  };
  const handleUpdateService = async () => {
    if (
      isEmpty(serviceUpdate.serviceName) ||
      isEmpty(serviceUpdate.servicePrice)
    ) {
      alert("Please enter the full information");
    } else {
      try {
        var formUpdate = new FormData();
        formUpdate.append("serviceName", serviceUpdate.serviceName);
        formUpdate.append("price", serviceUpdate.servicePrice);
        const res = await axios.put(
          garageApis.updateService(serviceUpdate.id),
          formUpdate
        );
        if (res) {
          var index = services.findIndex((x) => x.id === serviceUpdate.id);
          services[index].serviceName = serviceUpdate.serviceName;
          services[index].servicePrice = serviceUpdate.servicePrice;
          // var newArr = services.filter((cate) => cate.id !== serviceUpdate.id);
          // setService(newArr);
          handleClose();
          alert("Update success ✔");
        }
      } catch (error) {
        alert("Have an error 😢");
      }
    }
  };
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
      CreateForm.append("image", avatar ? avatar : newInforGarage.image);
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
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setServiceUpdate({
      ...serviceUpdate,
      [name]: value,
    });
  };
  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }
  const handleUploadFile = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      if (!file) {
        return setNewInforGarage;
      }
      if (!isImgFormat(file))
        return setNewInforGarage({
          ...newInforGarage,
          err: "Error Image Format",
          success: "",
        });

      if (!isImgSize(file))
        return setNewInforGarage({
          ...newInforGarage,
          err: "Please upload image with size < 2MB",
          success: "",
        });
      var createForm = new FormData();
      createForm.append("image", file);
      console.log(file);
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      const res = await axios.post(
        `https://kamehouse.herokuapp.com/api/uploadImg`,
        createForm
      );
      if (res) {
        console.log(res.data);
        setAvatar(res.data);
      }
    } catch (error) {
      if (error.response.status === 413) {
        setNewInforGarage({
          ...newInforGarage,
          err: "Vui lòng đăng ảnh dung lượng nhỏ hơn 2MB",
          success: "",
        });
      }
    }
  };
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
          {open ? dialog() : null}
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
                            src={avatar ? avatar : newInforGarage.image}
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
                    value={newInforGarage.location}
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
                        // onChange={handleChangeInput}
                        disabled
                      />
                      <input
                        className="cost"
                        type="text"
                        placeholder="Cost"
                        value={service.servicePrice}
                        disabled
                        // onChange={handleChangeInput}
                      />
                      <button
                        className="update-service"
                        type="button"
                        onClick={() => handleClickOpen(service)}
                      >
                        Edit
                      </button>
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
