import "../../Css Files/team.css";
import star from "../../Images/team/star.png";
import profile from "../../Images/team/gall6.jpg";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";
import SellerNavbar from "../navbars/sellerNavbar";
import Button from 'react-bootstrap/Button';
const Members = () => {
  const [rat, setrat] = useState(null);
  const [rat1, setrat1] = useState(null);
  const [rat2, setrat2] = useState(null);
  const [rat3, setrat3] = useState(null);

  const title = "The Team";
  const teamLogo =
    "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const leaderName = "The Leader Team";
  const leaderImg = profile;
  const members="";
  let teamMembers = [
    { id: 1, name: "", responsibility: "", prevProject: "" },
    { id: 2, name: "", responsibility: "", prevProject: "" },
    { id: 3, name: "", responsibility: "", prevProject: "" },
    { id: 4, name: "", responsibility: "", prevProject: "" },
    { id: 5, name: "", responsibility: "", prevProject: "" },
    { id: 6, name: "", responsibility: "", prevProject: "" },
    { id: 7, name: "", responsibility: "", prevProject: "" },
    { id: 8, name: "", responsibility: "", prevProject: "" },
    { id: 9, name: "", responsibility: "", prevProject: "" },
  ];

  let name = "";
  let responsibility = "";

  let index = 0;

  let handleClick = (e) => {
    teamMembers[index].name = name;
    teamMembers[index].responsibility = responsibility;

    console.log("id: ", teamMembers[index].id);
    console.log("name: ", teamMembers[index].name);
    console.log("responsibility: ", teamMembers[index].responsibility);
    index += 1;
  };

  return (
    <>
      <SellerNavbar />
      <div className="main_4">
        <div className="sec_one_pg_4">
          <div>
            <img src={teamLogo} alt="" className="circle" srcset="" />
          </div>
          <div className="name">
            <span className="team_ti">{title}</span>
          </div>
        </div>

        <div className="flex_for_4">
          <div>
            <div className="about">

              <div className="name">
                <span>{leaderName}</span>
                <br />
                <span className="team_text">Team Leader</span>
              </div>
            </div>
           
            {/* end */}
            <br />

           
          </div>

          <div className="contact align-items-center">
            {[...Array(members)].map((i) => {
              return (
                <div className="input_sec" key={i}>
                  <input
                    placeholder="Member Name"
                    className="inp_data"
                    onChange={(e) => {
                      name = e.target.value;
                    }}
                  />
                  <input
                    placeholder="Responsibility"
                    className="inp_data"
                    onChange={(e) => {
                      responsibility = e.target.value;
                    }}
                  />
                 
                </div>
              );
            })}
            <br />
            <br />
            <br />

            <div style={{marginLeft:"12rem"}}>
              <Link  to="/">
                <Button className="align-items-center">submit</Button>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Members;
