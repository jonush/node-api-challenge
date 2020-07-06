const express = require('express');
const cors = require('cors');

const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.get('/', (req,res) => {
  res.status(200).json({ 
    message: process.env.GREETING,
    environment: process.env.NODE_ENV,
    port: process.env.PORT
  })
});

module.exports = server;