import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./TopPage.scss";
import axios from "axios";
import profileApis from "../top-page/enum/profile-apis";
import Loader from "react-loader-spinner";
import Pagination from "react-js-pagination";
import Rating from "@mui/material/Rating";
import GoogleMapReact from "google-map-react";
import GarageInfo from "./GarageInfo";
import chosenGarage from "./chosen_garage.png";
import garageLocation from "./garage_location.png";
import currentLocation from "./your_location.png";

const getLocation = (str) => {
  return str.split(" ").map((val) => Number(val));
};

function TopPage() {
  // const auth = useSelector((state) => state.auth);
  // const userInfor = auth.user;
  const [page, setPage] = useState({
    data: [],
    limit: 7,
    activePage: 1,
  });
  const [loading, setLoading] = useState(false);

  const [showGarage, setShowGarage] = useState(false);
  const [config, setConfig] = useState("0")
  const [keyword, setKeyword] = useState("")
  const [garages, setGarages] = useState([])
  const [showPosition, setShowPosition] = useState(false)
  const [showGarageLocation, setShowGarageLocation] = useState(false)
  const [location, setLocation] = useState({
    lat: 16.047079,
    lng: 108.20623,
  });
  const [yourLocation, setYourLocation] = useState({
    lat: 16.047079,
    lng: 108.20623,
  });

  const [garage, setGarage] = useState();


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

  useEffect(() => {
    const getPage = async () => {

      const res = await axios.get(profileApis.getAllGarages);
      if (res) {
        setPage((prev) => ({
          ...prev,
          data: res.data,
        }));
        setGarages(res.data)
        setLoading(true)
      }


    };
    getPage();
  }, []);
  useEffect(() => {
    const getPage = async () => {
      switch (config) {
        case "Name":
          const data1 = garages.filter(garage => reForm(garage.garageName).toLowerCase().includes(keyword))
          if (data1) {
            setPage((prev) => ({
              ...prev,
              data: data1,
            }));
          }
          break
        case "Address":
          const data2 = garages.filter(garage => reForm(garage.address).toLowerCase().includes(keyword))
          if (data2) {
            setPage((prev) => ({
              ...prev,
              data: data2,
            }));
          }
          break

        case "Near you":
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(val => {
              setYourLocation({ lat: val.coords.latitude, lng: val.coords.longitude })
              setLocation({ lat: val.coords.latitude, lng: val.coords.longitude })

              const data4 = [...garages].sort((a, b) => ((
                (getLocation(a.location)[0] - val.coords.latitude) ** 2
                + (getLocation(a.location)[1] - val.coords.longitude) ** 2
                - (getLocation(b.location)[0] - val.coords.latitude) ** 2
                - (getLocation(a.location)[1] - val.coords.longitude) ** 2)))
              if (data4) {
                setPage((prev) => ({
                  ...prev,
                  data: data4,
                }));
              }
              setShowPosition(true)
            });
          } else {
            console.log("Geolocation is not supported by this browser.")
          }

          break

        case "Rating":
          const data4 = [...garages].sort((a, b) => (b.averageRating - a.averageRating))
          if (data4) {
            setPage((prev) => ({
              ...prev,
              data: data4,
            }));
          }
          break

        default:
          setPage((prev) => ({
            ...prev,
            data: garages,
          }));

      }
    };
    getPage();
  }, [keyword, config]);

  const handlePageChange = (pageNumber) => {
    setPage((prev) => ({
      ...prev,
      activePage: pageNumber,
    }));
  };


  const handleGarageClick = (garage) => {
    setLocation({
      lat: getLocation(garage.location)[0],
      lng: getLocation(garage.location)[1],
    });
    setShowGarageLocation(true);
    setGarage(garage);
    setShowGarage(true);

  };

  const markerStyle = {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate(-50%, -100%)",
  };



  return (
    <div className="top-page">
      <Container fluid>
        <Row>
          <Col xs={12} md={5} className="garage-side">
            {!showGarage ? (
              <>
                {!loading
                  ?
                  <div className="loader">
                    <Loader type="Oval" color="#00BFFF" height={100} width={100} />
                  </div>
                  : <>
                    <div className="search-box">
                      <Form>
                        <Form.Group controlId="searchBox">
                          <Form.Control
                            type="Text"
                            placeholder="Search..."
                            onChange={(e) => setKeyword(reForm(e.target.value.trim().toLowerCase()))}
                            disabled={["Name", "Address"].includes(config) ? false : true}
                            Value={keyword}
                          />
                          <Form.Control
                            as="select"
                            custom
                            onChange={(e) => setConfig(e.target.value)}
                            value={config}
                          >
                            <option value="All">All</option>
                            <option value="Name">Name</option>
                            <option value="Address">Address</option>
                            <option value="Near you">Near you</option>
                            <option value="Rating">Rating</option>
                          </Form.Control>
                        </Form.Group>
                      </Form>
                    </div>
                    <div className="list-garage">
                      <ListGroup>
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
                                <Card
                                  className="curr-garage"
                                  onClick={() => handleGarageClick(garage)}
                                >
                                  <Card.Body>
                                    <Card.Title>
                                      <Row>
                                        <Col className="garage-name" xs={6}>{garage.garageName}</Col>
                                        <Col xs={6}>
                                          <span className="rating">
                                            <Rating
                                              name="half-rating-read"
                                              value={garage.averageRating}
                                              precision={0.1}
                                              readOnly
                                            />
                                          </span>
                                          <span className="rating-number">{garage.averageRating.toFixed(1)}</span>
                                        </Col>
                                      </Row>
                                    </Card.Title>
                                    <Card.Text>{garage.address}</Card.Text>
                                  </Card.Body>
                                </Card>
                              </ListGroup.Item>
                            );
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
                }
              </>
            ) : (
              <>
                <Button variant="primary" onClick={() => setShowGarage(false)}>
                  Back
                </Button>
                <GarageInfo garage={garage}></GarageInfo>
              </>
            )}
          </Col>
          <Col
            xs={{ span: 12, order: "first" }}
            md={{ span: 7, order: "last" }}
            className="map-side"
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                // remove the key if you want to fork
                // key: "AIzaSyC8RZDBo5cTzzcykMrPS9qhykhSqH_4THU",
                key: "AIzaSyCh84-bMIz1xJIbDPQDrFJ2zECSMs3L168",
                language: "vi",
                region: "VI",
              }}
              defaultCenter={{ lat: 16.047079, lng: 108.26895 }}
              center={location}
              defaultZoom={12}
            // distanceToMouse={distanceToMouse}
            >
              {showPosition
                ? <i
                  className="marker"
                  lat={yourLocation.lat}
                  lng={yourLocation.lng}
                >
                  <img
                    style={markerStyle}
                    className="your-marker"
                    src={currentLocation}
                    alt="Current Position"
                    width="50"
                    height="50"
                  />
                  <div style={markerStyle} className="marker-you">
                    You
                  </div>
                </i>
                : <></>
              }

              {
                showGarageLocation
                  ? <i className="big-marker"
                    lat={location.lat}
                    lng={location.lng}
                  >
                    <img
                      style={markerStyle}
                      className="big-marker"
                      src={chosenGarage}
                      alt="Current Position"
                      width="40"
                      height="40"
                    />
                    {/* <div style={markerStyle} className="marker-name">
                      
                    </div> */}
                  </i>
                  : <></>
              }
              {page.data
                .slice(
                  page.activePage * page.limit - page.limit,
                  page.activePage * page.limit > page.data.length
                    ? page.data.length
                    : page.activePage * page.limit
                )
                .map((garage, idx) => {
                  return (
                    <i
                      className="marker"
                      key={idx}
                      lat={getLocation(garage.location)[0]}
                      lng={getLocation(garage.location)[1]}
                    >
                      <img
                        style={markerStyle}
                        src={garageLocation}
                        alt="pin"
                        width="30"
                        height="30"
                      />
                      <div style={markerStyle} className="marker-name">
                        {garage.garageName}
                      </div>
                    </i>
                  );
                })}
            </GoogleMapReact>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default TopPage;
