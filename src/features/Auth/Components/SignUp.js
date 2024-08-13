import { Link } from "react-router-dom";
// import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./AuthSlice";
// import styles from './Counter.module.css';
import signuplogo from "../../../assets/logo/signuppagelogo.png";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import GoogleSignup from "../../../Providers/Googlelogin/GoogleSignup";
export default function SignUp() {
  const [error, setError] = useState("");

  const { createUser } = useContext(AuthContext);
  const HandelRegister = (event) => {
    event.preventDefault();
    
    const form = event.target;
    const name = form.displayName.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    console.log(name, photo, email, password);
    Swal.fire("Hey", "Account Create successful", "success");
    setError("");
    if (password.length < 6) {
      setError("please set password up to six character");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);
      })
      .catch((error) => {
        console.log(error);
        setError("wrong input please input valid data");
      });
  };

  return (
    <>
      <div>
        <div className="hero min-h-screen  pt-24 bg-gradient-to-br  from-yellow-100 to-gray-100">
          <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
              <img className="w-[600px] rounded-2" src={signuplogo} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-lime-100">
              <div className="card-body">
                <h1 className="text-2xl text-center font-bold">
                  {" "}
                  Please Sign Up
                </h1>
                <form onSubmit={HandelRegister}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      placeholder="name"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photo url</span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      placeholder="Enter photo url"
                      className="input input-bordered"
                      required
                    />
                  </div>
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
                      <span className="label-text"> Password</span>
                    </label>
                    <input
                      type="text"
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="flex items-center text-bold mx-auto px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100"
                      type="submit"
                      value="Create Account"
                    />
                  </div>
                  <div className="mb-4 "></div>
                </form>
                <GoogleSignup></GoogleSignup>
                <p className="my-4 text-center">
                  {" "}
                  Already Have an Account?{" "}
                  <Link className="text-purple-600 font-bold" to="/login">
                    Login
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
