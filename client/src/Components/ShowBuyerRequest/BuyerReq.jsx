import React, { useEffect, useState } from "react";
import "../../Css Files/BRafterPosting.css";
import SellerNavbar from "../navbars/sellerNavbar";
import {getJobs} from "../../api/index"
import Bid from "../Bid/Bid"
const BuyerReq = () => {
  const [allJobs, setAllJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const response = await getJobs();
      const data = response?.data;
      setAllJobs(data?.data);
    } catch (e) {
      setAllJobs([]);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div>
      <SellerNavbar />
      <i>
        <b>
          <h2 className="mt-5 font-weight-bold" style={{ textAlign: "center" }}>
            Buyer Request
          </h2>
        </b>
      </i>
      <div className="container  col-md-9 col-sm-6 ">
        {allJobs?.map((job, index) => (
          <div className="col mt-4  shadow-lg cc border align-items-center 
           border-primary bit-content" key={job._id}>
            <div className="ch" >
              <div>
                <h4 className="pl-4">{job.gigTitle}</h4>
              </div>
              <div style={{justifyContent: 'end'}}>
                <b>
                  <h6>Budget: 
                  <span>{job.budget} $</span>
                  </h6>
                </b>
              </div>
            </div>
            <div className="de">
              <p className="pl-3">{job.description}</p>
            </div>

            <div className="ccategory">
              <b>
                <h6 className="px-4">Category</h6>
              </b>
              <span className="px-4">{job.category}</span>
            </div>

            <div className="mt-3">
              <p className="text-secondary mb-1 px-4">{job.createdAt}</p>
            </div>
            <div className="mt-3">
              <i>
                <a className="font-weight-bold mb-1 px-4" href={job.img1}>
                  Attached Image
                </a>
              </i>
            </div>

            <div className="text-right" >
              <Bid jobid={job._id} jobDescription={job.description} creator={job.createdBy}/>
            </div>
          </div> 
        ))}
      </div>
    </div>
  );
};


export default BuyerReq;
