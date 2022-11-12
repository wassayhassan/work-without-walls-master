import React, { useEffect, useState } from "react";
import "../../Css Files/ActivityReq.css";
import { getYourJobs, updateYourJobs, deleteYourJobs } from "../../api/index";
import BuyerNavbar from "../navbars/BuyerNavbar";
import JobComponent from "./components/job-component";
const ActiveOrders = () => {

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("img1", data?.img);
    formData.append("gigTitle", data?.gigTitle);
    formData.append("budget", data?.budget);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("user", localStorage.getItem("user"));

    const {
      data: { message },
    } = await updateYourJobs(data._id, formData);

    alert(message);
    window?.location?.reload()
  };

  const onDelete = async (job) => {
    try {
      await deleteYourJobs(job?._id);
      alert("deleted!!!!");
      window?.location?.reload()
    } catch (e) {
      alert("something went wrong");
    }
  };

  const [allJobs, setAllJobs] = useState([]);

  const YourJobs = async () => {
    try {
      const response = await getYourJobs();
      const data = response?.data;
      setAllJobs(data?.data);
    } catch (e) {
      setAllJobs([]);
    }
  };

  useEffect(() => {
    YourJobs();
  }, []);

  return (
    <div>
      <BuyerNavbar />
      <h2 className="mt-5 text-center font-weight-bold">Your Active Orders</h2>
      {allJobs?.map((job, index) => {
        return (
          <JobComponent
            job={job}
            key={index}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default ActiveOrders;
