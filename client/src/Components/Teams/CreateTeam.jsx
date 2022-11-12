import "../../Css Files/team.css";
import Logo from "../../Images/team/team logo.jpg";
import { Link}  from "react-router-dom";
import React from "react";
import SellerNavBar from "../navbars/sellerNavbar";
const CreateTeam = () => {
  return (
    <>
      <SellerNavBar/>
      <div className="front_main">
        <div className="logo_">
          <img src={Logo} className="img_logo" alt="" />
          <br />
          <div className="my-5">
            <Link to="/teamTitle" className="btn_start">
              Create Team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateTeam;
