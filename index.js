const serverConfig = require('./config/server.config');
const sequelize = require('./config/db');
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./utils/swagger.json')
const orderController = require('./controllers/order')
const express = require('express');
const app = express();



app.post('/webhook/endPoint', express.raw({ type: 'application/json' }), orderController.stripeWebhook)

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

sequelize.sync({ alter: true})// use only when something changes in schema
.then(() => {
    console.log('sync successfully');
})
  .catch((err) => {
    console.log('Error while sycing', err.message);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
const apiRoutes = require('./routes/apiRoutes')
app.use(apiRoutes)
// verifying email url: "http://localhost:7777/v1/customer/verify/email?token=<%= token %>
app.listen(serverConfig.PORT, ()=>{
    console.log('Server is started on Port:', serverConfig.PORT)
})