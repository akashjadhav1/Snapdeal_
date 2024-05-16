import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "./userDataThunks";

// Define initial state for user data
const initialState = {
  cart: [],
  shortlist: [],
  status: "idle",
  error: null,
};

// User data slice
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.cart = action.payload.cart || [];
      state.shortlist = action.payload.shortlist || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUserData.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(incrementQuantity.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(decrementQuantity.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
