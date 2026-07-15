import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/blogs";

// Fetch Blog Detail by Slug
export const fetchBlogDetail = createAsyncThunk(
  "blogDetail/fetchBlogDetail",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${slug}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogsDetailSlice = createSlice({
  name: "blogDetail",
  initialState: {
    blog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBlog: (state) => {
      state.blog = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlog } = blogsDetailSlice.actions;

export default blogsDetailSlice.reducer;