import React from "react";
import "../../Css Files/Bid.css";
import Popup from "reactjs-popup";
import { useState } from "react";
import { addBid } from "../../api";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";



const Bid = ({jobid, jobDescription, creator, job}) => {
  const { setuser, user } = useContext(UserContext);

  
  const [request, setRequest] = useState(
    jobDescription
  );
  const [bidDetails, setBidDetails] = useState({
      jobId: jobid,
      title: job.gigTitle,
      status: 'sent',
      senderId: user._id,
      receiverId: creator,
      offer: '',
      budget: '',
      dealTime: '',
      percentOff: '',
      category: job.category,
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
            <button type="button" class="btn btn-primary">
              Bid
            </button>
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
                  <div className="request-area area">
                    <p>{request}</p>
                  </div>
                  <div className="offer">
                    <textarea
                      className="form-control"
                      name="offer"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Describe your offer"
                      onChange={handleBidChange}
                      value={bidDetails.offer}
                    ></textarea>
                  </div>
                  <div className="buget">
                    <h5>Buget</h5>
                    <input
                      type="number"
                      name="budget"
                      id=""
                      placeholder="$"
                      onChange={handleBidChange}
                      value={bidDetails.buget}
                    />
                  </div>
                  <div className="buget">
                    <h5>Delivery Time</h5>
                    <input
                      type="number"
                      name="dealTime"
                      id=""
                      onChange={handleBidChange}
                      value={bidDetails.dealTime}
                    />
                  </div>
                  <div className="buget">
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
                    <button type="button" className="btn btn-primary" onClick={handlePlaceBid}>
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

export default Bid;
