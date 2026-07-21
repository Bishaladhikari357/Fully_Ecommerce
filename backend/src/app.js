const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

// ===============================
// Allowed Origins
// ===============================
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.100.149:3000",
  "https://fully-ecommerce-six.vercel.app",
];

// ===============================
// CORS
// ===============================
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, mobile apps, curl, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
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

// ===============================
// Routes
// ===============================
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/sliders", require("./routes/slider.routes"));
app.use("/api/rotations", require("./routes/rotation.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// ===============================
// 404
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;