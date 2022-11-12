import React from "react";
import HomeNavBar from "../navbars/HomeNavBar";
import { useState } from "react";
import "../../Css Files/login.css";

import frame from "../../Images/frame.png";
import plants from "../../Images/plants.png";
import head from "../../Images/head.png";

import { Formik, Form } from "formik";
import { LoginSchema } from "../../schema/login.schema";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginUser } from "../../api";
import Loading from "../Loading";
import { UserContext } from "../../context/user.context";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user, setuser } = useContext(UserContext);
  const { admin, setadmin } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    hasError: false,
    message: "",
  });

  const handleForget = () => {
    navigate("/forgot");
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (admin) {
      navigate("/admin");
    }
  }, [admin, navigate]);


  const submit = async (values) => {
    setIsLoading(true);
    try {
      const res = await loginUser(values);
      setuser(res?.data);
      localStorage.setItem("user", JSON.stringify(res?.data));
      if (res?.data && res?.data?.approve && res?.data?.userrole === "admin") {
        navigate("/admin");
      } else if (res?.data && res?.data?.approve) {
        navigate("/profile");
      } else {
        setErrors({
          hasError: true,
          message: "Invalid Credentials or blocked account",
        });
      }
      setIsLoading(false);
    } catch (e) {
      setErrors({
        hasError: true,
        message: e?.response?.data?.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <HomeNavBar />
      {isLoading && <Loading />}
      <div className="container cont">
        <div className="row ro">
          <div className=" col1 c1">
            <img src={frame} alt="frame" />
          </div>
          <div className=" col2 c2">
            <div className="top t">
              <div className="imgPlants im">
                <img src={plants} alt="plants" />
              </div>
              <div className="imgHead h">
                <img src={head} alt="head" />
                <h4>BE ONE OF US!</h4>
              </div>
            </div>
            {errors?.hasError && (
              <div className="alert alert-danger" role="alert">
                {errors?.message}
              </div>
            )}
            <div className="bottom b">
              <Formik
                validationSchema={LoginSchema}
                initialValues={{ CNIC: "", password: "" }}
                onSubmit={(values) => {
                  submit(values);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  isValid,
                  isSubmitting,
                }) => (
                  <Form>
                    <input
                      type="text"
                      className={`form-control ${
                        touched?.CNIC && errors?.CNIC && "is-invalid"
                      }`}
                      id="exampleFormControlInput1"
                      placeholder="CNIC Number"
                      name="CNIC"
                      value={values?.CNIC || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched?.CNIC && errors?.CNIC && (
                      <div
                        className="invalid-feedback pb-2"
                        style={{ display: "flex" }}
                      >
                        {errors?.CNIC}
                      </div>
                    )}
                    <input
                      type="password"
                      className={`form-control ${
                        touched?.password && errors?.password && "is-invalid"
                      }`}
                      id="exampleFormControlInput2"
                      placeholder="Password"
                      name="password"
                      value={values?.password || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched?.password && errors?.password && (
                      <div
                        className="invalid-feedback pb-2"
                        style={{ display: "flex" }}
                      >
                        {errors?.password}
                      </div>
                    )}
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>Loading...</span>
                        ) : (
                          <span>LOGIN</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleForget}
                      >
                        Forget Password?
                      </button>

                      <p className="para p">
                        Don't have account?
                        <span>
                          <a href="/register"> Sign up</a>
                        </span>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
