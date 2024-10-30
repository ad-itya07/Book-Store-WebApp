import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import booksApi from './features/books/booksApi'
import ordersApi from './features/orders/ordersApi'
import adminApi from './features/admin/adminApi'

const filterSensitiveDataMiddleware = (store) => (next) => (action) => {
  // Filter sensitive data specifically for fulfilled actions of `adminApi`
  if (action.type === 'adminApi/executeQuery/fulfilled' && action.payload?.admin?.password) {
    const sanitizedAction = { ...action, payload: { ...action.payload, admin: { ...action.payload.admin, password: "***" } } };
    return next(sanitizedAction);
  }
  return next(action);
};

export default configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath] : booksApi.reducer,
    [ordersApi.reducerPath] : ordersApi.reducer,
    [adminApi.reducerPath] : adminApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filterSensitiveDataMiddleware, booksApi.middleware, ordersApi.middleware, adminApi.middleware),
  // devTools: {
  //   actionsDenylist: ['adminApi/executeQuery/fulfilled', 'adminApi/executeQuery/pending', 'adminApi/executeQuery/rejected'],
  // }
  devTools: process.env.NODE_ENV !== 'production',
})