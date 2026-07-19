import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://fully-ecommerce-1.onrender.com/api/sliders";

// Fetch Sliders
export const fetchSliders = createAsyncThunk(
  "sliders/fetchSliders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch sliders"
      );
    }
  }
);

const sliderSlice = createSlice({
  name: "sliders",
  initialState: {
    sliders: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })

      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliderSlice.reducer;