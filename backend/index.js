const app = require('express')();
const mongoose = require('mongoose');
const consign = require('consign');
const server = require('http').Server(app);
const io = require('socket.io')(server)
const configEnv = require('dotenv').config();

app.env = process.env;

const port = app.env.port || 3001;

app.use((req, res, next) => { 
    req.io = io;
    return next();
});

app.mongoose = mongoose;

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./config/mongodb.js')
    .then('./models')
    .then('./api/auth.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

server.listen(port, () => {
    console.log(`Backend executando na porta: ${port}...`)
});