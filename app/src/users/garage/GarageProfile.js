import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { ListGroup, Button, Form, Nav } from "react-bootstrap";
import "./GarageProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import garageApis from "./enum/garage-apis";
import Loader from "react-loader-spinner";
import ListComment from "../comment/ListComment";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
function GarageProfile() {
  console.log(2)
  const location = useLocation();
  const id = useParams();
  const history = useHistory();
  // const auth = useSelector((state) => state.auth);
  // const userInfo = auth.user;
  // const [services, setService] = useState([1, 2]);
  const [loading, setLoading] = useState(false);

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
  const [services, setService] = useState([]);

  const getGarage = async () => {
    try {
      console.log(id);
      const res = await axios.get(garageApis.getGarageInfo(id.id));
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
      if (res) {
        setLoading(true);
      }

    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };
  const getService = async () => {
    try {
      const res = await axios.get(garageApis.getService(id.id));
      setService([...services, ...res.data]);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {

    getGarage();
    getService();

  }, [id]);


  return (
    <>
      <Tabs defaultActiveKey="profile" id="" className="nav" variant="pills">

        <Tab eventKey="profile" title="Profile">
          {/* <Nav.Item className="nav">
          <Nav.Link href={`/garages/${garage.garageId}`} >Profile</Nav.Link> */}
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
                      <div className="flex-row" key={`service-${idx}`} >
                        <span className="label service-name">
                          {idx + 1}. {service.serviceName}
                        </span>
                        <p className="cost">{service.servicePrice}</p>
                      </div>
                    );
                  })}
                </div>
                <Link to={`/garages/${garage.garageId}/service/new`}>
                  + Add new
                </Link>
              </div>
            </div>
          )}

        </Tab>
        <Tab eventKey="comments" title="Comments">
          <ListComment></ListComment>

        </Tab>

      </Tabs>
    </>
  );
}

export default GarageProfile;
