import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

export const fetchData = createAsyncThunk(
  "products/fetchData",
  async (_, { getState }) => {
    try {
      const state = getState();
      const { filters } = state.products;

      const productsCollection = collection(db, "products");

      const filtersArray = [];
      if (filters.category)
        filtersArray.push(where("category", "==", filters.category));
      if (filters.subcategory)
        filtersArray.push(where("subcategory", "==", filters.subcategory));
      if (filters.minPrice)
        filtersArray.push(where("price", ">=", filters.minPrice));
      if (filters.maxPrice)
        filtersArray.push(where("price", "<=", filters.maxPrice));

      const q = query(productsCollection, ...filtersArray);
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filters: {
      category: null,
      subcategory: null,
      minPrice: null,
      maxPrice: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setSubcategory(state, action) {
      state.filters.subcategory = action.payload;
    },
    setMinPrice(state, action) {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.filters.maxPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setSubcategory, setMinPrice, setMaxPrice } =
  productsSlice.actions;
export default productsSlice.reducer;
