import express from "express";
import orderController from "../controllers/orderController.js";
import { verifyAdminToken } from "../middlewares/jwtVerificationMiddleware.js";

export const router = express.Router();

router.post("/place-order", orderController.createOrderController);
router.get("/admin/order-details/:orderId", verifyAdminToken, orderController.getOrderDetailsController);
router.get("/admin/order-details/all", verifyAdminToken,orderController.getAllOrderController);
router.get("/order-details/user/:email", orderController.getOrdersOfUser);
router.get("/order-details/user/:email/:orderId", orderController.getOrderDetailsByEmailAndId);