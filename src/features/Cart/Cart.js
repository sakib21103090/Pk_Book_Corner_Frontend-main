import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa6";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "./CartSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart() {
  const items = useSelector(selectCartItems);
  console.log(items);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleQuantity = (id, quantity) => {
    dispatch(updateCartAsync({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
    Swal.fire("Removed", "Book has been removed from the cart", "success");
  };

  const Subtotal = items.reduce((amount, item) => {
    const price = item?.product?.discountPercentage
      ? Math.round(
          item.product.price * (1 - item.product.discountPercentage / 100)
        )
      : item?.product?.price || 0; // Default to 0 if price is undefined
     return amount + price * item.quantity;// Default to quantity 1 if undefined
  }, 0);

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  return (
    <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="shadow-xl rounded-lg p-6 bg-yellow-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-md">
                    <img
                      src={item.product.images}
                      alt={item.product.bookName}
                      className="h-full w-full object-cover object-center transition-transform transform hover:scale-110"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="hover:underline text-xl">
                          {item.product.bookName}
                        </h3>
                        {item.product.discountPercentage ? (
                          <div>
                            <p>
                              {(
                                item.product.price -
                                (item.product.price *
                                  item.product.discountPercentage) /
                                  100
                              ).toFixed(0)}
                              Tk
                            </p>
                          </div>
                        ) : (
                          <p>
                            {item.product.price
                              ? item.product.price.toFixed(0)
                              : "N/A"}
                            Tk
                          </p>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 flex items-center">
                        <span className="mr-2">Rating:</span>
                        <span className="text-yellow-400">
                          ★ {item.product.rating}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 flex items-center space-x-4">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          type="button"
                          className="w-8 h-8 flex items-center justify-center bg-red-400 text-black rounded-full border border-red-700 hover:bg-red-400 transition-colors"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-xl font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            handleQuantity(item.id, item.quantity + 1);
                          }}
                          type="button"
                          className="w-8 h-8 flex items-center justify-center bg-green-400 text-black rounded-full border border-green-700 hover:bg-green-400 transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => {
                            handleRemove(items.id);
                          }}
                          type="button"
                          className="font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-full shadow-md"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1 bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex text-xl justify-between font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{Subtotal}Tk</p>
              </div>
              <div className="flex text-xl justify-between font-medium text-gray-900">
                <p>Total books</p>
                <p>{totalItems}</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/checkoutpage"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors ml-2"
                    onClick={() => setOpen(false)}
                  >
                    <span aria-hidden="true">&larr;</span> Continue Shopping
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
