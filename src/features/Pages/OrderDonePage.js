import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginInUser } from "../Auth/Components/AuthSlice";
import { resetOrder } from "../Orders/OrdersSlice";
import logo from "../../assets/logo/mainlogo.png"
import { selectUsersOrder } from "../UserPannel/User/UserSlice";
function OrderDone() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(selectLoginInUser);
  const paymentMethod= JSON.parse(localStorage.getItem("orders")).paymentMethod || "";
  console.log(paymentMethod)

  async function onlinePayment() {
    try { 
      const response = await fetch("http://localhost:8080/orders/online-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: params.id }), // Wrap the id in an object
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if(data.url){
        localStorage.removeItem("orders");
        window.location.replace(data.url)
      }
    } catch (error) {
      console.error("Error during online payment:", error);
    }
  }


  // const onlinePayment = async() =>{
  //   const response = await fetch("http://localhost:8080/orders/online-payment", {
  //     method: "POST",
  //     body: JSON.stringify(params.id),
  //     headers: { "content-type": "application/json" },
  //   });

  // }
  
  useEffect( () => {
    if(paymentMethod ==="Online Payment"){
      onlinePayment();
    }
    dispatch(resetCartAsync(user.id));
    dispatch(resetOrder());
  }, [dispatch, user]);

  if (!params.id) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
   
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <img className="mx-auto   h-20 w-auto" src={logo} alt="Your Company Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Order Successfully Placed
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for your purchase!
          </p>
        </div>
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Order Confirmed</h3>
              <div className="mt-2 text-lg text-green-700">
                <p>Your order number is: <span className="font-bold  text-xl">#{params.id}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-center text-sm text-gray-500">
            You can check your order details in Your Profile &rarr; My Orders
          </p>
        </div>
        <div className="mt-5">
          <Link
            to="/"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default OrderDone;