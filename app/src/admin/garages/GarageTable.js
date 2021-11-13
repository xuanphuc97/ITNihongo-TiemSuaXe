import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Container, Form, ListGroup } from 'react-bootstrap'
import Pagination from "react-js-pagination";
import Rating from "@mui/material/Rating";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SideNav from "../slidebar/SideNav"
import profileApis from '../api/profile-apis';
import axios from "axios"
import "./GarageTable.scss"
import Loader from "react-loader-spinner";



function GarageTable() {

    const [garages, setGarages] = useState([])
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState({
        data: [],
        limit: 10,
        activePage: 1,
    });

    function reForm(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }
    const handlePageChange = (pageNumber) => {
        setPage((prev) => ({
            ...prev,
            activePage: pageNumber,
        }));
    };
    const handleChangeInput = (e) => {
        const keyword = reForm(e.target.value.trim().toLowerCase());
        const data = garages.filter(garage => (
            reForm(garage.garageName).toLowerCase().includes(keyword)
            || reForm(garage.address).toLowerCase().includes(keyword)
        ))
        if (data) {
            setPage((prev) => ({
                ...prev,
                activePage: 1,
                data: data,
            }));
        }

    }

    useEffect(() => {
        const getAllGarages = async () => {
            const res = await axios.get(profileApis.getAllGarages)
            if (res) {
                setGarages(res.data)
                setPage(prev => ({
                    ...prev,
                    data: res.data

                }))
                setLoading(false)
                // console.log(res.data)
            }
        }
        getAllGarages()

    }, [])

    return (
        <div className="garage-table">
            <SideNav></SideNav>

            <Container fluid>
                <Row className="heading">
                    <h2>Garage</h2>
                </Row>
                <Row className="search-box">
                    <Col>
                        <Form>
                            <Form.Group controlId="searchBox">
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    onChange={handleChangeInput}
                                    Value={keyword}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="table">
                    <ListGroup className="list-group">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={0} md={1} className="d-none d-lg-block tb-title"> id </Col>
                                <Col xs={6} md={2} className="tb-title"> Name </Col>
                                <Col xs={6} md={5} className="tb-title"> Address </Col>
                                <Col xs={6} md={2} className="tb-title"> Rating </Col>
                                <Col xs={6} md={2} className="tb-title"> Action </Col>
                            </Row>
                        </ListGroup.Item>
                        {
                            loading
                                ?
                                <div className="loader">
                                    <Loader type="Oval" color="#00BFFF" height={100} width={100} />
                                </div>
                                :

                                page.data
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
                                                    <Col xs={0} md={1} className="tb-content d-none d-lg-block"> {garage.garageId}</Col>
                                                    <Col xs={6} md={2} className="tb-content tb-content--name"> {garage.garageName} </Col>
                                                    <Col xs={6} md={5} className="tb-content"> {garage.address} </Col>
                                                    <Col xs={6} md={2} className="tb-content">
                                                        <span className="rating">
                                                            <Rating
                                                                name="half-rating-read"
                                                                value={garage.averageRating}
                                                                precision={0.1}
                                                                readOnly
                                                            />
                                                        </span>
                                                        {/* <span className="rating-number">{garage.averageRating.toFixed(1)}</span>  */}
                                                    </Col>
                                                    <Col xs={6} md={2} className="tb-content">
                                                        <Link to={`admin/garages/${garage.id}`}>
                                                            <BsFillEyeFill className="action-icon"></BsFillEyeFill>
                                                        </Link>

                                                        <BsFillTrashFill className="action-icon"></BsFillTrashFill>
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
