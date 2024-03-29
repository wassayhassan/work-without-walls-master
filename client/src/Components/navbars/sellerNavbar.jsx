import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import {
  BsChatTextFill,
  BsFillBellFill,
  BsFillPeopleFill,
  BsGearWide,
  BsLock,
  BsPersonFill,
} from "react-icons/bs";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FcSettings } from "react-icons/fc";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { logoutUser } from "../../api";
import "./sellerNavbar.css";
import { io } from "socket.io-client";
import SellerOrdersModal from "../Orders/SellerOrdersModal";
import NotifcationModal from "../Notification/NotificationModal";
const SellerNavBar = () => {
  const navigate = useNavigate();
  const { setuser, user } = useContext(UserContext);
  const socket = useRef();

  const logoutUserClick = async () => {
    socket.current = io("ws://localhost:7900"); //
    try {
      socket.current.emit("offline", {
        user: user?._id,
      });
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
      <div className="topbarLeft h-full ">
        <Link to="/" className="h-full object-cover max-h-[60px]">
            <img className="" src={logo} alt=""></img>
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Link className="text-light" aria-current="page" to="/">
              Order
            </Link>
          </div> */}
          <div className="m-2 mx-2 mt-1">
            <SellerOrdersModal />
           </div>
          {/* <div className="topbarIconItem">
            <Link className="text-light" to="/">
              <BsFillBellFill />
            </Link>
            <span className="topbarIconBadge"></span>
          </div> */}
          <div className="m-2 mx-2 mt-1">
            <NotifcationModal />
          </div>
          <div className="topbarIconItem">
            <Link className=" text-light" to="/messages">
              <BsChatTextFill size="1.05em" />
            </Link>
            <span className="topbarIconBadge"></span>
          </div>
          <div className="topbarIconItem">
            <Link className=" text-light" to="/catagory">
              <BsFillPeopleFill size="1.05em" />
            </Link>
            <span className="topbarIconBadge"></span>
          </div>
        </div>
      </div>
      <div className="topbarsecondLast">
        <Link className="text-light" to="/buyerProfile">
          Switch to Buyer
        </Link>
      </div>
      <div className="topbarend">
        <div className="text-light">
          <NavDropdown>
            <Dropdown.Item
              to="/profile"
              onClick={() => {
                navigate("/buyer-request");
              }}
            >
              Buyer Request
            </Dropdown.Item>
            <Dropdown.Item
              to="/profile"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <BsPersonFill className="mx-2" />
              Profile
            </Dropdown.Item>
            <Dropdown.Item to="" onClick={()=> navigate("/settings")}>
              <BsGearWide className="mx-2" />
              Settings
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                navigate("/createTeam");
              }}
            >
              <MdOutlineCreateNewFolder className="mx-2" />
              create team
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

export default SellerNavBar;
