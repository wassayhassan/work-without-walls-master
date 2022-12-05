import React,  { useState, useEffect, useContext }  from "react";
import "./firstteam.css";
import BuyerNavBar from "../navbars/BuyerNavbar"
import { Spinner, Pagination, TextInput} from 'flowbite-react';
import Button from 'react-bootstrap/Button';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTeamsByCategory } from "../../api";
import { UserContext } from "../../context/user.context";
import Team from "./Team.component";
const Firstteam = () => {
  const [teams, setTeams] = useState([]);
  const {user} = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const {category} = useParams();
  async function getTeams(categ, page, search){
    setLoading(true);
    const response = await getTeamsByCategory(categ, page, search);
    console.log(response)
    setLoading(false)
    if(response.status === 200){
      setTeams(response.data.teams);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentpage);
    }
  }
 async function handleSearchChange(e){
   setSearch(e.target.value);
 }
 useEffect(()=> {
  getTeams(category, currentPage, search);
 }, [search])
  useEffect(()=> {
    getTeams(category, currentPage, search);
  }, [category]);
  async function handlePageChange(e){
    getTeams(category, e, search)
  }



  
    return ( 
    <>
        <BuyerNavBar/>
        <div className="m-2">
          <TextInput style={{outline: 'none'}} placeholder="Search..." className="outline-blue-300 mt-7" onChange={handleSearchChange} value={search} />
        </div>
        <div className="flex flex-row flex-wrap">    
          {teams && teams.map((team)=> {
        return <Team team={team} key={team._id} />
    })}

        </div>
        <div className="flex flex-row justify-center mt-3">
            {totalPages > 1 &&  <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            showIcons={true}
            totalPages={totalPages}
          />}
        </div>

   
    <div className='flex flex-row justify-center mt-3'>
        {loading? <Spinner/>: null}

    </div>


   
    </> );
}
 
export default Firstteam;