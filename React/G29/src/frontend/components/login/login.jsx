import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, getFormData] = useState({
    email: "",
    otp: "",
    type: "login",
  });
  const [otp, setOtp] = useState("");
  const [login, setLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userError, setUserError] = useState("");
  const [otpInvalid, setOtpInvalid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    getFormData({ ...formData, [name]: value });
  };

  const sendOtp = (e) => {
    e.preventDefault();
    console.log(formData, "form");
    console.log(API_BASE_URL + "send_otp");
    fetch(API_BASE_URL + "send_otp", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          let otp = data.otp;
          console.log(otp, "otp");
          setOtpSent(true);
          setOtp(otp);
          setOtpInvalid(false);
          setUserError("");
        } else {
          setUserError(data.error);
          setOtp("");
          setOtpInvalid(false);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp != formData.otp) {
      setOtpInvalid(true);
      setUserError("");
      setOtpSent(false);
      return;
    }

    fetch(API_BASE_URL + "login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data")
        if (data.status == 200) {
          console.log(data);
          localStorage.setItem('token', data.token);
          console.log(localStorage.getItem('token'), "Session---------------")
          setLogin(true);
          setOtpInvalid(false);
          setUserError("");
          setOtpSent(false);
          setTimeout(() => {
            window.location.href = '/'; 
          }, 5000);
          setUserError("");
        } else {
          console.error("Error:", data.error);
          setUserError(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setUserError(error);
      });
  };

  return (
    <>
      {otpSent && (
        <div
          className="alert alert-success alert-dismissible fade show mb-0"
          role="alert"
        >
          <strong>Success!</strong> OTP sent successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {login && (
        <div
          className="alert alert-success alert-dismissible fade show mb-0"
          role="alert"
        >
          <strong>Success!</strong> Login successfull. You will be redirected to Home page!!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {userError && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-0"
          role="alert"
        >
          <strong>Failed!</strong> {userError}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {otpInvalid && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-0"
          role="alert"
        >
          <strong>Failed!</strong> Invalid OTP
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <section
        className="background-radial-gradient overflow-hidden login"
        style={{ paddingBottom: "204px" }}
      >
        <div className="container px-4 py-0 py-md-5 px-md-5 text-center text-lg-start mt-0 mt-md-5 ">
          <div className="row gx-lg-5 align-items-center mb-0 mb-md-5 mt-0 mt-md-5">
            <div
              className="col-lg-6 mb-2 mb-md-5 mb-lg-0 "
              style={{ zIndex: 10 }}
            >
              <Link to="/" className="nav-link">
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                G29 MEN AND
                <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}> WOMEN WEAR</span>
              </h1>
              </Link>
              <p
                className="mb-4 opacity-70 d-none d-sm-block"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Discover G29: Where Style Meets Comfort for All Ages! Elevate
                your wardrobe with our exclusive line of men's, women's, and
                kids' wear meticulously crafted for trendsetting fashion and
                unbeatable comfort. Dive into a world where every stitch speaks
                of quality and every design exudes confidence. Explore G29 today
                and redefine your fashion statement!
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative ">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>

              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <h1 className="text-center my-3">Login</h1>
                  {otp == "" && (
                    <form onSubmit={sendOtp}>
                      <div className="form-outline mb-4">
                        <input
                          required
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4 mt-3"
                      >
                        Send OTP
                      </button>
                      <div>
                        <a href="signup" className="signup-link">
                          Create new account?
                        </a>
                      </div>
                    </form>
                  )}

                  {otp != "" && (
                    <form method="POST" onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          required
                          type="text"
                          id="otp"
                          name="otp"
                          className="form-control"
                          value={formData.otp}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="password">
                          OTP
                        </label>
                      </div>

                      <>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4 mt-3"
                        >
                          Login
                        </button>
                      </>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
