import "../../Css Files/team.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import logo from "../../Images/logo.png";
import "./sellerNavbar.css"
import {
  BsChatTextFill,
  BsFillBellFill,
  BsFillPeopleFill,
  BsGearWide,
  BsLock,
  BsCaretDownFill,
} from "react-icons/bs";
import { FaFirstOrderAlt } from "react-icons/fa";
import { Dropdown,NavDropdown} from "react-bootstrap";
import { UserContext } from "../../context/user.context";
import { logoutUser } from "../../api";
import BuyerOrdersModal from "../Orders/BuyerOrdersModal";
const BuyerNavbar = () => {
  const navigate = useNavigate();

  const { setuser } = useContext(UserContext);
  const logoutUserClick = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // do nothing
    }
    localStorage.removeItem("user");
    setuser(null);
    navigate("/login");
  };
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
    <div className="topbarRight">
      <div className="topbarIcons">
          {/* <div className="topbarIconItem">
              <Link
                className="text-light"
                aria-current="page"
                to="/"
               
              >
                Order
              </Link>
        </div> */}
        <div className="topbarIconItem">
          <BuyerOrdersModal />
        </div>
        <div className="topbarIconItem">
              <Link className="text-light"  to="/">
                <BsFillBellFill />
              </Link>
              <span className="topbarIconBadge"></span>
        </div>
        <div className="topbarIconItem">
              <Link className=" text-light" to="/messages">
                <BsChatTextFill />
              </Link>
          <span className="topbarIconBadge"></span>
        </div>
        <div className="topbarIconItem">
              <Link className=" text-light"  to="/BuyerTeamCategory">
                <BsFillPeopleFill />
              </Link>
          <span className="topbarIconBadge"></span>
        </div>
      </div>
    </div>
  <div className="topbarsecondLast">
            <Link className="text-light" to="/profile" >
             Switch to Seller
            </Link>
  </div>
    <div className="topbarend">
            
            <div className="text-light">
            <NavDropdown >
              <Dropdown.Item
                to="/profile"
                onClick={() => {
                  navigate("/active-orders");
                }}
              >
                My orders 
              </Dropdown.Item>
              <Dropdown.Item to="/">
                <BsGearWide className="mx-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item to="/" onClick={logoutUserClick}>
                <BsLock className="mx-2" />
                Logout
              </Dropdown.Item>
            </NavDropdown>
          </div>
    </div>
  </div>
  );
};
export default BuyerNavbar;
