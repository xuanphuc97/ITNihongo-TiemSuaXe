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
      <div className="profile">
        <div className="profile-user">
          <h4 className="profile__title">Your profile</h4>
          <div className="user-info">
            <div>
              <strong>Full name:</strong> {userInfo.fullName}
            </div>
            <div>
              <strong>Username:</strong> {userInfo.username}
            </div>
            <div>
              <strong>Email:</strong> {userInfo.email}
            </div>
          </div>
          <Link to={`/user/${userInfo.username}/edit`}>
            <Button className="profile__editbtn">Edit</Button>
          </Link>
        </div>

        <div className="profile-garage">
          <h4 className="profile__title">Your garage</h4>
          {garages.map((garage, idx) => {
            return (
              <div className="garage-name">
                <span>Garage {idx + 1}:</span>
                <Link to={`/user/garage/${garage.id}`}>
                  <span>{garage.name}</span>
                </Link>
              </div>
            );
          })}

          <Link to={`/user/garage/edit`}>+ Add new</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
