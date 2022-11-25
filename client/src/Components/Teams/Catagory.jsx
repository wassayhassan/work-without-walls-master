import React from "react";
import "../../Css Files/team.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Cat_1 from "../../Images/team/web development.jpg";
import Cat_2 from "../../Images/team/database.jpg";
import Cat_3 from "../../Images/team/Game Development.jpg";
import Cat_4 from "../../Images/team/AI.jpg";
import Cat_5 from "../../Images/team/data entry.jpg";
import Cat_6 from "../../Images/team/DIP.png";
import Cat_7 from "../../Images/team/App Development.png";
import Cat_8 from "../../Images/team/Machine learning.jpg";

import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import SellerNavbar from "../navbars/sellerNavbar";

const Catagory = () => {
  const [catagory, setCatagory] = useState("");

  return (
    <>
      <SellerNavbar />
      <div className="catagari_main">
        <br />
        <h1 className="cat_hg">Choose The Category For your Team</h1>
        <br />
        <div className="flex_main_1">
          <Container>
            <Row>
              <Col>
                <Link
                  to="/sellerTeam/category/webdevelopment"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("Web Development");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_1} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">Web Development</h5>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/sellerTeam/category/database"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("DataBase");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_2} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">DataBase</h5>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/sellerTeam/category/gamedevelopment"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("Game Development");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_3} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">Game Development</h5>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/sellerTeam/category/artificialintelligence"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("Artifical Intelligence");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_4} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">Artifical Intelligence</h5>
                  </div>
                </Link>
              </Col>
            </Row>

            <Row className="sec_row">
              <Col>
                <Link
                  to="/sellerTeam/category/dataentry"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("Data Entry");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_5} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">Data Entry</h5>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/sellerTeam/category/dip"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("DIP");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_6} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">DIP</h5>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/sellerTeam/category/appdevelopment"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("App Development");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_7} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">App Development</h5>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/sellerTeam/category/machinelearning"
                  className="link_upload"
                  onClick={(e) => {
                    setCatagory("Machine Learning");
                  }}
                >
                  <div className="flex_cat">
                    <img alt="" src={Cat_8} className="cat_logo" />
                    <br />
                    <h5 className="name_cat">Machine Learning</h5>
                  </div>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Catagory;
