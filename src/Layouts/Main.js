// The Main component for layout
import { Outlet } from "react-router-dom";
import Navigation from "../features/Shared/Navigation";

const Main = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Main;
