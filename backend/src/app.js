const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.100.149:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {

    res.json({
        message: "Ecommerce API Running"
    });

});

// Routes
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/sliders", require("./routes/slider.routes"));
app.use("/api/rotations", require("./routes/rotation.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));

module.exports = app;