import express from "express";
import orderController from "../controllers/orderController.js";

export const router = express.Router();

router.post("/place-order", orderController.createOrderController);
router.get("/order-details/:orderId",orderController.getOrderDetailsController);
router.get("/order-details",orderController.getAllOrderController);
router.get("/order-details/user/:email", orderController.getOrdersOfUser);
router.get("/order-details/user/:email/:orderId", orderController.getOrderDetailsByEmailAndId);