import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./GarageProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaCloudUploadAlt } from 'react-icons/fa'
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
import authApis from "../auth/enum/authentication-apis";
function Profile(props) {
    const [garage, setGarage] = useState({
        image: "",
        name: "",
        address: "",
        location: "",
        phoneNumber: "",
        openAt: "",
        closeAt: "",
    });
    const [services, setService] = useState([1, 2]);


    const auth = useSelector((state) => state.auth);
    const userInfo = auth.user;



    return (
        <div className="garage main-flex">
            <div className="garage-profile ">

                <div className="flex-row">
                    <h3 className="garage__title">Garage Profile</h3>

                    <div className="avatar-preview">
                        <img src={"https://i.pinimg.com/originals/9b/3c/74/9b3c749500e3392efe84df990ed862e6.png"} className="profile_img" style={{ style: "background-image" }} alt="error" />
                    </div>
                </div>
                <div className="flex-row">

                </div>
                <div className="flex-row">
                    <span className="label">Name:</span>
                    <span className="conttent">{ }</span>

                </div>
                <div className="flex-row">
                    <span className="label">Address:</span>
                    <span className="conttent">{ }</span>

                </div>
                <div className="flex-row">
                    <span className="label">Location:</span>
                    <span className="conttent">{ }</span>

                </div>
                <div className="flex-row">
                    <span className="label">Phone number:</span>
                    <span className="conttent">{ }</span>

                </div>
                <div className="flex-row">
                    <span className="label">Open At:</span>
                    <span className="conttent">{ }</span>

                </div>
                <div className="flex-row">
                    <span className="label">Close At:</span>
                    <span className="conttent">{ }</span>

                </div>

            </div>
            <div className="garage-service">
                <h3 className="garage__title">Services</h3>
                <div className="service-list">
                    {services.map((garage, idx) => {
                        return (
                            <div className="flex-row">
                                <span className="label service-name">{idx + 1}. {"Dich vu"}</span>
                                <span className="content cost">{"69.000"}</span>
                            </div>
                        );
                    })}
                </div>
                <br />

                <Link to={`/user/garage/service/`}>+ Add new</Link>
            </div>
            <div className="btn-container">
                <Link to={`/user/${userInfo.username}/edit`}>
                    <button className="profile__editbtn">Edit</button>
                </Link>
            </div>

        </div >
    );
}

export default Profile;
