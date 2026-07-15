const prisma = require("../config/prisma");

// =============================
// Get All Products
// =============================
const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                isAvailable: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =============================
// Get Single Product
// =============================
const getProduct = async (req, res) => {

    try {

        const product = await prisma.product.findUnique({
            where: {
                slug: req.params.slug
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =============================
// Create Product
// =============================
const createProduct = async (req, res) => {

    try {

        const product = await prisma.product.create({

            data: req.body

        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =============================
// Update Product
// =============================
const updateProduct = async (req, res) => {

    try {

        const product = await prisma.product.update({

            where: {
                id: Number(req.params.id)
            },

            data: req.body

        });

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =============================
// Delete Product
// =============================
const deleteProduct = async (req, res) => {

    try {

        await prisma.product.delete({

            where: {
                id: Number(req.params.id)
            }

        });

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

};