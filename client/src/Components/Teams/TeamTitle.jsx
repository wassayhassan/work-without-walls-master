import React, { useState, useEffect, useContext } from "react";
import "../../Css Files/team.css";
import video from "../../Images/team/gall6.jpg";
import { Link } from "react-router-dom";
import SellerNavbar from "../navbars/sellerNavbar";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../context/user.context";
import { createTeam } from "../../api";
import { useNavigate } from "react-router-dom";
import { getTeamsCountByUserId } from "../../api";
const TeamTitle = () => {
  const [logo, setLogo] = useState(null);
  const {user} = useContext(UserContext);
 const [err, setErr] = useState(null);
 const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [teamMembers, setTeamMembers] = useState(2);
  const [category, setCategory] = useState('webdevelopment');
  const [disabled, setDisabled] = useState(false);
  const options = [
    { value: "webdevelopment", text: "Web Development" },
    { value: "database", text: "Database" },
    { value: "Content Writting", text: "Content Writting" },
    { value: "artificalintelligence", text: "Artifical Intelligence" },
    { value: "gamedevelopment", text: "Game Development" },
    { value: "dataentry", text: "Data Entry" },
    { value: "dip", text: "DIP" },
    { value: "appdevelopment", text: "App Development" },
    { value: "machinelearning", text: "Machine Learning" },
  ];

  const handleCreateTeam = async() => {
    setLoading(true);
    setErr(null);
    let data = new FormData();
    if(!title){
      setErr("You have not entered the Title name");
      setLoading(false);
      return;
    }
    data.append("title", title);
    if(!logo){
      setErr("You have not selected the logo");
      setLoading(false);
      return;
    }
    data.append("logo", logo);
    data.append('membersCount', teamMembers)
    data.append("leaderName", leaderName);
    if(!leaderName){
      setErr("You have not selected the leader Name");
      setLoading(false);
      return;
    }
    data.append("createdBy", user._id);
    if(!category){
      setErr("You have not selected the category");
      setLoading(false);
      return;
    }
    data.append('category', category);
    const response = await createTeam(data);
    setLoading(false);
    if(response.status !== 400){
      navigate(`/team/${response.data._id}/members/`);
    }
   
  }
  async function getCount(id){
    const res = await getTeamsCountByUserId(id);
    if(res.data.count >= 3){
      setDisabled(true);
    }
  }

  useEffect(()=> {
    getCount(user._id)
  }, [user])

  return (
    <div>
      < SellerNavbar/>
        <div className="main_3">
            <br />
            <div className="right_div">
          <div className="sec_uplod_logo">
            <div className="to_flex">
              <div className="circle">
                <img src={logo? URL.createObjectURL(logo): null} alt="" className="circle" srcset="" />
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
                  setLogo(e.target.files[0]);
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
                className="Up_Name inp_data outline-none"
                onChange={(e) => {
                  setLeaderName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mt-3 ml-2">
                  <select
                    className="w-56 rounded-md"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
            </div>

            <div className="to_flex" id="Last_div">
              <p>Select number of team members</p>
              <select
                className="mb_num"
                onChange={(e) => {
                  setTeamMembers(e.target.value);
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
      {disabled? <p className="text-base text-red-500 ml-6 font-medium">Cannot create another team as you have already created 3 Teams</p>: null}
      {err? <p className="text-base text-red-500 ml-40 font-medium">{err}</p>: null}
      <div className="flex flex-row justify-end">

          {(!loading)? <Button className="m-4"  onClick={handleCreateTeam} disabled={disabled} >Next</Button>: null}
          {loading?    <Button className="m-4" disabled={true} >Processing</Button>: null}
      </div>


        
     
    </div>
  );
};

export default TeamTitle;
