import React, { useEffect, useState } from "react";
import "../../Css Files/BRafterPosting.css";
import SellerNavbar from "../navbars/sellerNavbar";
import { Spinner, Pagination, TextInput, Select} from 'flowbite-react';
import {getJobs} from "../../api/index"
import Bid from "../Bid/Bid"

const options = [
  { value: "all", text: "All" },
  { value: "Web Development", text: "Web Development" },
  { value: "Database", text: "Database" },
  { value: "Content Writting", text: "Content Writting" },
  { value: "Artifical Intelligence", text: "Artifical Intelligence" },
  { value: "Game: Development", text: "Game Development"},
  { value: "Machine Learning", text: "Machine Learning"},
  { value: "App Development", text: "App Development"},
  { value: "DIP", text: "DIP"},
  {value: "Data Entry", text: "Data Entry"}
];


const BuyerReq = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState(options[0].value);

  async function handlePageChange(e){
    console.log(e);
    getAllJobs(e, search);
  }
  async function handleSearchChange(e){
     setSearch(e.target.value);
  }

  const getAllJobs = async (page, search, category) => {
    setLoading(true)
    try {
      const response = await getJobs(page, search, category);
      setLoading(false);
      const data = response?.data;
      setAllJobs(data?.data);
      setTotalPages(data?.totalPages)
      setCurrentPage(data?.currentpage)
    } catch (e) {
      setLoading(false);
      setAllJobs([]);
    }
  };

  useEffect(()=> {
     getAllJobs(currentPage, search, category);
  }, [search, category])

  return (
    <div>
      <SellerNavbar />
      <div className="m-2 mt-3 flex flex-row justify-center">
      <TextInput style={{outline: 'none', width: "40em"}} placeholder="Search..." onChange={handleSearchChange} value={search} />
        <div className="mx-2">
          <Select
                    value={category}
                    style={{width: "12em"}}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setCategory(e.target.value);
                    }}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
          </Select>
        </div>
      </div>
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
              <Bid jobid={job._id} jobDescription={job.description} creator={job.createdBy} job={job}/>
            </div>
          </div> 
        ))}
        
      </div>
      <div className="flex flex-row justify-center mt-3">
      {totalPages && totalPages > 1 &&  <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        showIcons={true}
        totalPages={totalPages}
      />}
      </div>

   
    <div className='flex flex-row justify-center mt-3'>
        {loading? <Spinner/>: null}

    </div>
    </div>
  );
};


export default BuyerReq;
