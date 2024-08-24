import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import { createCategoryAsync } from "../../BookList/Components/BooksSlice";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createCategoryAsync(data));

    // Show SweetAlert confirmation
    Swal.fire({
      title: "Success!",
      text: "Category added successfully!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // Reset the form after the alert is closed
      reset();
    });
  };

  return (
    <form className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-12" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Add New Category</h2>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="value" className="block text-lg font-medium text-gray-700 mb-2">
              Value
            </label>
            <input
              type="text"
              id="value"
              name="value"
              placeholder="Enter category value"
              className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("value", { required: "Value is required" })}
            />
            {errors.value && (
              <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="label" className="block text-lg font-medium text-gray-700 mb-2">
              Label
            </label>
            <input
              type="text"
              id="label"
              name="label"
              placeholder="Enter category label"
              className="border border-gray-300 rounded-md p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("label", { required: "Label is required" })}
            />
            {errors.label && (
              <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="text-gray-600 hover:text-gray-800 font-semibold"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg px-6 py-2 transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Add Category
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCategory;
