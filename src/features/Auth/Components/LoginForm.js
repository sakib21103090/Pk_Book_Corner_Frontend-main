import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LoginUserAsync, selectError } from "./AuthSlice";
import loginlogo from '../../../assets/logo/login page logo.png';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);

  const onSubmit = async (data) => {
    const result = await dispatch(LoginUserAsync({
      email: data.email,
      password: data.password
    }));

    if (result.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img className="w-[600px] rounded-2xl" src={loginlogo} alt="Login Logo" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-cyan-100">
          <div className="card-body">
            <h1 className="text-3xl text-center  font-bold">Login Please</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="text-red-600">This field is required</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="flex items-center font-bold mx-auto px-4 py-2 bg-cyan-200 border-2  border-blue-800 rounded shadow-sm hover:bg-gray-100"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div>
              <p className="my-4 text-center">
                Don't have an account?{" "}
                <Link className="text-purple-600 font-bold" to="/signup">
                  Sign Up
                </Link>
              </p>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
