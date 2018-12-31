const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
//instance of next app
const app = next({ dev })
//handle incoming request
const handle = app.getRequestHandler()

//standard server setup for next app
app.prepare()
.then(() => {
  //pass server to next app
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})