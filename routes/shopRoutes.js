const express = require("express");
const router = express.Router();
const {
  registerShop,
  getShopByUserId,
  getProductsByShopId,
  updateProduct,
  deleteProduct,
  getOrdersByShopId,
  addProduct,
} = require("../controllers/shopControllers");

const { protect } = require("../middleware/authMiddleware");

// router.route("/").post(registerUser).get(protect);
router.route("/registerShop").post(registerShop);
router.route("/getShopByUserId").post(getShopByUserId);
router.route("/getProductsByShopId").post(getProductsByShopId);
router.route("/deleteProduct").post(deleteProduct);
router.route("/updateProduct").post(updateProduct);
router.route("/getOrdersByShopId").post(getOrdersByShopId);
router.route("/addProduct").post(addProduct);

module.exports = router;
