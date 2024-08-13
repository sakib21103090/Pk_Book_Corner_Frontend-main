import React from 'react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import signuplogo from '../../../assets/logo/signuppagelogo.png';
import {  useDispatch } from "react-redux";
import { createUserAsync, } from './AuthSlice';
import Swal from 'sweetalert2';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook
  const onSubmit = async (data) => {
    try {
      await dispatch(createUserAsync({
        displayName: data.displayName,
        photo: data.photo,
        email: data.email,
        password: data.password,
        addresses:[],
        role:'user',
      }));
      Swal.fire({
        icon: 'success',
        title: 'Account Created Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/'); // Redirect to home page
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <div className="hero min-h-screen pt-24 bg-gradient-to-br  from-cyan-50 to-blue-50">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img className="w-[600px] rounded-2" src={signuplogo} alt="Signup Logo" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-cyan-100">
          <div className="card-body">
            <h1 className="text-2xl text-center font-bold">Please Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("displayName", { required: true })}
                />
                {errors.displayName && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Enter photo URL"
                  className="input input-bordered"
                  {...register("photo", { required: true })}
                />
                {errors.photo && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                  })}
                  placeholder="password"
                  className="input input-bordered h-10"
                />
                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
              </div>
              <div className="form-control mt-6">
                <input
                  className="flex items-center text-bold mx-auto px-4 py-2 bg-cyan-200 border border-blue-900 rounded shadow-sm hover:bg-gray-100"
                  type="submit"
                  value="Create Account"
                />
              </div>
              <div className="mb-4 "></div>
            </form>
            <p className="my-4 text-center">
              Already Have an Account?{" "}
              <Link className="text-purple-600 font-bold" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
