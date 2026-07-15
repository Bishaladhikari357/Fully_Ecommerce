import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000/api/orders";

const getSessionKey = () => {
  return localStorage.getItem("sessionKey");
};

export const checkout = createAsyncThunk(
  "checkout/placeOrder",
  async (data, { rejectWithValue }) => {
    try {
      const sessionKey = getSessionKey();

      const res = await axios.post(`${API}/checkout`, {
        sessionKey,
        ...data,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Checkout Failed"
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",

  initialState: {
    order: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearCheckout(state) {
      state.order = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload.order;
      })

      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;