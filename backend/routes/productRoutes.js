const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsById,
  getBestSellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
} = require("../controllers/productController");

router.get("category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/get-one/:id", getProductsById);

//admin routes
router.get("/admin", adminGetProducts);
router.put("/admin/:id", adminUpdateProduct);
router.delete("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);

module.exports = router;
