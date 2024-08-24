import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";

import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import {
  fetchAuthorNameAsync,
  fetchCategoryAsync,
  fetchProductsByFiltersAsync,
  selectAllAuthorName,
  selectAllCategory,
  selectAllProducts,
} from "./BooksSlice";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
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

export default function BooksList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const authorName = useSelector(selectAllAuthorName);
  const category = useSelector(selectAllCategory);
  const [sort, setSort] = useState({});
  const [filter, setFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const handleFilter = (sectionId, value) => {
    const newFilter = { ...filter };
    if (value) {
      newFilter[sectionId] = [value];
    } else {
      delete newFilter[sectionId];
    }
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterProducts();
    setCurrentPage(1);
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

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible((prev) => !prev);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex items-center justify-center pb-6">
        <div className="max-w-3xl mx-auto mt-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center rounded-full shadow-md bg-cyan-200 hover:shadow-lg transition-shadow duration-300">
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
        <div className="bg-white mx-auto lg:mx-10 md:mx-10">
          <main className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
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
                  onClick={toggleMobileFilter}
                >
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {isMobileFilterVisible && (
                  <MobileFilter
                    handleFilter={handleFilter}
                    authorName={authorName}
                    category={category}
                    toggleMobileFilter={toggleMobileFilter}
                  />
                )}

                <DesktopFilter
                  handleFilter={handleFilter}
                  authorName={authorName}
                  category={category}
                />

                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <BooksCard products={currentProducts} />
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-end mt-8">
                <nav aria-label="Page navigation">
                  <ul className="inline-flex -space-x-px">
                    <li>
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-3 py-2 ml-0 leading-tight border rounded-l-lg ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-700"
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li key={page}>
                          <button
                            onClick={() => handlePageChange(page)}
                            className={classNames(
                              "px-3 py-2 leading-tight border transition-all duration-200",
                              currentPage === page
                                ? "bg-black text-white shadow-lg transform scale-105"
                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            )}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}
                    <li>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-3 py-2 leading-tight border rounded-r-lg ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-700"
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function DesktopFilter({ handleFilter, authorName, category }) {
  return (
    <div className="hidden lg:block">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <select
            id="author"
            name="author"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => handleFilter("authorName", e.target.value)}
          >
            <option value="">All Authors</option>
            {authorName.map((author) => (
              <option key={author.value} value={author.value}>
                {author.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => handleFilter("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {category.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  handleFilter,
  authorName,
  category,
  toggleMobileFilter,
}) {
  return (
    <div className="lg:hidden fixed top-0 left-0 w-64 bg-white p-4 shadow-lg rounded-r-lg h-full z-50 transition-transform transform">
      <button
        onClick={toggleMobileFilter}
        className="block text-gray-700 font-medium mb-4"
      >
        Close Filter
      </button>
      <div className="flex flex-col space-y-6">
        <div>
          <label
            htmlFor="author-mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <select
            id="author-mobile"
            name="author"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => handleFilter("authorName", e.target.value)}
          >
            <option value="">All Authors</option>
            {authorName.map((author) => (
              <option key={author.value} value={author.value}>
                {author.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="category-mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category-mobile"
            name="category"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => handleFilter("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {category.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function BooksCard({ products }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
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
                          ).toFixed(0)}
                        Tk
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
    </div>
  );
}
