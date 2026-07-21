import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://fully-ecommerce.onrender.com/api/blogs";


// Fetch Blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogsSlice.reducer;