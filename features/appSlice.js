import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload.loading;
    },
    setEror: (state, { payload }) => {
      state.error = payload.error;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = appSlice.actions;
export default appSlice.reducer;
