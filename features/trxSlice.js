import { createSlice } from "@reduxjs/toolkit";
import { camelize } from "../utils";

const initialState = {
  stockIn: {
    item: [],
    quantity: {},
  },
  stockOut: {
    item: [],
    quantity: {},
  },
  audit: {
    item: [],
    quantity: {},
  },
};

const trxSlice = createSlice({
  name: "trx",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const camelCased = camelize(payload.type);
      state[camelCased].item = [...state[camelCased].item, payload.item];
      state[camelCased].quantity = {
        ...state[camelCased].quantity,
        [payload.item.id]: 1,
      };
    },
    removeItem: (state, { payload }) => {
      const camelCased = camelize(payload.type);
      const filtered = state[camelCased].item.filter(
        (el) => el.id !== payload.id,
      );
      state[camelCased].item = filtered;
      delete state[camelCased].quantity[payload.id];
    },
    clearItems: (state, { payload }) => {
      const camelCased = camelize(payload.type);
      state[camelCased].item = [];
      state[camelCased].quantity = {};
    },
    setQuantity: (state, { payload }) => {
      const camelCased = camelize(payload.type);
      state[camelCased].quantity[payload.id] = payload.value;
    },
    increaseQuantity: (state, { payload }) => {
      const camelCased = camelize(payload.type);
      state[camelCased].quantity[payload.id] += 1;
    },
    decreaseQuantity: (state, { payload }) => {
      const camelCased = camelize(payload.type);

      state[camelCased].quantity[payload.id] -= 1;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearItems,
} = trxSlice.actions;
export default trxSlice.reducer;
