// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProductsByIdAsync, selectAllProducts, selectedProductById } from '../../../BookList/Components/BooksSlice';
// import { useParams } from 'react-router-dom';

// export default function Edit() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
  
//   const selectedProduct = useSelector((state) => selectedProductById(state, id));
  
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductsByIdAsync(id));
//     }
//   }, [id, dispatch]);
  
// //   if (!selectedProduct) {
// //     return <div>Loading...</div>; // You can display a loading state or a placeholder
// //   }

//   return (
//     <div className="pb-6 pt-6 bg-gradient-to-br from-indigo-100 to-yellow-100">
//       <div className="bg-white max-w-screen-md rounded-xl shadow-2xl mx-auto">
//         <div className="">
//           <div className="mx-auto px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
//             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//                 {id || 'Book Name Not Available'}
//               </h1>
//             </div>
//           </div> 
//         </div>
//       </div>
//     </div>
//   );
// }
