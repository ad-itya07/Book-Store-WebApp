import React from "react";
import { useGetOrderOfUserByEmailAndOrderIdQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { currentUser } = useAuth();
  const email = currentUser?.email;
  const {
    data: order = {},
    isLoading,
    isError,
  } = useGetOrderOfUserByEmailAndOrderIdQuery({ email, orderId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders!</div>;

  console.log(order);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>

      <div className="border rounded-lg p-6 shadow-lg bg-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Order ID: {order.id}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Customer Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
              </div>
              <div>
                <p>
                  <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Pay Online Button */}
          <Link
            to={`/orders/pay/${order.id}`}
            className="bg-blue-500 text-white px-4 py-2 mb-2 rounded hover:bg-blue-600 text-center"
          >
            Pay Online
          </Link>
        </div>

        <div className="mt-6 border-t pt-4">
          <h4 className="text-lg font-semibold">Shipping Address</h4>
          <p>{order.address.address}</p>
          <p>
            {order.address.city}, {order.address.state}
          </p>
          <p>
            {order.address.country} - {order.address.zipcode}
          </p>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Books in Order</h4>
          <div className="space-y-6">
            {order.orderBooks.map((item) => (
              <div
                key={item.book.id}
                className="flex items-start space-x-6 bg-gray-100 p-4 rounded-md shadow-sm"
              >
                <Link to={`/books/${item.book.id}`}>
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-24 h-32 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div>
                  <Link to={`/books/${item.book.id}`}>
                    <h5 className="text-lg font-bold transition-colors duration-300 hover:text-blue-500">{item.book.title}</h5>
                  </Link>
                  <p className="text-gray-600 mb-1">{item.book.description}</p>
                  <p className="text-sm">
                    <strong>Category:</strong> {item.book.category}
                  </p>
                  <p className="text-sm">
                    <strong>Trending:</strong>{" "}
                    {item.book.trending ? "Yes" : "No"}
                  </p>
                  <p className="text-sm line-through text-red-500">
                    Old Price: ${item.book.oldPrice.toFixed(2)}
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    New Price: ${item.book.newPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
