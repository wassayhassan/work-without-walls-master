import React, {useState, useEffect, useContext} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import Review from '../review.component';
import { Rating } from '@mui/material';
import { getReviewsByTeamId } from '../../api';
import { UserContext } from '../../context/user.context';
import { Button } from 'flowbite-react';

const Team= ({team}) => {
    const {user} = useContext(UserContext)
    const [rating, setRating] = useState(null);
    const [reviews, setReviews] = useState([]);
    async function getReviews(id){

        let data = await getReviewsByTeamId(id);
       let rat = 0;
       setReviews(data.data);
       data.data.forEach((rati)=> {
        rat += rati.overallRating;
       })
       let finalRating = rat/data.data.length;
       setRating(finalRating);
      }
      useEffect(()=> {
        setReviews([])
         setRating(null);
         getReviews(team._id);
      }, [team])

      if(team.createdBy === user._id){
        return
      }
  return (
        <div className="new" >
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
            <div className="flex flex-row">
                <Rating
                    name="read-only" 
                    readOnly
                    value={rating}
                />
                <p className="m-1">{"("}{reviews.length}{")"} Reviews</p>
            </div>

            <Link to={`/buyer/team/${team._id}`}>
            <Button variant="outline-primary">Details</Button></Link>
        </div>
        </div>
            </div>
        </div>
      </div>
  )
}

export default Team;