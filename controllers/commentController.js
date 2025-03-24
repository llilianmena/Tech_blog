const { Comment } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const userId = req.session.userId;
    await Comment.create({ content, user_id: userId, post_id: postId });
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating comment');
  }
};
