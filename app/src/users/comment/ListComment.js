import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import profileApis from "../profile/enum/profile-apis"
import Comment from './Comment'
import Loader from "react-loader-spinner"
import './ListComment.scss'

function ListComment(props) {
    const [listComment, setListComment] = useState([1, 2, 3])
    const [isLoading, setIsLoading] = useState(true)

    const auth = useSelector((state) => state.auth)
    const userInfor = auth.user;

    const getListComment = async () => {

        const garage = await axios.get(
            profileApis.getGaragesOfUser(userInfor.accountId)
        );
        const comments = await getListComment(garage.id)
        if (comments) {
            setIsLoading(false);
        }
        setListComment(comments)
    }

    useEffect(() => {
        getListComment()
    }, [])

    return (
        <div className='list-comment'>
            {!isLoading ?  // Load duoc du lieu thi bo dau !
                <div className="loader">
                    <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div> :
                listComment.map(comment => {
                    return (
                        <Comment
                            className='comment'
                            key={comment.id}
                            isForComment={false}
                            initRating={comment.rating}
                            initUsername={userInfor.username}
                        ></Comment>
                    )
                })
            }
        </div>
    )
}

export default ListComment
