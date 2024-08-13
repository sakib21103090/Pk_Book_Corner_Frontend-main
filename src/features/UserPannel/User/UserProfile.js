import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, UpdateUserAsync } from "./UserSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(UpdateUserAsync(newUser));
  };

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(UpdateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  return (
    <div className="max-w-screen-lg w-[1100px] bg-gray-100 p-10 rounded-2xl shadow-2xl">
      <div className="text-center">
        <img
          className="mx-auto h-24 w-24 rounded-full border-4 border-indigo-500 shadow-lg"
          src={user?.photoUrl}
          alt="User"
        />
        <h2 className="mt-6 text-3xl font-bold text-indigo-900">
          {user?.displayName}
        </h2>
        <p className="mt-2 text-md text-indigo-700">{user?.email}</p>
      </div>
      <div className="mt-8 space-y-8">
        <div className="text-center">
          <p className="mt-0.5 text-xl font-bold text-green-800">
            Shipping Address
          </p>
          <p className="mt-1 text-lg text-indigo-600">
            Here you can see your profile details and update your information.
          </p>
        </div>
        {user?.addresses?.map((address, index) => (
          <div key={index}>
            {selectedEditIndex === index ? (
              <form
                className="px-5 py-12 mt-12 bg-white rounded-xl shadow-md"
                onSubmit={handleSubmit((data) => {
                  handleEdit(data, index);
                  reset();
                })}
              >
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold pb-8 text-indigo-800">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="border rounded-lg p-3 w-full"
                        {...register("name", {
                          required: "Name is required",
                        })}
                        defaultValue={address.name}
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
                        className="border rounded-lg p-3 w-full"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        defaultValue={address.email}
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
                        className="border rounded-lg p-3 w-full"
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
                          pattern: {
                            value: /^\d+$/,
                            message: "Invalid phone number",
                          },
                        })}
                        defaultValue={address.phoneNumber}
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
                        placeholder="Country"
                        className="border rounded-lg p-3 w-full"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        defaultValue={address.country}
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
                        className="border rounded-lg p-3 w-full"
                        {...register("city", {
                          required: "City is required",
                        })}
                        defaultValue={address.city}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="border rounded-lg p-3 w-full"
                        {...register("postalCode", {
                          required: "Postal Code is required",
                        })}
                        defaultValue={address.postalCode}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-x-6 mt-8">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedEditIndex(-1);
                      }}
                      className="rounded-md px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-indigo-900 mt-1">
                  <span className="font-bold">Name: </span>
                  {address.name || "Not provided"}
                </p>
                <p className="text-lg text-indigo-900 mt-1">
                  <span className="font-bold">Email: </span>
                  {address.email || "Not provided"}
                </p>
                <p className="text-lg text-indigo-900 mt-1">
                  <span className="font-bold">Phone Number: </span>
                  {address.phoneNumber || "Not provided"}
                </p>
                <p className="text-lg text-indigo-900 mt-1">
                  <span className="font-bold">Country: </span>
                  {address.country || "Not provided"}
                </p>
                <p className="text-lg leading-6 text-indigo-900 mt-1">
                  <span className="font-bold">City: </span> {address.city}
                </p>
                <p className="text-lg leading-6 text-indigo-900 mt-1">
                  <span className="font-bold">Postal Code: </span>{" "}
                  {address.postalCode}
                </p>
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setSelectedEditIndex(index)}
                    className="bg-indigo-600 btn-sm hover:bg-indigo-700 text-white font-medium px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    className="bg-red-600 btn-sm hover:bg-red-700 text-white font-medium px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
