import React, { useState, useEffect } from "react";
import "./second.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@material-ui/core/TextField";
import BuyerNavBar from "../navbars/BuyerNavbar"
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import BuyerBid from "../Bid/BuyerBid";
import { getTeamById } from "../../api";

const Second = () => {
  const [teamData, setTeamData] = useState({});
  const {id} = useParams();
  async function getTeamData(id){
     const response = await getTeamById(id);
     if(response.status === 200){
       console.log(response.data)
        setTeamData(response.data);
     }
  }

  useEffect(()=> {
    
    getTeamData(id);
    console.log(teamData)
  }, [id])

    return ( 
        <>
        <BuyerNavBar />
             <div className="container con">
              {teamData && teamData.teamMembers?  <BuyerBid teamData={teamData} />: null}
        
       <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="row ">
            <div className="col image">
              <img src={teamData.logo} className="rounded-circle" style={{width:"125px"}}/>
            </div>
            <div className="col text">
              <p>{teamData.title}</p> 
              <p><b> {teamData.leader}</b></p>        
            </div>
            </div>  
          </div>
          <div className="col-md-7">
            
            <div className="row">
            {teamData && teamData.teamMembers && (teamData.teamMembers).map((mem, idx) => {
              return (
                <div className="input_sec" key={idx}>
                  <input
                    id={idx}
                    placeholder="Member Name"
                    name="name"
                    value={mem.name}
                    className="inp_data outline-none"
                  />
                  <input 
                    id={idx}
                    name="responsibility"
                    placeholder="Responsibility"
                    className="inp_data outline-none"
                    value={mem.responsibility}
                  />
                 
                </div>
              );
            })}
            </div>
          </div>
       </div>
     </div>
        </>
     );
}
 
export default Second;