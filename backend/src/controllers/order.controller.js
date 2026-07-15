const orderService = require("../services/order.service");

// =================================
// Checkout
// =================================
const checkout = async (req, res) => {
    try {
        const {
            sessionKey,
            name,
            email,
            phone,
            address,
        } = req.body;

        const order = await orderService.checkout({
            sessionKey,
            name,
            email,
            phone,
            address,
        });

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// =================================
// Get All Orders
// =================================
const getOrders = async (req, res) => {
    try {

        const orders = await orderService.getOrders();

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// =================================
// Get Single Order
// =================================
const getOrder = async (req, res) => {
    try {

        const { id } = req.params;

        const order = await orderService.getOrder(id);

        res.status(200).json(order);

    } catch (error) {

        res.status(404).json({
            message: error.message,
        });

    }
};

// =================================
// Update Order Status
// =================================
const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const order = await orderService.updateOrderStatus(
            id,
            status
        );

        res.status(200).json({
            message: "Order updated successfully",
            order,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

// =================================
// Delete Order
// =================================
const deleteOrder = async (req, res) => {
    try {

        const { id } = req.params;

        await orderService.deleteOrder(id);

        res.status(200).json({
            message: "Order deleted successfully",
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

module.exports = {
    checkout,
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder,
};