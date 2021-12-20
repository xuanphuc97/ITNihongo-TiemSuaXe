import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListComment from "../comment/ListComment";
import Comment from "../comment/Comment";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import "./GarageInfo.scss";
import profileApis from "../top-page/enum/profile-apis";

function GarageInfo(props) {
  const { garage } = props;
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const [services, setService] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState();
  const [username, setUsername] = useState();
  const [newReview, setNewReview] = useState(props);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getService = async () => {
      try {
        const res = await axios.get(profileApis.getService(garage.garageId));
        var resInfo = res.data;
        console.log("service");
        setService([...services, ...res.data]);
        // setLoading(true);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    };
    getService();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRating = (e) => {
    setRating(e);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleClose();
      var CreateForm = new FormData();
      CreateForm.append("id", garage.garageId);
      CreateForm.append("comment", comment);
      CreateForm.append("rating", rating);
      const res = await axios.post(profileApis.addReview, CreateForm);
      console.log(res);
      if (res) {
        console.log("OK");
        setComment();

        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
            <span className="content">{garage.garageName}</span>
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
            <span className="content">{garage.startAt}</span>
          </div>
          <div className="flex-row">
            <span className="label">Close At:</span>
            <span className="content">{garage.endAt}</span>
          </div>
        </div>
        <div className="garage-service">
          <h3 className="title">Services</h3>
          <div className="service-list">
            {services.map((service, idx) => {
              return (
                <div className="flex-row" key={`service-${idx}`}>
                  <span className="label service-name">
                    {idx + 1}. {service.serviceName}
                  </span>
                  <p className="cost">{service.servicePrice}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        onClick={handleShow}
        disabled={!isLogged ? true : false}
      >
        Write your Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Container>
            <Row>
              <Col sm={12}>
                <span className="label">Rating: </span>

                <span className="rating">
                  <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    size={20}
                    label
                    transition
                    fillColor="orange"
                    emptyColor="gray"
                  />
                </span>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Col sm={12} className="text-area-container">
              <textarea
                className="text-area"
                value={comment}
                onChange={handleChange}
                placeholder="Write your comment here..."
              />
            </Col>
            <div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                multiple />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <h2>List of reviews</h2>
      <ListComment garage={garage} reload={reload}></ListComment>
    </>
  );
}

export default GarageInfo;
