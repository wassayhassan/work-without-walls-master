import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { FaPen } from "react-icons/fa";
import "reactjs-popup/dist/index.css";
import Loading from "./Loading";
import { getUserMe } from "../api";
import Review from "./review.component";
import Rating from '@mui/material/Rating';
import {updateProfile, getReviewsByUserId} from '../api/index'

const localStorageUser = JSON.parse(localStorage.getItem("user"));

const ProfileUser = () => {
  const [profileImg, setProfileImg] = useState(
    "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const [name, setname] = useState("Name");
  const [userRating, setUserRating] = useState(5);
  const [sellerReviews, setSellerReviews] = useState([]);
  const [buyerReviews, setBuyerReviews] = useState([]);
  const [title, setTitle] = useState("Dummy title");
  const [rate, setRate] = useState("5.5");
  const [description, setDescription] = useState("Describe your work");
  const [workHistory, setWorkHistory] = useState("Your experience");

  const [skill1, setSkill1] = useState("Skill 1");
  const [skill2, setSkill2] = useState("Skill 2");
  const [skill3, setSkill3] = useState("Skill 3");
  const [lang1, setLang1] = useState("Lang 1");
  const [lang2, setLang2] = useState("Lang 2");
  const [lang3, setLang3] = useState("Lang 3");
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const editStyle = {
    visibility: `${edit ? "" : "hidden"}`,
  };
  const fetchUser = async () => {
    try {
      if (localStorageUser) {
        const response = await getUserMe();
        const user = response?.data?.data?.user;
        user.firstname &&
          user.lastname &&
          setname(user.firstname + " " + user.lastname);
        user.profileImg && setProfileImg(user.profileImg);
  
        user.rate && setRate(user.rate);
        user.description && setDescription(user.description);
        user.title && setTitle(user.title);
        user.workHistory && setWorkHistory(user.workHistory);
        user.skill1 && setSkill1(user.skill1);
        user.skill2 && setSkill2(user.skill2);
        user.skill3 && setSkill3(user.skill3);
        user.lang1 && setLang1(user.lang1);
        user.lang2 && setLang2(user.lang2);
        user.lang3 && setLang3(user.lang3);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  async function getReviews(id){

    let data = await getReviewsByUserId(id);
   let rat = 0;
   data.data.forEach((rati)=> {

     
     if(rati.rtype === "Seller"){
      rat += rati.overallRating;
      setSellerReviews((prev)=> [...prev, rati])
     }else{
        setBuyerReviews((prev) => [...prev, rati]);
        rat += rati.overallRating;
     }
   })
   let finalRating = rat/data.data.length;
   setUserRating(finalRating);
  }
  useEffect(()=> {
    if(localStorageUser && localStorageUser._id){
      setSellerReviews((prev)=> []);
      setBuyerReviews((prev)=> []);
      getReviews(localStorageUser._id);
    }

  }, [localStorageUser])

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, []);

  const submitHandler = async () => {
    alert("called")
    const response = await getUserMe();
    const user = response?.data?.data?.user;
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("name", name);
    formData.append("title", title);
    formData.append("rate", rate);
    formData.append("description", description);
    formData.append("workHistory", workHistory);
    formData.append("skill1",skill1);
    formData.append("skill2",skill2);
    formData.append("skill3",skill3);
    formData.append("lang1",lang1);
    formData.append("lang2",lang2);
    formData.append("lang3",lang3);
    formData.append("user", localStorage.getItem("user"));
    const {
      data: { message },
    } = await updateProfile(user?._id,formData) ;
    window?.location?.reload()
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="container">
        <div className="main-body py-3">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      alt="None"
                      className="rounded-circle"
                      width="150"
                      src={
                        typeof profileImg !== "string"
                          ? URL.createObjectURL(profileImg)
                          : profileImg
                      }
                    />
                    {edit ? (
                      <span style={editStyle}>
                        <Popup
                          trigger={<FaPen className="ml-3" />}
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
                                  <h4>Upload profile image</h4>
                                  <div className="form-outline mb-4">
                                    <input
                                      type="file"
                                      id="form3Example90"
                                      className="form-control form-control-lg"
                                      onChange={(e) => {
                                        setProfileImg(e.target.files[0]);
                                      }}
                                    />
                                    <label
                                      className="form-label"
                                      for="form3Example90"
                                    >
                                      Upload Your Profile image
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
                    <div className="mt-3 flex flex-col">
                      <h2>{name}</h2>
                      <h4 className="mb-1">{title}</h4>
                      <div className="flex flex-row">
                          <Rating
                              name="read-only" 
                              readOnly
                              value={userRating}
                            />
                            <p className="m-1">{"("}{sellerReviews.length + buyerReviews.length}{")"} Reviews</p>
                      </div>

                        <div className="flex flex-row">
                        <button
                            className="btn btn-info rounded px-3 py-2 m-1"
                            onClick={()=> submitHandler()}
                          >
                            Save Profile
                      </button>
                      <button
                            className="btn btn-info rounded px-3 py-2 m-1"
                            onClick={() => {
                              setEdit(!edit);
                            }}
                          >
                            Edit Profile
                      </button>
                        </div>
                     
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-3">
                <h4 className="mt-2 ml-3">Skills</h4>
                <div className="ml-3 mt-2">
                  <p>
                    {skill1}
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>

                            <div className="card-body">
                              <div className="form-group">
                                <h4>Skill 1</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter skill"
                                  onChange={(e) => {
                                    setSkill1(e.target.value);
                                  }}
                                  value={skill1}
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
                  <p>
                    {skill2}
                    <span style={editStyle}>
                      <Popup
                        style={editStyle}
                        trigger={<FaPen className="ml-3" />}
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
                                <h4>Skill 2</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter skill"
                                  onChange={(e) => {
                                    setSkill2(e.target.value);
                                  }}
                                  value={skill2}
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
                  <p>
                    {skill3}
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>

                            <div className="card-body">
                              <div className="form-group">
                                <h4>Skill 3</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter skill"
                                  onChange={(e) => {
                                    setSkill3(e.target.value);
                                  }}
                                  value={skill3}
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

              <div className="card mt-3">
                <h4 className="mt-2 ml-3">Languages</h4>
                <div className="ml-3 mt-2">
                  <p>
                    {lang1}
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>

                            <div className="card-body">
                              <div className="form-group">
                                <h4>Language 1</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter skill"
                                  onChange={(e) => {
                                    setLang1(e.target.value);
                                  }}
                                  value={lang1}
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
                  <p>
                    {lang2}
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>

                            <div className="card-body">
                              <div className="form-group">
                                <h4>Language 2</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter skill"
                                  onChange={(e) => {
                                    setLang2(e.target.value);
                                  }}
                                  value={lang2}
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
                  <p>
                    {lang3}
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>

                            <div className="card-body">
                              <div className="form-group">
                                <h4>Language 3</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter skill"
                                  onChange={(e) => {
                                    setLang3(e.target.value);
                                  }}
                                  value={lang3}
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
            </div>

            <div className="col-md-8">
              <div className="card mb-3">
                <div className="mt-3 ml-3">
                  <h4>
                    <span>{title}</span>
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>
                            <div className="card-body">
                              <div className="form-group">
                                <h4>Title</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter Title"
                                  onChange={(e) => {
                                    setTitle(e.target.value);
                                  }}
                                  value={title}
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
                    <span
                      className="ml-5"
                      style={{ float: "right", marginRight: "5%" }}
                    >
                      {" "}
                      $ {rate} /hr
                    </span>
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>
                            <div className="card-body">
                              <div className="form-group">
                                <h4>Hourly Rate</h4>
                                <input
                                  className="form-control"
                                  placeholder="Enter Rate"
                                  onChange={(e) => {
                                    setRate(e.target.value);
                                  }}
                                  value={rate}
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
                </div>
                <div className="card-body">
                  <h5>Description</h5>
                  <p>
                    {description}
                    <span style={editStyle}>
                      <Popup trigger={<FaPen className="ml-3" />} modal nested>
                        {(close) => (
                          <div className="">
                            <button className="btn-md close" onClick={close}>
                              &times;
                            </button>
                            <div className="card-body">
                              <div className="form-group">
                                <h4>Descriptioin</h4>
                                <textarea
                                  className="form-control mt-2"
                                  rows="3"
                                  placeholder="Enter description"
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                  value={description}
                                ></textarea>
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

                  <a>more</a>
                </div>
              </div>
              <div className="card mb-3">
                <div className="mt-3 ml-3">
                  <h3>Work History</h3>
                </div>
                <div className="card-body">
                  <p>
                    {workHistory}
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
                                <textarea
                                  className="form-control mt-2"
                                  rows="3"
                                  placeholder="Enter work history"
                                  onChange={(e) => {
                                    setWorkHistory(e.target.value);
                                  }}
                                  value={workHistory}
                                ></textarea>
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
                  <a>more</a>
                </div>
              </div>
              <div>
                <div className="reviews p-2">
                   <p className="font-semibold text-lg">{(sellerReviews.length> 0)? 'Reviews as Seller': null}</p>
                   <div>
                    {sellerReviews && sellerReviews.map((review)=> {
                      return <Review review={review} key={review._id} />
                    })}
                   </div>
                   <div className="reviews p-2">
                   <p className="font-semibold text-lg">{(buyerReviews.length> 0)? 'Reviews as Buyer': null}</p>
                   <div>
                    {buyerReviews && buyerReviews.map((review)=> {
                      return <Review review={review} key={review._id}/>
                    })}
                   </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
