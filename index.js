const express = require('express');
const app = express();

const sequelize = require('./config/db');

const session = require('express-session')
const sequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(session({
  secret: 'My_Secret',
  store: new sequelizeStore({
    expiration: 24 * 60 * 60 * 1000,
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000}
}))

const serverConfig = require('./config/server.config');


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
app.use(apiRoutes)
// verifying email url: "http://localhost:7777/v1/customer/verify/email?token=<%= token %>
app.listen(serverConfig.PORT, ()=>{
    console.log('Server is started on Port:',serverConfig.PORT)
})