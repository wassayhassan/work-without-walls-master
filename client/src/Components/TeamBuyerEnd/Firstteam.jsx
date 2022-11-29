import React,  { useState, useEffect, useContext }  from "react";
import "./firstteam.css";
import BuyerNavBar from "../navbars/BuyerNavbar"
import Button from 'react-bootstrap/Button';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTeamsByCategory } from "../../api";
import { UserContext } from "../../context/user.context";
import Team from "./Team.component";
const Firstteam = () => {
  const [teams, setTeams] = useState([]);
  const {user} = useContext(UserContext)
  const [reviews, setReviews] = useState(null);
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
        <div className="flex flex-row flex-wrap">    
          {teams && teams.map((team)=> {
        return <Team team={team} key={team._id} />
    })}

        </div>


   
    </> );
}
 
export default Firstteam;