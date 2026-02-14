const express = require('express');
const postsController = require('./posts.controller');

const router = express.Router();

router.get('/', postsController.listPosts);
router.get('/:postId', postsController.getPost);
router.post('/', postsController.createPost);
router.put('/:postId', postsController.updatePost);
router.delete('/:postId', postsController.deletePost);

module.exports = router;
