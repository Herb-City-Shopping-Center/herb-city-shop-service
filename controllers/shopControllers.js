const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModal");
const Product = require("../models/productModal");
const Order  =require("../models/orderModal")
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");

const registerShop = asyncHandler(async (req, res) => {
  const { userId, shopName, shopDescription, shopAddress, shopImage } =
    req.body;

  console.log(userId, shopName, shopDescription, shopAddress, shopImage);

  if (!userId || !shopName || !shopDescription || !shopAddress || !shopImage) {
    res.sendStatus(400);
    throw new error("Please enter all the fields!!!");
  }

  const shopExist = await Shop.findOne({ userId });

  if (shopExist) {
    console.log("Shop already exist!!!".red.bold);
    res.sendStatus(400).json({
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
    res.sendStatus(400).json({
      error: "Failed to Register Shop !!!",
    });
    throw new error("Failed to Register Shop !!!");
  }
});

const getShopByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  console.log("get shop : "+userId);

  if (!userId) {
    res.send(400);
    throw new error("Please add user Id!!!");
  }

  const shop = await Shop.findOne({ userId });

  if (shop) {
    console.log("Found!!!".green.bold);
    res.status(201).json({
      _id: shop._id,
      userId: shop.userId,
      shopName: shop.shopName,
      shopDescription: shop.shopDescription,
      shopAddress: shop.shopAddress,
      ratings: shop.ratings,
      shopImage: shop.shopImage,
    });
  } else {
    console.log("Failed to Get Shop !!!".red.bold);
    res.status(400).json({
      error: "Failed to Get Shop !!!",
    });
    throw new error("Failed to Get Shop !!!");
  }
});

const getProductsByShopId = asyncHandler(async (req, res) => {
  const { shopId } = req.body;
  console.log(shopId + " shop Id");
  const product = await Product.find({ shopId: { $in: shopId } });

  if (product) {
    res.send(product);
    console.log(product);
  } else {
    console.log("Invalid shopId for fetch product".red.bold);
    res.status(401);
    throw new error("Invalid shopId for fetch product");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  //getting user id from body data
  const { id } = req.body;

  //check if id is null
  if (!id) {
    console.log("Id is null".red.bold);
    res.status(400).json({
      error: "User id is null",
    });
    throw new error("Error while deleting product !!!");
  } else {
    try {
      //find user by id and delete fron database
      const product = await Product.findOneAndDelete({ _id: id });

      //send success response message to the frontend
      if (product) {
        res.status(201).json({
          _id: _id,
        });
        console.log("Product deleted".red.bold);
      }
    } catch (error) {
      //send error response message to the frontend
      res.status(400).json({
        error: "Fail to delete account !!!",
      });
      throw new error("Error while deleting shop !!!" + error.message);
    }
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  //getting body data
  const { _id, productTitle, category, description, stock, pic, price } =
    req.body;

  console.log(_id, productTitle, category, description, stock, pic, price);

  //backend validation for required data
  if (
    !productTitle ||
    !category ||
    !description ||
    !stock ||
    !pic ||
    !price ||
    !_id
  ) {
    res.send(400).json({
      error: "Please enter all the fields!!!",
    });
    throw new error("Please enter all the fields!!!");
  }

  //find user by id and update given data
  const updateProduct = await Product.findByIdAndUpdate(
    _id,
    {
      productTitle: productTitle,
      category: category,
      description: description,
      stock: stock,
      pic: pic,
      price: price,
    },
    {
      new: true,
    }
  );

  //send success response to frontend
  if (updateProduct) {
    console.log("Updated!!!".green.bold);
    res.status(201).json({
      _id: updateProduct._id,
      productTitle: updateProduct.productTitle,
      category: updateProduct.category,
      description: updateProduct.description,
      stock: updateProduct.stock,
      pic: updateProduct.pic,
      price: updateProduct.price,
    });

    console.log(updateProduct);
  } else {
    //send fail response to frontend
    res.status(400).json({
      error: "Update Failed",
    });
    throw new error("User not updated !!!");
  }
});

const getOrdersByShopId = asyncHandler(async (req, res) => {
  const { shopId } = req.body;
  console.log(shopId + " shop Id");
  const order = await Order.find({ shopId: { $in: shopId } });

  console.log("--------------------");
console.log(order);

  if (order) {
    res.send(order);
    console.log(order);
  } else {
    console.log("Invalid shopId for fetch product".red.bold);
    res.status(401);
    throw new error("Invalid shopId for fetch product");
  }
});

const addProduct = asyncHandler(async (req, res) => {
    const {
    productTitle,
    categoryName,
    description,
    stock,
    shopId,
    pic,
    price,
    } = req.body;
  
   
  
    if (

            !productTitle ||
            !categoryName ||
            !description ||
            !stock ||
            !shopId ||
            !pic ||
            !price 
      
    ) {
      res.send(400);
      throw new error("Please enter all the fields!!!");
    }
  
   
  
    const product = await Product.create({
        productTitle,
    categoryName,
    description,
    stock,
    shopId,
    pic,
    price,
    });
  
   
  
    if (product) {
      console.log("Product Added!!!".green.bold);
      res.status(201).json({
        product
      });
    } else {
      console.log("Failed to adding product !!!".red.bold);
      res.status(400).json({
        error: "Failed to adding product !!!",
      });
      throw new error("Failed to adding product !!!");
    }
  });



module.exports = {
  registerShop,
  getShopByUserId,
  getProductsByShopId,
  deleteProduct,
  updateProduct,
  getOrdersByShopId,
  addProduct,
  getOrdersByShopId,
};
