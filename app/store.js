import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";
import trxReducer from "../features/trxSlice";

export default configureStore({
  reducer: { user: userReducer, app: appReducer, trx: trxReducer },
});
