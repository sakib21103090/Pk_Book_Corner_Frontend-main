import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUsersOrder } from "./UserSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function MyOrder() {
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUsersOrder);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserOrderAsync(user.id));
    }
  }, [dispatch, user]);

  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm)
  );

  return (
    <div className="bg-gray-100 min-h-screen w-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center w-[250px] rounded-full shadow-md bg-cyan-200 hover:shadow-lg transition-shadow duration-300">
            <input
              className="w-full px-8 py-2 rounded-full text-gray-700 focus:outline-none placeholder-gray-500 bg-white bg-opacity-50 focus:bg-opacity-100 transition-all duration-300"
              type="text"
              placeholder="Search for orders by ID..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white shadow-lg rounded-lg mb-8">
                <div className="p-6">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    Order #{order.id}
                  </h1>
                  <h3 className="text-lg md:text-xl font-bold text-red-600 mb-4">
                    Order Status: {order.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex flex-col sm:flex-row py-6">
                          <div className="h-24 w-full sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.images}
                              alt={item.product.bookName}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.id}>{item.product.bookName}</a>
                              </h3>
                              {item.discountPercentage ? (
                                <div className="mt-1">
                                  <p className="text-lg font-medium text-gray-900">
                                    Price:{" "}
                                    {item.product.price -
                                      (item.product.price * item.product.discountPercentage) /
                                        100}{" "}
                                    tk
                                  </p>
                                </div>
                              ) : (
                                <p className="mt-1 text-lg font-medium text-gray-900">
                                  Price: {item.product.price} tk
                                </p>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category}
                            </p>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <span className="inline mr-5 text-sm font-medium text-gray-900">
                                quantity: {item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-6 py-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{order.Subtotal} tk</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>deliveryCharge</p>
                    <p>{order.deliveryCharge} tk</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Price</p>
                    <p>{order.TotalPrice} tk</p>
                  </div>

                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Books</p>
                    <p>{order.totalItems} Books</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Payment Method</p>
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Payment Status</p>
                    <p>{order.paymentStatus}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping Address:
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between gap-x-6 px-5 py-5 border border-gray-200 rounded-lg">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          Name: {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          Email: {order.selectedAddress.email}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          Phone: {order.selectedAddress.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <p className="text-sm font-semibold leading-6 text-black">
                        Country: {order.selectedAddress.country}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        City: {order.selectedAddress.city}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        Postal Code: {order.selectedAddress.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between my-2 text-sm text-gray-500">
                    <p>Created At</p>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between my-2 text-sm text-gray-500">
                    <p>Updated At</p>
                    <p>{new Date(order.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-700 text-xl font-medium">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}
