import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./cartItem";
import { clearCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotal = cartItems
    .reduce((total, item) => total + item.newPrice, 0)
    .toFixed(2);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">
              Shopping cart
            </div>
            {cartItems.length > 0 && (
              <div className="ml-3 flex h-7 items-center ">
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
                >
                  <span className="">Clear Cart</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flow-root">
              {cartItems.length > 0 ? (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} Book={item} />
                  ))}
                </ul>
              ) : (
                <p>No product found!</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {cartItems.length > 0 && (
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal ? subtotal : 0.0}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          )}
          {cartItems.length > 0 && (
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          )}
          <div className="mt-6"></div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link to="/">
              {cartItems.length !== 0 && <span>or</span>}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
