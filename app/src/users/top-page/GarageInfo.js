import React, { useState, useEffect } from 'react'
import ListComment from '../comment/ListComment'
import Comment from '../comment/Comment'
import { Button, Modal, Row, Col, Container } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import './GarageInfo.scss'
function GarageInfo(props) {

    const {
        garage,
        services,
        comments
    } = props

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState();
    const [username, setUsername] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRating = (e) => {
        setRating(e)
    }

    const handleChange = (e) => {
        setComment(e.target.value)

    }

    const handleSubmit = (e) => { }

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
                    <div className="btn-container">
                    </div>
                    {/* <div className="garage-service">
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
                </div> */}
                </div>
            </div>
            <h2>Comment</h2>
            <Button variant="primary" onClick={handleShow}>
                Write your Review
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <span className="label">Rating: </span>

                                <span className="rating" >
                                    <Rating
                                        onClick={handleRating}
                                        ratingValue={rating}
                                        size={20}
                                        label
                                        transition
                                        fillColor='orange'
                                        emptyColor='gray'
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
                                placeholder='Write your comment here...'
                            />
                        </Col>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2>List of reviews</h2>
            <ListComment>

            </ListComment>
        </>
    )
}

export default GarageInfo
