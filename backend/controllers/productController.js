import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

//desc       Fetch all products
//route      GET api/products
//access     public
export const listProducts = asyncHandler(async (req, res) => {
  try {
    let limit = 10;
    let pageNumber = 1;
    let count = 0;
    if (req.query.limit) {
      limit = Number(req.query.limit);
    }
    if (req.query.pageNumber) {
      pageNumber = Number(req.query.pageNumber);
    }
    let skip = Number((pageNumber - 1) * limit);
    const keyword =
      req.query.keyword && req.query.keyword != ""
        ? {
            name: {
              $regex: req.query.keyword,
            },
          }
        : {};

    //Count provide us the count
    count = await Product.count({ ...keyword });
    let products = await Product.find({ ...keyword })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    count = Math.ceil(count / limit);
    return res
      .status(200)
      .json({ products, pages: { count, pageNumber, limit } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//desc        Fetch single all products
//route       GET api/products/:id
//access      public
export const fetchProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    res.send("Product not found");
  }
});

//desc        Fetch single all products
//route       GET api/products/:id
//access      Private
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product removed" });
  } else {
    res.status(404);
    res.send("Product not found");
  }
});

//desc        Create a product
//route       POST api/products
//access      Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    user: req.user_id,
    image: req.body.image,
    brand: req.body.brand || "",
    category: req.body.category || "",
    countInStock: req.body.countInStock || 0,
    numReviews: req.body.numReviews || 0,
  });
  let createdProduct = await product.save();
  res.status(200).json(product);
});

//desc        Update a product
//route       PUT api/products/:id
//access      Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (product) {
    (product.name = req.body.name),
      (product.price = req.body.price),
      (product.description = req.body.description),
      (product.user = req.user_id),
      (product.image = req.body.image),
      (product.brand = req.body.brand || ""),
      (product.category = req.body.category || ""),
      (product.countInStock = req.body.countInStock || 0),
      (product.numReviews = req.body.numReviews || 0);
    let updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//desc        Create a product review
//route       PUT api/products/:id/reviews
//access      Private
export const createProductReview = asyncHandler(async (req, res) => {
  console.log(req.user);
  let product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user_id.toString()
    );
    if (alreadyReviewed) {
      res.status(401);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      user: req.user_id,
      createdAt: new Date(),
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce(
        (acc, item) => Number(item.rating) + Number(acc),
        0
      ) / product.reviews.length;
    product.save();
    res.status(200).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//desc        Create Top Rated Products
//route       PUT api/products/top
//access      Private
export const getTopProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({}).sort({ rating: -1 }).limit(5);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
