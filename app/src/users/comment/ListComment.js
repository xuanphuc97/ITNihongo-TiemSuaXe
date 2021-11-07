import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import profileApis from "../profile/enum/profile-apis";
import Comment from "./Comment";
import Loader from "react-loader-spinner";
import "./ListComment.scss";
import commentApis from "./enum/comment-apis";

function ListComment(props) {
  const { garage, services, reload } = props;
  const [listComment, setListComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useSelector((state) => state.auth);
  const userInfor = auth.user;

  const getListComment = async () => {
    try {
      const res = await axios.get(
        commentApis.getReviewsOfGarage(garage.garageId)
      );
      console.log(garage.garageId);
      console.log("service");
      console.log(res.data);
      if (res) {
        console.log(res.data);
        setListComment([...res.data]);
        setIsLoading(false);
        console.log(listComment);
      }
    } catch (err) {
      setIsLoading(false)
      if (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getListComment();
  }, [reload]);

  return (
    <div className="list-comment">
      {isLoading ? (
        <div className="loader">
          <Loader type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        listComment.map((comment, idx) => {
          return (
            <Comment
              className="comment"
              key={`comment-${idx}`}
              isForComment={false}
              initRating={comment.rating}
              initUsername={comment.user.username}
              initComment={comment.comment}
            ></Comment>
          );
        })
      )}
    </div>
  );
}

export default ListComment;
