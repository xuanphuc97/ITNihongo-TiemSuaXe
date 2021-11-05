import React from 'react'
import ListComment from '../comment/ListComment'
import Comment from '../comment/Comment'

function GarageInfo(props) {

    const {
        garage,
        services,
        comments
    } = props

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
            <Comment
                className='comment'
                isForComment={true}
                initRating={5}
                initUsername={"xuanphuc191"}
                initComment="Test Comment -- Best Service 5 stars. "

            ></Comment>
            <h2>List of reviews</h2>
            <ListComment>

            </ListComment>
        </>
    )
}

export default GarageInfo
