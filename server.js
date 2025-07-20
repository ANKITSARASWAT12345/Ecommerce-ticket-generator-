const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const morgan=require('morgan');
const dbConfig = require('./src/configs/db.config');
const serverConfig = require('./src/configs/server.config');


app.use(bodyParser.json());
app.use(morgan('combined'));

mongoose.connect(dbConfig.DB_URL)
  .then(()=>{console.log('database connected')})
  .catch(()=>{console.log('database not  connected')})


  require('./src/Routes/products.routes')(app)
  require("./src/Routes/auth.routes")(app);
  require("./src/Routes/user.routes")(app);
  require('./src/Routes/ticket.routes')(app);

app.listen(serverConfig.PORT,()=>{
    console.log('application is running on port 3000')
})