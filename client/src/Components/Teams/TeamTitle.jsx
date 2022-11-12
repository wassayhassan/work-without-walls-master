import React, { useState } from "react";
import "../../Css Files/team.css";
import video from "../../Images/team/gall6.jpg";
import { Link } from "react-router-dom";
import SellerNavbar from "../navbars/sellerNavbar";
import Button from 'react-bootstrap/Button';
const TeamTitle = () => {
  const [logo, setLogo] = useState(
    "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );

  const [title, setTitle] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [teamMembers, setTeamMembers] = useState(2);

  return (
    <div>
      < SellerNavbar/>
        <div className="main_3">
            <br />
            <div className="right_div">
          <div className="sec_uplod_logo">
            <div className="to_flex">
              <div className="circle">
                <img src={logo} alt="" className="circle" srcset="" />
              </div>
              <div>
                <input
                  placeholder="Team Title"
                  className="team_inp"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <br/>
            
            <div>
           
              <input
                id="file-upload"
                type="file"
                onChange={(e) => {
                  setLogo(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            <br />
            <br />
          </div>

          <div className="middle_sec my-3">
            <div className="to_flex">
              <input
                placeholder="Leader Name"
                className="Up_Name inp_data"
                onChange={(e) => {
                  setLeaderName(e.target.value);
                }}
              />
            </div>

            <div className="to_flex" id="Last_div">
              <p>Select number of team members</p>
              <select
                className="mb_num"
                onChange={(e) => {
                  setTeamMembers({ [e.target.name]: e.target.value });
                }}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
              </select>
            </div>
          </div>
            </div>

            <div className="left_div">
          <div>
            <div className="left_box">
              <div className="to_flex">
                <img
                  src={video}
                  className="imgs"
                  height="150px "
                  width="40%"
                  alt=""
                />
                <span className="text">
                  <b className="bolds">Guid lines for creating a new Team</b>
                  <br />
                  <p className="para_">
                    <ol>
                      <li>Upload logo</li>
                      <li>Write the tittle</li>
                      <li>Enter the leader name </li>
                      <li>Add team members</li>
                    </ol>
                  </p>
                </span>
              </div>
            </div>
          </div>
            </div>
        </div>
      <br />
      <br /> <br />
      <br />
      <Link className="links" to="/members">
          <Button   >Next</Button>
        </Link>
        
     
    </div>
  );
};

export default TeamTitle;
