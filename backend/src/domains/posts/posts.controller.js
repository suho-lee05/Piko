const postsService = require('./posts.service');

function parseNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function sanitizePost(post) {
  return {
    postid: post.postid,
    productid: post.productid,
    manufacturerid: post.manufacturerid,
    posttitle: post.posttitle,
    postcontent: post.postcontent,
    createdat: post.createdat,
    images: post.images,
  };
}

async function listPosts(req, res) {
  const { productId, manufacturerId, includeImages } = req.query || {};

  const filters = {
    productId: parseNumber(productId) || productId,
    manufacturerId: parseNumber(manufacturerId) || manufacturerId,
  };
  const include = includeImages === 'true';

  const { data, error } = await postsService.listPosts(filters, include);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch posts',
      details: error.message,
    });
  }

  const items = Array.isArray(data) ? data.map(sanitizePost) : [];
  return res.status(200).json({ status: 'OK', items });
}

async function getPost(req, res) {
  const { postId } = req.params;
  const include = req.query?.includeImages === 'true';

  const { data, error } = await postsService.getPostById(postId, include);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch post',
      details: error.message,
    });
  }
  if (!data) {
    return res.status(404).json({
      status: 'ERROR',
      message: 'Post not found',
    });
  }

  return res.status(200).json({
    status: 'OK',
    post: sanitizePost(data),
  });
}

async function createPost(req, res) {
  const { productId, manufacturerId, postTitle, postContent } = req.body || {};

  if (!productId || !manufacturerId || !postTitle || !postContent) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'productId, manufacturerId, postTitle, postContent are required',
    });
  }

  const payload = {
    productid: Number(productId),
    manufacturerid: Number(manufacturerId),
    posttitle: postTitle,
    postcontent: postContent,
    createdat: new Date().toISOString(),
  };

  const { data, error } = await postsService.createPost(payload);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to create post',
      details: error.message,
    });
  }

  return res.status(201).json({
    status: 'OK',
    post: sanitizePost(data),
  });
}

async function updatePost(req, res) {
  const { postId } = req.params;
  const { postTitle, postContent } = req.body || {};

  const payload = {};
  if (postTitle !== undefined) payload.posttitle = postTitle;
  if (postContent !== undefined) payload.postcontent = postContent;

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'No fields to update',
    });
  }

  const { data, error } = await postsService.updatePost(postId, payload);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to update post',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    post: sanitizePost(data),
  });
}

async function deletePost(req, res) {
  const { postId } = req.params;

  const { data, error } = await postsService.deletePost(postId);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to delete post',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    post: sanitizePost(data),
  });
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
