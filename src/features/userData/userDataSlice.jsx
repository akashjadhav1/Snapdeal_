import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

// Async thunk to fetch user data including cart and shortlist
export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  (_, { getState, dispatch }) => {
    const state = getState();
    const uid = state.user.data.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }
    const userDataRef = doc(getFirestore(), "user_data", uid);
    return new Promise((resolve, reject) => {
      onSnapshot(
        userDataRef,
        (userDataSnapshot) => {
          const userData = userDataSnapshot.data();
          dispatch(setUserData(userData));
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
);

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
  },
});

export default userDataSlice.reducer;
