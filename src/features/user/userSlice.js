import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "react-toastify";

// Async thunk to fetch user
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user ? user.toJSON() : null);
      },
      reject
    );
  });
});

// Async thunk for signup with email and password
export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user ? userCredential.user.toJSON() : null;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for login with email and password
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user ? userCredential.user.toJSON() : null;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for login with Google
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user ? userCredential.user.toJSON() : null;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
});

// Define initial state
const initialState = {
  isAuthenticated: false,
  data: null,
  status: "idle",
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.isAuthenticated = action.payload ? true : false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    // Additional cases for signup, login, loginWithGoogle, and logout async thunks
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload ? true : false;
      state.data = action.payload;
      toast.success("Signup successful");
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload ? true : false;
      state.data = action.payload;
      toast.success("Login successful");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload ? true : false;
      state.data = action.payload;
      toast.success("Login successful");
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.data = null;
      toast.success("Logout successful");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error.message;
      toast.error(action.error.message);
    });
  },
});

export default userSlice.reducer;
