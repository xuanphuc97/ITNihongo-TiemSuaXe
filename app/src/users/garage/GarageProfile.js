import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./GarageProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import garageApis from "./enum/garage-apis";
import Loader from "react-loader-spinner";
function GarageProfile() {
  const location = useLocation();
  const id = useParams();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  // const [services, setService] = useState([1, 2]);
  const [loading, setLoading] = useState(false);
  const userInfo = auth.user;
  const initialState = {
    garageId: 0,
    image: "",
    name: "",
    address: "",
    location: "",
    phoneNumber: "",
    openAt: "",
    closeAt: "",
  };
  const initialStateServices = {
    servicesName: "",
    price: "",
  };
  const [garage, setGarage] = useState(initialState);
  const [services, setService] = useState(initialStateServices);
  useEffect(() => {
    const getGarage = async () => {
      try {
        const res = await axios.get(garageApis.getGarageInfo(id.id));
        console.log(res.data);
        var resInfo = res.data;
        setGarage({
          ...garage,
          garageId: resInfo.garageId,
          name: resInfo.garageName,
          address: resInfo.address,
          location: resInfo.location,
          phoneNumber: resInfo.phoneNumber,
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
  useEffect(() => {
    const getService = async () => {
      try {
        const res = await axios.get(garageApis.getService(id.id));
        console.log(res.data);
        var resInfo = res.data;
        setService({
          ...services,
          servicesName: resInfo.servicesName,
          price: resInfo.price,
        });
        setLoading(true);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    };
    getService();
  }, [id]);

  return (
    <>
      {!loading ? (
        <div className="loader">
          <Loader type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="garage main-flex">
          <div className="garage-profile ">
            <div className="flex-row">
              <h3 className="title">Garage Profile</h3>

              <div className="avatar-preview">
                <img
                  src={
                    "https://i.pinimg.com/originals/9b/3c/74/9b3c749500e3392efe84df990ed862e6.png"
                  }
                  className="profile_img"
                  style={{ style: "background-image" }}
                  alt="error"
                />
              </div>
            </div>
            <div className="flex-row"></div>
            <div className="flex-row">
              <span className="label">Name:</span>
              <span className="content">{garage.name}</span>
            </div>
            <div className="flex-row">
              <span className="label">Address:</span>
              <span className="content">{garage.address}</span>
            </div>
            <div className="flex-row">
              <span className="label">Location:</span>
              <span className="content">{garage.location}</span>
            </div>
            <div className="flex-row">
              <span className="label">Phone:</span>
              <span className="content">{garage.phoneNumber}</span>
            </div>
            <div className="flex-row">
              <span className="label">Open At:</span>
              <span className="content">{garage.openAt}</span>
            </div>
            <div className="flex-row">
              <span className="label">Close At:</span>
              <span className="content">{garage.closeAt}</span>
            </div>
            <div className="btn-container">
              <Link to={`/garages/${garage.garageId}/edit`}>
                <button className="profile__editbtn">Edit</button>
              </Link>
            </div>
          </div>
          <div className="garage-service">
            <h3 className="title">Services</h3>
            <div className="service-list">
              {services.map((service, idx) => {
                return (
                  <div className="flex-row">
                    <span className="label service-name">
                      {idx + 1}. {service.servicesName}
                    </span>
                    <p className="cost">{service.price}</p>
                  </div>
                );
              })}
            </div>
            <br />

            <Link to={`/user/garage/service/`}>+ Add new</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default GarageProfile;
