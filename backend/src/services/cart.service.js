const prisma = require("../config/prisma");

// ==========================
// Helper: Build Cart Response
// ==========================
const buildCart = (cart) => {
    const items = cart.items.map((item) => {
        const finalPrice =
            Number(item.product.price) -
            (Number(item.product.price) * item.product.discount) / 100;

        return {
            id: item.id,
            quantity: item.quantity,
            subtotal: finalPrice * item.quantity,
            product: item.product,
        };
    });

    const total = items.reduce(
        (sum, item) => sum + item.subtotal,
        0
    );

    return {
        id: cart.id,
        sessionKey: cart.sessionKey,
        items,
        total,
    };
};

// ==========================
// Add To Cart
// ==========================
const addToCart = async ({
    sessionKey,
    productId,
    quantity = 1,
}) => {

    if (!sessionKey) {
        throw new Error("Session key is required");
    }

    quantity = Number(quantity);

    const product = await prisma.product.findUnique({
        where: {
            id: Number(productId),
        },
    });

    if (!product || !product.isAvailable) {
        throw new Error("Product not found");
    }

    if (quantity > product.stock) {
        throw new Error("Not enough stock");
    }

    let cart = await prisma.cart.findUnique({
        where: {
            sessionKey,
        },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                sessionKey,
            },
        });
    }

    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId: product.id,
        },
    });

    if (existingItem) {

        if (existingItem.quantity + quantity > product.stock) {
            throw new Error("Stock limit exceeded");
        }

        await prisma.cartItem.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: existingItem.quantity + quantity,
            },
        });

    } else {

        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: product.id,
                quantity,
            },
        });

    }

    return getCart(sessionKey);
};

// ==========================
// Get Cart
// ==========================
// ==========================
// Get Cart
// ==========================
const getCart = async (sessionKey) => {
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

  // Return an empty cart if it doesn't exist yet
  if (!cart) {
    return {
      id: null,
      sessionKey,
      items: [],
      total: 0,
    };
  }

  return buildCart(cart);
};

// ==========================
// Update Quantity
// ==========================
const updateCartItem = async ({
    itemId,
    quantity,
}) => {

    quantity = Number(quantity);

    const item = await prisma.cartItem.findUnique({
        where: {
            id: Number(itemId),
        },
        include: {
            product: true,
            cart: true,
        },
    });

    if (!item) {
        throw new Error("Item not found");
    }

    if (quantity <= 0) {
        await prisma.cartItem.delete({
            where: {
                id: item.id,
            },
        });

        return getCart(item.cart.sessionKey);
    }

    if (quantity > item.product.stock) {
        throw new Error("Not enough stock");
    }

    await prisma.cartItem.update({
        where: {
            id: item.id,
        },
        data: {
            quantity,
        },
    });

    return getCart(item.cart.sessionKey);
};

// ==========================
// Remove Item
// ==========================
const removeCartItem = async (itemId) => {

    const item = await prisma.cartItem.findUnique({
        where: {
            id: itemId,
        },
        include: {
            cart: true,
        },
    });

    if (!item) {
        throw new Error("Item not found");
    }

    await prisma.cartItem.delete({
        where: {
            id: itemId,
        },
    });

    return getCart(item.cart.sessionKey);
};

// ==========================
// Clear Cart
// ==========================
const clearCart = async (sessionKey) => {

    const cart = await prisma.cart.findUnique({
        where: {
            sessionKey,
        },
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    await prisma.cartItem.deleteMany({
        where: {
            cartId: cart.id,
        },
    });

    return true;
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};