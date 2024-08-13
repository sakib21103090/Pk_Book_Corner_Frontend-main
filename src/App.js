import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
// import AuthProviders, { AuthContext } from "./Providers/AuthProviders";
import { useDispatch, useSelector } from "react-redux";

import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";
import { selectLoginInUser } from "./features/Auth/Components/AuthSlice";
import { useEffect } from "react";

import { fetchLoggedInUserAsync } from "./features/UserPannel/User/UserSlice";

function AppContent() {
  const user = useSelector(selectLoginInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App max-w-screen-2xl mx-auto ">
      <RouterProvider router={router} />
    </div>
  );
}

function App() {
  return (
   
      <AppContent />
   
  );
}

export default App;