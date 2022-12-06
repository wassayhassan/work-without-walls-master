import React, { useState } from "react";
import Popup from "reactjs-popup";
import BuyerNavbar from "./navbars/BuyerNavbar"
import {createJob} from "../api/index"
import loading from "./Loading"
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
const PostYourGIG = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [gigTitle, setGigTitle] = useState("");
  const [buget, setBuget] = useState("");
  const [description, setDescription] = useState("");
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
  const [category, setCategory] = useState(options[0].value);
  const [img1, setImg1] = useState("");
 
const submithandler=async()=>{
  try{
    const formData = new FormData();
    formData.append("img1",img1)
    formData.append("budget",buget)
    formData.append("gigTitle",gigTitle)
    formData.append("description",description)
    formData.append("options",options)
    formData.append("category",category)

    const response = await createJob(formData);
    if (response?.data) {
      navigate("/active-orders");
    }
    setIsLoading(false);
  }
 catch{
  setIsLoading(false);
      console.log("error");
 }


}

  let upload = (image, setIamge) => {
    return (
      <div className="col-3">
        <div className="card">
          <div className="card-body">
            <Popup
              trigger={
                <div>
                  {image !== "" ? (
                    <img src={image} alt="GIG 1" className="card-img" />
                  ) : (
                    <div>
                      <i
                        className="fa fa-camera fa-3x my-4 mx-4"
                        aria-hidden="true"
                      ></i>
                      <span className="ml-2">Add Image</span>
                    </div>
                  )}
                </div>
              }
              modal
              nested
            >
              {(close) => (
                <div className="">
                  <button className="btn-md close" onClick={close}>
                    &times;
                  </button>

                  <div className="card-body">
                    <div className="form-group">
                      <h4>Upload image</h4>
                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          id="form3Example90"
                          className="form-control form-control-lg"
                          onChange={(e) => {
                            setIamge(URL.createObjectURL(e.target.files[0]));
                          }}
                        />
                        <label className="form-label" for="form3Example90">
                          Upload image here
                        </label>
                      </div>
                      <button
                        className="btn-sm btn-primary mt-3"
                        onClick={close}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <BuyerNavbar/>
      <div className="container my-3">
        <h1 className="text-center">Post Your Buyer Request</h1>
        <hr className="bg-dark" />
        <div className="container my-4">
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <div className="my-2">
                  <label>
                    <b> GIG Title </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add title"
                    onChange={(e) => {
                      setGigTitle(e.target.value);
                    }}
                    value={gigTitle}
                  />
                </div>
                <div className="my-3">
                  <label>
                    <b> Buget </b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="$0.00"
                    value={buget}
                    onChange={(e) => {
                      setBuget(e.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <label>
                    <b> Description </b>
                  </label>
                  <textarea
                    type=""
                    className="form-control"
                    rows="4"
                    placeholder="Type the description here"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                {/* you are not passing anything from here, but expect data in function */}
                <button type="button" onClick={submithandler} className="btn btn-success">
                  Publish GIG
                </button>
              </div>
            </div>
            <div className="col-8">
              <div className="form-group">
                <div className="my-2">
                  <label>
                    <b> Category </b>
                  </label>
                  <select
                    className="form-control"
                    value={category}
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
                  </select>
                </div>
              </div>
              <div className="my-2 mx-2 h-75">
                <label>
                  <b> Attached Images </b>
                </label>
                <div className="row">
                  {upload(img1, setImg1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostYourGIG;
