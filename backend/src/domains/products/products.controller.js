const productsService = require('./products.service');

const ALLOWED_STATUS = new Set(['active', 'inactive', 'soldout']);

function parseNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function sanitizeProduct(product) {
  return {
    productid: product.productid,
    manufacturerid: product.manufacturerid,
    productname: product.productname,
    stock: product.stock,
    price: product.price,
    status: product.status,
    createdat: product.createdat,
    manufacturers: product.manufacturers,
    posts: product.posts,
  };
}

async function listProducts(req, res) {
  const {
    manufacturerId,
    status,
    minPrice,
    maxPrice,
    search,
    sort,
    includeImages,
  } = req.query || {};

  const filters = {
    manufacturerId: parseNumber(manufacturerId) || manufacturerId,
    status,
    minPrice: parseNumber(minPrice),
    maxPrice: parseNumber(maxPrice),
    search,
  };

  const include = includeImages === 'true';
  const { data, error } = await productsService.listProducts(filters, include, sort);

  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch products',
      details: error.message,
    });
  }

  const items = Array.isArray(data) ? data.map(sanitizeProduct) : [];
  return res.status(200).json({ status: 'OK', items });
}

async function getProduct(req, res) {
  const { productId } = req.params;
  const include = req.query?.includeImages === 'true';

  const { data, error } = await productsService.getProductById(productId, include);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch product',
      details: error.message,
    });
  }
  if (!data) {
    return res.status(404).json({
      status: 'ERROR',
      message: 'Product not found',
    });
  }

  return res.status(200).json({
    status: 'OK',
    product: sanitizeProduct(data),
  });
}

async function createProduct(req, res) {
  const { manufacturerId, productName, stock, price, status } = req.body || {};

  if (!manufacturerId || !productName || stock === undefined || price === undefined) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'manufacturerId, productName, stock, price are required',
    });
  }

  if (status && !ALLOWED_STATUS.has(status)) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Invalid status',
    });
  }

  const payload = {
    manufacturerid: Number(manufacturerId),
    productname: productName,
    stock: Number(stock),
    price: Number(price),
    status: status || 'active',
    createdat: new Date().toISOString(),
  };

  const { data, error } = await productsService.createProduct(payload);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to create product',
      details: error.message,
    });
  }

  return res.status(201).json({
    status: 'OK',
    product: sanitizeProduct(data),
  });
}

async function updateProduct(req, res) {
  const { productId } = req.params;
  const { productName, stock, price, status } = req.body || {};

  if (status && !ALLOWED_STATUS.has(status)) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Invalid status',
    });
  }

  const payload = {};
  if (productName !== undefined) payload.productname = productName;
  if (stock !== undefined) payload.stock = Number(stock);
  if (price !== undefined) payload.price = Number(price);
  if (status !== undefined) payload.status = status;

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'No fields to update',
    });
  }

  const { data, error } = await productsService.updateProduct(productId, payload);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to update product',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    product: sanitizeProduct(data),
  });
}

async function deleteProduct(req, res) {
  const { productId } = req.params;

  const { data, error } = await productsService.softDeleteProduct(productId);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to delete product',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    product: sanitizeProduct(data),
  });
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
