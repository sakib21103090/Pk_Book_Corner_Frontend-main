


import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  fetchAllProductsAsync,
  fetchAuthorNameAsync,
  fetchCategoryAsync,
  fetchProductsByFiltersAsync,
  selectAllAuthorName,
  selectAllCategory,
  selectAllProducts,
} from "./BooksSlice";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// product list item

export default function BooksList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const authorName = useSelector(selectAllAuthorName);
  const category = useSelector(selectAllCategory);
  const filters = [
    {
      id: "authorName",
      name: "authorName",
      options: authorName,
    },
    {
      id: "category",
      name: "category",
      options: category,
    },
  ];
  const [sort, setSort] = useState({});
  const [filter, setFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

 // for sorting
 const handleSort = (e, option) => {
  const sort = { _sort: option.sort, _order: option.order };
  setSort(sort);
  console.log("Sorting by:", sort); // Debug log
};

// for search 
  const handleSearch = (e) => {
    e.preventDefault();
    filterProducts();
  };
  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.bookName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };
  

  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync({ filter, sort }));
  }, [dispatch, filter, sort]);

  useEffect(() => {
    dispatch(fetchAuthorNameAsync());
    dispatch(fetchCategoryAsync());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm]);

  return (
    <div>
      <div className="flex items-center justify-center pb-6">
        <div className="max-w-3xl mx-auto mt-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center rounded-full shadow-md  bg-cyan-200  hover:shadow-lg transition-shadow duration-300">
              <input
                className="w-full px-8 py-2 rounded-full text-gray-700 focus:outline-none placeholder-gray-500 bg-white bg-opacity-50 focus:bg-opacity-100 transition-all duration-300"
                type="text"
                placeholder="Search for books..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
              >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="bg-white mx-auto">
          <div>
            <MobileFilter
              handleFilter={handleFilter}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              filters={filters}
            />

            <main className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6  pt-24">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Filter By
                </h1>
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={(e) => handleSort(e, option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <DesktopFilter
                    handleFilter={handleFilter}
                    filters={filters}
                  />

                  <div className="lg:col-span-3">
                    <div className="bg-white">
                      <BooksCard products={filteredProducts} />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// make different function for easy to use comment
function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition show={mobileFiltersOpen}>
      <Dialog
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-6 w-6 text-black"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-6 w-6 text-black"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function BooksCard({ products }) {
  const [visibleProducts, setVisibleProducts] = useState(6);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 6);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.slice(0, visibleProducts).map((product) => (
          <Link to={`/booksinfopage/${product.id}`} key={product.id}>
            <div className="group relative border-solid h-[480px] border-2 p-2 bg-gradient-to-br  from-cyan-50 to-gray-100 border--200">
              <div className="w-full h-[380px] overflow-hidden rounded-md bg-gray-200 ">
                <img
                  src={product.images}
                  alt={product.bookName}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black">
                    <span aria-hidden="true" className="absolute inset-0 " />
                    {product.bookName}
                  </h3>
                  <p className="mt-1 text-sm ">
                    <StarIcon className="w-6 text-yellow-400 h-6 inline"></StarIcon>
                    <span className="align-bottom text-black">
                      {product.rating}
                    </span>
                  </p>
                </div>
                <div>
                  {product.discountPercentage ? (
                    <div className="mt-1">
                      <p className="text-sm block line-through font-medium text-red-400">
                        <span>{product.price}Tk</span>
                      </p>
                      <p className="text-sm block font-medium text-green-600">
                        Discount: {product.discountPercentage}%
                      </p>
                      <p className="text-xl font-medium text-gray-900">
                        Price:
                        {product.price -
                          (
                            (product.price * product.discountPercentage) /
                            100
                          ).toFixed(0)}Tk
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1 text-xl font-medium text-gray-900">
                      Price:{product.price}Tk
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={showMoreProducts}
            className="mt-10  relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-black bg-cyan-500 rounded-lg group"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="relative">Show More</span>
          </button>
        </div>
      )}
    </div>
  );
}
