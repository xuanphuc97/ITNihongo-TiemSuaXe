import React, { useState, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'
import './Comment.scss'


function Comment(props) {
  const {
    isForComment = true,
    initRating = 5, initComment = '',
    initUsername = 'Noname'
  } = props;
  const [rating, setRating] = useState(initRating);
  const [comment, setComment] = useState(initComment);
  const [username, setUsername] = useState(initUsername);


  const handleRating = (e) => {
    setRating(e)
  }

  const handleChange = (e) => {
    setComment(e.target.value)

  }

  const handleSubmit = (e) => {

  }
  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
        <div className="row-1">
          <div className="col-1">
            <span className="label">Rating:</span>
            <span className="rating" style={{ pointerEvents: isForComment ? 'auto' : 'none' }}>
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
              placeholder='Write your comment here...'
            />
          </div>

        </div>
        {
          isForComment &&
          <div className="btn-container row-3">
            <button type="submit" className="profile__editbtn">Send</button>
          </div>
        }
      </form>
    </div>
  )
}

export default Comment;