import "../../Css Files/team.css";
import star from "../../Images/team/star.png";
import profile from "../../Images/team/gall6.jpg";
import { Link, Navigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { updateTeam } from "../../api";
import SellerNavbar from "../navbars/sellerNavbar";
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from "react-router-dom";
import { getTeamById } from "../../api";
const Members = () => {

  const [teamData, setTeamData] = useState({});
  const [membersData, setMembersData] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  async function getTeamData(id){
     const response = await getTeamById(id);
     if(response.status === 200){
       console.log(response.data)
        setTeamData(response.data);
        setMembersData(response.data.teamMembers);
     }
  }

  useEffect(()=> {
    getTeamData(id);
  }, [id])
  

  const handleUpdateTeam = async() => {
    let data = {
        teamMembers: membersData
    };
    const response = await updateTeam(id, data);
    if(response.status === 200){
      navigate(`/sellerteam/${teamData._id}`)
    }
  }

  const handleMembersChange = (e) => {
   let id = e.target.id;
   let name = e.target.name;
   let value = e.target.value;
   setMembersData(membersData.map((mem)=> parseInt(mem.id) === parseInt(id)? {...mem, [name]: value}: mem))
  }


  return (
    <>
      <SellerNavbar />
      <div className="main_4">
        <div className="sec_one_pg_4">
          <div>
            <img src={teamData.logo} alt="" className="circle" srcset="" />
          </div>
          <div className="name">
            <span className="team_ti">{teamData.title}</span>
          </div>
        </div>

        <div className="flex_for_4">
          <div>
            <div className="about">

              <div className="name">
                <span>{teamData.leaderName}</span>
                <br />
                <span className="team_text ml-2">Team Leader</span>
              </div>
            </div>
           
            {/* end */}
            <br />

           
          </div>

          <div className="contact align-items-center">
            {(membersData).map((mem, idx) => {
              return (
                <div className="input_sec" key={idx}>
                  <input
                    id={idx}
                    placeholder="Member Name"
                    name="name"
                    value={mem.name}
                    className="inp_data outline-none"
                    onChange={handleMembersChange}
                  />
                  <input 
                    id={idx}
                    name="responsibility"
                    placeholder="Responsibility"
                    className="inp_data outline-none"
                    value={mem.responsibility}
                    onChange={handleMembersChange}
                  />
                 
                </div>
              );
            })}
            <br />
            <br />
            <br />

            <div style={{marginLeft:"12rem"}}>

                <Button className="align-items-center" onClick={handleUpdateTeam}>Submit</Button>
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
