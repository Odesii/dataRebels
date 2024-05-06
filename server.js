const express = require('express');
const session = require('express-session');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const apiRoutes = require('./routes/api');
const routes = require('./routes');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000, // One hour
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
// Routes
app.use('/api', apiRoutes);
app.use(routes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`);
  });
});
