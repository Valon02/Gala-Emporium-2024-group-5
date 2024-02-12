import express from 'express'
import mongoose from 'mongoose'
import apiRegister from './api-register.js'

const server = express()
const port = 3000

server.use(express.json())
server.use(express.static('../client'))

mongoose.connect("mongodb+srv://gala:grupp5@cluster0.ewaouzm.mongodb.net/GalaEmporium")

apiRegister(server)

server.listen(port, () => {
    console.log(`Server open on http://localhost:${port}`)
})