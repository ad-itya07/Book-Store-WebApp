import React from "react";
import { useGetOrdersOfUserByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const email = currentUser?.email;
  console.log(email);
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersOfUserByEmailQuery({ email });

  console.log(orders);
  if (isLoading) return <div><Loading /></div>;
  if (isError) return <div>Error loading orders!</div>;
  //   if (isLoading) return <div>Loadng...</div>
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div>
          {orders?.map((order, index) => (
            <div key={order.id} className="border-b mb-4 pb-4 flex justify-between items-start">

                <div>
              <p className="p-1 bg-secondary text-white w-10 rounded mb-1">
                # {index + 1}
              </p>

              <h2 className="font-bold">Order ID: {order.id}</h2>
              <p className="text-gray-600">Name: {order.name}</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <h3 className="font-semibold mt-2">Products:</h3>
              <ul>
                {order.orderBooks.map((book, index) => (
                  <li key={index + 1}>
                    {book.bookId} : {book.book.title}
                  </li>
                ))}
              </ul>
              </div>

              <div className="ml-4 flex flex-col items-end">
                <Link
                  to={`/orders/pay/${order.id}`}
                  className="bg-blue-500 text-white px-4 py-2 mb-2 rounded hover:bg-blue-600 text-center"
                >
                  Pay Online
                </Link>
                <Link
                  to={`/orders/details/${order.id}`}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center"
                >
                  View More Details
                </Link>
              </div>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
};

export default OrderPage;
