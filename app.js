const express = require('express')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { tokenAPI } = require('./components/token')

const app = express()
// const server = http.createServer(app)

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('some_secret_1234'))

app.get('/', (req, res) => {
  return res.json({ message: 'Wellcome to Drive ' })
})
//router
app.use('/api', tokenAPI)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

const port = process.env.PORT || 3003

// process.on('uncaughtException', (error) => {
//     console.log(error, 'error uncaughtException');
// })

// process.on('SIGTERM', (error) => {
//     console.log(error, 'error SIGTERM');
// })

// process.once("SIGUSR2", () => server.close(err => process.kill(process.pid, "SIGUSR2")));

app
  .listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
  .on('error', console.log)

module.exports = app
