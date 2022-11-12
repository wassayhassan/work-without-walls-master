import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import React from "react";
import { useState } from "react";
import axios from "axios";
import HomenavBar from "../Components/navbars/HomeNavBar"
import "../Css Files/home.css";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsEnvelopeFill,
} from "react-icons/bs";

const Home = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setphone] = useState("");
  const [Message, setMessage] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (Name === "" || Email === "" || Phone === "" || Message === "") {
      alert("Please fill all the fields");
      return;
    } else if (!/^\d{11}$/.test(Phone)) {
      alert("Please enter a valid phone number");
      return;
    } else if (Email.indexOf("@") === -1 && Email.indexOf(".") === -1) {
      alert("Please enter a valid email");
      return;
    } else {
      alert("We will get back to you!");
    }

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Email", Email);
    formData.append("Phone", Phone);
    formData.append("Message", Message);

    axios
      .post("http://localhost:7900/home/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("We will get back to you!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <HomenavBar  />
      <div
        className="bg-overlay border-0 bg-overlay bg-img "
        style={{ height: "100vh" }}
      >
        <div
          className="text-white text-center rgba-black-strong py-5 px-4 d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div className="py-5">
            <h2 className="card-title display-4">How work Should work!!</h2>
            <p
              className="mb-4 pb-2 px-md-5 mx-md-5 fw-bold admin subtext"
              style={{ fontSize: "25px" }}
            >
              {" "}
              Forget the old rules. You can have the best people.
              <br /> Right now. Right here.
              <br /> We Provide You with the best sellers
              <br /> <b>Trusted Payments</b>
              <br /> Sellers from all over the world
              <br />
            </p>
            <Link className="btn btn-dark rounded-pill px-4 py-3" to="/finder">
              Find your talent
            </Link>
          </div>
        </div>
      </div>
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h1>
                  A whole world of freelance <br /> talent at your fingertips
                </h1>
              </div>
              <div>
                <h4>
                  <li>The best for every budget</li>
                </h4>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based <br />
                  pricing.
                </p>
                <h4>
                  <li>Quality work done quickly</li>
                </h4>
                <p>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
                <h4>
                  <li>Protected payments, every time</li>
                </h4>
                <p>
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the <br /> work.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
               id="img"
                src="https://us.123rf.com/450wm/asiln/asiln1901/asiln190100036/115233882-why-choose-us.jpg?ver=6"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container col-9">
        <Carousel internal={50} style={{ margin: 0, padding: 0 }}>
          <Carousel.Item style={{ margin: 0, padding: 0 }}>
            <img
             id="img"
              className="d-block w-100"
              src="https://itartificer.com/wp-content/uploads/2019/01/website-development.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
            id="img"
              className="d-block w-100"
              src="https://itartificer.com/wp-content/uploads/2019/01/Search-Engine-Optimization.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
             id="img"
              className="d-block w-100"
              src="https://i.ytimg.com/vi/l_tMNct890w/maxresdefault.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
            id="img"
              className="d-block w-100"
              src="https://blog.gurock.com/wp-content/uploads/2017/05/Top-Programming-Skills-for-Software-Testers-header.jpg"
              alt="Fourth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="container contact-form bg-light">
        <div className="contact-image">
          <img
           id="img"
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form onSubmit={handlesubmit}>
          <h3>Drop Us a Message</h3>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="txtName"
                  className="form-control my-3"
                  placeholder="Your Name *"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="txtEmail"
                  className="form-control my-3"
                  placeholder="Your Email *"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="txtPhone"
                  className="form-control my-3"
                  placeholder="Your Phone Number *"
                  value={Phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="message"
                  className="form-control my-3"
                  placeholder="Your Message *"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input type="submit" name="btnSubmit" className="btnContact" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <section id="footer">
        <div className="d-flex text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-sm-12 col-md-12 align-items-center flex-column d-flex">
            <h5>Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li>
                <Link to="/">
                  <i className="fa fa-angle-double-right"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-angle-double-right"></i>About
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-angle-double-right"></i>FAQ
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-angle-double-right"></i>Get Started
                </Link>
              </li>
              <li>
                <Link to="/" title="Design and developed by">
                  <i className="fa fa-angle-double-right"></i>Imprint
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5 ">
            <ul className="list-unstyled list-inline social text-center">
              <li className="list-inline-item">
                <Link to="/">
                  <BsFacebook />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <BsTwitter />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <BsInstagram />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/" target="_blank">
                  <BsEnvelopeFill />
                </Link>
              </li>
            </ul>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p>
              <u>
                <Link to="/">My secret Corporation</Link>
              </u>{" "}
              is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly owned
              subsidiary of U.S. Bancorp, Minneapolis, MN]
            </p>
            <p className="h6">
              © All right Reversed.
              <Link className="text-green ml-2" to="/" href="" target="_blank">
                behind the walls
              </Link>
            </p>
          </div>
          <hr />
        </div>
      </section>
    </div>
  );
};

export default Home;
