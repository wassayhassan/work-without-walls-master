import React from "react";
import { useState } from "react";
import "./firstteam.css";
import BuyerNavBar from "../navbars/BuyerNavbar"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
const Firstteam = () => {
    const [teamImg,setTeamImg]=useState("https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
  const [title,setTitle]=useState("Title");
  const [leaderName,setleaderName]=useState("Leader Name");
    return ( 
    <>
    <BuyerNavBar/>
    <div className="new">
        <div className="main">
        <div class="container-md p-5 my-5 border">
          <div className="icons">
            <img className="rounded-circle" style={{width:"100px"}} src={teamImg} />
         </div>
         <div className="data" >
      <p >{title} </p>
      <div className="head">
        <p><b>{leaderName}</b></p>
        <Link to="/second">
        <Button variant="outline-primary">Details</Button></Link>
      </div>
      </div>
        </div>
      </div>
      </div>
    </> );
}
 
export default Firstteam;