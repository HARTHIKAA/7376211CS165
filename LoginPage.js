import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const url = "http://localhost:3000/users";
  const [login, setLogin] = useState({
    rollno: "",
    email: "",
  });

  const [invalid, setInvalid] = useState("d-none");

  let navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    setInvalid("d-none");
  };

  const checkLogin = async () => {
    const loginDetails = await axios
      .get(url)
      .then((res) => {
        let userIndex;
        const allDatas = res.data;
        const userData = allDatas.find((user, index) => {
          userIndex = index;
          return (
            user.customerrollno == login.rollno &&
            user.customeremail == login.email
          );
        });
        if (userData) {
          navigate(`/account/${userIndex}`);
        } else {
          setInvalid("d-block");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        background: "#007bff",
        background: "linear-gradient(to right, #0062E6, #33AEFF)",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <p
        className="fs-1 text-light text-center mt-5"
        style={{ fontFamily: "Tilt Prism", textShadow: "3px 2px 3px blue" }}
      >
        Login Page
      </p>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-6 col-xl-4 m-auto px-5">
          <div className="card border-0 shadow rounded-3 my-5 bg-light">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5 fw-semibold">
                Sign In
              </h5>
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email address"
                    value={login.rollno}
                    onChange={handleChange}
                    name="rollno"
                  />
                  <label htmlFor="floatingInput">Roll No</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    autoComplete="true"
                    value={login.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <label htmlFor="floatingPassword">Email</label>
                </div>
                <p className={`text-danger fw-semibold ms-2 ${invalid}`}>
                  Invalid Roll No or Mail-id
                </p>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberPasswordCheck"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberPasswordCheck"
                  >
                    Remember password
                  </label>
                </div>
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-primary text-uppercase fw-semibold"
                    type="button"
                    onClick={checkLogin}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
