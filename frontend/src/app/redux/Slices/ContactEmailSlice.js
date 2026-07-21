import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://fully-ecommerce.onrender.com/api/contact";

// ==========================
// Send Contact Message
// ==========================
export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const ContactEmailSlice = createSlice({
  name: "contact",

  initialState: {
    loading: false,
    success: false,
    contact: null,
    message: "",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contact = action.payload.contact;
        state.message = action.payload.message;
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ContactEmailSlice.reducer;