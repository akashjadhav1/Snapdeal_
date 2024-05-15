import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  collection,
} from "firebase/firestore";
import { setUserData } from "./userDataSlice";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const uid = state.user.data.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }

    const db = getFirestore();
    const userDataCollectionRef = collection(db, "user_data");
    const userDataRef = doc(userDataCollectionRef, uid);

    // Subscribe to changes in userDataRef
    const unsubscribe = onSnapshot(userDataRef, (userDataSnapshot) => {
      if (userDataSnapshot.exists()) {
        const userData = userDataSnapshot.data();
        dispatch(setUserData(userData));
      } else {
        // If userDataRef doesn't exist, set default data
        setDoc(userDataRef, {
          cart: [],
          shortlist: [],
        });
      }
    });
  }
);
