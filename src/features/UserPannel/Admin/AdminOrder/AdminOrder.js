import React, { useEffect, useState } from "react";
import {
  deleteOrderAsync,
  fetchAllOrdersAsync,
  selectAllOrders,
  updateOrderAsync,
} from "../../../Orders/OrdersSlice";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders) || [];
  const [displayCount, setDisplayCount] = useState(10);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleShow = () => {
    console.log("Show details");
  };
  
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };
  
  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const handleRemove = (id) => {
    dispatch(deleteOrderAsync(id))
      .then(() => Swal.fire("Removed", "order has been delete ", "success"))
      .catch((error) => Swal.fire("Error", "Failed to remove order", "error"));
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const displayedOrders = orders.slice(0, displayCount);

  return (
    <div className="overflow-x-auto p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg my-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order Number</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Total Items</th>
                <th className="py-3 px-6 text-center">Total Amount</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">UserId</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {displayedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex flex-col space-y-3">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <img
                              src={item.product.images}
                              alt={item.product.bookName}
                              className="w-10 h-10 object-cover rounded-full shadow-lg"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.product.bookName}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No items available</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span className="font-medium">{order.totalItems || 0}</span>
                  </td>
                  <td className="py-3 px-6 text-center font-medium">
                    {order.TotalPrice} tk
                  </td>
                  <td className="py-3 px-0 text-center">
                    {order.id === editableOrderId ? (
                      <select
                        onChange={(e) => handleOrderStatus(e, order)}
                        className="border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`${chooseColor(
                          order.status
                        )} py-1 px-3 rounded-full text-xs font-semibold`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center font-medium">
                    {order.user || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <EyeIcon
                        className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => handleShow(order)}
                      />
                      <PencilIcon
                        className="w-5 h-5 cursor-pointer text-green-500 hover:text-green-700 transition-colors"
                        onClick={() => handleEdit(order)}
                      />
                      <TrashIcon className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                       onClick={() => {
                            handleRemove(order.id);
                          }}
                       />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {displayCount < orders.length && (
          <div className="text-center mt-4">
            <button
              onClick={handleShowMore}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 py-2 px-4 rounded-lg shadow-lg"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
