const cartService = require("../services/cart.service");

// =============================
// Add To Cart
// =============================
const addToCart = async (req, res) => {
    try {
        const { sessionKey, productId, quantity } = req.body;

        const cart = await cartService.addToCart({
            sessionKey,
            productId,
            quantity,
        });

        res.status(200).json(cart);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// =============================
// Get Cart
// =============================
const getCart = async (req, res) => {
    try {
        const { sessionKey } = req.params;

        const cart = await cartService.getCart(sessionKey);

        res.status(200).json(cart);

    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

// =============================
// Update Cart Item Quantity
// =============================
const updateCartItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        const cart = await cartService.updateCartItem({
            itemId,
            quantity,
        });

        res.status(200).json(cart);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// =============================
// Remove Cart Item
// =============================
const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await cartService.removeCartItem(Number(id));

        res.status(200).json(cart);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// =============================
// Clear Cart
// =============================
const clearCart = async (req, res) => {
    try {
        const { sessionKey } = req.params;

        await cartService.clearCart(sessionKey);

        res.status(200).json({
            message: "Cart cleared successfully",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};