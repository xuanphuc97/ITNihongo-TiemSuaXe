import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import "./GarageEditProfile.scss";
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
    const [services, setService] = useState([]);


    const auth = useSelector((state) => state.auth);
    const userInfo = auth.user;



    return (
        <div className="garage">
            <form action="">
                <div className="garage-profile">

                    <div className="flex-row">
                        <h3>Garage Profile</h3>
                        <div className="upload-img">
                            <div className="img-container">
                                <div className="avatar-upload">
                                    <div className="avatar-edit">
                                        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={(e) => { }} />
                                        <label htmlFor="imageUpload"><FaCloudUploadAlt /></label>
                                    </div>
                                    <div className="avatar-preview">
                                        <img src={"https://i.pinimg.com/originals/9b/3c/74/9b3c749500e3392efe84df990ed862e6.png"} className="profile_img" style={{ style: "background-image" }} alt="error" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">

                    </div>
                    <div className="flex-row">
                        <span className="label">Name</span>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            value=""
                        // onchange = {},
                        />
                    </div>
                    <div className="flex-row">
                        <span className="label">Address</span>
                        <input
                            type="text"
                            placeholder="address"
                            name="address"
                            value=""
                        // onchange = {},
                        />
                    </div>
                    <div className="flex-row">
                        <span className="label">Location</span>
                        <input
                            type="text"
                            placeholder="location"
                            name="location"
                            value=""
                        // onchange = {},
                        />
                    </div>
                    <div className="flex-row">
                        <span className="label">Phone number</span>
                        <input
                            type="text"
                            placeholder="phonenumber"
                            name="phonenumber"
                            value=""
                        // onchange = {},
                        />
                    </div>
                    <div className="flex-row">
                        <span className="label">Open At</span>
                        <input
                            type="text"
                            placeholder="open at"
                            name="openat"
                            value=""
                        // onchange = {},
                        />
                    </div>
                    <div className="flex-row">
                        <span className="label">Close At</span>
                        <input
                            type="text"
                            placeholder="close at"
                            name="openat"
                            value=""
                        // onchange = {},
                        />
                    </div>



                </div>
            </form>
        </div >
    );
}

export default Profile;
