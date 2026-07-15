const prisma = require("../config/prisma");

// ==========================
// Get All Sliders
// ==========================
const getSliders = async (req, res) => {
    try {
        const sliders = await prisma.slider.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                order: "asc"
            }
        });

        res.json(sliders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==========================
// Get Single Slider
// ==========================
const getSlider = async (req, res) => {

    try {

        const slider = await prisma.slider.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!slider) {

            return res.status(404).json({
                message: "Slider not found"
            });

        }

        res.json(slider);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// Create Slider
// ==========================
const createSlider = async (req, res) => {

    try {

        const slider = await prisma.slider.create({

            data: req.body

        });

        res.status(201).json(slider);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// Update Slider
// ==========================
const updateSlider = async (req, res) => {

    try {

        const slider = await prisma.slider.update({

            where: {
                id: Number(req.params.id)
            },

            data: req.body

        });

        res.json(slider);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// Delete Slider
// ==========================
const deleteSlider = async (req, res) => {

    try {

        await prisma.slider.delete({

            where: {
                id: Number(req.params.id)
            }

        });

        res.json({

            message: "Slider deleted successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getSliders,
    getSlider,
    createSlider,
    updateSlider,
    deleteSlider

};