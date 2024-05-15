import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  collection,
} from "firebase/firestore";
import { fetchUserData } from "./fetchUserData";

// Define initial state for user data
const initialState = {
  cart: null,
  shortlist: null,
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
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
