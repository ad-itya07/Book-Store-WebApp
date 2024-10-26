import {
  createAddress,
  createOrder,
  createOrderBooks,
  findAllOrders,
  findOrderWithEmail,
  findOrderWithEmailAndId,
  findUniqueOrder,
} from "../models/orderModel.js";
import prisma from "../models/orderModel.js";

class OrderController {
  async createOrderController(req, res) {
    const { address, order, cartItems } = req.body;

    // res.json([address, order, cartItems])
    if (!address || !order || !cartItems) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    try {
      const processedOrder = await prisma.$transaction(
        async (prismaInstance) => {
          const addedAddress = await createAddress(address, prismaInstance);

          const orderDetails = {
            ...order,
            addressId: addedAddress.id,
          };

          const addedOrder = await createOrder(orderDetails, prismaInstance);

          try {
            const orderBooksData = cartItems.map((item) => ({
              orderId: addedOrder.id,
              bookId: item.id,
            }));

            await createOrderBooks(orderBooksData, prismaInstance);
          } catch (err) {
            return res.status(500).json({
              message: "Error adding Book data to DB",
              success: false,
              error: err,
            });
          }
          return addedOrder;
        }
      );

      return res.status(200).json({
        message: "Order successfully added",
        success: true,
        order: processedOrder,
      });
    } catch (err) {
      console.error("Error adding order: ", err);
      return res.status(500).json({
        message: "Error adding Order/Address to DB",
        success: false,
        error: err,
      });
    }
  }

  async getOrderDetailsController(req, res) {
    const { orderId } = req.params;

    try {
      const order = await findUniqueOrder(orderId);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Order details fetched successfully",
        success: true,
        order,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching order details",
        success: false,
        error: err,
      });
    }
  }

  async getAllOrderController(req, res) {
    try {
      const orders = await findAllOrders();

      if (!orders) {
        return res.status(400).json({
          message: "No orders found!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Orders fetched successfully!",
        success: true,
        orders,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching orders!",
        success: false,
        error: err,
      });
    }
  }

  async getOrdersOfUser(req, res) {
    const { email } = req.params;

    try {
      const orders = await findOrderWithEmail(email);

      if (!orders) {
        return res.status(404).json({
          message: "No orders placed",
          success: false,
        });
      }
      // console.log(order);
      return res.status(200).send(
        orders
      );
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching order!",
        success: false,
        error: err,
      });
    }
  }

  async getOrderDetailsByEmailAndId(req,res) {
    const {email, orderId} = req.params;

    try {
      const order = await findOrderWithEmailAndId(email , orderId);

      if (!order) {
        return res.status(404).json({
          message: "No orders placed",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Order fetched successfully!",
        success: true,
        order,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching order!",
        success: false,
        error: err,
      });
    }
  }
}

export default new OrderController();
