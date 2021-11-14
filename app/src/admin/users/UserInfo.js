import React from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap'
import "./UserInfo.scss"

function UserInfo() {
    const handleClickDel = () => { }
    return (
        <div className="admin-userinfo">
            <Container fluid >
                <Col className="user-form" xs={12} sm={{ span: 7, offset: 2 }}>
                    <Row><h2>User Profile</h2></Row>
                    <Row className="label">ID</Row>
                    <Row className="input">
                        <input type="text"
                            onChange={() => { }}
                            value={""}
                            placeholder=""
                        />

                    </Row>
                    <Row className="label">Nickname</Row>
                    <Row className="input">
                        <input type="text"
                            onChange={() => { }}
                            value={""}
                            placeholder=""
                        />

                    </Row>
                    <Row className="label">Email</Row>
                    <Row className="input">
                        <input type="text"
                            onChange={() => { }}
                            value={""}
                            placeholder=""
                        />

                    </Row>

                    <Row className="label">Name</Row>
                    <Row className="input">
                        <input type="text"
                            onChange={() => { }}
                            value={""}
                            placeholder=""
                        />

                    </Row>
                    <Row className="label">Role</Row>
                    <Row className="input">
                        <select name="role" id="role">
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>

                    </Row>
                    <Row>
                        <div className="allbtn-container">
                            <div className="cancel-col"></div>
                            <div className="cancel-col">
                                <button className="profile__savebtn" type="submit">
                                    Save
                                </button>
                                <Link to={``}>
                                    <button className="profile__cancelbtn">Cancel</button>
                                </Link>
                                <button
                                    className="profile__deletebtn"
                                    type="button"
                                    onClick={() => handleClickDel(true)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Row>
                </Col>

            </Container>


        </div>
    )
}

export default UserInfo
