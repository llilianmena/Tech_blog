// controllers/homeController.js
const moment = require('moment');
const { Post, Comment, User } = require('../models');

exports.homePage = async (req, res) => {
  try {
    // Fetch all posts for the home page
    const { session } = req;
    const posts = await Post.findAll({
        include: [User],
    });

    res.render('home', { posts: posts.map((p) => {
        return {
            ...p.dataValues,
            createdAt: moment(p.dataValues.createdAt).format("MMM-DD-YYYY HH:SS"),
        };
    }), session });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
};

exports.singlePostPage = async (req, res) => {

  const { session } = req;

  if (req.params.id === "create") {
    if (session.userId) {
        return res.render('createPost');
    }

    return res.redirect('/');
  }

  try {
    // Fetch a single post by its ID
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: { model: Comment, include: User },  // Including comments and their authors
    });

    if (post) {
      res.render('post', { post: post.dataValues, session });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching the post');
  }
};

exports.editPostPage = async (req, res) => {

    const { session } = req;
  
    if (!session.userId) {
        return res.redirect('/');
    }
  
    try {
      // Fetch a single post by its ID
      const postId = req.params.id;
      const post = await Post.findByPk(postId);
  
      if (post) {
        res.render('postEdit', { post: post.dataValues, session });
      } else {
        res.status(404).send('Post not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching the post');
    }
  };

exports.registerPage = async (req, res) => {
    return res.render('register');
};

exports.loginPage = async (req, res) => {
    return res.render('login');
};

exports.dashboardPage = async (req, res) => {
    const { session } = req;

    if (!session.userId) {
        return res.redirect('/');
    }

    const userPosts = await Post.findAll({
        where: {
            user_id: session.userId,
        },
        include: { model: Comment, include: User },  // Including comments and their authors
    });

    return res.render('dashboard', { posts: userPosts.map((p) => {
        return {
            ...p.dataValues,
            createdAt: moment(p.dataValues.createdAt).format("mm-dd-YYYY"),
        };
    }), session });
}
