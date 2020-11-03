var express = require('express')
var app = express()
var path = require('path')
var { Socket } = require('dgram')
var fs = require('fs')
var http = require('http')
var https = require('https')

var APP_PORT = 5555
var APP_HOST = 'localhost'
var server = app.listen(APP_PORT,APP_HOST, () => {
    console.log(`App runnning on port ${APP_PORT} ${APP_HOST}`)
})

var private_key = fs.readFileSync('./keys/key.pem','utf-8');
var certificates = fs.readFileSync('./keys/cert.pem','utf-8');
var credentials = {key:private_key, cert:certificates,passphrase:'sunat1998'}

// var httpServer = http.createServer(app)
// var httpsServer = https.createServer(credentials,app)

var io = require('socket.io').listen(server)
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

// httpServer.listen(6500)
// httpsServer.listen(6555)


io.on('connection', socket => {
    console.log(socket.handshake.address,'a user connected')
    socket.on('chatter', (message) => {
        console.log('chatter : ', message)
        io.emit('chatter', message)
    })
})