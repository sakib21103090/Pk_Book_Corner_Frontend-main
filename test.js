

 const products=[
    {
        "id": 1,
        "BookName": "বাংলাদেশের মুক্তিযুদ্ধ",
        "description": "Description for Book 1",
        "price": 120,
        "discountPercentage": 10.5,
        "rating": 3.1,
        "stock": 105,
        "AuthorName": "Mohammad Zakaria",
        "category": "Educational Books",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 2,
        "BookName": "আশ্চর্য প্রদীপ",
        "description": "Description for Book 2",
        "price": 140,
        "discountPercentage": 11.0,
        "rating": 3.2,
        "stock": 110,
        "AuthorName": "Muhammed Zafar Iqbal",
        "category": "Science and Technology",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 3,
        "BookName": "Mohakash",
        "description": "Description for Book 3",
        "price": 160,
        "discountPercentage": 11.5,
        "rating": 3.3,
        "stock": 115,
        "AuthorName": "Asif Azim",
        "category": "Science and Technology",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 4,
        "BookName": "স্বাস্থ্য কথা",
        "description": "Description for Book 4",
        "price": 180,
        "discountPercentage": 12.0,
        "rating": 3.4,
        "stock": 120,
        "AuthorName": "Dr. Zafrullah Chowdhury",
        "category": "Health and Wellness",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 5,
        "BookName": "ঠাকুরমার ঝুলি",
        "description": "Description for Book 5",
        "price": 200,
        "discountPercentage": 12.5,
        "rating": 3.5,
        "stock": 125,
        "AuthorName": "Dakshinaranjan Mitra Majumder",
        "category": "Childrens Books",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 6,
        "BookName": "গীতাঞ্জলি",
        "description": "Description for Book 6",
        "price": 220,
        "discountPercentage": 13.0,
        "rating": 3.6,
        "stock": 130,
        "AuthorName": "গীতগোবিন্দ",
        "category": "Literature and Poetry",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    
    {
        "id": 8,
        "BookName": "বাংলাদেশ: একাত্তরের জনযুদ্ধ",
        "description": "Description for Book 8",
        "price": 260,
        "discountPercentage": 14.0,
        "rating": 3.8,
        "stock": 140,
        "AuthorName": "Hasan Azizul Haque",
        "category": "Educational Books",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 9,
        "BookName": "পরিবেশ বিজ্ঞান",
        "description": "Description for Book 9",
        "price": 280,
        "discountPercentage": 14.5,
        "rating": 3.9,
        "stock": 145,
        "AuthorName": "Ba",
        "category": "A K M Azizul Haque",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 10,
        "BookName": "Pakistaner Jonmo Mrityu",
        "description": "Description for Book 10",
        "price": 300,
        "discountPercentage": 15.0,
        "rating": 4.0,
        "stock": 150,
        "AuthorName": "অরুন্ধতী রায়",
        "category": "Politics and Social Sciences",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 11,
        "BookName": "মন ও মনের রোগ",
        "description": "Description for Book 11",
        "price": 320,
        "discountPercentage": 15.5,
        "rating": 4.1,
        "stock": 155,
        "AuthorName": "Dr. Tahmina Banu",
        "category": "Health and Wellness",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 12,
        "BookName": "Hatim Tai",
        "description": "Description for Book 12",
        "price": 340,
        "discountPercentage": 16.0,
        "rating": 4.2,
        "stock": 160,
        "AuthorName": "Gazi Abdul Hakim",
        "category": "Childrens Books",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 13,
        "BookName": "ঘরে বাইরে",
        "description": "Description for Book 13",
        "price": 360,
        "discountPercentage": 16.5,
        "rating": 4.3,
        "stock": 165,
        "AuthorName": "রবীন্দ্রনাথ ঠাকুর ",
        "category": "Literature and Poetry",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 14,
        "BookName": "গোরা",
        "description": "Description for Book 13",
        "price": 360,
        "discountPercentage": 16.5,
        "rating": 4.3,
        "stock": 165,
        "AuthorName": "রবীন্দ্রনাথ ঠাকুর ",
        "category": "Literature and Poetry",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    },
    {
        "id": 15,
        "BookName": "ইতিহাস ও রাজনীতি",
        "description": "Description for Book 1",
        "price": 120,
        "discountPercentage": 10.5,
        "rating": 3.1,
        "stock": 105,
        "AuthorName": "Mohammad Zakaria",
        "category": "Educational Books",
        "images": "https://i.ibb.co/pnGJwLn/image.png"
    }
    
    ]
const category=[...new Set([...products.map(p=>p.category)])]
console.log(category.map(c=>({value:c,Label:c.split('-').join(''),checked:false})))

// function MobileFilter({mobileFiltersOpen, setMobileFiltersOpen,handleFilter}){
//     return(
//       <Transition show={mobileFiltersOpen}>
//                   <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
//                     <TransitionChild
//                       enter="transition-opacity ease-linear duration-300"
//                       enterFrom="opacity-0"
//                       enterTo="opacity-100"
//                       leave="transition-opacity ease-linear duration-300"
//                       leaveFrom="opacity-100"
//                       leaveTo="opacity-0"
//                     >
//                       <div className="fixed inset-0 bg-black bg-opacity-25" />
//                     </TransitionChild>
    
//                     <div className="fixed inset-0 z-40 flex">
//                       <TransitionChild
//                         enter="transition ease-in-out duration-300 transform"
//                         enterFrom="translate-x-full"
//                         enterTo="translate-x-0"
//                         leave="transition ease-in-out duration-300 transform"
//                         leaveFrom="translate-x-0"
//                         leaveTo="translate-x-full"
//                       >
//                         <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
    
//                           {/* Filters */}
//                           <form className="mt-4 border-t border-gray-200">
//                             {filters.map((section) => (
//                               <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
//                                 {({ open }) => (
//                                   <>
//                                     <h3 className="-mx-2 -my-3 flow-root">
//                                       <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                                         <span className="font-medium text-gray-900">{section.name}</span>
//                                         <span className="ml-6 flex items-center">
//                                           {open ? (
//                                             <MinusIcon className="h-6 w-6 text-black" aria-hidden="true" />
//                                           ) : (
//                                             <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
//                                           )}
//                                         </span>
//                                       </DisclosureButton>
//                                     </h3>
//                                     <DisclosurePanel className="pt-6">
//                                       <div className="space-y-6">
//                                         {section.options.map((option, optionIdx) => (
//                                           <div key={option.value} className="flex items-center">
//                                             <input
//                                               id={`filter-mobile-${section.id}-${optionIdx}`}
//                                               name={`${section.id}[]`}
//                                               defaultValue={option.value}
//                                               type="checkbox"
//                                               defaultChecked={option.checked}
//                                               onChange={e => handleFilter(e, section, option)}
//                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                             />
//                                             <label
//                                               htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                                               className="ml-3 min-w-0 flex-1 text-gray-500"
//                                             >
//                                               {option.label}
//                                             </label>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     </DisclosurePanel>
//                                   </>
//                                 )}
//                               </Disclosure>
//                             ))}
//                           </form>
//                         </DialogPanel>
//                       </TransitionChild>
//                     </div>
//                   </Dialog>
//                 </Transition>
//     );
//   }
  
//   function DesktopFilter({handleFilter}){
//     return(
//       <form className="hidden lg:block">
//                         {filters.map((section) => (
//                           <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
//                             {({ open }) => (
//                               <>
//                                 <h3 className="-my-3 flow-root">
//                                   <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                                     <span className="font-medium text-gray-900">{section.name}</span>
//                                     <span className="ml-6 flex items-center">
//                                       {open ? (
//                                         <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                                       ) : (
//                                         <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                                       )}
//                                     </span>
//                                   </DisclosureButton>
//                                 </h3>
//                                 <DisclosurePanel className="pt-6">
//                                   <div className="space-y-4">
//                                     {section.options.map((option, optionIdx) => (
//                                       <div key={option.value} className="flex items-center">
//                                         <input
//                                           id={`filter-${section.id}-${optionIdx}`}
//                                           name={`${section.id}[]`}
//                                           defaultValue={option.value}
//                                           type="checkbox"
//                                           defaultChecked={option.checked}
//                                           onChange={e => handleFilter(e, section, option)}
//                                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                         />
//                                         <label
//                                           htmlFor={`filter-${section.id}-${optionIdx}`}
//                                           className="ml-3 text-sm text-gray-600"
//                                         >
//                                           {option.label}
//                                         </label>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 </DisclosurePanel>
//                               </>
//                             )}
//                           </Disclosure>
//                         ))}
//                       </form>
  
//     );
//   }
  
//   function Pagination(){
//     return(<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//           <a
//             href="#"
//             className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Previous
//           </a>
//           <a
//             href="#"
//             className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Next
//           </a>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
//               <span className="font-medium">97</span> results
//             </p>
//           </div>
//           <div>
//             <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//               <a
//                 href="#"
//                 className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//               </a>
//               {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
//               <a
//                 href="#"
//                 aria-current="page"
//                 className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 1
//               </a>
//               <a
//                 href="#"
//                 className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 2
//               </a>
             
//               <a
//                 href="#"
//                 className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//               </a>
//             </nav>
//           </div>
//         </div>
//     </div>);
//   }
  
//   function BooksCard({products}){
//     return(
      
       
  
//         <>
//           {products.map((product) => (
//             <Link to="/product-detail" key={product.id}>
//                           <div className="group relative border-solid border-2 p-2 border-gray-200">
//                             <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
//                               <img
//                                 src={product.images}
//                                 alt={product.BookName}
//                                 className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                               />
//                             </div>
//                             <div className="mt-4 flex justify-between">
//                               <div>
//                                 <h3 className="text-sm text-gray-700">
//                                   <a href={product.images}>
//                                     <span
//                                       aria-hidden="true"
//                                       className="absolute inset-0"
//                                     />
//                                     {product.BookName}
//                                   </a>
//                                 </h3>
//                                 <p className="mt-1 text-sm text-gray-500">
//                                   <StarIcon className="w-6 h-6 inline"></StarIcon>
//                                   <span className=" align-bottom">
//                                     {product.rating}
//                                   </span>
//                                 </p>
//                               </div>
//                               <div>
//                                 <p className="text-sm block font-medium text-gray-900">
//                                   $
//                                   {Math.round(
//                                     product.price *
//                                       (1 - product.discountPercentage / 100)
//                                   )}
//                                 </p>
//                                 <p className="text-sm block line-through font-medium text-gray-400">
//                                   ${product.price}
//                                 </p>
//                               </div>
//                               </div>
//             </div>
//             </Link>
//           ))}
//           </>
     
//     );
//   }
{/* <BooksCard products={products}></BooksCard>
<DesktopFilter handleFilter={handleFilter}></DesktopFilter>  function DesktopFilter({handleFilter}){
<MobileFilter handleFilter={handleFilter} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}></MobileFilter> */}



// const [sort, setSort] = useState({});
//   const [filter,setFilter]=useState({});


//   const handleFilter=(e,section,option)=>{
//     console.log(e.target.checked)
//     const newFilter = {...filter};
//     // TODO : on server it will support multiple categories
//     if(e.target.checked){
//       if(newFilter[section.id]){
//         newFilter[section.id].push(option.value)
//       } else{
//         newFilter[section.id] = [option.value]
//       }
//     } else{
//        const index = newFilter[section.id].findIndex(el=>el===option.value)
//        newFilter[section.id].splice(index,1);
//     }
//     setFilter(newFilter)
//     console.log({newFilter});
    
//   };

//   const handleSort = (e, option) => {
//     const sort = { _sort: option.sort, _order: option.order };
//     console.log({sort});
//     setSort(sort);
//   };
  
//   useEffect(()=>{
//     dispatch(fetchProductsByFiltersAsync({filter, sort}));
//   }, [dispatch,filter])


// export const fetchProductsByFiltersAsync = createAsyncThunk(
//     'product/fetchProductsByFiltersAsync',
//     async (filter,sort) => {
//       const response = await fetchProductsByFilters(filter,sort);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     }
//   );
  

// export function fetchProductsByFilters(filter,sort) {
//     // filter = {"category":"children books"}
//     // TODO : on server we will support multi values
//     let queryString = '';
//     for(let key in filter){
//       const categoryValues = filter[key];
//       if(categoryValues.length){
//         const lastCategoryValue = categoryValues[categoryValues.length-1]
//         queryString += `${key}=${lastCategoryValue}&`
//       }
//     }
//     for(let key in sort){
//       queryString += `${key}=${sort[key]}&`
//     }
  
//     return new Promise(async (resolve) =>{
//       //TODO: we will not hard-code server URL here
//       const response = await fetch('http://localhost:8080/products?'+queryString) 
//       const data = await response.json()
//       resolve({data})
//     }
//     );
//   }
  