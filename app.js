const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const homeRoutes = require('./routes/homeRoutes');
const apiRoutes = require('./routes/api/postRoutes');
const authRoutes = require('./routes/api/userRoutes');
const postRoutes = require('./routes/api/postRoutes');
const commentRoutes = require('./routes/api/commentRoutes');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Add this line

const app = express();
const PORT = process.env.PORT || 3001;

// Set up session with SequelizeStore
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 3600000, // session expiry time in ms (1 hour)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, // Sequelize instance
  }),
};

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars setup
const hbs = exphbs.create({
  helpers: {
    truncate: function (str, length) {
      return str.substring(0, length);
    },
    extend: function (name, options) {
      const blocks = this._blocks || (this._blocks = {});
      blocks[name] = options.fn(this);
      return null;  // Prevents rendering content here
    },
    block: function (name) {
      const blocks = this._blocks || {};
      return blocks[name] || null;  // Renders the block if defined
    },
  },
  defaultLayout: 'main', // Set the default layout (main.handlebars)
  extname: '.handlebars', // Default extension for Handlebars files
});

// Set up Handlebars.js as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set up session middleware for authentication with SequelizeStore
app.use(session(sess));

app.use(async (req, res, next) => {
    try {
      // Ensure the session is initialized and saved
      if (req.session) {
        await req.session.save();
      }
      next();
    } catch (error) {
      console.error('Session save error:', error);
      next(error);  // Continue even in case of an error
    }
});

// Routes
app.use('/', homeRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
