const prisma = require("../config/prisma");

// ================================
// Checkout
// ================================
const checkout = async ({
    sessionKey,
    name,
    email,
    phone,
    address,
}) => {

    if (!sessionKey) {
        throw new Error("Session key is required");
    }

    const cart = await prisma.cart.findUnique({
        where: {
            sessionKey,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    if (cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    let total = 0;

    // Validate stock and calculate total
    for (const item of cart.items) {

        const product = item.product;

        if (!product.isAvailable) {
            throw new Error(`${product.name} is unavailable`);
        }

        if (item.quantity > product.stock) {
            throw new Error(
                `${product.name} has only ${product.stock} item(s) left`
            );
        }

        const finalPrice =
            Number(product.price) -
            (Number(product.price) * product.discount) / 100;

        total += finalPrice * item.quantity;
    }

    // Transaction (equivalent to Django transaction.atomic())
    const order = await prisma.$transaction(async (tx) => {

        // Create Order
        const newOrder = await tx.order.create({
            data: {
                name,
                email,
                phone,
                address,
                total,
                status: "Pending",
            },
        });

        // Create Order Items & Update Stock
        for (const item of cart.items) {

            const product = item.product;

            const finalPrice =
                Number(product.price) -
                (Number(product.price) * product.discount) / 100;

            await tx.orderItem.create({
                data: {
                    orderId: newOrder.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price: finalPrice,
                    subtotal: finalPrice * item.quantity,
                },
            });

            const newStock = product.stock - item.quantity;

            await tx.product.update({
                where: {
                    id: product.id,
                },
                data: {
                    stock: newStock,
                    isAvailable: newStock > 0,
                },
            });
        }

        // Clear Cart
        await tx.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });

        return newOrder;
    });

    // Return complete order
    return await prisma.order.findUnique({
        where: {
            id: order.id,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
};

// ================================
// Order List
// ================================
const getOrders = async () => {
    return await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

// ================================
// Order Detail
// ================================
const getOrder = async (id) => {

    const order = await prisma.order.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};

// ================================
// Update Order Status
// ================================
const updateOrderStatus = async (
    id,
    status
) => {

    return await prisma.order.update({
        where: {
            id: Number(id),
        },
        data: {
            status,
        },
    });
};

// ================================
// Delete Order
// ================================
const deleteOrder = async (id) => {

    return await prisma.order.delete({
        where: {
            id: Number(id),
        },
    });
};

module.exports = {
    checkout,
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder,
};