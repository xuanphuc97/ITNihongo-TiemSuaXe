import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Form, ListGroup } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Rating from "@mui/material/Rating";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SideNav from "../slidebar/SideNav";
import profileApis from "../api/profile-apis";
import axios from "axios";
import "./UserTable.scss";
import Loader from "react-loader-spinner";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserTable() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [delUser, setDelUser] = useState();
  const [keyword, setKeyword] = useState("");
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
    const data = users.filter(
      (user) =>
        reForm(user.username).toLowerCase().includes(keyword) ||
        reForm(user.email).toLowerCase().includes(keyword) ||
        reForm(user.fullName).toLowerCase().includes(keyword)
    );
    if (data) {
      setPage((prev) => ({
        ...prev,
        activePage: 1,
        data: data,
      }));
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(profileApis.getAllUsers);
      if (res) {
        setUsers(res.data);
        setPage((prev) => ({
          ...prev,
          data: res.data,
        }));
        // setLoading(false);
        console.log(res.data);
      }
    };
    getAllUsers();
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (user) => {
    setOpen(true);
    setDelUser(user);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const delDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="user-table">
      <SideNav></SideNav>
      {open ? delDialog() : null}
      <Container fluid>
        <Row className="heading">
          <h2>User</h2>
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
                <Col xs={6} md={{ span: 1, order: 0 }} className="tb-title">
                  {" "}
                  id{" "}
                </Col>
                <Col
                  xs={{ span: 6, order: "last" }}
                  md={{ span: 2, order: 0 }}
                  className="tb-title "
                >
                  {" "}
                  Nickname{" "}
                </Col>
                <Col
                  xs={0}
                  md={{ span: 3, order: 0 }}
                  className="d-none d-lg-block tb-title"
                >
                  {" "}
                  Email{" "}
                </Col>
                <Col
                  xs={0}
                  md={{ span: 2, order: 3 }}
                  className="d-none d-lg-block tb-title"
                >
                  {" "}
                  Name{" "}
                </Col>
                <Col
                  xs={0}
                  md={{ span: 2, order: 4 }}
                  className="d-none d-lg-block tb-title"
                >
                  {" "}
                  Role{" "}
                </Col>
                <Col xs={6} md={{ span: 2, order: 5 }} className="tb-title">
                  {" "}
                  Action{" "}
                </Col>
              </Row>
            </ListGroup.Item>
            {loading ? (
              <div className="loader">
                <Loader type="Oval" color="#00BFFF" height={100} width={100} />
              </div>
            ) : (
              page.data
                .slice(
                  page.activePage * page.limit - page.limit,
                  page.activePage * page.limit > page.data.length
                    ? page.data.length
                    : page.activePage * page.limit
                )
                .map((user, idx) => {
                  return (
                    <ListGroup.Item key={`list-user${idx}`}>
                      <Row>
                        <Col
                          xs={6}
                          md={{ span: 1, order: 0 }}
                          className="tb-content"
                        >
                          {" "}
                          {user.accountId}
                        </Col>
                        <Col
                          xs={{ span: 6, order: "last" }}
                          md={{ span: 2, order: 0 }}
                          className="tb-content tb-content--name"
                        >
                          {" "}
                          {user.username}{" "}
                        </Col>
                        <Col
                          xs={0}
                          md={{ span: 3, order: 0 }}
                          className="tb-content d-none d-lg-block"
                        >
                          {" "}
                          {user.email}{" "}
                        </Col>
                        <Col
                          xs={0}
                          md={{ span: 2, order: 3 }}
                          className="tb-content d-none d-lg-block"
                        >
                          {" "}
                          {user.fullName}{" "}
                        </Col>
                        <Col
                          xs={0}
                          md={{ span: 2, order: 4 }}
                          className="tb-content d-none d-lg-block"
                        >
                          {" "}
                          {user.role}{" "}
                        </Col>
                        <Col
                          xs={6}
                          md={{ span: 2, order: 5 }}
                          className="tb-content"
                        >
                          <Link to={`users/${user.accountId}`}>
                            <BsFillEyeFill className="action-icon"></BsFillEyeFill>
                          </Link>

                          <button className="action-icon"></button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })
            )}
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
  );
}

export default UserTable;
