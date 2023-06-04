const productShema = require('../Models/productShema');
const { StatusCodes } = require('http-status-codes');
const BadRequest = require('../Errors/BadRequest');
const path = require('path');
const NotFound = require('../Errors/NotFound');
const getAllProducts = async (req, res) => {
  const products = await productShema.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const product = await productShema.findOne({ _id: req.params.id });
  if (!product) {
    throw new NotFound(`No product with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const product = await productShema.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true, new: true }
  );
  res.status(StatusCodes.OK).json({ product });
};
const createProduct = async (req, res) => {
  const product = await productShema.create({
    ...req.body,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ product });
};
const deleteProduct = async (req, res) => {
  const product = await productShema.findOne({ _id: req.params.id });

  if (!product) {
    throw new NotFound(`No product with id: ${req.params.id}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
const uploadImage = async (req, res) => {
  const productImage = req.files.image;

  if (!productImage) {
    throw new BadRequest('NO file uploaded');
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequest('file size should be less than 1mb');
  }
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequest('please upload image file');
  }
  const destination = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(destination);
  res
    .status(StatusCodes.CREATED)
    .json({ src: `/uploads/${productImage.name}` });
};
module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  uploadImage,
};
