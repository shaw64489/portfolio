const express = require('express');
const path = require('path');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

//SERVICE
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
//instance of next app
const app = next({ dev });
//handle incoming request
const handle = routes.getRequestHandler(app);
//import DB configurations
const config = require('./config');
const bodyParser = require('body-parser');
// Routes
const bookRoutes = require('./routes/book');
const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog');

const robotsOptions = {
  root: path.join(__dirname, '../static'),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

const secretData = [
  {
    title: 'Secret Data 1',
    description: 'Plans how to build spaceship'
  },
  {
    title: 'Secret Data 2',
    description: 'My secret passwords'
  }
];

//connect to db - will change pw
// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();
mongoose
  .connect(
    config.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Database Connected');
  })
  .catch(err => console.err(err));

//standard server setup for next app
app
  .prepare()
  .then(() => {
    //pass server to next app
    const server = express();

    //body parser middleware
    server.use(bodyParser.json());

    server.use('/api/v1/books', bookRoutes);
    server.use('/api/v1/portfolios', portfolioRoutes);
    server.use('/api/v1/blogs', blogRoutes);

    server.get('/robots.txt', (req, res) => {
      return res.status(200).sendFile('robots.txt', robotsOptions);
    })

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
      return res.json(secretData);
    });

    server.get(
      '/api/v1/onlysiteowner',
      authService.checkJWT,
      authService.checkRole('siteOwner'),
      (req, res) => {
        return res.json(secretData);
      }
    );

    //handle all other pages
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    //token authorization middleware - error handling
    server.use(function(err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res
          .status(401)
          .send({ title: 'Unauthorized', detail: 'Unauthorized access' });
      }
    });

    server.use(handle).listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });