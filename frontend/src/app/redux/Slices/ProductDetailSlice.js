import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProductDetail = createAsyncThunk(
  "productDetail/fetchProductDetail",
  async (slug) => {
    const response = await axios.get(
      `https://fully-ecommerce-1.onrender.com/api/products/${slug}`
    );
    return response.data;
  }
);

const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProduct(state) {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct } = ProductDetailSlice.actions;

export default ProductDetailSlice.reducer;