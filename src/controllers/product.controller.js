import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      user: req.user.id,
    }).populate("user");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      user: req.user.id,
    });

    const saveProduct = await newProduct.save();
    res.json(saveProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.sendStatus(200);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};
