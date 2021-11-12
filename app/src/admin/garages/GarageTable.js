import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Container, Form, ListGroup } from 'react-bootstrap'
import Pagination from "react-js-pagination";
import Rating from "@mui/material/Rating";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SideNav from "../slidebar/SideNav"
import "./GarageTable.scss"



function GarageTable() {

    const [garages, setGarages] = useState([])
    const [keyword, setKeyword] = useState("")
    const [page, setPage] = useState({
        data: [],
        limit: 10,
        activePage: 1,
    });


    const handlePageChange = (pageNumber) => {
        setPage((prev) => ({
            ...prev,
            activePage: pageNumber,
        }));
    };

    return (
        <div className="garage-table">
            <SideNav></SideNav>

            <Container>
                <Row className="heading">
                    <h1>Garage</h1>
                </Row>
                <Row className="search-box">
                    <Col>
                        <Form>
                            <Form.Group controlId="searchBox">
                                <Form.Control
                                    type="Text"
                                    placeholder="Search..."
                                    onChange={() => { }}
                                    Value={keyword}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button>Search</Button>
                    </Col>
                </Row>
                <Row className="table">
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={0} md={1} className="d-none d-lg-block"> id </Col>
                                <Col xs={6} md={3}> Name </Col>
                                <Col xs={6} md={3}> Address </Col>
                                <Col xs={6} md={3}> Rating </Col>
                                <Col xs={6} md={2}> Action </Col>
                            </Row>
                        </ListGroup.Item>
                        {page.data
                            .slice(
                                page.activePage * page.limit - page.limit,
                                page.activePage * page.limit > page.data.length
                                    ? page.data.length
                                    : page.activePage * page.limit
                            )
                            .map((garage, idx) => {
                                return (
                                    <ListGroup.Item key={`list-garage${idx}`}>
                                        <Row>
                                            <Col xs={0} md={1}> {garage.id}</Col>
                                            <Col xs={6} md={3}> {garage.garageName} </Col>
                                            <Col xs={6} md={3}> {garage.address} </Col>
                                            <Col xs={6} md={3}>
                                                <span className="rating">
                                                    <Rating
                                                        name="half-rating-read"
                                                        value={garage.averageRating}
                                                        precision={0.1}
                                                        readOnly
                                                    />
                                                </span>
                                                <span className="rating-number">{garage.averageRating.toFixed(1)}</span> </Col>
                                            <Col xs={6} md={2}>
                                                <Link to={`admin/garages/${garage.id}`}>
                                                    <BsFillEyeFill></BsFillEyeFill>
                                                </Link>

                                                <BsFillTrashFill></BsFillTrashFill>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                )
                            })
                        }

                    </ListGroup>

                </Row>
                <Row className="pagination">
                    <Pagination
                        activePage={page.activePage}
                        itemsCountPerPage={page.limit}
                        totalItemsCount={page.data.length}
                        pageRangeDisplayed={1}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />

                </Row>

            </Container>


        </div>
    )
}

export default GarageTable
