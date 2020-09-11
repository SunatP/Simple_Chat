const express = require('express')
const app = express()
const path = require('path')
const { Socket } = require('dgram')

const APP_PORT = 5555
const APP_HOST = '192.168.6.249'
const server = app.listen(APP_PORT,APP_HOST, () => {
    console.log(`App runnning on port ${APP_PORT} ${APP_HOST}`)
})

const io = require('socket.io').listen(server)

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})


io.on('connection', socket => {
    console.log(socket.handshake.address,'a user connected')
    socket.on('chatter', (message) => {
        console.log('chatter : ', message)
        io.emit('chatter', message)
    })
})