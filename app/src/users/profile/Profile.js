import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.scss";
function Profile(props) {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    err: "",
    success: "",
  });
  const auth = useSelector((state) => state.auth);
  const userInfo = auth.user;
  const { username, fullname, email, err, success } = user;
  const [garages, setGarages] = useState([]);
  return (
    <div>
      <div className="profile main-flex">
        <div className="profile-user">
          <h4 className="profile__title">Your profile</h4>
          <div className="user-info">
            <div className="flex-row">
              <span className="label">Full name:</span>
              <span ClassName="content">{userInfo.fullName}</span>
            </div>
            <div className="flex-row">
              <span className="label">Username:</span>
              <span ClassName="content">{userInfo.username}</span>
            </div>
            <div className="flex-row">
              <span className="label">Email:</span>
              <span ClassName="content">{userInfo.email}</span>
            </div>
          </div>
          <div className="btn-container">
            <Link to={`/user/${userInfo.username}/edit`}>
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
                <Link to={`/user/garage/${garage.id}`}>
                  <p>{garage.name}</p>
                </Link>
              </div>
            );
          })}
          <br />

          <Link to={`/user/garage/edit`}>+ Add new</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
