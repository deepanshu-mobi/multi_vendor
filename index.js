const express = require('express');
const app = express();


const serverConfig = require('./config/server.config');
const sequelize = require('./config/db');
const model = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


sequelize.sync({ alter: true })
  .then(() => {
    console.log('sync successfully');
  })
  .catch((err) => {
    console.log('Error while sycing', err.message);
  });

app.listen(serverConfig.PORT, ()=>{
    console.log('Server is started on Port:',serverConfig.PORT)
})