const express = require('express');
const app = express();

const serverConfig = require('./config/server.config')

app.listen(serverConfig.PORT, ()=>{
    console.log('Server is started on Port:',serverConfig.PORT)
})