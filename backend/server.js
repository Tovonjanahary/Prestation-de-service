const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Router = require('./routes/Routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);
//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection, useCreateIndexes: false
var connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection etablished successfully');
});
//Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 8000;

try{
  app.listen(port)
}catch(err){
  console.log(err)
}
