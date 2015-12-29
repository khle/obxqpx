'use strict'

var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var server = app.listen(port, function () {
  console.log('Express server is listening on port ', port)
})

app.use(express.static(__dirname + '/client'))