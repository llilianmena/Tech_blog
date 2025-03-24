const { Post } = require('../models');

exports.createPostPage = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    return res.render('createPost');
}

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;
    const newPost = await Post.create({ title, content, user_id: userId });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
};

exports.updatePost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.params;
      const userId = req.session.userId;
      const post = await Post.findOne({ where: { id }});

      if (post.user_id != userId) {
        return res.status(403).send('this is not your post');
      }

      post.title = title;
      post.content = content;

      await post.save();

      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating post');
    }
  };

exports.getPost = async (req, res) => {
  if (req.params.id === "create") {
    return res.render('createPost');
  }

  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [{ model: Comment, include: User }, User],
    });
    if (post) {
      res.render('post', { post: post.dataValues });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post');
  }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const { session } = req;
    const post = await Post.findByPk(id);
    if (post.user_id !== session.userId) {
        return res.status(403).send('this is not your post');
    }
    await post.destroy();
    return res.redirect('/dashboard');
}
