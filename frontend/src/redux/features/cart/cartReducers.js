import Swal from "sweetalert2";

const cartReducers = {
  addToCart: (state, action) => {
    const exisitingItem = state.cartItems.find(
      (item) => item._id === action.payload._id
    );
    if (!exisitingItem) {
      state.cartItems.push(action.payload);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added to the cart",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Product already exist in Cart",
      });
    }
  },
  removeFromCart: (state , action) => {
    state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
  },
  clearCart: (state) => {
    state.cartItems = []
  }
};

export default cartReducers;
