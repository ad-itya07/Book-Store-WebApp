import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import Checkout from "../pages/checkout/checkout.jsx";
import SingleBook from "../pages/book/SingleBook.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import OrderPage from "../pages/order/OrderPage.jsx";
import OrderDetails from "../pages/order/OrderDeatils.jsx";
import NormalUserDashboard from "../pages/dashboard/userDashboard.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import AdminDashboardLayout from "../pages/dashboard/AdminDashboardLayout.jsx";
import AdminDashboard from "../pages/dashboard/adminDashboard.jsx";
import ManageBooks from "../pages/admin/ManageBooks.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoutes>
            <OrderPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/orders/details/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoutes>
            <CartPage />,
          </PrivateRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/user/dashboard",
        element: <NormalUserDashboard />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            {/* <div>dashboard</div> */}
             <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <AdminRoute>
            <div>add-new-book</div>
            {/* <AddBook /> */}
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <div>edit book</div>
            {/* <UpdateBook /> */}
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
           <ManageBooks /> 
          </AdminRoute>
        ),
      },
    ],
  },
]);
