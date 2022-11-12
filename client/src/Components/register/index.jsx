import React from "react";
import "../../Css Files/register.css";
import plants from "../../Images/plants.png";
import plantsFliped from "../../Images/plantsFliped.png";
import head from "../../Images/head.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavBar from "../navbars/HomeNavBar";
import Loading from "../Loading";

import { Formik, Form } from "formik";
import { RegisterSchema } from "../../schema/register.schema";
import { signupUser } from "../../api";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlesubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", values?.firstname);
      formData.append("lastname", values?.lastname);
      formData.append("email", values?.email);
      formData.append("password", values?.password);
      formData.append("phone", values?.phone);
      formData.append("CNIC", values?.CNIC);
      formData.append("cnicFront", values?.cnicFront);
      formData.append("cnicBack", values?.cnicBack);

      const response = await signupUser(formData);
      if (response?.data) {
        navigate("/login");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("User Already exist")
    }
  };

  return (
    <>
      <HomeNavBar />
      {isLoading && <Loading />}
      <div className="container first">
        <div className="inner-container second">
          <div className="third" style={{ BackgroundColor: "white" }}>
            <div className="left-img Fourth">
              <img src={plantsFliped} alt="plants" />
            </div>
            <div className="center-img fifth">
              <img src={head} alt="head" />
              <h4>BE ONE OF US!</h4>
            </div>
            <div className="right-img sixth">
              <img src={plants} alt="plants" />
            </div>
          </div>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              CNIC: "",
              password: "",
              phone: "",
              cnicFront: "",
              cnicBack: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              handlesubmit(values);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              setFieldValue,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <Form>
                <div className="inner-container">
                  <div className="row seven">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${
                          touched?.firstname &&
                          errors?.firstname &&
                          "is-invalid"
                        }`}
                        id="exampleFormControlInput1"
                        placeholder="First Name *"
                        name="firstname"
                        value={values?.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.firstname && errors?.firstname && (
                        <span className="invalid-feedback">
                          {errors?.firstname}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${
                          touched?.lastname && errors?.lastname && "is-invalid"
                        }`}
                        id="exampleFormControlInput1"
                        placeholder="Last Name *"
                        name="lastname"
                        value={values?.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.lastname && errors?.lastname && (
                        <span className="invalid-feedback">
                          {errors?.lastname}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row seven">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${
                          touched?.CNIC && errors?.CNIC && "is-invalid"
                        }`}
                        id="exampleFormControlInput1"
                        placeholder="CNIC Number *"
                        name="CNIC"
                        value={values?.CNIC}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.CNIC && errors?.CNIC && (
                        <span className="invalid-feedback">{errors?.CNIC}</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${
                          touched?.email && errors?.email && "is-invalid"
                        }`}
                        id="exampleFormControlInput1"
                        placeholder="name@domain.com *"
                        name="email"
                        value={values?.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.email && errors?.email && (
                        <span className="invalid-feedback">
                          {errors?.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row seven">
                    <div className="col-md-4">
                      <input
                        type="file"
                        className={`form-control CNIC-input-front CNF ${
                          touched?.cnicFront &&
                          errors?.cnicFront &&
                          "is-invalid"
                        }`}
                        id="exampleFormControlInput1 eight"
                        name="cnicFront"
                        onChange={(e) => {
                          setFieldValue("cnicFront", e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                      />
                      {touched?.cnicFront && errors?.cnicFront && (
                        <span className="invalid-feedback">
                          {errors?.cnicFront}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <input
                        type="file"
                        className={`form-control CNIC-input-back CN ${
                          touched?.cnicBack && errors?.cnicBack && "is-invalid"
                        }`}
                        id="exampleFormControlInput1 ninth"
                        name="cnicBack"
                        onChange={(e) => {
                          setFieldValue("cnicBack", e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                      />
                      {touched?.cnicBack && errors?.cnicBack && (
                        <span className="invalid-feedback">
                          {errors?.cnicBack}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row seven">
                    <div className="col-md-4">
                      <input
                        type="password"
                        className={`form-control ${
                          touched?.password && errors?.password && "is-invalid"
                        }`}
                        id="exampleFormControlInput1"
                        placeholder="Create Password *"
                        name="password"
                        value={values?.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.password && errors?.password && (
                        <span className="invalid-feedback">
                          {errors?.password}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        id="form3Example8"
                        className={`form-control form-control-lg ${
                          touched?.phone && errors?.phone && "is-invalid"
                        }`}
                        placeholder="0000-0000000 *"
                        name="phone"
                        value={values?.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched?.phone && errors?.phone && (
                        <span className="invalid-feedback">
                          {errors?.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row seven">
                    <div
                      className="col-md-12"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading || !isValid}
                      >
                        {isLoading ? "Loading ..." : "SUBMIT"}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Register;
