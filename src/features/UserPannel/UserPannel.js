import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import logo from "../../assets/logo/mainlogo.png";
import { useSelector } from "react-redux";
import { selectUserInfo } from "./User/UserSlice";

function UserPannel() {
  const user = useSelector(selectUserInfo);
  console.log(user)
  const isAdmin = user?.role === "admin"; // Check if the user's role is "admin"
  console.log(isAdmin); // Check this in the console for debugging

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start p-6">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn mb-4 mt-2 bg-lime-500 drawer-button lg:hidden"
          >
            Open
          </label>
          {isAdmin ? (
            <Navigate to="/pannelPage/adminprofile" />
          ) : (
            <Navigate to="/pannelPage/userprofile" />
          )}
          <Outlet /> {/* This will render the matched child route components */}
        </div>
        <div className="drawer-side pb-4 rounded h-full pt-2">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 h-full bg-white text-base-content shadow-lg">
            {/* Sidebar content here */}
            <div className="text-center mb-4">
              <img
                className="w-full h-40 mx-auto rounded-lg shadow-md"
                src={logo}
                alt="PK BOOKS CORNER"
              />
            </div>
            <div className="divider"></div>
            {isAdmin ? (
              <>
                <li className="mb-6">
                  <NavLink
                    to="/pannelPage/adminprofile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black text-lg font-bold border-b-[4px] border-blue-900 "
                        : "text-black font-bold text-lg "
                    }
                  >
                    Admin Profile
                  </NavLink>
                </li>  
                <li className="mb-6">
                  <NavLink
                    to="/pannelPage/addProduct"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black text-lg font-bold border-b-[4px] border-blue-900 "
                        : "text-black font-bold text-lg "
                    }
                  >
                    Add A Product
                  </NavLink>
                </li>
                <li className="mb-6">
                  <NavLink
                    to="/pannelPage/manageProduct"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black text-lg font-bold border-b-[4px] border-blue-900 "
                        : "text-black font-bold text-lg "
                    }
                  >
                    ManageProduct
                  </NavLink>
                </li>
                <li className="mb-6">
                  <NavLink
                    to="/pannelPage/adminOrderPage"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black text-lg font-bold border-b-[4px] border-blue-900 "
                        : "text-black font-bold text-lg "
                    }
                  >
                    Manage Order
                  </NavLink>
                </li>

                {/* Repeat for other admin links if needed */}
              </>
            ) : (
              <>
                <li className="mb-6">
                  <NavLink
                    to="/pannelPage/userprofile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black text-lg font-bold border-b-[4px] border-blue-900 "
                        : "text-black font-bold text-lg "
                    }
                  >
                    User Profile
                  </NavLink>
                </li>
                <li className="mb-6">
                  <NavLink
                    to="/pannelPage/myOrder"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black text-lg font-bold border-b-[4px] border-blue-900 "
                        : "text-black font-bold text-lg "
                    }
                  >
                    My Order
                  </NavLink>
                </li>
                {/* Repeat for other user links if needed */}
              </>
            )}
            <div className="divider"></div>
            <li>
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500 mt-8 transition-colors ml-2"
                >
                  <span aria-hidden="true">&larr;</span> Continue Shopping
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserPannel;
