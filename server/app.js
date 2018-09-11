const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const winston = require('./config/winston')
const cors = require('cors')

const pdfRouter = require('./routes/pdf')
const aemRouter = require('./routes/aem')
const pushRouter = require('./routes/push')

const app = express()

app.use(cors())
app.use(morgan('combined', { stream: winston.stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/pdf', pdfRouter)
app.use('/aem', aemRouter)
app.use('/push', pushRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function handleGenericError (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500).json(err)
})

module.exports = app
