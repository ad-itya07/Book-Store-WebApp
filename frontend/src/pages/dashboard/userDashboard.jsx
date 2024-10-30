import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../utils/getImgUrl";
import { useGetOrdersOfUserByEmailQuery } from "../../redux/features/orders/ordersApi";
import Recommended from "../home/Recommended";
import Loading from "../../components/Loading";

const NormalUserDashboard = () => {
  const imageUrl = getImageUrl();

  const { currentUser, logout } = useAuth();
  const email = currentUser?.email;
  console.log(currentUser);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersOfUserByEmailQuery({ email });
  const showOrders = orders.slice(0, 3);
  //   console.log(showOrders);

  // const [recommendations, setRecommendations] = useState([]);
  // useEffect(() => {
  //   setRecommendations([
  //     {
  //       id: 1,
  //       title: "Pride and Protest",
  //       author: "Nikki Payne",
  //       price: "29.99",
  //       image: "path/to/image1",
  //     },
  //     {
  //       id: 2,
  //       title: "Mastering SEO in 2024",
  //       author: "John Doe",
  //       price: "19.99",
  //       image: "path/to/image2",
  //     },
  //   ]);
  // }, []);

  const handleLogout = async () => {
    await logout();
    // Optionally redirect user after logout
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {currentUser ? currentUser.displayName : "User"}!
          </h1>
          <p className="text-gray-500">
            Here&apos;s a quick overview of your activity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-rows-2 gap-8">
        <div className="flex justify-between gap-8 md:flex-row">
          {/* Account Information Section */}
          <div className="bg-white border border-b-4 shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Your Account</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src={currentUser?.photoURL || imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
              <p className="text-lg font-medium">
                {currentUser ? currentUser.displayName : "User"}
              </p>
            </div>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser ? currentUser.email : "Loading..."}
            </p>
            <p>
              <strong>Username:</strong>{" "}
              {currentUser ? currentUser.displayName : "User"}
            </p>
            <Link
              to="/account-settings"
              className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 inline-block hover:bg-blue-700 transition duration-200 mr-4"
            >
              Manage Account
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 inline-block hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          </div>

          {/* Recent Orders Section */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="bg-white shadow-lg border border-b-4 rounded-lg p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Your Recent Orders</h2>
              <ul className="space-y-4">
                {showOrders.map((order) => (
                  <li key={order.id} className="border-b pb-2">
                    <p className="font-semibold">#Order: {order.id}</p>
                    <p className="text-sm text-gray-500">
                      Order Date: {order.createdAt}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Amount: {order.totalPrice}
                    </p>
                  </li>
                ))}
              </ul>
              <Link to="/orders" className="text-blue-600 mt-4 inline-block">
                View All Orders
              </Link>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="bg-white border border-b-4 shadow-lg rounded-lg p-6">
          <Recommended />
          {/* <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <ul className="space-y-4">
            {recommendations.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-24 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">by {item.author}</p>
                  <p className="text-sm font-semibold text-gray-700">
                    ${item.price}
                  </p>
                  <button className="text-yellow-500 hover:underline">
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/recommended" className="text-blue-600 mt-4 inline-block">
            View More
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default NormalUserDashboard;
