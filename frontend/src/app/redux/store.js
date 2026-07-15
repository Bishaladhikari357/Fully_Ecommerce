import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slices/ProductSlice";
import ProductDetailReducer from "./Slices/ProductDetailSlice";
import cartReducer from "./Slices/CartSlice";
import checkoutReducer from "./Slices/CheckoutSlice";
import blogsReducer from "./Slices/BlogsSlice";
import blogDetailReducer from "./Slices/BlogsDetailSlice";
import sliderReducer from "./Slices/SliderSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    productDetail: ProductDetailReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        blogs: blogsReducer,
         blogDetail: blogDetailReducer,
         sliders: sliderReducer,
  },
});