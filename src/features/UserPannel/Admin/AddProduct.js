import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  selectAllAuthorName,
  selectAllCategory,
} from "../../BookList/Components/BooksSlice";
import Swal from "sweetalert2"; // Import SweetAlert

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const AuthorNames = useSelector(selectAllAuthorName);
  const categories = useSelector(selectAllCategory);

  const onSubmit = (data) => {
    dispatch(createProductAsync(data));

    // Show SweetAlert confirmation
    Swal.fire({
      title: "Success!",
      text: "Product added successfully!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // Reset the form after the alert is closed
      reset();
    });
  };

  return (
    <form className="px-5 py-12 mt-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="bookName"
                placeholder="Book Name"
                className="border rounded-md p-4 w-full text-lg"
                {...register("bookName", { required: "Book Name is required" })}
              />
              {errors.bookName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bookName.message}
                </p>
              )}
            </div>
            <div>
              <select
                className="border rounded-md p-4 w-full text-lg mt-2"
                {...register("authorName", {
                  required: "Author Name is required",
                })}
              >
                <option value="">--choose Author Name--</option>
                {AuthorNames.map((authorName) => (
                  <option key={authorName.value} value={authorName.value}>
                    {authorName.label}
                  </option>
                ))}
              </select>
              {errors.authorName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.authorName.message}
                </p>
              )}
            </div>
            <div>
              <select
                className="border rounded-md p-4 w-full text-lg mt-2"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">--choose category--</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="images"
                placeholder="Images"
                className="border rounded-md p-4 w-full text-lg"
                {...register("images", { required: "Images are required" })}
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="price"
                step="0.01"
                placeholder="Price"
                className="border rounded-md p-4 w-full text-lg"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Price must be greater than 0",
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="discountPercentage"
                step="0.01"
                placeholder="Discount Percentage"
                className="border rounded-md p-4 w-full text-lg"
                {...register("discountPercentage", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Discount Percentage must be at least 0",
                  },
                  max: {
                    value: 100,
                    message: "Discount Percentage cannot be more than 100",
                  },
                })}
              />
              {errors.discountPercentage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPercentage.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="rating"
                step="0.1"
                placeholder="Rating"
                className="border rounded-md p-4 w-full text-lg"
                {...register("rating", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Rating must be at least 0",
                  },
                  max: {
                    value: 5,
                    message: "Rating cannot be more than 5",
                  },
                })}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="border rounded-md p-4 w-full text-lg"
                {...register("stock", {
                  required: "Stock is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Stock must be at least 0",
                  },
                })}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <textarea
                name="description"
                placeholder="Description"
                className="border rounded-md p-4 w-full h-32 text-lg"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <button
            onClick={() => reset()}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
