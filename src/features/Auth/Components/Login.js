// import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./AuthSlice";
import loginlogo from "../../../assets/logo/login page logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import styles from './Counter.module.css';
import logo from "./../../../assets/logo/login page logo.png";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";
import GoogleSignup from "../../../Providers/Googlelogin/GoogleSignup";
export default function Login() {
  const [error, setError] = useState("");
  const { SignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const HandelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    Swal.fire("Hey", "login successful", "success");
    setError("");

    SignIn(email, password)
      .then((result) => {
        const LoggedUser = result.user;
        console.log(LoggedUser);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError("wrong input please input valid data");
      });
  };

  return (
    <>
      <div>
        <div className="hero min-h-screen bg-gradient-to-br  from-yellow-100 to-gray-100">
          <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
              <img className="w-[600px]  rounded-2xl" src={loginlogo} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-lime-100">
              <div className="card-body">
                <h1 className="text-3xl text-center font-bold">Login Please</h1>
                <form onSubmit={HandelLogin}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder=" Enter email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                      required
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="flex items-center text-bold mx-auto px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100"
                      type="submit"
                      value="Login"
                    />
                  </div>
                </form>
                <div>
                  <GoogleSignup></GoogleSignup>
                </div>
                <p className="my-4 text-center">
                  Don't have an account
                  <Link className="text-purple-600 font-bold" to="/signup">
                    Sign Up
                  </Link>{" "}
                </p>
                <div>
                  <p className=" text-black  bg-orange-400 text-center rounded border fw-bold mt-2">
                    {" "}
                    <small>{error}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
