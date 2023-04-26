const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModal");
const Product = require("../models/productModal");
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");

const registerShop = asyncHandler(async (req, res) => {
  const { userId, shopName, shopDescription, shopAddress, shopImage } =
    req.body;

    console.log(userId, shopName, shopDescription, shopAddress, shopImage);

  if (!userId || !shopName || !shopDescription || !shopAddress || !shopImage) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const shopExist = await Shop.findOne({ userId });

  if (shopExist) {
    console.log("Shop already exist!!!".red.bold);
    res.status(400).json({
      error: "Shop already exist !!!",
    });
    throw new error("Shop already exist!!!");
  }

  const shop = await Shop.create({
    userId,
    shopName,
    shopDescription,
    shopAddress,
    shopImage,
  });

  if (shop) {
    console.log("Registered!!!".green.bold);
    res.status(201).json({
      _id: shop._id,
      userId: shop.userId,
      shopName: shop.shopName,
      shopDescription: shop.shopDescription,
      shopAddress: shop.shopAddress,
      shopImage: shop.shopImage,
    });
  } else {
    console.log("Failed to Register Shop !!!".red.bold);
    res.status(400).json({
      error: "Failed to Register Shop !!!",
    });
    throw new error("Failed to Register Shop !!!");
  }
});








module.exports = {
  registerShop,

};