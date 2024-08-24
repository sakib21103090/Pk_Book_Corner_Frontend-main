import { createBrowserRouter } from "react-router-dom";

import Home from "../features/Pages/Home";
import UserLogin from "../features/Pages/UserLogin";
import UserSignUp from "../features/Pages/UserSignUp";

import CartPage from "../features/Pages/CartPage";
import CheckOutPage from "../features/Pages/CheckOut";
import BooksInfoPage from "../features/Pages/BooksInfoPage";
import Main from "../Layouts/Main";
import Error from "../features/Error/Error";
import OrderDone from "../features/Pages/OrderDonePage";
import UserProfile from "../features/UserPannel/User/UserProfile";
import UserPannel from "../features/UserPannel/UserPannel";
import PannelPage from "../features/UserPannel/PannelPage";
import AdminProfile from "../features/UserPannel/Admin/AdminProfile";
import MyOrder from "../features/UserPannel/User/MyOrder";
import Logout from "../features/Auth/Components/LogOut";
import AddProduct from "../features/UserPannel/Admin/AddProduct";
import ManageProduct from "../features/UserPannel/Admin/ManageProduct";
import EditPage from "../features/UserPannel/Admin/AdminEdit/EditPage";
import AdminOrderPage from "../features/UserPannel/Admin/AdminOrder/AdminOrderPage";
import AddCategory from "../features/UserPannel/Admin/AddCategory";
import AddAuthor from "../features/UserPannel/Admin/AddAuthorName";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <UserLogin></UserLogin>,
      },
      {
        path: "/signup",
        element: <UserSignUp></UserSignUp>,
      },
      {
        path: "/logOut",
        element: <Logout></Logout>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkoutpage",
        element: <CheckOutPage></CheckOutPage>,
      },
      {
        path: "/booksinfopage/:id",
        element: <BooksInfoPage></BooksInfoPage>,
      },
      {
        path: "/orderDone/:id",
        element: <OrderDone></OrderDone>,
      },
      
    ],
  },
  {
      
    path: "/pannelPage",
    element: <PannelPage></PannelPage>,
    children :[
      
        {
          path: "userprofile",
          element: <UserProfile></UserProfile>,
        },
        {
          path: "adminprofile",
          element: <AdminProfile></AdminProfile>,
        },
      
        {
          path: "myOrder",
          element: <MyOrder></MyOrder>,
        },
      // admin route
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "addCategory",
        element: <AddCategory></AddCategory>,
      },
      
      {
        path: "addAuthor",
        element: <AddAuthor></AddAuthor>,
      },
      
      {
        path: "manageProduct",
        element: <ManageProduct></ManageProduct>,
      },
      {
        path: "editpage/:id",
        element: <EditPage></EditPage>,
      },
      
      {
        path: "adminOrderPage",
        element: <AdminOrderPage></AdminOrderPage>,
      },
      
      
    ]
  
},
]);
