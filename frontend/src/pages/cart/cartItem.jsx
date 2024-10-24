import React from "react";
import { getImageUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

const CartItem = ({Book}) => {
    const dispatch = useDispatch();
    
    const handleRemoveItem= (product) => {
        dispatch(removeFromCart(product))
    }
  return (
    <div>
      <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            alt=""
            src={Book?.coverImage}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to="/">{Book?.title}</Link>
              </h3>
              <p className="sm:ml-4">${Book?.newPrice}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500 capitalize">
              <strong>Category:</strong> {Book?.category}
            </p>
          </div>
          <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
            <p className="text-gray-500">
              <strong>Qty:</strong> 1
            </p>

            <div className="flex">
              <button
                onClick={() => handleRemoveItem(Book)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
