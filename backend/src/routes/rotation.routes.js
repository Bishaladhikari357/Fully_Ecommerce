const express = require("express");

const router = express.Router();

const {
    getRotations,
    getRotation,
    createRotation,
    updateRotation,
    deleteRotation,
} = require("../controllers/rotation.controller");

router.get("/", getRotations);

router.get("/:id", getRotation);

router.post("/", createRotation);

router.put("/:id", updateRotation);

router.delete("/:id", deleteRotation);

module.exports = router;