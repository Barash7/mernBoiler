import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import io from 'socket.io'
import axios from 'axios'
import { readFile } from 'fs/promises'

import config from './config'
import mongooseService from './services/mongoose'

import Html from '../client/html'

const { resolve } = require('path')

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`)
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

server.get('/api/v1/products', async (req, res) => {
  const arrayOfProducts = await readFile(`${__dirname}/data/data.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch(() => [])
  res.json(arrayOfProducts.slice(0, 50))
})

const url = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
const mockRates = {
  CAD: 1.3,
  EUR: 0.9,
  USD: 1
}
server.get('/api/v1/currency', async (req, res) => {
  const currency = await axios(url)
    .then(({ data }) => data.rates)
    .catch(() => mockRates)
  res.json(currency)
})

// MongoDB
if (config.mongoEnabled) {
  // eslint-disable-next-line
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
if (config.socketsEnabled) {
  // eslint-disable-next-line
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Serving at http://localhost:${PORT}`)
})
