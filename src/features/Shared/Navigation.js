import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import logo from "../../assets/logo/mainlogo.png";
import loginLogo from "../../assets/logo/userloginlogo.png";
// import { AuthContext } from '../../Providers/AuthProviders';
import Swal from "sweetalert2";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { selectCartItems } from "../Cart/CartSlice";
import { selectLoginInUser } from "../Auth/Components/AuthSlice";

const Navigation = () => {
  const items = useSelector(selectCartItems);
  // const {user,logOut}=useContext(AuthContext);
  const user = useSelector(selectLoginInUser);
  const logOut = "";
  {
    /* get user information which user are login*/
  }

  const handleLogOut = () => {
    // logOut()

    // .then(() => {
    //   Swal.fire('Hey', 'Logout successful', 'success');
    // })
    //     .catch(error => console.log(error));
    console.log("vajoiaweur");
  };

  return (
    <div className="navbar  max-w-screen-2xl mx-auto  bg-cyan-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className=" text-3xl text-black lg:hidden">
            {" "}
            {/* button for mobile screen */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
            <RxDropdownMenu></RxDropdownMenu>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content  p-2 text-black shadow font-bold   bg-white z-10 bg-opacity-80 rounded-box w-52"
          >
            {" "}
            {/* mobile screen navbar routes */}
            <li>
              <NavLink className="mb-2  font-bold" to="/">
                Home
              </NavLink>{" "}
            </li>
            <li>
              <NavLink className=" mb-2 font-bold" to="/contact">
                contact
              </NavLink>{" "}
            </li>
            <div className=" navbar-end">
              {user && (
                <li>
                  <NavLink className=" font-bold" to="/dashboard">
                    Dashboard
                  </NavLink>{" "}
                </li>
              )}
            </div>
          </ul>
        </div>

        <Link to="/">
          {" "}
          <img className=" h-14 w-30" src={logo} alt="Bookshop logo" />
        </Link>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {" "}
          {/* active navbar routes */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black text-base font-bold border-b-[4px] border-blue-900 "
                  : "text-black font-bold text-lg "
              }
            >
              Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-black text-base  font-bold border-b-[4px] border-blue-900 "
                  : "text-black font-bold text-lg "
              }
            >
              Contact
            </NavLink>{" "}
          </li>
          {/* {user ? <button onClick={handleLogOut} className="btn btn-sm btn-outline bg-gray-400 ">Log Out</button>:<Link to="/login" className="btn btn-sm  h-[30px]  class-card-bg hover:bg-lime-400 md:mx-4">Login</Link> }
           */}
        </ul>
      </div>
      <div></div>
      <div className=" navbar-end">
        <Link to="/cart">
          <button
            type="button"
            className="relative rounded-full bg-blue-900 p-1 text-white "
          >
            <span className="absolute -inset-1.5" />
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </Link>
        {/* cart add value */}
        {items.length > 0 && (
          <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-blue-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-purple-700/10">
            {items.length}
          </span>
        )}

        <label className="swap swap-rotate"></label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-11 rounded-full">
              {user ? (
                <img
                  className="rounded-full w-[50px] m-0 p-0"
                  src={user.photoURL}
                />
              ) : (
                <img
                  className="rounded-full w-[50px] m-0 p-0"
                  src={loginLogo}
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  bg-transparent text-black rounded-box w-52"
          >
            <li>
              {user && (
                <p className="justify-between font-extrabold">
                  <Link to="/pannelPage">user Pannel</Link>
                </p>
              )}
              <p className="justify-between font-extrabold">
                {user ? (
                  <Link to="/logOut">Log Out</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </p>
            </li>
            {/* {user ? <button onClick={handleLogOut} className="btn  ">Log Out</button>:<Link to="/login" className="btn ">Login</Link> } */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
