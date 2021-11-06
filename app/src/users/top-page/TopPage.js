import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import "./TopPage.scss"
import axios from "axios";
import profileApis from "../top-page/enum/profile-apis";
import Loader from "react-loader-spinner";
import Pagination from "react-js-pagination"
import Rating from '@mui/material/Rating';
import GoogleMapReact from "google-map-react";
import GarageInfo from './GarageInfo';


const getLocation = (str) => {
    return str.split(' ').map(val => Number(val));
}

function TopPage() {
    // const auth = useSelector((state) => state.auth);
    // const userInfor = auth.user;
    const [page, setPage] = useState({
        data: [],
        limit: 7,
        activePage: 1
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPage = async () => {
            console.log("XXX")
            const res = await axios.get(profileApis.getAllGarages);
            if (res) {
                setPage(prev => ({
                    ...prev,
                    data: res.data
                }));
            }
        }
        getPage();
    }, []);

    const handlePageChange = (pageNumber) => {
        setPage(prev => ({
            ...prev,
            activePage: pageNumber
        }))
    }

    const [location, setLocation] = useState({
        lat: 16.047079,
        lng: 108.206230
    })

    const [garage, setGarage] = useState()
    const handleGarageClick = (garage) => {

        setLocation(
            {
                lat: getLocation(garage.location)[0],
                lng: getLocation(garage.location)[1]
            }
        )
        setGarage(garage)
        setShowGarage(true)


    }

    const markerStyle = {
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -100%)"
    };


    const [showGarage, setShowGarage] = useState(false);



    return (

        <div className="top-page">

            <Container fluid>
                <Row>
                    <Col xs={12} md={5} className="garage-side">
                        {!showGarage ?
                            <>
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
                                                    <ListGroup.Item key={`list-garage${idx}`}>
                                                        <Card className="curr-garage" onClick={() => handleGarageClick(garage)}>
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

                                    </ListGroup>


                                </div>
                                <Pagination
                                    activePage={page.activePage}
                                    itemsCountPerPage={page.limit}
                                    totalItemsCount={page.data.length}
                                    pageRangeDisplayed={1}
                                    onChange={handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </>
                            : <>
                                <Button variant="primary" onClick={() => setShowGarage(false)}>Back</Button>
                                <GarageInfo
                                    garage={garage}

                                >
                                </GarageInfo>
                            </>
                        }
                    </Col>
                    <Col xs={{ span: 12, order: "first" }} md={{ span: 7, order: "last" }} className="map-side" >
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                // remove the key if you want to fork
                                key: "AIzaSyC8RZDBo5cTzzcykMrPS9qhykhSqH_4THU",
                                language: "vi",
                                region: "VI"
                            }}
                            defaultCenter={{ lat: 16.047079, lng: 108.268950 }}
                            center={location}

                            defaultZoom={15}
                        // distanceToMouse={distanceToMouse}
                        >
                            {
                                page.data.slice(page.activePage * page.limit - page.limit,
                                    page.activePage * page.limit > page.data.length
                                        ? page.data.length
                                        : page.activePage * page.limit)
                                    .map((garage, idx) => {
                                        return (
                                            <i className="marker" key={idx} lat={getLocation(garage.location)[0]} lng={getLocation(garage.location)[1]}>

                                                <img
                                                    style={markerStyle}
                                                    src="https://iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.ico"
                                                    alt="pin" width="40" height="40"
                                                />
                                                <div style={markerStyle} className="marker-name">{garage.garageName}</div>
                                            </i>
                                        )
                                    })}


                        </GoogleMapReact>


                    </Col>
                </Row>
            </Container>

        </div >
    );
}

export default TopPage
