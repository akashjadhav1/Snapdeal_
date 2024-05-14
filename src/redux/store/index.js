import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import userDataReducer from "@/features/userData/userDataSlice";
import productsReducer from "@/features/products/productsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
    products: productsReducer,
  },
});
