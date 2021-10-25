import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.scss";
import profileApis from "../profile/enum/profile-apis";

function Profile() {
  const auth = useSelector((state) => state.auth);
  const userInfor = auth.user;
  const history = useHistory();
  const [garages, setGarages] = useState([]);
  const [currentGarages, setCurrentPagePosts] = useState(0);
  const [isEmptyPosts, setIsEmptyPosts] = useState(false);
  console.log(currentGarages);
  useEffect(() => {
    const getGarages = async () => {
      console.log("1");
      const res = await axios.get(
        profileApis.getGaragesOfUser(userInfor.accountId)
      );
      console.log("1");
      if (res) {
        console.log(res.data);
        setGarages([...garages, ...res.data]);
        if (res.data.length === 0 || res.data.length < 10) {
          setIsEmptyPosts(true);
        }
      }
      if (userInfor.accountId) {
        getGarages();
      }
    };
  }, [userInfor.accountId, currentGarages]);
  return (
    <div>
      <div className="profile main-flex">
        <div className="profile-user">
          <h4 className="profile__title">Your profile</h4>
          <div className="user-info">
            <div className="flex-row">
              <span className="label">Full name:</span>
              <span ClassName="content">{userInfor.fullName}</span>
            </div>
            <div className="flex-row">
              <span className="label">Username:</span>
              <span ClassName="content">{userInfor.username}</span>
            </div>
            <div className="flex-row">
              <span className="label">Email:</span>
              <span ClassName="content">{userInfor.email}</span>
            </div>
          </div>
          <div className="btn-container">
            <Link to={`/user/${userInfor.username}/edit`}>
              <Button className="profile__editbtn">Edit</Button>
            </Link>
          </div>
        </div>

        <div className="profile-garage">
          <h4 className="profile__title">Your garage</h4>
          {garages.map((garage, idx) => {
            return (
              <div className="garage-list flex-row">
                <span>Garage {idx + 1}:</span>
                <Link to={`/garage/${garage.garageId}`}>
                  <p>{garage.garageName}</p>
                </Link>
              </div>
            );
          })}
          <br />

          <Link to={`/garage/new`}>+ Add new</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
