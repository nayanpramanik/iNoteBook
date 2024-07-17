import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "./";
import logo2 from "../utils/iNotes_Logo.png";
import main from "../utils/login_img.svg";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://backend-inotes.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();

    setLoading(false);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/home");
      props.showAlert("Logged In successfully !!", "success");
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
        {/* First column */}
        <div className="col-sm-6 text-black">
          <div className="px-4 ms-xl-4">
            <img
              className="me-3 pt-5 mt-xl-4"
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
                Log in
              </h3>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control "
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
                  id="password"
                  className="form-control "
                  value={credentials.password}
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
             
              </div>

              <div className="pt-1 mb-4">
                <button className="btn btn-dark btn-lg btn-block" type="submit">
                  Login
                </button>
              </div>
              <p>
                Don't have an account?{" "}
                <Link to="/signin" className="link-dark">
                  Create one!!{" "}
                </Link>
              </p>
            </form>
          </div>
          {loading && <Spinner />}
        </div>

        {/* Second column */}
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            src={main}
            alt="login"
            className="w-100"
            style={{ height: "90vh", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
