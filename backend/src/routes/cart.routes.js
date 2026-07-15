const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cart.controller");

// Add to Cart
router.post("/add", addToCart);

// Get Cart
router.get("/:sessionKey", getCart);

// Update Cart Item Quantity
router.patch("/update", updateCartItem);

// Remove Cart Item
router.delete("/remove/:id", removeCartItem);

// Clear Cart
router.delete("/clear/:sessionKey", clearCart);

module.exports = router;