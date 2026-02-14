const supabase = require('../../config/supabase');

const POST_FIELDS =
  'postid, productid, manufacturerid, posttitle, postcontent, createdat';
const IMAGE_FIELDS = 'imageid, postid, imageurl, imagetype, sortorder, createdat';

function buildSelect(includeImages) {
  if (includeImages) {
    return `${POST_FIELDS}, images(${IMAGE_FIELDS})`;
  }
  return POST_FIELDS;
}

function applyFilters(query, filters) {
  const { productId, manufacturerId } = filters;
  if (productId) query = query.eq('productid', productId);
  if (manufacturerId) query = query.eq('manufacturerid', manufacturerId);
  return query;
}

async function listPosts(filters, includeImages) {
  let query = supabase.from('posts').select(buildSelect(includeImages));
  query = applyFilters(query, filters).order('createdat', { ascending: false });

  const { data, error } = await query;
  return { data, error };
}

async function getPostById(postId, includeImages) {
  const { data, error } = await supabase
    .from('posts')
    .select(buildSelect(includeImages))
    .eq('postid', postId)
    .maybeSingle();

  return { data, error };
}

async function createPost(payload) {
  const { data, error } = await supabase
    .from('posts')
    .insert([payload])
    .select(POST_FIELDS)
    .single();

  return { data, error };
}

async function updatePost(postId, payload) {
  const { data, error } = await supabase
    .from('posts')
    .update(payload)
    .eq('postid', postId)
    .select(POST_FIELDS)
    .single();

  return { data, error };
}

async function deletePost(postId) {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('postid', postId)
    .select(POST_FIELDS)
    .single();

  return { data, error };
}

module.exports = {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
