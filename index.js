const express = require('express');
const app = express();


const serverConfig = require('./config/server.config');
const sequelize = require('./config/db');

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

sequelize.sync()
  .then(() => {
    console.log('sync successfully');
  })
  .catch((err) => {
    console.log('Error while sycing', err.message);
  });



const apiRoutes = require('./routes/apiRoutes')
app.get('/', (req, res) => {
  res.render('customer')
})
app.use(apiRoutes)

app.listen(serverConfig.PORT, ()=>{
    console.log('Server is started on Port:',serverConfig.PORT)
})