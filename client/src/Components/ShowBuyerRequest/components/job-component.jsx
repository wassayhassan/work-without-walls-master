import React, { useEffect, useState } from "react";
import "../../../Css Files/ActivityReq.css";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import Popup from "reactjs-popup";
import { FaPen } from "react-icons/fa";

const JobComponent = ({ job, onSubmit, onDelete }) => {
  const [jobData, setJobData] = useState({
    _id: null,
    gigTitle: "",
    budget: "",
    category: "",
    description: "",
    img: null
  });

  useEffect(() => {
    if (job) {
      const obj = {
        gigTitle: job?.gigTitle,
        budget: job?.budget,
        category: job?.category,
        description: job?.description,
        _id: job?._id,
      };
      setJobData(obj);
    }
  }, [job]);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };
  const [img, setimg] = useState("");
  const [edit, setEdit] = useState(false);
  const editStyle = {
    visibility: `${edit ? "" : "hidden"}`,
  };
  return (
    <div className="container col-9 rounded cc mt-5">
      <div
        className="row mt-4 rounded shadow-lg border border-primary
              border-primary"
      >
        <div className="col-md-10 pt-2 pb-3">
          <div className="bit-content">
            <div className="container-h">
              <h4 className="ml-3">
                {jobData.gigTitle}
                <span style={editStyle}>
                  <Popup trigger={<FaPen className="ml-3" />} modal nested>
                    {(close) => (
                      <div className="">
                        <button className="btn-md close" onClick={close}>
                          &times;
                        </button>

                        <div className="card-body">
                          <div className="form-group">
                            <h4>Gig Tittle</h4>
                            <input
                              className="form-control"
                              placeholder="Enter skill"
                              name="gigTitle"
                              onChange={handleChange}
                              value={jobData?.gigTitle}
                            ></input>
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
                </span>
              </h4>
              <div className="mt-3">
                <h6 className="ml-3">
                  Budget {jobData.budget}$
                  <span style={editStyle}>
                    <Popup trigger={<FaPen className="ml-3" />} modal nested>
                      {(close) => (
                        <div className="">
                          <button className="btn-md close" onClick={close}>
                            &times;
                          </button>

                          <div className="card-body">
                            <div className="form-group">
                              <h4>Budget</h4>
                              <input
                                className="form-control"
                                placeholder="Enter skill"
                                name="budget"
                                onChange={handleChange}
                                value={jobData?.budget}
                              ></input>
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
                  </span>
                </h6>
              </div>
            </div>
            <div className="mt-3">
              <p className="col-10 ">
                {jobData.description}
                <span style={editStyle}>
                  <Popup trigger={<FaPen className="ml-3" />} modal nested>
                    {(close) => (
                      <div className="">
                        <button className="btn-md close" onClick={close}>
                          &times;
                        </button>

                        <div className="card-body">
                          <div className="form-group">
                            <h4>Description</h4>
                            <input
                              className="form-control"
                              placeholder="Enter skill"
                              name="description"
                              onChange={handleChange}
                              value={jobData?.description}
                            ></input>
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
                </span>
              </p>
            </div>
          </div>
          <div className="mt-3">
            <h6 className="ml-3">Category</h6>
            <span className="ml-3">
              {jobData.category}
              <span style={editStyle}>
                <Popup trigger={<FaPen className="ml-3" />} modal nested>
                  {(close) => (
                    <div className="">
                      <button className="btn-md close" onClick={close}>
                        &times;
                      </button>

                      <div className="card-body">
                        <div className="form-group">
                          <h4>Category</h4>
                          <input
                            className="form-control"
                            placeholder="Enter skill"
                            name="category"
                            onChange={handleChange}
                            value={jobData?.category}
                          ></input>
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
              </span>
            </span>
          </div>
          <div className="mt-3 ">
            <i>
              {/* <img className="font-weight-bold mb-1 pl-3" src={job.img1} /> */}
              <i>
                <a className="font-weight-bold mb-1 px-4" href={job.img1}>
                  Attached Image
                </a>
              </i>
            </i>
            {edit ? (
              <span style={editStyle}>
                <Popup trigger={<FaPen className="ml-3" />} modal nested>
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
                              name="img"
                              onChange={(e) => {
                                setJobData({
                                  ...jobData,
                                  img: e?.target?.files[0]
                                })
                              }}
                            />
                            <label className="form-label" for="form3Example90">
                              Upload Your image
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
              </span>
            ) : (
              <></>
            )}
          </div>
          <div>
            {edit ? (
              <button
                className="btn btn-info rounded mt-3"
                onClick={() => onSubmit(jobData)}
              >
                Save Profile
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-md-2 pt-5">
          <div className=" pt-2">
            <button
              className=" button button-primary"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <AiFillEdit size={35} color="blue" />
            </button>
          </div>
          <div className="pt-3">
            <button className="button  button-primary" onClick={() => {
              if(window?.confirm("Are you sure?")){
                onDelete(job)
              }
              }}>
              <AiFillDelete size={35} color="blue" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobComponent;
