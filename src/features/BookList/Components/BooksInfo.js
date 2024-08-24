import {
  StarIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  UserIcon,
  BookOpenIcon,
  IdentificationIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid";
import { fetchProductsByIdAsync, selectedProductById } from "./BooksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCartAsync, selectCartItems } from "../../Cart/CartSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { selectUserInfo } from "../../UserPannel/User/UserSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BooksInfo() {
  const product = useSelector(selectedProductById);
  const items = useSelector(selectCartItems);
  console.log(items)
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const handleCart = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to add items to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Adjust this path to your login route
        }
      });
      return;
    }

    const isProductInCart = items.some(
      (item) => item.product.id === product.id
    );

    if (isProductInCart) {
      Swal.fire("Oops", "Book is already added to cart", "warning");
    } else {
      dispatch(
        addToCartAsync({ product: product.id, quantity: 1, user: user.id })
      );
      Swal.fire("Success", "Book is added to cart", "success");
    }
  };

  useEffect(() => {
    dispatch(fetchProductsByIdAsync(params.id));
  }, [dispatch, params.id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-8 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-yellow-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-4 from-indigo-50 to-yellow-100 flex items-center justify-center">
      <div className="bg-white max-w-6xl w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          <div className="flex justify-center items-center">
            <img
              src={product.images}
              alt={product.bookName || "Book cover"}
              className="w-full h-[600px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                {product.bookName}
              </h1>
              <div className="mt-2 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-3 text-lg text-gray-600">
                  {product.rating} out of 5 stars
                </span>
              </div>
              <div className="mt-4">
                {product.discountPercentage ? (
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {(
                        product.price -
                        (product.price * product.discountPercentage) / 100
                      ).toFixed(0)}{" "}
                      Tk
                    </p>
                    <p className="text-sm font-medium text-red-500">
                      {product.discountPercentage}% OFF
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">
                    {product.price.toFixed(0)} Tk
                  </p>
                )}
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <UserIcon
                      className="h-6 w-6 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    Author
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {product.authorName}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <IdentificationIcon
                      className="h-6 w-6 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    ISBN No
                  </h3>
                  <p className="mt-2 text-base text-gray-600">{product.isbn}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <DocumentTextIcon
                      className="h-6 w-6 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    Publication
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {product.publication}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <BookOpenIcon
                      className="h-6 w-6 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    Description
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleCart}
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
              >
                <ShoppingCartIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                Add to Cart
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg shadow-sm text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                >
                  <ArrowLeftIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
