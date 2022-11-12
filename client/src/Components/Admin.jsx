import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import  { logoutUser } from "../api";
import "./navbars/sellerNavbar.css"
import Button from 'react-bootstrap/Button';
const Admin = () => {
  const navigate = useNavigate();
  const [currentBtnState, setcurrentBtnState] = useState("dashboard");
  const [allUsers, setallUsers] = useState([]);
  const { setuser } = useContext(UserContext);
  const logoutUserClick = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // do nothing
    }
    localStorage.removeItem("user");
    setuser(null);
    navigate("/login");
  };
  useEffect(() => {
    axios
      .get("/api/")
      .then((res) => {
        setallUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentBtnState]);

  const approveUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const disapproveUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: false })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const blockUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: false })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`/admin/delete-user/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
       <div className="topbarContainer ">
          <div className="topbarLeft">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="logo">
                  <img
                    className="pic"
                    src={logo}
                    alt=""
                  ></img>
                </span>
            </Link>
            </div>
      </div>

      <div className="row">
        <div className="col-2 cb" >
          <nav className="vh-100">
            <ul class="mb-0 und">
              <li class="nav-item" style={{ paddingTop: "5rem" }}>
                <Button
                  onClick={() => setcurrentBtnState("dashboard")}
                  variant="outline-secondary"
                  size="md"
                >
                  {" "}
                  Dashboard{" "}
                </Button>
              </li>
              <li class="nav-item" style={{marginTop:"1.5rem"}}>
                <Button
                  onClick={() => setcurrentBtnState("view")}
                  variant="outline-primary"
                  size="md"
                >
                  {" "}
                  View Profile{" "}
                </Button>
              </li>
              <li class="nav-item" style={{marginTop:"1.5rem"}} >
                <Button
                  onClick={() => setcurrentBtnState("delete")}
                  variant="outline-danger"
                  size="md"
                >
                  {" "}
                  Delete Account{" "}
                </Button>
              </li>
              <li class="nav-item" style={{marginTop:"1.5rem"}}>
                <Button
                  onClick={() => setcurrentBtnState("block")}
                  variant="outline-danger"
                  size="md"
                >
                  {" "}
                  Block Account{" "}
                </Button>
              </li>
              <li class="nav-item" style={{marginTop:"2rem",marginLeft:"5rem"}}>
                <Button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setuser(null);
                    navigate("/login");
                  }}
                  variant="outline-info"
                  size="md"
                >
                  {" "}
                  Logout{" "}
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-9" style={{ padding: "2rem" }}>
          <div className="container">
            {allUsers.map((user) => (
              <div
                className="container text-black pt-2 jh"
                style={{ border: "1px solid black" }}
                key={user._id}
              >
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Name:</i> {user.firstname}{" "}
                  {user.lastname}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Email:</i> {user.email}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Cnic Number:</i> {user["CNIC"]}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Cnic front:</i> <a href={user["cnicFront"]}>{user["cnicFront"]}</a>
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Cnic Back:</i> <a href={user["cnicBack"]}>{user["cnicBack"]} </a>
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Phone:</i> {user.phone}
                </p>
                {currentBtnState === "view" && (
                  <>
                    <Button
                      className={`btn btn-primary btn-sm ${
                        user.approve ? "disabled" : ""
                      }`}
                      onClick={() => {
                        approveUser(user._id);
                        console.log(user._id, user.approve);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      className={`btn btn-danger btn-sm ${
                        user.approve ? "" : "disabled"
                      }`}
                      onClick={() => disapproveUser(user._id)}
                    >
                      Disapprove
                    </Button>
                  </>
                )}
                {currentBtnState === "delete" && (
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Button>
                )}
                {currentBtnState === "block" && (
                  <Button
                    className={`btn btn-danger btn-sm ${
                      user.approve ? "" : "disabled"
                    }`}
                    onClick={() => blockUser(user._id)}
                  >
                    Block
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Admin;
