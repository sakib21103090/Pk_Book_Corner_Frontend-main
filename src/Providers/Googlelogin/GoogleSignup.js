import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebase.config";

const GoogleSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handelGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        Swal.fire("Hey", "Login successful", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message); // Better error logging
      });
  };

  return (
    <div className="mb-4">
      <button
        className="flex items-center px-4 py-2 mx-auto bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100"
        onClick={handelGoogleLogin}
      >
        <img
          className="w-6 h-6 mr-3"
          src="https://i.ibb.co/ZKwR56g/logo-google.png"
          alt="Google logo"
        />
        <span className="text-gray-800 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignup;
