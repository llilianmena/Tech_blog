// routes/api/commentRoutes.js
const express = require('express');
const router = express.Router();
const { commentController } = require('../../controllers');

// Create a new comment on a post
router.post('/create', commentController.createComment);

module.exports = router;
