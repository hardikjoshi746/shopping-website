const express = require("express");
const app = express();
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

const jwt = require("jsonwebtoken");

app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

app.get("/get-token", (req, res) => {
  try {
    const access_token = req.cookies["access_token"];
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
    return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
  } catch (error) {
    res.status(401).send("Unauthorized. Invalid token");
  }
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
