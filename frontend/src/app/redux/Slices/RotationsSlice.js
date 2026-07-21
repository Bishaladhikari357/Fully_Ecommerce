import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://fully-ecommerce.onrender.com/api/rotations";

// ==========================
// Fetch Rotations
// ==========================
export const fetchRotations = createAsyncThunk(
  "rotations/fetchRotations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch rotations"
      );
    }
  }
);

const rotationsSlice = createSlice({
  name: "rotations",

  initialState: {
    rotations: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchRotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRotations.fulfilled, (state, action) => {
        state.loading = false;
        state.rotations = action.payload;
      })

      .addCase(fetchRotations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rotationsSlice.reducer;