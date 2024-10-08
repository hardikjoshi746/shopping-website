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
  adminUpload,
  adminDeleteProductImage,
} = require("../controllers/productController");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/get-one/:id", getProductsById);

//admin routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUpload);
router.delete("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);

module.exports = router;
