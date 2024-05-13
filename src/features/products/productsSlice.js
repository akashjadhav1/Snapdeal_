import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    filters: [],
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    fetchDataStart(state) {
      if (state.status === "idle") state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  productsSlice.actions;
export default productsSlice.reducer;
