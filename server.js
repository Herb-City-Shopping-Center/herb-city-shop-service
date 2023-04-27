const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const shopRoutes = require("./routes/shopRoutes");
// const productRoutes = require("./routes/productRoutes");

const connectDB = require("./DB/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Api is running");
});

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
if (server) {
  console.log("Success".green.bold);
}

app.use("/api/shop", shopRoutes);
// app.use("/api/product", productRoutes);

app.use(errorHandler);
app.use(notFound);
