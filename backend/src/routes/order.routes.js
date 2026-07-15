const express = require("express");

const router = express.Router();

const {
    checkout,
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/order.controller");

// Checkout
router.post("/checkout", checkout);

// Get all orders
router.get("/", getOrders);

// Get one order
router.get("/:id", getOrder);

// Update status
router.patch("/:id", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

module.exports = router;