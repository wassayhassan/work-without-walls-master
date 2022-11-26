import React,  { useState, useEffect, useContext }  from "react";
import "./firstteam.css";
import BuyerNavBar from "../navbars/BuyerNavbar"
import Button from 'react-bootstrap/Button';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTeamsByCategory } from "../../api";
import { UserContext } from "../../context/user.context";
const Firstteam = () => {
  const [teams, setTeams] = useState([]);
  const {user} = useContext(UserContext)
  const {category} = useParams();
  async function getTeams(categ){
    const response = await getTeamsByCategory(categ);
    console.log(response)
    if(response.status === 200){
      setTeams(response.data);
    }
  }
  useEffect(()=> {
    getTeams(category);
  }, [category])
    return ( 
    <>
        <BuyerNavBar/>
    {teams && teams.map((team)=> {
      return (
        <div className="new" key={team._id}>
        <div className="main">
        <div className="container-md p-5 my-5 border">
          <div className="icons">
            <img className="rounded-circle" style={{width:"100px"}} src={team.logo} />
         </div>
         <div className="data" >
      <p >{team.title} </p>
      {team.createdBy === user._id? <p>{"(mine)"}</p>: null}
      <div className="head">
        <p><b>{team.leaderName}</b></p>
        <Link to={`/buyer/team/${team._id}`}>
        <Button variant="outline-primary">Details</Button></Link>
      </div>
      </div>
        </div>
      </div>
      </div>
      )
    })}

   
    </> );
}
 
export default Firstteam;