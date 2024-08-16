import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../Cart/CartSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
 
  UpdateUserCheckOutAsync,
} from "../Auth/Components/AuthSlice";
import { createOrderAsync, selectCurrentOrder } from "../Orders/OrdersSlice";
import { selectUserInfo, UpdateUserAsync } from "../UserPannel/User/UserSlice";

export default function Checkout() {
  const items = useSelector(selectCartItems);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isOrderButtonEnabled, setIsOrderButtonEnabled] = useState(false);

  useEffect(() => {
    const isAllFieldsFilled =
      selectedAddress && deliveryCharge > 0 && paymentMethod !== "";
    setIsOrderButtonEnabled(isAllFieldsFilled);
  }, [selectedAddress, deliveryCharge, paymentMethod]);

  const handleDeliveryCharge = (charge) => {
    setDeliveryCharge(charge);
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleAddress = (e) => {
    setSelectedAddress(user?.addresses[e.target.value]);
  };

  const Subtotal = items.reduce((amount, item) => {
    const price =item?.product?.discountPercentage
      ? Math.round(item?.product?.price * (1 - item?.product?.discountPercentage / 100))
      : item?.product?.price 
    return amount + price * item.quantity;
  }, 0);

  const TotalPrice = Subtotal + deliveryCharge;
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const onSubmit = (data) => {
    dispatch(
      UpdateUserAsync({
        ...user,
        addresses: [...user?.addresses, data],
      })
    );
    reset();
  };

  const handleOrder = () => {
    const order = {
      items,
      TotalPrice,
      totalItems,
      Subtotal,
      user:user.id,
      paymentMethod,
      selectedAddress,
      deliveryCharge,
      status: "pending",
    };
    console.log(order)
    localStorage.setItem("orders", JSON.stringify(order))
    dispatch(createOrderAsync(order));
  };

  return (
    <>
      {currentOrder && (
        <Navigate
          to={`/orderDone/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 ">
        <div className="mx-auto max-w-7xl px-4 bg-gradient-to-br from-indigo-100 to-yellow-100 lg:px-8 rounded-2xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form
                className="px-5 py-12 mt-12"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold  pb-8  text-black">
                    Add Shipping Information
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="border rounded-md p-2 w-full"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="border rounded-md p-2 w-full"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          className="border rounded-md p-2 w-full"
                          {...register("phoneNumber", {
                            required: "Phone Number is required",
                            pattern: {
                              value: /^\d+$/,
                              message: "Invalid phone number",
                            },
                          })}
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          name="country"
                          placeholder="country"
                          className="border rounded-md p-2 w-full"
                          {...register("country", {
                            required: "country is required",
                          })}
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          className="border rounded-md p-2 w-full"
                          {...register("city", {
                            required: "City is required",
                          })}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="postalCode"
                          placeholder="Postal Code"
                          className="border rounded-md p-2 w-full"
                          {...register("postalCode", {
                            required: "Postal Code is required",
                          })}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-x-6">
                    <button
                      onClick={(e) => reset()}
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-b border-gray-900/10 ">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing addresses
                </p>
                <ul>
                  {user?.addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-black">
                            Name: {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-black">
                            Email: {address.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-black">
                            Phone: {address.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm font-semibold leading-6 text-black">
                        Country:{address.country}
                        </p>
                        <p className="text-xs leading-5 text-black">
                          City: {address.city}
                        </p>
                        <p className="text-xs leading-5 text-black">
                          Postal Code: {address.postalCode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Delivery Options
                  </h3>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => handleDeliveryCharge(90)}
                      className={`lg:px-4 lg:py-2 py-2 rounded-full shadow-lg focus:outline-none transition duration-300 ${
                        deliveryCharge === 90
                          ? "bg-cyan-800 text-white"
                          : "bg-cyan-400 text-black"
                      }`}
                    >
                      Dhaka (90 Tk)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeliveryCharge(120)}
                      className={`px-4 py-2 rounded-full shadow-lg focus:outline-none transition duration-300 ${
                        deliveryCharge === 120
                          ? "bg-green-800 text-white"
                          : "bg-green-400 text-black"
                      }`}
                    >
                      Outside Dhaka (120 Tk)
                    </button>
                  </div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                  <div className="flex space-x-4 ">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethod("Online Payment")}
                      className={`px-4 py-2 rounded-full shadow-lg focus:outline-none transition duration-300 ${
                        paymentMethod === "Online Payment"
                          ? "bg-indigo-800 text-white"
                          : "bg-indigo-400 text-black"
                      }`}
                    >
                      Online Payment
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentMethod("Cash on Delivery")}
                      className={`px-4 py-2 rounded-full shadow-lg focus:outline-none transition duration-300 ${
                        paymentMethod === "Cash on Delivery"
                          ? "bg-purple-800 text-white"
                          : "bg-purple-400 text-black"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto mt-12  max-w-7xl px-2 sm:px-2 lg:px-4">
                <div className="lg:col-span-1 bg-yellow-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex text-xl justify-between font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{Subtotal} Tk</p>
                    </div>
                    <div className="flex text-xl justify-between font-medium text-gray-900">
                      <p>Total books</p>
                      <p>{totalItems}</p>
                    </div>
                    <div className="flex text-xl justify-between font-medium text-gray-900">
                      <p>Delivery charge</p>
                      <p>{deliveryCharge} Tk</p>
                    </div>
                    <div className="flex text-xl justify-between font-medium text-gray-900">
                      <p>Total price</p>
                      <p>{TotalPrice} Tk</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleOrder}
                      disabled={!isOrderButtonEnabled}
                      className={`w-full flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white shadow-sm border ${
                        isOrderButtonEnabled
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Place Order
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/cart">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                      >
                        <span aria-hidden="true">&larr;</span> Back to Cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

