// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const { homeController } = require('../controllers');

// Route for the home page
router.get('/', homeController.homePage);
router.get('/register', homeController.registerPage);
router.get('/login', homeController.loginPage);
router.get('/dashboard', homeController.dashboardPage);

// Route for viewing a single post
router.get('/post/:id', homeController.singlePostPage);
router.get('/post/:id/edit', homeController.editPostPage);

module.exports = router;
