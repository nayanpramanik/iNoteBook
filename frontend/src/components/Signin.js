import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "./";
import logo2 from "../utils/iNotes_Logo.png";
import main from "../utils/login_img.svg";

const Signin = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = credentials;
    const response = await fetch(
      "https://backend-inotes.onrender.com/api/auth/createUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await response.json();

    setLoading(false);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/home");
      props.showAlert("Account created successfully !!", "success");
    } else {
      props.showAlert(json.error, "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid" style={{ marginTop: "-8vh" }}>
      <div className="row">
        {/*First column*/}
        <div className="col-sm-6 text-black">
          <div className="px-4 ms-xl-4">
            <img
              className="me=3 pt-5mt-xl-4"
              src={logo2}
              alt="logo"
              style={{
                maxHeight: "20%",
                maxWidth: "60%",
                objectPosition: "right",
              }}
            />
          </div>

          <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4 pt-4 pt-xl-0 mt-xl-n5">
            <form onSubmit={handleSubmit} style={{ width: "30rem" }}>
              <h3
                className="fw-normal mb-3 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                {" "}
                Sign up
              </h3>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Name">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={credentials.name}
                  name="name"
                  placeholder="Enter Username"
                  onChange={onChange}
                />
               
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={credentials.email}
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={onChange}
                />
               
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={credentials.password}
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
               
              </div>

              <div className="pt-1 mb-4">
                <button className="btn btn-dark btn-lg btn-block" type="submit">
                  Sign Up
                </button>
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="link-dark">
                  Login here{" "}
                </Link>
              </p>
            </form>
          </div>
          {loading && <Spinner />}
        </div>
        {/*Second column */}
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            src={main}
            alt="Login"
            className="w-100"
            style={{ height: "90vh", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
