import React from "react";
import "../../Css Files/Bid.css";
import Popup from "reactjs-popup";
import { useState } from "react";
import { addBid } from "../../api";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import Button from 'react-bootstrap/Button';


const BuyerBid = ({teamData}) => {
  const { user } = useContext(UserContext);
  console.log(teamData)
  const [bidDetails, setBidDetails] = useState({
      title: '',
      status: 'sent',
      senderId: user._id,
      receiverId: teamData.createdBy,
      assignedBy: user._id,
      offerType: 'Buyer',
      assignedTo: teamData.createdBy,
      offer: '',
      budget: '',
      dealTime: '',
      percentOff: '',
      category: teamData.category,
  })
  function handleBidChange(e){
    let name = e.target.name;
    let value = e.target.value;
    setBidDetails({...bidDetails, [name]: value});

  }
  
 const handlePlaceBid = async() => {
   try{
    
    const response = await addBid(bidDetails);
    console.log(response);
    document.querySelector(".close").click();
    
   }catch(err){
    console.log(err)
   }
 }

  return (
    <>
      <span>
        <Popup
          trigger={
            <Button className="ct" variant="outline-primary">Contact Now</Button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="">
              <button className="btn-md close" onClick={close}>
                &times;
              </button>

              <div className="container ml">
                <div >
                  <div className="offer">
                    <textarea
                      className=" w-96 rounded-md border-gray-300"
                      name="title"
                      id="exampleFormControlTextarea1"
                      rows="1"
                      placeholder="Write Your Title"
                      onChange={handleBidChange}
                      value={bidDetails.title}
                    ></textarea>
                  </div>
                  <div className="offer">
                    <textarea
                      className=" w-96 rounded-md border-gray-300"
                      name="offer"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Describe your offer"
                      onChange={handleBidChange}
                      value={bidDetails.offer}
                    ></textarea>
                  </div>
                  <div className="buget  w-96 rounded-md">
                    <h5>Buget</h5>
                    <input
                      type="number"
                      name="budget"
                      id=""
                      placeholder="$"
                      onChange={handleBidChange}
                      value={bidDetails.budget}
                    />
                  </div>
                  <div className="buget  w-96 rounded-md">
                    <h5>Delivery Time</h5>
                    <input
                      type="number"
                      name="dealTime"
                      id=""
                      onChange={handleBidChange}
                      value={bidDetails.dealTime}
                    />
                  </div>
                  <div className="buget  w-96 rounded-md">
                    <h5>Percntage Off</h5>
                    <input
                      type="number"
                      name="percentOff"
                      id=""
                      onChange={handleBidChange}
                      value={bidDetails.percentOff}
                    />
                  </div>

                  <div className="submit">
                    <button type="button" className="w-24 h-10 bg-blue-600 text-white hover:bg-blue-400" onClick={handlePlaceBid}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </span>
    </>
  );
};

export default BuyerBid;
