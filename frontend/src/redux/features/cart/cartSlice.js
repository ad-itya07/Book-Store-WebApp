import { createSlice } from "@reduxjs/toolkit";
import cartReducers from "./cartReducers";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers:  cartReducers,
});

// exporting actions:
export const { addToCart , removeFromCart , clearCart } = cartSlice.actions;

// exporting reducers:
export default cartSlice.reducer;
