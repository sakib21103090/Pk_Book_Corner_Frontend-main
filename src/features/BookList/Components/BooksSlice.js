import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchAuthorName,
  fetchCategory,
  fetchProductsById,
  createProduct,
  deleteProduct,
} from "./BooksListApi";

const initialState = {
  products: [],
  AuthorName: [],
  category: [],
  status: "idle",
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductsById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort }) => {
    const response = await fetchProductsByFilters(filter, sort);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAuthorNameAsync = createAsyncThunk(
  "product/fetchAuthorName",
  async () => {
    const response = await fetchAuthorName();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async () => {
    const response = await fetchCategory();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (productId) => {
    const response = await deleteProduct(productId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const BooksSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      // for fetch authorName
      .addCase(fetchAuthorNameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthorNameAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AuthorName = action.payload;
      })
      // for fetch category
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      // for fetch books by id
      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      // add books 
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      // delete product
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products.splice(index, 1);
        }
      })
      
  },
});

export const { increment } = BooksSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllAuthorName = (state) => state.product.AuthorName;
export const selectAllCategory = (state) => state.product.category;
export const selectedProductById = (state) => state.product.selectedProduct;

export default BooksSlice.reducer;
