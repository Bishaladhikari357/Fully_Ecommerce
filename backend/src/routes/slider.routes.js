const express = require("express");

const router = express.Router();

const {

    getSliders,
    getSlider,
    createSlider,
    updateSlider,
    deleteSlider

} = require("../controllers/slider.controller");

router.get("/", getSliders);

router.get("/:id", getSlider);

router.post("/", createSlider);

router.put("/:id", updateSlider);

router.delete("/:id", deleteSlider);

module.exports = router;