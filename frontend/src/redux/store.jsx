import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./slices/CartSlice.jsx";
import { WishlistSlice } from "./slices/WishlistSlice.jsx";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    wishlist: WishlistSlice.reducer,
  },
});
