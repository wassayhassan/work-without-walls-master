import React from "react";
import { useState } from "react";
import "./second.css";

import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@material-ui/core/TextField";
import BuyerNavBar from "../navbars/BuyerNavbar"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Bid from "../Bid/Bid"
const Second = () => {
    const [title, settitle] = useState("title");
    const [leader,setLeader]=useState("leader Name");
    const [teamImg,setTeamImg]=useState("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80")
    const [Member1,setMember1]=useState("Member1")
    const [Member2,setMember2]=useState("Member2")
    const [Member3,setMember3]=useState("Member3")
    const [Member4,setMember4]=useState("Member4")
    const [R1,seR1]=useState("Responsible1")
    const [R2,setR22]=useState("Responsible2")
    const [R3,setR3]=useState("Responsible3")
    const [R4,setR4]=useState("Responsible4")
    return ( 
        <>
        <BuyerNavBar />
             <div className="container con">
     <Link><Button className="ct" variant="outline-primary">Contact Now</Button></Link>
       <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="row ">
            <div className="col image">
              <img src={teamImg} className="rounded-circle" style={{width:"125px"}}/>
            </div>
            <div className="col text">
              <p>{title}</p> 
              <p><b> {leader}</b></p>        
            </div>
            </div>  
          </div>
          <div className="col-md-7">
            
            <div className="row">
              <div className="col">
              <TextField
                  required
                  defaultValue={Member1}
                  id="standard-required"
                  variant="standard"
                />
                 <br/>
        <br/>
                <TextField
          required
          defaultValue={Member2}
          id="standard-required"
          variant="standard"
        />
         <br/>
        <br/>
        <TextField
         required
         defaultValue={Member3}
         id="standard-required"
         variant="standard"
        />
        <br/>
        <br/>
        <TextField
          required
          defaultValue={Member4}
          id="standard-required"
          variant="standard"
        />
              </div>
              <div className="col">
              <TextField
          required
          defaultValue={R1}
          id="standard-required"
          variant="standard"
        />
         <br/>
        <br/>
        <TextField
          required
          defaultValue={R2}
          id="standard-required"
          variant="standard"
        />
         <br/>
        <br/>
        <TextField
         required
         defaultValue={R3}
         id="standard-required"
         variant="standard"
        />
         <br/>
        <br/>
        <TextField
          required
          defaultValue={R4}
          id="standard-required"
          variant="standard"
        />
        
              </div>
            </div>
          </div>
       </div>
     </div>
        </>
     );
}
 
export default Second;