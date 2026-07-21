const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.100.149:3000",
  "https://fully-ecommerce-pi.vercel.app",
  "https://fully-ecommerce-csgmpwrvw-bishal123.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ecommerce API Running",
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