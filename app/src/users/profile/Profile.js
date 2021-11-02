import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.scss";
import profileApis from "../profile/enum/profile-apis";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

function Profile() {
  const auth = useSelector((state) => state.auth);
  const userInfor = auth.user;
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getGarages = async () => {
      // console.log("---")
      const res = await axios.get(
        profileApis.getGaragesOfUser(userInfor.accountId)
      );
      if (res) {
        setGarages([...garages, ...res.data]);
        setLoading(true);
      }
    };

    // if (userInfor.accountId) {
    getGarages();
    // }
  }, [userInfor]);
  return (
    <div>
      {!loading ? (
        <div className="loader">
          <Loader type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="profile main-flex">
          <div className="profile-user">
            <h4 className="title">Your profile</h4>
            <div className="user-info">
              <div className="flex-row">
                <span className="label">Full name:</span>
                <span className="content">{userInfor.fullName}</span>
              </div>
              <div className="flex-row">
                <span className="label">Username:</span>
                <span className="content">{userInfor.username}</span>
              </div>
              <div className="flex-row">
                <span className="label">Email:</span>
                <span className="content">{userInfor.email}</span>
              </div>
            </div>
            <div className="btn-container">
              <Link to={`/profile/${userInfor.username}/edit`}>
                <Button className="profile__editbtn">Edit</Button>
              </Link>
            </div>
          </div>

          <div className="profile-garage">
            <h4 className="title">Your garage</h4>
            <div className="scrollable">
              {garages.map((garage, idx) => {
                return (
                  <div key={idx + 1} className="garage-list flex-row">
                    <span style={{ paddingRight: "20px" }}>
                      Garage {idx + 1}:
                    </span>
                    <Link to={`/garages/${garage.garageId}`}>
                      <span>{garage.garageName}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
            <br />
            <Link to={`/garage/new`}>+ Add new</Link>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default Profile;
