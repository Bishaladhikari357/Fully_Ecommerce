const prisma = require("../config/prisma");

// Get All Rotations
const getRotations = async (req, res) => {
    try {
        const rotations = await prisma.rotation.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: "asc",
            },
        });

        res.status(200).json(rotations);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Rotation By ID
const getRotation = async (req, res) => {
    try {
        const rotation = await prisma.rotation.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!rotation) {
            return res.status(404).json({
                message: "Rotation not found",
            });
        }

        res.status(200).json(rotation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Create Rotation
const createRotation = async (req, res) => {
    try {
        const rotation = await prisma.rotation.create({
            data: req.body,
        });

        res.status(201).json(rotation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Rotation
const updateRotation = async (req, res) => {
    try {
        const rotation = await prisma.rotation.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });

        res.status(200).json(rotation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Rotation
const deleteRotation = async (req, res) => {
    try {
        await prisma.rotation.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.status(200).json({
            message: "Rotation deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getRotations,
    getRotation,
    createRotation,
    updateRotation,
    deleteRotation,
};