import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import {
  createProductAsync,
  selectAllAuthorName,
  selectAllCategory,
} from "../../BookList/Components/BooksSlice";

const apiKey = "03ca1ed84b4da7e158f8809f3e4470d2";

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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Handle image upload to ImgBB
      const formData = new FormData();
      formData.append("image", data.image[0]); // Upload the first selected image

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
      const imageResponse = await fetch(imageUploadUrl, {
        method: "POST",
        body: formData,
      });

      const imageResult = await imageResponse.json();
      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageUrl = imageResult.data.url;

      // Dispatch the action to add the product with the uploaded image URL
      await dispatch(
        createProductAsync({
          ...data,
          images: imageUrl, // Replace the images field with the uploaded image URL
        })
      );

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
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add product. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form
      className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-12 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add New Product
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Book Name
          </label>
          <input
            type="text"
            placeholder="Enter Book Name"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("bookName", { required: "Book Name is required" })}
          />
          {errors.bookName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bookName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Author Name
          </label>
          <select
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("authorName", {
              required: "Author Name is required",
            })}
          >
            <option value="">--Choose Author Name--</option>
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
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">--Choose Category--</option>
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
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Add Book Photo
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full h-10"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Photo is required</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter Price"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Price must be greater than 0",
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Discount Percentage
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter Discount Percentage"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            placeholder="Enter Rating (0 to 5)"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="number"
            placeholder="Enter Stock Quantity"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            ISBN
          </label>
          <input
            type="text"
            placeholder="Enter ISBN"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("isbn", {
              required: "ISBN is required",
            })}
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Publication
          </label>
          <input
            type="text"
            placeholder="Enter Publication"
            className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("Publication", {
              required: "Publication is required",
            })}
          />
          {errors.Publication && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Publication.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter Book Description"
            className="border border-gray-300 rounded-md p-3 w-full h-32 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6">
        <button
          onClick={() => reset()}
          type="button"
          className="text-sm font-semibold text-gray-700 hover:underline"
        >
          Reset
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
