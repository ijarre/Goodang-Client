import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: {
    accessToken: null,
    uid: null,
    warehouseId: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.isAuthenticated = true;
      state.currentUser = {
        accessToken: payload.accessToken,
        uid: payload.uid,
      };
    },
    removeCurrentUser: (state) => {
      (state.isAuthenticated = false),
        (state.currentUser = {
          accessToken: null,
          uid: null,
        });
    },
    setWarehouseId: (state, { payload }) => {
      state.currentUser.warehouseId = payload.warehouseId;
    },
  },
});

export const { setCurrentUser, removeCurrentUser, setWarehouseId } =
  userSlice.actions;
export default userSlice.reducer;
