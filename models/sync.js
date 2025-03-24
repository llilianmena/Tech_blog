// models/sync.js
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.sync();
Post.sync();
Comment.sync();
