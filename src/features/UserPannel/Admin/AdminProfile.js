// import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../User/UserSlice';

// import styles from './Counter.module.css';

export default function AdminProfile() {
  const user = useSelector(selectUserInfo);


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
    
  </div>
);
}
