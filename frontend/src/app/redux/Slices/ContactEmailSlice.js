import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://fully-ecommerce.onrender.com/api/contact",
        formData
      );

      console.log("SUCCESS:", response.data);

      return response.data;
    } catch (error) {
      console.log("ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || error.message
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

  reducers: {
    clearState(state) {
      state.success = false;
      state.error = null;
      state.contact = null;
      state.message = "";
    },
  },

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
        state.message = action.payload.message;
        state.contact = action.payload.contact;
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = ContactEmailSlice.actions;

export default ContactEmailSlice.reducer;