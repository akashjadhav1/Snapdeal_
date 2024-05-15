import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import userDataReducer from "@/features/userData/userDataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
  },
});
