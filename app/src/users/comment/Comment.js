import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import "./Comment.scss";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";

function Comment(props) {
  const {
    isForComment = true,
    initRating = 5,
    initComment = "",
    initUsername = "Noname",
    initImage = [],
  } = props;
  const [rating, setRating] = useState(initRating);
  const [comment, setComment] = useState(initComment);
  const [username, setUsername] = useState(initUsername);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setImage(image);
    setShow(true);
  };

  const handleRating = (e) => {
    setRating(e);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {};
  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
        <div className="row-1">
          <div className="col-1">
            <span className="label">Rating:</span>
            <span
              className="rating"
              style={{ pointerEvents: isForComment ? "auto" : "none" }}
            >
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
          </div>
          <div className="col-2">
            <span className="label username">{username}</span>
          </div>
        </div>

        <div className="row-2">
          <div className="label">Comment:</div>
          <div className="text-area-container">
            <textarea
              className="text-area"
              readOnly={!isForComment}
              value={comment}
              onChange={handleChange}
              placeholder="Write your comment here..."
            />
            {initImage !== null ? (
              <div className="image-slider">
                {initImage.map((image, idx) => {
                  return (
                    <img
                      className="image"
                      key={idx}
                      src={image}
                      alt={"image " + idx}
                      onClick={() => handleShow(image)}
                    />
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <Container>
                  <img
                    width={444}
                    className="modal-image"
                    src={image}
                    alt="show"
                  />
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        {isForComment && (
          <div className="btn-container row-3">
            <button type="submit" className="profile__editbtn">
              Send
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Comment;
