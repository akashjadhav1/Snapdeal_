import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { setUserData } from "./userDataSlice";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const uid = state.user.data.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }

    const userDataCollectionRef = collection(db, "user_data");
    const userDataRef = doc(userDataCollectionRef, uid);

    // Subscribe to changes in userDataRef
    onSnapshot(userDataRef, (userDataSnapshot) => {
      if (userDataSnapshot.exists()) {
        const userData = userDataSnapshot.data();
        dispatch(setUserData(userData));
      } else {
        const cart = getState().userData.cart;
        // If userDataRef doesn't exist, set default data
        setDoc(userDataRef, {
          cart: cart,
          shortlist: [],
        });
      }
    });
  }
);

export const addToCart = createAsyncThunk(
  "userData/addToCart",
  async (id, { getState }) => {
    const state = getState();
    const uid = state.user.data.uid;
    const updatedCart = [...state.userData.cart, { id, quantity: 1 }];
    if (uid) {
      const userDataCollectionRef = collection(db, "user_data");
      const userDataRef = doc(userDataCollectionRef, uid);
      setDoc(userDataRef, { cart: updatedCart }, { merge: true });
    }
    return updatedCart;
  }
);

export const incrementQuantity = createAsyncThunk(
  "userData/incrementQuantity",
  async (id, { getState }) => {
    const state = getState();
    const uid = state.user.data.uid;
    const updatedCart = state.userData.cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    if (uid) {
      const userDataCollectionRef = collection(db, "user_data");
      const userDataRef = doc(userDataCollectionRef, uid);
      setDoc(userDataRef, { cart: updatedCart }, { merge: true });
    }
    return updatedCart;
  }
);

export const decrementQuantity = createAsyncThunk(
  "userData/decrementQuantity",
  async (id, { getState }) => {
    const state = getState();
    const uid = state.user.data.uid;
    const updatedCart = state.userData.cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    if (uid) {
      const userDataCollectionRef = collection(db, "user_data");
      const userDataRef = doc(userDataCollectionRef, uid);
      setDoc(userDataRef, { cart: updatedCart }, { merge: true });
    }
    return updatedCart;
  }
);

export const removeFromCart = createAsyncThunk(
  "userData/removeFromCart",
  async (id, { getState }) => {
    const state = getState();
    const uid = state.user.data.uid;
    const updatedCart = state.userData.cart.filter((item) => item.id !== id);
    if (uid) {
      const userDataCollectionRef = collection(db, "user_data");
      const userDataRef = doc(userDataCollectionRef, uid);
      setDoc(userDataRef, { cart: updatedCart }, { merge: true });
    }

    return updatedCart;
  }
);

export const addToShortlist = createAsyncThunk(
  "userData/addToShortlist",
  async (id, { getState }) => {
    const state = getState();
    const uid = state.user.data.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }

    const userDataCollectionRef = collection(db, "user_data");
    const userDataRef = doc(userDataCollectionRef, uid);

    const userDataSnapshot = await getDoc(userDataRef);
    if (userDataSnapshot.exists()) {
      const userData = userDataSnapshot.data();
      const updatedShortlist = [...userData.shortlist, id];
      await setDoc(
        userDataRef,
        { shortlist: updatedShortlist },
        { merge: true }
      );
    }
  }
);

export const removeFromShortlist = createAsyncThunk(
  "userData/removeFromShortlist",
  async (id, { getState }) => {
    const state = getState();
    const uid = state.user.data.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }

    const userDataCollectionRef = collection(db, "user_data");
    const userDataRef = doc(userDataCollectionRef, uid);

    const userDataSnapshot = await getDoc(userDataRef);
    if (userDataSnapshot.exists()) {
      const userData = userDataSnapshot.data();
      const updatedShortlist = userData.shortlist.filter((item) => item !== id);
      await setDoc(
        userDataRef,
        { shortlist: updatedShortlist },
        { merge: true }
      );
    }
  }
);
