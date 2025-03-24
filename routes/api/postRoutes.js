const express = require('express');
const router = express.Router();
const { postController } = require('../../controllers');

router.post('/create', postController.createPost);
router.post('/:id', postController.updatePost);
router.get('/:id/delete', postController.deletePost);

module.exports = router;
