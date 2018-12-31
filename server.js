const express = require('express');
const next = require('next');
const routes = require('./routes');
const dev = process.env.NODE_ENV !== 'production';
//instance of next app
const app = next({ dev });
//handle incoming request
const handle = routes.getRequestHandler(app)

//standard server setup for next app
app.prepare()
.then(() => {
  //pass server to next app
  const server = express();

  //handle all other pages
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(handle).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  })
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});