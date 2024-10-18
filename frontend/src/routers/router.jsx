import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import Checkout from "../pages/checkout/checkout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/orders',
        element: <h1>Orders</h1>
      },
      {
        path: '/about',
        element: <h1>About</h1>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/checkout',
        element: <Checkout />
      }
    ]
  },
]);
