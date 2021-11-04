// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import "./TopPage.scss"
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profileApis from "../top-page/enum/profile-apis";
import Loader from "react-loader-spinner";
import Pagination from "react-js-pagination"
// import { Rating } from 'react-simple-star-rating'
import Rating from '@mui/material/Rating';


function TopPage() {
    const auth = useSelector((state) => state.auth);
    const userInfor = auth.user;
    const [page, setPage] = useState({
        data: [],
        limit: 7,
        activePage: 1
    });
    const [loading, setLoading] = useState(false);

    const getPage = async () => {
        if (userInfor.accountId === undefined) return;
        const res = await axios.get(
            profileApis.getGaragesOfUser(userInfor.accountId)
        );
        if (res) {
            console.log(res)
            setPage(prev => ({
                ...prev,
                data: res.data
            }));
            setLoading(true);
        }
    }

    useEffect(() => {
        getPage();
    }, [userInfor]);

    const handlePageChange = (pageNumber) => {
        setPage(prev => ({
            ...prev,
            activePage: pageNumber
        }))
    }
    return (
        <div className="top-page">
            <Container fluid>
                <Row>
                    <Col xs={12} md={5} className="garage-side">
                        <div className="search-box">
                            <Form>
                                <Form.Group controlId="searchBox">
                                    <Form.Control type="Text" placeholder="Search..." />
                                    <Form.Control as="select" custom>
                                        <option value="0">Near you</option>
                                        <option value="1">Name</option>
                                        <option value="2">Address</option>
                                        <option value="3">Rating</option>
                                    </Form.Control>

                                </Form.Group>

                            </Form>
                        </div>
                        <div className="list-garage">

                            <ListGroup>
                                {page.data.slice(page.activePage * page.limit - page.limit,
                                    page.activePage * page.limit > page.data.length
                                        ? page.data.length
                                        : page.activePage * page.limit)
                                    .map((garage, idx) => {
                                        return (
                                            <ListGroup.Item key={`tp-lgi-${idx}`}>
                                                <Card >
                                                    <Card.Body>

                                                        <Card.Title>
                                                            <Row>
                                                                <Col xs={7}>
                                                                    {garage.garageName}
                                                                </Col>
                                                                <Col xs={5}>
                                                                    <span className="rating">
                                                                        <Rating
                                                                            name="half-rating-read"
                                                                            defaultValue={3.3}
                                                                            precision={0.1}
                                                                            readOnly
                                                                        />

                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </Card.Title>
                                                        <Card.Text>
                                                            {garage.address}
                                                        </Card.Text>

                                                    </Card.Body>
                                                </Card></ListGroup.Item>
                                        )
                                    })}
                                <Pagination
                                    activePage={page.activePage}
                                    itemsCountPerPage={page.limit}
                                    totalItemsCount={page.data.length}
                                    pageRangeDisplayed={1}
                                    onChange={handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </ListGroup>

                        </div>
                    </Col>
                    <Col xs={12} md={7} className="map-side"> ádasdasdsa</Col>
                </Row>
            </Container>

        </div>
    );
}

export default TopPage
