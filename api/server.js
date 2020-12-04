
// Dev Tools
const helmet = require('helmet')
const morgan = require('morgan')

// Routers
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

// Express
const express = require('express');
const server = express();

// Using imports in server
server.use(helmet('dev'))
server.use(morgan('dev'))
server.use(express.json()) // Formats express to JSON so it's readable
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

// Initial server path
server.get('/', (req, res) => {
    res.send(`<h2>Welcome to my sprint challenge!</h2>`)
})


module.exports = server;
