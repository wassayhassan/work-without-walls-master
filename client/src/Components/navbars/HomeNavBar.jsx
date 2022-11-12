import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import Button from 'react-bootstrap/Button';
import "./sellerNavbar.css"
const SellerNavBar = () => {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="logo">
          <img
             className="pic"
              src={logo}
              alt=""
            ></img></span>
      </Link>
    </div>
    <div style={{marginRight:"1rem"}}>
            <Link  to="/login">
            <Button
            className="button"
            >
              login
            </Button>
          </Link>
          <Link  to="/register">
            <Button className="text-right"  type="button">
              SignUp
            </Button>
          </Link>
           
    </div>
  </div>
  );
};

export default SellerNavBar;
