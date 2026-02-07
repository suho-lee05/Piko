const supabase = require('../../config/supabase');

const PRODUCT_FIELDS =
  'productid, manufacturerid, productname, stock, price, status, createdat';
const MANUFACTURER_FIELDS =
  'manufacturerid, manufacturername, phonenumber, address, contactperson, createdat';
const IMAGE_FIELDS =
  'imageid, postid, imageurl, imagetype, sortorder, createdat';
const POST_FIELDS =
  'postid, productid, manufacturerid, posttitle, postcontent, createdat, images(' +
  IMAGE_FIELDS +
  ')';

function buildSelect(includeImages) {
  if (includeImages) {
    return `${PRODUCT_FIELDS}, manufacturers(${MANUFACTURER_FIELDS}), posts(${POST_FIELDS})`;
  }
  return PRODUCT_FIELDS;
}

function applyFilters(query, filters) {
  const {
    manufacturerId,
    status,
    minPrice,
    maxPrice,
    search,
  } = filters;

  if (manufacturerId) query = query.eq('manufacturerid', manufacturerId);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  } else if (!status) {
    query = query.eq('status', 'active');
  }

  if (minPrice !== undefined) query = query.gte('price', minPrice);
  if (maxPrice !== undefined) query = query.lte('price', maxPrice);

  if (search) {
    query = query.ilike('productname', `%${search}%`);
  }

  return query;
}

function applySort(query, sort) {
  const sortMap = {
    createdat_desc: { column: 'createdat', ascending: false },
    createdat_asc: { column: 'createdat', ascending: true },
    price_desc: { column: 'price', ascending: false },
    price_asc: { column: 'price', ascending: true },
    stock_desc: { column: 'stock', ascending: false },
    stock_asc: { column: 'stock', ascending: true },
  };

  const selected = sortMap[sort] || sortMap.createdat_desc;
  return query.order(selected.column, { ascending: selected.ascending });
}

async function listProducts(filters, includeImages, sort) {
  let query = supabase.from('products').select(buildSelect(includeImages));
  query = applyFilters(query, filters);
  query = applySort(query, sort);

  const { data, error } = await query;
  return { data, error };
}

async function getProductById(productId, includeImages) {
  const { data, error } = await supabase
    .from('products')
    .select(buildSelect(includeImages))
    .eq('productid', productId)
    .maybeSingle();

  return { data, error };
}

async function createProduct(payload) {
  const { data, error } = await supabase
    .from('products')
    .insert([payload])
    .select(PRODUCT_FIELDS)
    .single();

  return { data, error };
}

async function updateProduct(productId, payload) {
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('productid', productId)
    .select(PRODUCT_FIELDS)
    .single();

  return { data, error };
}

async function softDeleteProduct(productId) {
  const { data, error } = await supabase
    .from('products')
    .update({ status: 'inactive' })
    .eq('productid', productId)
    .select(PRODUCT_FIELDS)
    .single();

  return { data, error };
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
};
