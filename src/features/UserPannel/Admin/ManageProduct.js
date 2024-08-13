import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductAsync, selectAllProducts } from '../../BookList/Components/BooksSlice';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

export default function ManageProduct() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [displayCount, setDisplayCount] = useState(10);

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
    Swal.fire("Removed", "Book has been removed from the cart", "success");
  };

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };

  const displayedProducts = products.slice(0, displayCount);

  return (
    <div className="overflow-x-auto">
      <table className="bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 border-b">Book Name</th>
            <th className="py-3 px-4 border-b">Category</th>
            <th className="py-3 px-4 border-b">Author Name</th>
            <th className="py-3 px-4 border-b">Picture</th>
            <th className="py-3 px-4 border-b">Price</th>
            <th className="py-3 px-4 border-b">Stock</th>
          
            <th className="py-3 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {displayedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-300">
              <td className="py-3 px-4 border-b">{product.bookName}</td>
              <td className="py-3 px-4 border-b">{product.category}</td>
              <td className="py-3 px-4 border-b">{product.AuthorName}</td>
              <td className="py-3 px-4 border-b">
                <img className='w-16 h-16 object-cover rounded-lg' src={product.images} alt={product.bookName} />
              </td>
              <td className="py-3 px-4 border-b">${product.price}</td>
              <td className="py-3 px-4 border-b">{product.stock}</td>
              
              <td className="py-3 px-4 border-b text-center">
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-outline btn-sm bg-red-400 text-white hover:bg-red-500 transition-colors duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayCount < products.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="btn btn-primary bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}